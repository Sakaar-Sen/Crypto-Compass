from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, set_access_cookies, unset_jwt_cookies, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache
from helper.getNews import get_news
from helper.summarize import summarize
from helper.newsSentiment import get_sentiment
from helper.getPriceFeed import get_price_feed
from helper.pricePrediction import get_price_prediction_all
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#cors = CORS(app, resources={r"/": {"origins": "*"}})
CORS(app)

app.config["JWT_SECRET_KEY"] = "hajhsi29327nas"  
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 36000
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["json", "headers"]
app.config["JWT_COOKIE_CSRF_PROTECT"] = False


jwt = JWTManager(app)

cache = Cache(config={'CACHE_TYPE': 'FileSystemCache', "CACHE_DEFAULT_TIMEOUT": 604800, "CACHE_DIR": "./tmp"})
cache.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    subscription = db.Column(db.String(10), nullable=False, default="free")


@app.route("/api/signup", methods=["POST"])
def signup():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
   
    if username is None or password is None:
        return jsonify({"msg": "Missing username or password"}), 400
    
    username = username.strip()
    password = password.strip()
    if User.query.filter_by(username=username).first() is not None:
        return jsonify({"msg": "User already exists"}), 400
    
    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 201


@app.route("/api/checkUsername", methods=["GET"])
def checkUsername():
    username = request.args.get("username", None)
    if username is None:
        return jsonify({"msg": "Missing username"}), 400
    
    username = username.strip()
    if User.query.filter_by(username=username).first() is not None:
        return jsonify({"msg": "Username already exists"}), 400
    else:
        return jsonify({"msg": "Username available"}), 200
    

@app.route("/api/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    if username is None or password is None:
        return jsonify({"msg": "Missing username or password"}), 400
    
    username = username.strip()
    password = password.strip()
    user = User.query.filter_by(username=username, password=password).first()
    
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    response = {
        "jwt" : create_access_token(identity=username, additional_claims={"identity": username, "sub": user.subscription}),
        "msg": "login successful"
    }
    
    return jsonify(response), 200
    

@app.route("/api/logout", methods=["POST"])
def logout_with_cookies():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route("/api/me", methods=["GET"])
@jwt_required()
def protected():
    claims = get_jwt()
    return jsonify(claims)



@app.route("/api/sub/upgrade", methods=["POST"])
@jwt_required()
def upgrade():
    claims = get_jwt()
    username = claims["identity"]

    if claims["sub"] == "free":
        user = User.query.filter_by(username=username).first()
        user.subscription = "pro"
        db.session.commit()
        
        additional_claims = {"identity": username,"sub": "pro"}
        access_token = create_access_token(identity=username,additional_claims=additional_claims)
        response = jsonify({"msg": "upgrade successful"})
        set_access_cookies(response, access_token)
        return response
    
    else:
        return jsonify({"msg": "Already premium"}), 400


@app.route("/api/sub/downgrade", methods=["POST"])
@jwt_required()
def downgrade():
    claims = get_jwt()
    username = claims["identity"]
   
    if claims["sub"] == "pro":
        
        user = User.query.filter_by(username=username).first()
        user.subscription = "free"
        db.session.commit()
        
        additional_claims = {"identity": username,"sub": "free"}
        access_token = create_access_token(identity=username,additional_claims=additional_claims)
        response = jsonify({"msg": "downgrade successful"})
        set_access_cookies(response, access_token)
        return response
    else:
        return jsonify({"msg": "Already free"}), 400


@app.route("/api/news", methods=["GET"])
@jwt_required()
def news():
    return jsonify(get_news())


def get_summary_cached(url):
    cache_key = f"summary:{url}"
    summary = cache.get(cache_key)
    if summary is None:
        print("Cache miss")
        summary = summarize(url)
        cache.set(cache_key, summary, timeout=604800)
    else:
        print("Cache hit")
    return summary


@app.route("/api/news/summary", methods=["POST"])
@jwt_required()
def news_detail():
    claims = get_jwt()
    print(claims)
    
    if claims["sub"] == "free":
        return jsonify({"detail": "You need to upgrade to premium to see the details"})
    
    url = request.json.get("url", None)
    if url is None:
        return jsonify({"detail": "URL is required"})
    summary = get_summary_cached(url)
    return jsonify({"summary": summary})


def get_sentiment_cached(title):
    cache_key = f"sentiment:{title}"
    sentiment = cache.get(cache_key)
    if sentiment is None:
        print("Cache miss")
        sentiment = get_sentiment(title)
        cache.set(cache_key, sentiment, timeout=604800)
    else:
        print("Cache hit")
    return sentiment


@app.route("/api/news/sentiment", methods=["POST"])
@jwt_required()
def news_sentiment():
    claims = get_jwt()
    #print(claims)
    
    if claims["sub"] == "free":
        return jsonify({"detail": "You need to upgrade to premium to see the details"})
    
    title = request.json.get("title", None)
    if title is None:
        return jsonify({"detail": "title is required"})
    
    sentiment = get_sentiment_cached(title)
    return jsonify({"sentiment": sentiment})


@app.route("/api/price/feed", methods=["GET"])
@jwt_required()
def pricefeed():
    claims = get_jwt()
    subscription = claims['sub']
    
    if subscription == 'free':
        return jsonify(get_price_feed("free"))
    elif subscription == 'pro':
        return jsonify(get_price_feed("pro"))
    else:
        return jsonify(error="Invalid JWT"), 400
    

def get_price_prediction_all_cached():
    cache_key = "pricePrediction"
    predictions = cache.get(cache_key)
    if predictions is None:
        print("Cache miss")
        predictions = get_price_prediction_all()
        cache.set(cache_key, predictions, timeout=10800) #3days
    else:
        print("Cache hit")
    return predictions    
    
    
@app.route("/api/price/predictions", methods=["GET"])
@jwt_required()
def price_predictions():
    return jsonify(get_price_prediction_all_cached())



# with app.app_context():
#     db.create_all()
#     user = User(username="test", password="test", subscription="pro")
#     db.session.add(user)
#     db.session.commit()

if __name__ == "__main__":
    app.run()

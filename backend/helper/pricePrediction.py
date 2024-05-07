from sklearn.linear_model import LinearRegression
import ccxt
from save_thread_result import ThreadWithResult
import pandas as pd
import time

assets = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"]

ex = ccxt.bybit()

def get_price_prediction_single(asset):
    data = ex.fetch_ohlcv(asset, "1d", limit=365)
    df = pd.DataFrame(data, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
    df.set_index('timestamp', inplace=True)
    df.index = pd.to_datetime(df.index, unit='ms')
    df.sort_index(inplace=True, ascending=True)
    df = df[["close"]].iloc[-365:]

    df['dummy'] = range(1, len(df) + 1)
    df['dummy2'] = df['dummy'] ** 2

    y = df["close"].values
    X = df[["dummy", "dummy2"]].values
    # X = df[["dummy"]].values

    model = LinearRegression()
    model.fit(X.reshape(-1, 2), y)

    futuresDays = [7, 30, 60]
    predictions = model.predict([[len(X) + i, (len(X) + i) ** 2] for i in futuresDays])
    return list(predictions)


def get_price_prediction_all():
    Threads = []
    predictions = {}
    for asset in assets:
        t = ThreadWithResult(target=get_price_prediction_single, args=(asset,))
        t.start()
        Threads.append(t)
    
    for i, t in enumerate(Threads):
        t.join()
        predictions[assets[i]] = t.result
        
    return predictions



start = time.time()
print(get_price_prediction_all())
end = time.time()
print(end - start)
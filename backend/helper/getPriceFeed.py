import requests
import pandas as pd

url = "https://data.orionterminal.com/api/screener"
infourl = "https://data.orionterminal.com/api/info"

def get_price_feed(sub="free"):
    try:
        r = requests.get(url)
        r = r.json()

        info_r = requests.get(infourl)
        info_r = info_r.json()
        info = info_r['ALIAS_SCREENER']

        df = pd.DataFrame(r)
        df = df.transpose()
        df = df.reset_index()
        df = df.rename(columns=info)
        df = df.sort_values(by=['marketcap'], ascending=False)
        df = df[~df['index'].str.contains("BUSD")]
        df = df[~df['index'].str.contains("USDC")]
        df = df[df['marketcap'] > 0]
        df['index'] = df['index'].str.replace("-binanceusdm", "")

        df.dropna(inplace=True)

        freeCols = ["index", "marketcap", "change_1h", "change_1d", "volume_1d", "BTC_correlation_1d", "ETH_correlation_1d"]
        if sub == 'free':
            return df[freeCols].to_dict("records")


        proCols = freeCols + ["change_5m", "change_15m", "volume_5m", "volume_1h", "volatility_15m", "volatility_1h", "BTC_correlation_3d", "ETH_correlation_3d", 'BTC_beta_1d','ETH_beta_1d', 'BTC_beta_3d', 'ETH_beta_3d']
        if sub == 'pro':
            return df[proCols].to_dict("records")
    except:
        return None


# print(get_price_feed("pro"))
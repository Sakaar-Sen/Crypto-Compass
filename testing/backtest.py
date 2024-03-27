import vectorbt as vbt
import ccxt
import pandas as pd
import pandas_ta as ta

def emaCrossoverStrategy(df, fast, slow):
    df = df.copy()
    df['fast'] = ta.ema(df['close'], length=fast)
    df['slow'] = ta.ema(df['close'], length=slow)
    # df.dropna(inplace=True)
    df["position"] = df['fast'] > df['slow']
    print(df.tail())
    df['position'] = df['position'].astype(int)
    print(df.tail())

    entries = df['position'].diff() == 1
    exits = df['position'].diff() == -1
    return df, entries, exits

def maCrossoverStrategy(df, fast, slow):
    df = df.copy()
    df['fast'] = ta.ma(df['close'], length=fast)
    df['slow'] = ta.ma(df['close'], length=slow)
    # df.dropna(inplace=True)
    df["position"] = df['fast'] > df['slow']
    df['position'] = df['position'].astype(int)
    print(df)

    entries = df['position'].diff() > 0
    exits = df['position'].diff() < 0
    return df, entries, exits
    


def get_backtest(asset, strat, bars=1000):
    ex = ccxt.bybit()
    

    if strat == "ema_crossover":
        df, entries, exits = emaCrossoverStrategy(price, 13, 34)
        

    # portfolio = vbt.Portfolio.from_signals(df['close'], entries, exits, init_cash=10000, fees=0.001)
    # dfStats = pd.DataFrame(portfolio.stats(), columns=["Value"])
    # dfStats.to_csv("stats.csv")
    # return dfStats

get_backtest("BTCUSDT", "ema_crossover")
from getPriceFeed import get_price_feed
import unittest

class TestGetPriceFeed(unittest.TestCase):
    def test_getPriceFeed(self):
        # Test free user
        result = get_price_feed("free")
        self.assertIsInstance(result, list)
        self.assertGreater(len(result), 0)
        self.assertIsInstance(result[0], dict)
        expectedKeys = ['index', 'marketcap', 'change_1h', 'change_1d', 'volume_1d', 'BTC_correlation_1d', 'ETH_correlation_1d']
        for key in expectedKeys:    
            self.assertTrue(result[0].get(key))        

        # Test pro user
        result = get_price_feed("pro")
        self.assertIsInstance(result, list)
        self.assertGreater(len(result), 0)
        self.assertIsInstance(result[0], dict)
        expectedKeys = ['index', 'marketcap', 'change_1h', 'change_1d', 'volume_1d', 'BTC_correlation_1d', 'ETH_correlation_1d', 'change_5m', 'change_15m', 'volume_5m', 'volume_1h', 'volatility_15m', 'volatility_1h', 'BTC_correlation_3d', 'ETH_correlation_3d', 'BTC_beta_1d', 'ETH_beta_1d', 'BTC_beta_3d', 'ETH_beta_3d']
        for key in expectedKeys:
            self.assertTrue(result[0].get(key))
            
        #Test invalid user
        result = get_price_feed("error")
        self.assertIsNone(result)
            
if __name__ == '__main__':
    unittest.main()
    
    
    
    
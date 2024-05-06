from pricePrediction import get_price_prediction_all, get_price_prediction_single
import unittest

class TestPricePrediction(unittest.TestCase):
    def test_getPricePredictionSingle(self):
        response = get_price_prediction_single("BTCUSDT")
        self.assertIsInstance(response, list)
        self.assertEqual(len(response), 3)
        self.assertIsInstance(response[0], float)
        self.assertIsInstance(response[1], float)
        self.assertIsInstance(response[2], float)
        
    def test_getPricePredictionAll(self):
        response = get_price_prediction_all()
        self.assertIsInstance(response, dict)
        self.assertEqual(len(response), 5)
        
        assetList = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"]
        for asset in assetList:
            self.assertIsInstance(response[asset], list)
            self.assertEqual(len(response[asset]), 3)
            self.assertIsInstance(response[asset][0], float)
            self.assertIsInstance(response[asset][1], float)
            self.assertIsInstance(response[asset][2], float)
            
            
        
if __name__ == '__main__':
    unittest.main()
    
    
    
    
from getNews import get_news
import unittest

class TestGetNews(unittest.TestCase):
    def test_getNews(self):
        # Test without default limit
        result = get_news()
        self.assertIsInstance(result, list)
        self.assertGreater(len(result), 0)
        self.assertIsInstance(result[0], dict)
        self.assertTrue(result[0].get('title'))
        self.assertTrue(result[0].get('url'))
        
        # Test with custom limit
        result = get_news(200)
        self.assertIsInstance(result, list)
        self.assertGreater(len(result), 0)
        self.assertIsInstance(result[0], dict)
        self.assertTrue(result[0].get('title'))
        self.assertTrue(result[0].get('url'))

        # Test with limit = 0
        result = get_news(0)
        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 0)
        
        # Test with negative limit
        result = get_news(-1)
        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 0)
            

if __name__ == '__main__':  
    unittest.main()
    
    
    
    
    
    
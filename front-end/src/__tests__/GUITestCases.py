import unittest
import time
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import sys

PATH = "./front-end/src/__tests__/chromedriver.exe"

class GUITestCases (unittest.TestCase):

    # URL = "https://www.prideinwriting.me/"
    URL = "http://localhost:3000/"

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(self):
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        s = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=s, options=options)
        self.driver.implicitly_wait(40)

    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    #Home Page renders without crashing
    def test0(self):
        driver = self.driver
        driver.get(self.URL)
        expected = "Pride in Writing"
        h1 = driver.find_elements(By.TAG_NAME, "h1")
        actual = h1[0].text
        self.assertEqual(expected,actual)

    #Authors Link in header works
    def test1(self):
        driver = self.driver
        driver.get(self.URL)
        buttons = driver.find_elements(By.ID, "authors-button")
        buttons[0].click()
        expected = "Authors"
        titleText = driver.find_elements(By.ID, "authors-title")
        actual = titleText[0].text
        self.assertEqual(expected,actual)

    #Books Link in header works
    def test2(self):
        driver = self.driver
        driver.get(self.URL)
        buttons = driver.find_elements(By.ID, "books-button")
        buttons[0].click()
        expected = "Books"
        titleText = driver.find_elements(By.ID, "books-title")
        actual = titleText[0].text
        self.assertEqual(expected,actual)

    #Publisher Link in header works
    def test3(self):
        driver = self.driver
        driver.get(self.URL)
        buttons = driver.find_elements(By.ID, "publishers-button")
        buttons[0].click()
        expected = "Publishers"
        titleText = driver.find_elements(By.ID, "publishers-title")
        actual = titleText[0].text
        self.assertEqual(expected,actual)

    #AboutUs Link in header works
    def test4(self):
        driver = self.driver
        driver.get(self.URL)
        buttons = driver.find_elements(By.ID, "aboutus-button")
        buttons[0].click()
        expected = "About Us"
        titleText = driver.find_elements(By.TAG_NAME, "h1")
        actual = titleText[0].text
        self.assertEqual(expected,actual)

    URL = self.URL + "/AboutUs"
        
    
    #AboutUs page makes Gitlab Api calls
    # def test5(self):
    #     driver = self.driver
    #     driver.get(self.URL)
    #     driver.implicitly_wait(40)
    #     expected = 0
    #     titleText = driver.find_elements(By.TAG_NAME, "h1")
    #     actual = titleText[0].text
    #     self.assertGreater()
    

        
if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])

tearDownClass()

# https://gitlab.com/forbesye/fitsbits/-/blob/master/front-end/guitests.py
# https://gitlab.com/forbesye/fitsbits/-/blob/master/front-end/gui_tests/template.py
# Code for running and setting up GUI tests inspired and used from here

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

# PATH = "./front-end/src/__tests__/chromedriver.exe"
PATH = "chromedriver_linux64"
URL = "https://www.prideinwriting.me/"

class GUITestCases (unittest.TestCase):

    # URL = "https://www.prideinwriting.me/"
    # URL = "http://localhost:3000/"

    # Get drivers and run website before all tests
    @classmethod
    def setUpClass(self):
        # options = Options()
        # options.add_argument('--headless')
        # options.add_argument('--no-sandbox')
        # options.add_argument('--disable-dev-shm-usage')
        # # s = Service(ChromeDriverManager().install())
        # self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        # self.driver.implicitly_wait(40)

        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--window-size=1920,1080')
        chrome_options.add_argument('--allow-insecure-localhost')
        chrome_options.add_argument('--start-maximized')

        self.driver = webdriver.Chrome(PATH)
        self.driver.get(URL)
        self.driver.maximize_window()
        self.URL = URL


    # Close browser and quit after all tests
    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    #Home Page renders without crashing
    def test0(self):
        driver = self.driver
        driver.get(self.URL)
        expected = "P"
        h1 = driver.find_elements(By.ID, "homePageP")
        actual = h1[0].text
        self.assertEqual(expected,actual)

    #Authors Link in header works
    def test1(self):
        driver = self.driver
        driver.get(self.URL)
        buttons = driver.find_elements(By.ID, "authors-button")
        buttons[0].click()
        self.assertEqual(self.driver.current_url, self.URL + "Authors")

    #Books Link in header works
    def test2(self):
        driver = self.driver
        driver.get(self.URL)
        buttons = driver.find_elements(By.ID, "books-button")
        buttons[0].click()
        self.assertEqual(self.driver.current_url, self.URL + "Books")

    #Publisher Link in header works
    def test3(self):
        driver = self.driver
        driver.get(self.URL)
        buttons = driver.find_elements(By.ID, "publishers-button")
        buttons[0].click()
        self.assertEqual(self.driver.current_url, self.URL + "Publishers")

    #AboutUs Link in header works
    def test4(self):
        driver = self.driver
        driver.get(self.URL)
        buttons = driver.find_elements(By.ID, "aboutus-button")
        buttons[0].click()
        self.assertEqual(self.driver.current_url, self.URL + "AboutUs")


    #Author Instance Page created correctly
    def test5(self):
        self.temp_URL = self.URL + "author-0"
        driver = self.driver
        driver.get(self.temp_URL)
        driver.implicitly_wait(10)
        h2 = driver.find_elements(By.TAG_NAME, "h2")
        expected = "Publisher Connections"
        x = False
        for y in h2 :
            if expected == y.text:
                x = True
        self.assertTrue(x)


    #Book Instance Page created correctly
    def test6(self):
        self.temp_URL = self.URL + "book-0"
        driver = self.driver
        driver.get(self.temp_URL)
        driver.implicitly_wait(10)
        h2 = driver.find_elements(By.TAG_NAME, "h2")
        expected = "Genre"
        x = False
        for y in h2 :
            if expected == y.text:
                x = True
        self.assertTrue(x)


    #Publisher Instance Page created correctly
    def test7(self):
        self.temp_URL = self.URL + "publisher-0"
        driver = self.driver
        driver.get(self.temp_URL)
        driver.implicitly_wait(10)
        h2 = driver.find_elements(By.TAG_NAME, "h2")
        expected = "Book Connections"
        x = False
        for y in h2 :
            if expected == y.text:
                x = True
        self.assertTrue(x)


    #Author Instance Page can be navigated to
    def test8(self):
        self.temp_URL = self.URL + "Authors"
        driver = self.driver
        driver.get(self.temp_URL)
        driver.implicitly_wait(10)
        button = driver.find_elements(By.ID, "linkButton-0")
        button[0].click()
        self.assertEqual(self.driver.current_url, self.URL + "author-0")

    def test9(self):
        self.temp_URL = self.URL + "Books"
        driver = self.driver
        driver.get(self.temp_URL)
        driver.implicitly_wait(10)
        button = driver.find_elements(By.ID, "linkButton-0")
        button[0].click()
        self.assertEqual(self.driver.current_url, self.URL + "book-0")
    
    

        
if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])

tearDownClass()

# Code used from https://gitlab.com/forbesye/fitsbits/-/blob/master/front-end/guitests.py


import os
from sys import platform

if __name__ == "__main__":
    # Use chromedriver based on OS
    if platform == "win32":
        PATH = "./src/__tests__/chromedriver.exe"
    elif platform == "linux":
        PATH = "./src/__tests__/chromedriver_linux64"
    elif platform == "darwin":
        PATH = "./src/__tests__/chromedriver_mac64"
    else:
        print("Unsupported OS")
        exit(-1)

    # Run all of the gui tests
    os.system("python3 ./src/__tests__/GUITestCases.py " + PATH)

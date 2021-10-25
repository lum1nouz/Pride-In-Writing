from flask import Flask, render_template, request, jsonify
#from flask_cors import CORS
import requests
import time
import urllib
import os
import json


import numpy as np
import pandas as pd

authorsData = pd.read_csv(r'./authors-prefinaldata.csv')


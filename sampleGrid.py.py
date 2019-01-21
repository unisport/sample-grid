#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import os
import re
import requests
import datetime
from webbrowser import open_new_tab
import urllib.request
from decimal import *

# This program works as follows: sends a "GET" request, decodes the JSON and converts it to a list of Python dictionaries. 
# It then uses the dict values to generate an HTML grid where the values are rendered.
# After that, the grid is embedded into HTML template and written to an .html file.
#The final result can be seen in the .html file,which is automatically opened as a new tab in an already open internet browser.
# The CSS is attached as a separate file ('style.css'). 

#First, I read the data 
link = "https://www.unisport.dk/api/products/batch/?list=179249,179838,174351,180011,180020,178429"

try: 
    response= requests.get(link)
    json_data = json.loads((response.content))
except:
    print('Could not open link/No data available.Please check link and try again.') 

#Then, I sort the data objects using "discount_percentage"
table_data = json_data["products"]
table_data.sort(key=lambda x: x["discount_percentage"], reverse=False)

#The function below generates an HTML grid using the JSON data
def html_table(table_data):
    wrapperMain = """<div class="row">"""
    tableRows = ""
    wrapper = """<div class="column"><ul class="menu"><ul><a href=%s><img src = %s></a></ul><ul><b>%s</b></ul><ul>%s</ul><ul>%s</ul></ul></div>"""
  
    for k in table_data:
        priceDKK = str(Decimal(k["price"])/100)+" DKK"
        stringData = wrapper % ( str(k["url"]),str(k["image"]),str(k["name"]),str(priceDKK),str(k["delivery"]))
        tableRows+=stringData     
      
           
    
    wrapperEnd = """</div>"""
    tableFinal=wrapperMain+tableRows+wrapperEnd 
    print(tableFinal)
    return tableFinal

table=html_table(table_data)
#print(table)

body = ""
url = link
#The function below adds the grid to an HTML docunent template with referenced CSS, writes it to a ".html" file and opens a browser tab, rendering the HTML code. 
def createGrid(program, url, table, body):
  now = datetime.datetime.today().strftime("%Y%m%d-%H%M%S")
  filename = program + '.html'
  f = open(filename,'w', encoding='utf-8')

  wrapper = """<html>
  <head>
  <title>%s output - %s</title>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="style.css">
  </head><body> <div><h2 class ="header">Data Source: <a href=%s>Unisport</a></h2></div>%s</body></html>"""
  
  whole = wrapper % (program, now,url,table)
  print(whole)
  f.write(whole)
  f.close()

  open_new_tab(filename)

createGrid("respGrid",url, table,body)

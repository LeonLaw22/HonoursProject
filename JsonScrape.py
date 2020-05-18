import requests
from bs4 import BeautifulSoup
import json

#URL to be scraped
url = 'http://192.168.0.76/'
#Load html's plain data into a variable
response = requests.get(url, timeout=5)
#parse the data
content = BeautifulSoup(response.content, "html.parser")
dataArr = []
data = content.find("table")
cells = data.findAll('td')


entryObject ={
    "Date": cells[0].text.strip(),
    "Sensor":cells[1].text.strip(),
    "Temperature":cells[2].text.strip(),
    "Humidity":cells[3].text.strip()
    }
dataArr.append(entryObject)
with open('TempData.json','w') as outfile:
    json.dump(dataArr, outfile)




import requests
import sys

latitude = 30.309836
longitude = -97.743383

def get_response(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"fetch failed: {response.status_code}")
    return response

station_url = f"https://api.weather.gov/points/{latitude},{longitude}"
station = get_response(station_url).json()

forecast_url = station['properties']['forecastHourly']
forecast = get_response(forecast_url)

sys.stdout.write(forecast.text)
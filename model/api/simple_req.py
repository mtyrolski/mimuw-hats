import requests

KERAS_REST_API_URL = "http://localhost:5000/predict_binary"
IMAGE_PATH = "makohat.jpg"

image = open(IMAGE_PATH, "rb").read()
payload = {"image": image}
r = requests.post(KERAS_REST_API_URL, files=payload).json()

if r["success"]:
	print(r)
    
else:
	print("Request failed")
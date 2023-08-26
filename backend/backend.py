import requests
import json
from firebase_admin import credentials, storage
import firebase_admin
from firebase_admin import db
from mindee import Client, documents
url = "https://api.mindee.net/v1/products/skipper-1007/medical_presciption/v1/predict"
# { Authorization: 'Token <my-api-key>' }

cred = credentials.Certificate("../key.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'gs://hackout-7a957.appspot.com',
    'databaseURL': 'https://hackout-7a957-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

bucket = storage.bucket()

# Reference to the location of the JSON object in Firebase Realtime Database


# Init a new client and add your custom endpoint (document)
mindee_client = Client(api_key="b6e0179764e4621de5e7b5d24dd8eb07").add_endpoint(
    account_name="skipper-1007",
    endpoint_name="medical_presciption",
)

# Load a file from disk and parse it.
# The endpoint name must be specified since it cannot be determined from the class.
result = mindee_client.doc_from_path(
    "./WhatsApp Image 2023-08-26 at 11.41.26.jpg"
).parse(documents.TypeCustomV1, endpoint_name="medical_presciption")

# Print a brief summary of the parsed data
obj = result.document
json1 = {}
keys = []
print(obj)
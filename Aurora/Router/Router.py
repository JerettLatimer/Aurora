import pymongo as pm
import time
import signal
import geojson

location = geojson.Point((117.147, 47.3955))

data = {
        "name": "rp1",
        "status": "",
        "location": location
}


def term_handler(signal_num, stack_num):
    collection.delete_one({"name": "rp1"})
    data["status"] = "offline"
    collection.insert_one(data)
    print("Signal Number: " + signal_num + "" + stack_num)


client = pm.MongoClient("mongodb+srv://LunaLord:1234@cluster0-liruv.azure.mongodb.net/test?retryWrites=true&w=majority")
db = client.test_cgr
collection = db.test_monitor

signal.signal(signal.SIGTERM, term_handler)

while True:
    collection.delete_one({"name": "rp1"})
    data["status"] = "online"
    print(data)
    collection.insert_one(data)
    time.sleep(10)





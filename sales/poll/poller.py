import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()
from sales_rest.models import AutoMobileInventoryVO
# Import models from sales_rest, here.
# from sales_rest.models import Something

def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutoMobileInventoryVO.objects.update_or_create(
            vehicle_vin = automobile['vin'],
            defaults = {
                "model": automobile['model']['name'],
                "manufacturer": automobile['model']['manufacturer']['name']
            }
            
        )
def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobiles()
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()

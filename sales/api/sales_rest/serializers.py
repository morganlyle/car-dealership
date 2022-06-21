from rest_framework import serializers
from .models import Customer, SalesRep, SaleRecord, AutoMobileInventoryVO


## testing how serializers work, I really enjoy them. It diludes the complexity un un readablility. Especially 
## When you start trying to serialze different data types. I think moving forward
## I will be using Django rest framework with django. Unless its extremely specific. 
## I felt like a real engineer reading docs and figuring out how it works rather than
## just using an encoder we were given I don't like the copy and paste feel it gives. 


# class CustomerSerializer(serializers.ModelSerializer):
#     class Meta: 
#         model = Customer
#         fields=["name", "phone_number", "address"]

class SalesRecordSerializer(serializers.ModelSerializer):
    # customer = CustomerSerializer(read_only=True, many=True)
    
    class Meta:
        model = SaleRecord
        fields = ["automobile", 'customer', 'sale_price']
        depth=2
        



class SaleRepSerializer(serializers.ModelSerializer):
    salesmade = SalesRecordSerializer(read_only=True, many=True)
    class Meta:
        model = SalesRep
        fields = ["name", "employee_id", "salesmade"]

class AutomobileVOSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutoMobileInventoryVO
        fields = ['vehicle_vin','model', 'manufacturer', 'sold', 'id', 'color', 'year']

class SaleMadeSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaleRecord
        fields = ["automobile", "sales_rep", "customer", "sale_price", "id"]
        depth=1

        





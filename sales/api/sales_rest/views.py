from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

# Create your views here.


from common.json import ModelEncoder
from .models import Customer, SalesRep, SaleRecord, AutoMobileInventoryVO
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SaleRepSerializer, SalesRecordSerializer, AutomobileVOSerializer


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "address", 'phone_number', 'id']

class SalesRepListEncoder(ModelEncoder):
    model = SalesRep
    properties = ["name", "employee_id",]



class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = ["automobile", "sales_rep", "customer", "sale_price"]

class SalesRepDetailEncoder(ModelEncoder):
    model = SalesRep
    properties = ["name", "employee_id"]


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer, 
            encoder=CustomerListEncoder,
            safe=False,
        )


class SaleRepList(APIView):
    def get(self, request):
        saleReps = SalesRep.objects.all()
        serializer = SaleRepSerializer(saleReps, read_only=True, many=True)
        return Response(serializer.data)
    def post(self):
        pass



# @require_http_methods(["GET"])
# def api__list_salesrep(request):
#     if request.method == "GET":
#         salesReps = SalesRep.objects.all()
#         print(salesReps)
#         serializer = SaleRepSerializer(salesReps, many=True)
#         print("This is the serializer", serializer)
#         return JsonResponse(serializer.data, safe=False)

@require_http_methods(["GET", "POST"])
def api__list_salesrep(request):
    if request.method == "GET":
        salesReps = SalesRep.objects.all()
        return JsonResponse(
            {"Sales_Reps": salesReps},
            encoder=SalesRepListEncoder,
            safe=False
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        SaleRep = SalesRep.objects.create(**content)
        return JsonResponse(
            SaleRep,
            encoder=SalesRepListEncoder,
            safe=False
        )

@require_http_methods(["GET"])
def api_salesmade(request):
    if request.method == "GET":
        pass

@require_http_methods(["GET"])
def api_salesrep_detail(request, employee_id):
    if request.method == "GET":
        Sales_rep = SalesRep.objects.get(employee_id=employee_id)
        response = SaleRepSerializer(instance=Sales_rep,).data
        return JsonResponse(
            response, 
            safe=False)

@require_http_methods(["GET"])
def api_automobileVO(request):
    if request.method == "GET":
        automobile = AutoMobileInventoryVO.objects.all()
        print("THIS IS AUTOMOBILE OBJECT",automobile)
        serializer = AutomobileVOSerializer(automobile, many=True)
        print("THIS IS THE SERIALIZER FOR AUTO : ", serializer.data)
        return JsonResponse(
            {"Cars": serializer.data}, 
            safe=False)
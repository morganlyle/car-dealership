from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

# Create your views here.


from common.json import ModelEncoder
from .models import Customer, SalesRep, SaleRecord, AutoMobileInventoryVO
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SaleRepSerializer, SalesRecordSerializer, AutomobileVOSerializer, SaleMadeSerializer


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

@require_http_methods(["GET", "POST"])
def api_salesmade(request):
    if request.method == "GET":
        sales_made = SaleRecord.objects.all()
        response = SaleMadeSerializer(sales_made, many=True)
        return JsonResponse(
            {"sales": response.data}
        )
    else: 
        if request.method == "POST":
            content = json.loads(request.body)
            automobileVO = AutoMobileInventoryVO.objects.get(vehicle_vin=content['automobile'])
            if automobileVO.sold == False:
                automobileVO.sold = True
                automobileVO.save()
                content['automobile'] = automobileVO
                sales_repVO = SalesRep.objects.get(employee_id=content['sales_rep'])
                content['sales_rep'] = sales_repVO
                customerVO = Customer.objects.get(id=content["customer"])
                content['customer'] = customerVO
                sale = SaleRecord.objects.create(**content)
                sales_repVO.salesmade.add(sale)
                response = SaleMadeSerializer(instance=sale)
                return JsonResponse (response.data)
            else:
                return JsonResponse({"message": "This car has been sold already"})

            

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
        serializer = AutomobileVOSerializer(automobile, many=True)
        return JsonResponse(
            {"Cars": serializer.data}, 
            safe=False)



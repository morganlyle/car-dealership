from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Technician
# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
    
        'vins',
        'id', 
    
    ]
    
class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        'name',
        'employee_number',
        'id',
    ]
    
class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'vin', 
        'name',
        'date',
        'time',
        'technician',
        'reason',
        'vip',
        'id'
    ]
    encoders = {'technician': TechnicianEncoder()
                }
    # def get_extra_data(self, o):
    #     count = AutomobileVO.objects.filter(vins=o.vins).count()
    #     return{'vip': count > 0}
class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'vin', 
        'name',
        'date',
        'time',
        'technician',
        'reason',
        'vip',
        'id'
    ]
    encoders = {
                'technician': TechnicianEncoder()
                }
    
@require_http_methods(['GET', 'POST'])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {'appointments': appointments},
            encoder=AppointmentListEncoder
        )
    else: 
        content = json.loads(request.body)

        try:
            AutomobileVO.objects.get(vins=content['vin'])
            print('this car is in our vin')
            technician = Technician.objects.get(name=content['technician'])
            content['technician'] = technician
            content['vip'] = True
            appointment = Appointment.objects.create(**content)
            return JsonResponse({"appointment": appointment}, encoder=AppointmentDetailEncoder,) 
            
            
        except AutomobileVO.DoesNotExist:
            print("this is not here")
            technician = Technician.objects.get(name=content['technician'])
            content['technician'] = technician
            appointment = Appointment.objects.create(**content)
            
            # id = content['vin']
            # vins = AutomobileVO.objects.get(pk=id)
            # content['vin'] = vins
    # except AutomobileVO.DoesNotExist:
        return JsonResponse({"appointment": appointment}, encoder=AppointmentDetailEncoder,)
    
    # appointment = Appointment.objects.create(**content)
    # return JsonResponse(appointment, encoder=AppointmentListEncoder, safe=False,)

@require_http_methods(['GET', 'POST'])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {'technicians': technicians}, encoder=TechnicianEncoder, safe=False)
    else:
        content = json.loads(request.body)
        try:
            technicians = Technician.objects.create(**content)
            return JsonResponse(technicians, encoder=TechnicianEncoder, safe=False)
        except:
            response = JsonResponse({'message: Could not create new technician'})
            response.status_code = 400
            return response
        
@require_http_methods(['GET', 'DELETE'])
def api_show_appointments(request, pk):
    if request.method == 'GET':
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)
        except Appointment.DoesNotExist(appointment):
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            count, _ = Appointment.objects.filter(id=pk).delete()
            return JsonResponse({'Deleted': count > 0})
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
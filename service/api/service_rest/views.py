from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Status, Technician
# Create your views here.

class StatusEncoder(ModelEncoder):
    model = Status
    properties = ['name']
    
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vins',
        'vip'
        'id', 
    ]
    
class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        'name',
        'employee_number',
        'id',
    ]
    
class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'vin', 
        'name',
        'date',
        'time',
        'technician',
        'reason',
       
        'id', 
        'status',
    ]
    encoders = {'technician': TechnicianEncoder(), 
                'status': StatusEncoder(),
                }
    
    def get_extra_data(self, o):
        try:
            AutomobileVO.objects.filter(vins=o.vin)
            return{'vip': True}
        except:
            return{'vip': False}

    
@require_http_methods(['GET', 'POST'])
def api_list_appointments(request):
    if request.method == "GET":
        status = Status.objects.get(name='SCHEDULED')
        appointments = Appointment.objects.filter(status=status)
        return JsonResponse(
            {'appointments': appointments},
            encoder=AppointmentEncoder, safe=False
        )
    else: 
        content = json.loads(request.body)

        try:
            AutomobileVO.objects.get(vins=content['vin'])
            print('this car is in our vin')
            technician = Technician.objects.get(name=content['technician'])
            content['technician'] = technician
            content['vip'] = True
            # appointment = Appointment.objects.create(**content)
            # return JsonResponse({"appointment": appointment}, encoder=AppointmentEncoder,) 
            
            
        except AutomobileVO.DoesNotExist:
            print("this is not here")
            technician = Technician.objects.get(name=content['technician'])
            content['technician'] = technician
            # appointment = Appointment.objects.create(**content)
            
        appointment = Appointment.create(**content)
            # id = content['vin']
            # vins = AutomobileVO.objects.get(pk=id)
            # content['vin'] = vins
    # except AutomobileVO.DoesNotExist:
        return JsonResponse({"appointment": appointment}, encoder=AppointmentEncoder,)
    
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
            return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)
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
        
@require_http_methods(['GET',])
def api_create_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.create()
    return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)
    
@require_http_methods(['PUT'])
def api_finished_appointment(requests, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.completed()
    return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)

@require_http_methods(['PUT'])
def api_cancelled_appointment(requests, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.cancelled()
    return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)
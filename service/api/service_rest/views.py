from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from service.api.common.json import ModelEncoder
from service.api.service_rest.models import AutomobileVO, Appointment, Technician
# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'import_href',
        'color',
        'year', 
        'vin',
        'model'
    ]
    
class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        'name',
        'employee_number',
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
        'vip'
    ]
    encoders = {'vin': AutomobileVOEncoder()}
class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'vin', 
        'name',
        'date',
        'time',
        'technician',
        'reason',
        'vip'
    ]
    encoders = {'vin': AutomobileVOEncoder()}
    
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
            vins = AutomobileVO.objects.get(vins)
            vins = content['vin']
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Does not exist"}, status=400)
        
        appointment = Appointment.objects.create(**content)
        return JsonResponse(appointment, encoder=AppointmentListEncoder, safe=False,)
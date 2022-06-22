from django.contrib import admin

from service_rest.models import Appointment, AutomobileVO, Technician, Status

# Register your models here.
@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    pass
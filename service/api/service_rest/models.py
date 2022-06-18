from django.db import models

# Create your models here.
class Technician(models.Model):
    name= models.CharField(max_length=100, unique=True)
    employee_number= models.PositiveSmallIntegerField()
    
class AutomobileVO(models.Model):
    vins = models.CharField(max_length=100, unique=True)

class Appointment(models.Model):
    vin = models.ForeignKey(AutomobileVO, related_name='vin', on_delete=models.PROTECT)
    name = models.CharField(max_length=100, unique=True)
    date = models.DateTimeField(auto_now_add=True)
    time = models.DateTimeField(auto_now_add=True)
    reason = models.CharField(max_length=100, unique=True)
    vip = models.BooleanField(default=False)
    technician = models.ForeignKey(Technician, related_name="technician",
                                   on_delete=models.PROTECT)

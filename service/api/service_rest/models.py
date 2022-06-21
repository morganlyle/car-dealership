from django.db import models

# Create your models here.
class Technician(models.Model):
    name= models.CharField(max_length=100, unique=True)
    employee_number= models.PositiveSmallIntegerField()
    
    def __str__(self):
        return self.name 
    
class AutomobileVO(models.Model):
    vins = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.vins

class Appointment(models.Model):
    vin = models.CharField(max_length=25, unique=True)
    name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    time = models.DateTimeField(auto_now_add=True)
    reason = models.CharField(max_length=100)
    vip = models.BooleanField(default=False)
    technician = models.ForeignKey(Technician, related_name="technician",
                                   on_delete=models.PROTECT)
    def __str__(self):
        return f'{self.vin} {self.reason}'

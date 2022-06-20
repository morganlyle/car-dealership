from django.db import models


# Create your models here.
class AutoMobileInventoryVO(models.Model):
    vehicle_vin = models.CharField(max_length=20, unique=True)
    model = models.CharField(max_length=50, null=True)
    manufacturer = models.CharField(max_length=50 , null=True)

    def __str__(self):
        return f'Manufacturer: {self.manufacturer} Model: {self.model} VIN#: {self.vehicle_vin}'




class Customer(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20 ,unique=True, null = False, blank=False)

    def __str__(self):
        return f'{self.name}: {self.phone_number}'


class SalesRep(models.Model):
    name = models.CharField(max_length=50)
    employee_id = models.PositiveIntegerField(null=False, blank=False, unique=True)
    salesmade = models.ManyToManyField('SaleRecord', blank=True)

    def __str__(self):
        return f'{self.name} ID: {self.employee_id}'

class SaleRecord(models.Model):
    automobile = models.ForeignKey(AutoMobileInventoryVO, null=False, blank=False, on_delete=models.PROTECT)
    sales_rep = models.ForeignKey(SalesRep, null=False, blank=False, on_delete=models.PROTECT)
    customer = models.ForeignKey(Customer, related_name="BOOGIE",null=False, blank=False , on_delete=models.PROTECT)
    sale_price = models.PositiveIntegerField(null=False, blank=False)

    def __str__(self):
        return f'Rep: {self.sales_rep} Car Sold: {self.automobile} Price: {self.sale_price}'

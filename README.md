# CarCar

Team:

* Morgan - Services
* Tristen - Sales

## Design
CarCar is a app with 3 microservices: Inventory, Sales and Services. The main aggregate root would be Inventory because the aggregates of Services and Sales rely on data that is stored in Inventory. Inventory and Sales are a bounded context and the aggregate root would be Inventory with Sales being the aggregate. 
## Service microservice

Explain your models and integration with the inventory
microservice, here.

The models used in Services are Status, Technician, AutomobileVO and Appointment. The AutomobileVO polls VIN data from Inventory from the poller.py file. Using this we can determine if a customer is a VIP with their VIN. The Status model so that we can see if a service is scheduled, canceled, or completed. For the Appointment model, we needed to pull who the technician was servicing the car and the status of the appointment. To do that we have a foreign key to technician and a foreign key for status. 

## Sales microservice

Explain your models and integration with the inventory
microservice, here.


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

The way approached this domain problem was by making sure my models were set up correctly. 

MODELS: 

I set my models up to reflect real life solutions and problems. 

-First was the customer, the customer has no    impact and depends solely on its self. There for I did not need any relationships on this side. It is a basic model containing customer information.

-Second was the AutomobileVO HOWEVER, after realizing that I did not want to mess with the inventory API given to us, I decided to not make automobileInventoryVO an actual VO. This is because I made it hold a mutable boolean field, SOLD. This allows me to poll all of the vehicles information that just got added to our lot or is already on or lot. This would automatically get defaulted to False because in a real world situation when a vehicle gets added to a dealerships lot it is not sold. BUT when a sale is made it gets automatically updated to TRUE with my sales made POST api. I also wanted to hold all the information on that vehicle such as the vin(identifying factor), model, manufacturer, color, year and sold. This made it a lot better when fetching adi get requests to have all the information in one location. 

Next Sales Rep, now this got me thinking, I can have multiple sales reps that have multiple sales... Therefore I made a property salesmade to be a manytomany relationship with the SalesRecord model. Allowing the sales rep to keep track of their sales. Also, in a real world problem you do not want the sales history to be deleted if you fire an employee, so I protected the sales made by the rep. I think I could have gone a little further and added a property: employee_status to either ACTIVE or INACTIVE to be able to filter the employees that can continue to making sales so I can keep a history of all sales reps. 

Lastly the holy grail: Salesmade. This took many tries to get it working exactly how I wanted it to work before bringing it to react. The Sales record depends on a automobile, customer, salesrep so I created a foreinkey relationship. In the real world Technically you can have 1 customer buy multiple cars at once so I might change the foreignkey automobile to a many-to-many. Then a course the sale price is not dependent on anything so the property remains a standard Positive intergerfield which can use a realistic price of a vehcile. Unless of course someone sells a car for trillions of dollars, MAYBE ELON MUSK???









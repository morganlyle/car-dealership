
Automobile Services - keep track of service appointments for automobiles and their owners

Enter a technician:

[] - Create a form that allows a person to enter an automotive technician's name and employee number
[] - When the form is submitted, the automotive technician is created in the application.
[] - Create a link in the navbar to get to the Enter a technician form.

Service Appointment:

[] - Create a form that allows someone to enter the VIN of the vehicle, the name of the person the vehicle belongs, date and time of appointment, assigned technician, and reason for the service appointment
[] - When the form is submitted, the service appointment should be saved in the application
[] - Create a link in the navbar to get to the Enter a service appointment form.

List of appointments:

[] - A list of scheduled appointments that contain the details collected in the form: VIN, customer name, date and time of the appointment, the assigned technician's name, and the reason for the service
[] - List of scheduled appointments should show that the automobile was purchased from the dealership so that the concierge can give that customer "VIP treatment".
[] -  List of appointments should have a button that allows a service concierge to cancel the appointment, or to show that the service appointment has been finished. When a service appointment is canceled or finished, it should no longer show up in the list of appointments
[] - Create a link in the navbar to get to the list of appointments.

Service history:

[] - List of the service appointments for a specific VIN
[] - To do this, create a page that has an input that allows someone to type in the VIN. On form submission, fetch all of the service appointments for an automobile with the VIN in the input.
[] - Then, show that list of service appointments to include the customer name, date and time of the appointment, the assigned technician's name, and the reason for the service.
[] - Create a link in the navbar to get to the page that shows the service history for a specific VIN.

Integration
One of these requirements talks about an automobile that came from inventory. That's your integration point between your microservice and the Inventory microservice.
![Getting started](docs/homepage.png)

# CarCar

- To spin up your Docker containers please run these commands:

  - Run docker container prune -f
  - Run docker volume create beta-data
  - Run docker-compose up

- IMPORTANT FOR AFTER RUNNING DOCKER COMMAND:

  -Open CLI for project-beta-service-api- in docker.

  - RUN: python manage.py createsuperuser
    fill out necessary info
  - log into admin http://localhost:8080/admin
  - click on Status on left side of admin panel.
  - Create 3 instances:

    1. SCHEDULED
    2. CANCELED
    3. COMPLETED

  - Once these three are added feel free the browse the site. To see data you will need to create the data using the forms. How the Inventory API is set up to create a automobile for the sales and service microservices to work, complete these forms in order by click Inventory in nav bar.

    4. Add manufacturer
    5. Add vehicle
    6. Add vehicle to inventory

You can now play around with the microservices! Enjoy :)

## Design

CarCar is a app with 3 microservices: Inventory, Sales and Services. The main aggregate root would be Inventory because the aggregates of Services and Sales rely on data that is stored in Inventory. Inventory and Sales are a bounded context and the aggregate root would be Inventory with Sales being the aggregate.

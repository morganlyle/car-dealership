import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);















async function getSaleData() {
  const customerResponse = await fetch('http://localhost:8090/api/customers/')
  const carInventoryResponse = await fetch('http://localhost:8090/api/cars')
  const salesRepResponse = await fetch('http://localhost:8090/api/sales-reps/')
  const salesListResponse = await fetch('http://localhost:8090/api/sales/')
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/')
  const vehichleModelResponse = await fetch('http://localhost:8100/api/models/')
  const inventoryResposne = await fetch('http://localhost:8100/api/automobiles/')
  const servicesResponse = await fetch('http://localhost:8080/api/services/')
  if (
    customerResponse.ok &&
    carInventoryResponse.ok && 
    salesRepResponse.ok &&
    salesListResponse.ok &&
    manufacturerResponse.ok &&
    vehichleModelResponse.ok && 
    inventoryResposne.ok &&
    servicesResponse.ok
  ) {
    const customersData = await customerResponse.json();
    const carInventoryData = await carInventoryResponse.json();
    const salesRepsData = await salesRepResponse.json();
    const salesListData = await salesListResponse.json();
    const manufacturerData = await manufacturerResponse.json();
    const vehichleModelData = await vehichleModelResponse.json();
    const inventoryResposneData = await inventoryResposne.json();
    const servicesResponse = await servicesResponse.json();
    root.render(
      <React.StrictMode>
        <App
        customers={customersData.customers}
        cars={carInventoryData.Cars}
        salesReps={salesRepsData.Sales_Reps}
        salesList={salesListData.sales}
        manufacturers={manufacturerData.manufacturers}
        vehichleModels={vehichleModelData.models}
        inventory={inventoryResposneData.autos}
        services={servicesResponse.services}
        />
      </React.StrictMode>
    )
  }

}
getSaleData();




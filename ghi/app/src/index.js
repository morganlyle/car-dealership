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
  if (
    customerResponse.ok &&
    carInventoryResponse.ok && 
    salesRepResponse.ok &&
    salesListResponse.ok
  ) {
    const customersData = await customerResponse.json();
    const carInventoryData = await carInventoryResponse.json();
    const salesRepsData = await salesRepResponse.json();
    const salesListData = await salesListResponse.json();
    root.render(
      <React.StrictMode>
        <App
        customers={customersData.customers}
        cars={carInventoryData.Cars}
        salesReps={salesRepsData.Sales_Reps}
        salesList={salesListData.sales}
        />
      </React.StrictMode>
    )
  }

}
getSaleData();

import React, { useState } from 'react';
import NumberFormat from 'react-number-format';

export default function SaleRecordForm({customers, cars, salesReps}) {

    const [saleDataForm, setSaleData] = useState({
        customers: [],
        cars: [],
        salesReps: [],
        automobile: "",
        sales_rep: "",
        customer: "",
        sale_price: "",
      });
    const handleChange = (event) => {
        setSaleData({ ...saleDataForm, [event.target.name]: event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...saleDataForm}
        console.log(data)
        delete data.customers;
        delete data.cars;
        delete data.salesReps;
        const saleRecordUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(saleRecordUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log("Congrats on the new sale!", newSale)
            setSaleData({automobile: "", sales_rep: "", customer: "", sale_price: ""})
        }
        


    }
    return (
        <div className="">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                        <h1>Record a new sale</h1>
                        </div>
                        <div>
                            <select onChange={handleChange} value={saleDataForm.customer} required id="customer" name="customer" className="form-select form-control form-row mb-3">
                                <option value="">Choose a customer</option>
                                {customers && customers.map(customer => {
                                    return (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name} {customer.phone_number}
                                    </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <select onChange={handleChange} value={saleDataForm.sales_rep} required id="sales_rep" name="sales_rep" className="form-select form-control form-row mb-3">
                                <option value="">Choose a sales person</option>
                                {salesReps && salesReps.map(rep => {
                                    return (
                                    <option key={rep.employee_id} value={rep.employee_id}>
                                        {rep.name}
                                    </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <select onChange={handleChange} value={saleDataForm.automobile} required id="automobile" name="automobile" className="form-select form-control form-row mb-3">
                                <option value="">Choose a vehicle</option>
                                {cars && cars.map(vehicle => {
                                    return (
                                    <option key={vehicle.vehicle_vin} value={vehicle.vehicle_vin}>
                                        Vin: {vehicle.vehicle_vin} Model: {vehicle.model} manufacturer: {vehicle.manufacturer}
                                    </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <input onChange={handleChange} value={saleDataForm.sale_price} placeholder="Vehicle Price $" type="number" name="sale_price" id="sale_price" className="form-control"/>
                        </div>
                        <div className="text-center">
                        <button type="button" className="btn btn-primary">Submit Sale</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

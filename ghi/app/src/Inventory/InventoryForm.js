import React, { useState } from 'react'

export default function VehicleInventoryForm({inventoryTwo}) {
    console.log(inventoryTwo)
    const [inventoryModel, setInventoryModel] = useState({
        color: '',
        year: "",
        modelId: [],
        model_id: '',
        vin: '',
    })

    const handleChange = (event) => {
        setInventoryModel({...inventoryModel, [event.target.name]: event.target.value});
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...inventoryModel}
        console.log("this is the data from the form", data)
        delete data.modelId
        
        const inventoryUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(inventoryUrl, fetchConfig);
        if (response.ok) {
            setInventoryModel({color: "", year: "", model_id: '', vin: '',})
        } else {
            console.log(response)
        }
    }



    return (
        <div className="">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h3>Add an Automobile to Inventory</h3>
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                name="color"
                                placeholder="Color"
                                onChange={handleChange}
                                value={inventoryModel.color}
                                className="form-control form-row mb-3"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                name="year"
                                placeholder="Year"
                                onChange={handleChange}
                                value={inventoryModel.year}
                                className="form-control form-row mb-3"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                name="vin"
                                placeholder="VIN"
                                onChange={handleChange}
                                value={inventoryModel.vin}
                                className="form-control form-row mb-3"
                                />
                            </div>
                            <div>
                            <select onChange={handleChange} value={inventoryModel.modelId}  id="model_id" name="model_id" className="form-select form-control form-row mb-3">
                                <option value="">Choose a model</option>
                                {inventoryTwo && inventoryTwo.map(model => {
                                    return (
                                    <option key={model.id} value={model.id}>
                                        {model.name}
                                    </option>
                                    )
                                })}
                            </select>
                        </div>
                            <div className="text-center">
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
      </div>

    )
}

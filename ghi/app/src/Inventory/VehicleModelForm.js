import React, { useState } from 'react'

export default function VehicleModelForm({manufacturers}) {

    const [vehicleModel, setVehicleModel] = useState({
        manufacturers: [],
        name: "",
        picture_url: "",
        manufacturer_id: "",
    })

    const handleChange = (event) => {
        setVehicleModel({...vehicleModel, [event.target.name]: event.target.value});
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...vehicleModel}
        console.log("this is the data from the form", data)
        delete data.manufacturers
        const newModelUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(newModelUrl, fetchConfig);
        if (response.ok) {
            setVehicleModel({name: "", picture_url: "", manufacturer: "", manufacturers: [],})
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
                                <h3>New Model</h3>
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                name="name"
                                placeholder="Model Name"
                                onChange={handleChange}
                                value={vehicleModel.name}
                                className="form-control form-row mb-3"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                name="picture_url"
                                placeholder="Picture Url"
                                onChange={handleChange}
                                value={vehicleModel.picture_url}
                                className="form-control form-row mb-3"
                                />
                            </div>
                            <div>
                            <select onChange={handleChange} value={vehicleModel.manufacturer_id} required id="manufacturer_id" name="manufacturer_id" className="form-select form-control form-row mb-3">
                                <option value="">Choose a manufacturer</option>
                                {manufacturers && manufacturers.map(manufacturer => {
                                    return (
                                    <option key={manufacturer.id} value={manufacturer.id}>
                                        {manufacturer.name}
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

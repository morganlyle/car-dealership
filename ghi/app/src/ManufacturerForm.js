import React, { useState } from 'react'

export default function ManufacturerForm() {
    const [manufacturer, setManufacturer] = useState({
        name:  "",
    })
    const handleChange = (event) => {
        setManufacturer({ ...manufacturer, [event.target.name]: event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...manufacturer}
        const manufacturerUrl = "http://localhost:8100/api/manufacturers/"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            setManufacturer({name: ""})
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
                                <h3>New Manufacturer</h3>
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                value={manufacturer.name}
                                className="form-control form-row mb-3"
                                />
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary">Submit Contact</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
      </div>
    )
}

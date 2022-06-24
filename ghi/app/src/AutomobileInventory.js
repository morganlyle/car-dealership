import React, { useState }from 'react'

export default function AutomobileInventory({inventory}) { 
    
    console.log('list', inventory)


    return (
        <React.Fragment>
        <h1>Automobile Inventory</h1>
        <div className="container-fluid">
            <table className="table table-striped table-hover">
            <thead>
                <tr>
                <th>VIN</th>
                <th>Color</th>
                <th>Year</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Stock</th>
                
                </tr>
            </thead>
            <tbody>
                {inventory && inventory.map(vehicle => {
                    if (vehicle.sold) {
                        return (
                            <tr key={vehicle.id}>
                            <td>{ vehicle.vehicle_vin }</td>
                            <td>{ vehicle.color }</td>
                            <td>{ vehicle.year }</td>
                            <td>{ vehicle.model }</td>
                            <td>{ vehicle.manufacturer}</td>
                            <td style={{ color: "red" }}>SOLD</td>
                            </tr>
                    )
                    } else {
                        return (
                            <tr key={vehicle.id}>
                            <td>{ vehicle.vehicle_vin }</td>
                            <td>{ vehicle.color }</td>
                            <td>{ vehicle.year }</td>
                            <td>{ vehicle.model }</td>
                            <td>{ vehicle.manufacturer}</td>
                            <td style={{ color: "green" }}>Available</td>
                            </tr>
                    )
                    }
                    
                })}
            </tbody>
            </table>
        </div>
        </React.Fragment>
    )
}

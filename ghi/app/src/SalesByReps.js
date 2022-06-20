import React, { useState } from 'react'

export default function SalesByReps({salesReps}) {
    const [saleDetails, setSaleDetail] = useState({
        salesReps: [],
        salerep: ""
    })
    console.log(salesReps)

    const handleChange = (event) => {
        setSaleDetail({ ...saleDetails, [event.target.name]: event.target.value})
    }
    async function returnList() {
        let salerepState = {...saleDetails}
        console.log(salerepState)
        let id = salerepState.salerep
        console.log(id)
        const saleRepDetailUrl = `http://localhost:8090/api/sales-reps/${id}`
        console.log("This is the state employee ID url: ", saleRepDetailUrl)
        
        const fetchConfig = {
            method: "get",
        }
        const response = await fetch(saleRepDetailUrl, fetchConfig);
        if (response.ok) {
            const saleRepDetail = await response.json();
            console.log("this should be the data on rep :", saleRepDetail)
        }
        
        return (
            <React.Fragment>
            <h1>All Sales</h1>
            <div className="container-fluid">
                <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Sales person</th>
                    <th >Customer</th>
                    <th>VIN</th>
                    <th>Sale price</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {.map(sale => {
                    return (
                        <tr key={sale.id}>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        </tr>
                    );
                    })} */}
                </tbody>
                </table>
            </div>
            </React.Fragment>
        )
    }
    


    return (
        <React.Fragment>
        <div className="form-container">
            <form >
                <div>
                <h1>Sales Reps Name</h1>
                </div>
                <div>
                    <select onChange={handleChange} required id="salerep" name="salerep" className="form-select">
                        <option value="">Choose a sales person</option>
                        {salesReps && salesReps.map(rep => {
                            return (
                            <option key={rep.id} value={rep.employee_id}>
                                {rep.name}
                            </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                </div>
                {/* <div>
                <button>Submit Contact</button>
                </div> */}
            </form>
        </div>
        </React.Fragment>
    )
}

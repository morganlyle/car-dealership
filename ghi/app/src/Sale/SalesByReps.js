import React, { useState, useEffect} from 'react'
import NumberFormat from 'react-number-format';
export default function SalesByReps({salesReps}) {
    const [saleDetails, setSaleDetail] = useState({
        salesReps: [],
        salerep: ""
    })
    const [items, setItems] = useState([])

    const handleChange =(event) => {
        setSaleDetail({ ...saleDetails, [event.target.name]: event.target.value})
    }
    useEffect(() => {
        returnDetail();
        async function returnDetail(){
            const response = await fetch(`http://localhost:8090/api/sales-reps/${saleDetails.salerep}`)
        if (response.ok) {
            const saleRepDetail = await response.json();
            setItems(saleRepDetail)
            console.log("this should be the data on rep:", saleRepDetail)
        }
        }
        
    }, [saleDetails.salerep])
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
                {items.salesmade && items.salesmade.map(sale => {
                return (
                    <tr>
                    <td>{items.name}</td>
                    <td>{sale.customer.name}</td>
                    <td>{sale.automobile.vehicle_vin}</td>
                    <td><NumberFormat value={sale.sale_price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
                </div>
                {/* <div>
                <button>Submit Contact</button>
                </div> */}
            </form>
        </div>
        </React.Fragment>
    )
}

import React from 'react'
import NumberFormat from 'react-number-format';
export default function SalesList({salesList}) {
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
            {salesList.map(sale => {
              return (
                <tr key={sale.id}>
                  <td>{ sale.sales_rep.name}</td>
                  <td>{ sale.customer.name}</td>
                  <td>{ sale.automobile.vehicle_vin}</td>
                  <td><NumberFormat value={sale.sale_price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

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
returnList()
import React, { useState } from 'react';

function SalesRepForm() {
    const [salesRep, setEmployee] = useState({
      name: "",
      employee_id: "",
    });
  
    const handleChange = (event) => {
        setEmployee({ ...salesRep, [event.target.name]: event.target.value});
    }
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {...salesRep}
      console.log("this is data", data)
      const salesRepUrl = 'http://localhost:8090/api/sales-reps/'
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(salesRepUrl, fetchConfig);
      if (response.ok) {
        const newSalesRep = await response.json();
        console.log("Congrats new SalesRep: ", newSalesRep)
        setEmployee({ name: "", employee_id: ""})
      } else { 
        console.log(salesRep);
      }
  
    }
  
    return (
      <div className="">
          <div className="row">
              <div className="offset-3 col-6">
                  <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit}>
                      <div>
                        <h3>New Employee Form</h3>
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          onChange={handleChange}
                          value={salesRep.name}
                          className="form-control form-row mb-3"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          onChange={handleChange}
                          type="number"
                          name="employee_id"
                          placeholder="Employee ID#"
                          value={salesRep.employee_id}
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
    );
  }
  export default SalesRepForm;
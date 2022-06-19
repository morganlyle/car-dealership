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
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <h3>New Employee Form</h3>
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={salesRep.name}
            />
          </div>
          <div>
            <input
              type="number"
              name="employee_id"
              placeholder="Employee ID#"
              onChange={handleChange}
              value={salesRep.employee_id}
            />
          </div>
          <div>
            <button>Submit Contact</button>
          </div>
        </form>
      </div>
    );
  }
  export default SalesRepForm;
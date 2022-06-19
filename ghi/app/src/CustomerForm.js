import React, { useState } from 'react';


function CustomerForm() {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone_number: "",
  });

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value});
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {...customer}
    console.log("this is data", data)
    const customerUrl = 'http://localhost:8090/api/customers/'
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newCostomer = await response.json();
      console.log("Congrats new customer: ", newCostomer)
      setCustomer({ name: "", address: "", phone_number: ""})
    } else { 
      console.log(customer);
    }

  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Customer Form</h3>
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={customer.name}
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            value={customer.address}
          />
        </div>
        <div>
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            onChange={handleChange}
            value={customer.phone_number}
          />
        </div>
        <div>
          <button>Submit Contact</button>
        </div>
      </form>
    </div>
  );
}
export default CustomerForm;

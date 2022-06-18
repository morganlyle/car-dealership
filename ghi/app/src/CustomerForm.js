import React, { useState } from 'react';


function CustomerForm() {
    const [customer, setCustomer] = useState({
      name: "",
      address: "",
      phone_number: "",
    });

  return (
    <div className="form-container">
      <form>
        <div>
          <h3>Customer Form</h3>
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={customer.name}
          />
        </div>
        <div>
          <input
            type="test"
            name="address"
            placeholder="Address"
            value={customer.address}
          />
        </div>
        <div>
          <input
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
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

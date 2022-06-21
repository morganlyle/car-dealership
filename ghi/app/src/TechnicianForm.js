import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employeeNumber: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({ name: value })
    }
    handleEmployeeNumberChange(event) {
        const value = event.target.value
        this.setState({ employeeNumber: value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = { ...this.state }
        data.employee_number = data.employeeNumber
        console.log('data', data)
        const technicianURL = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-tpe': 'application/json'
            },
        };
        const response = await fetch(technicianURL, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json()
            console.log(newTechnician)
            const cleared = {
                name: '',
                employeeNumber: '',
            };
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="my-5 container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                          <form onSubmit={this.handleSubmit}>
                            <div>
                              <h1>New Technician Form</h1>
                            </div>
                            <div className="mb-3">
                              <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={this.handleNameChange}
                                value={this.state.name}
                                className="form-control form-row mb-3"
                              />
                            </div>
                            <div className="mb-3">
                              <input
                                onChange={this.handleEmployeeNumberChange}
                                type="number"
                                name="employee_number"
                                placeholder="Employee Number"
                                value={this.state.employeeNumber}
                                className="form-control form-row mb-3"
                              />
                            </div>
                            <div className="text-center">
                              <button className="btn btn-primary">Submit</button>
                            </div>
                          </form>
                        </div>
                      </div>
                  </div>
            </div>
          );
      


    };
};
export default TechnicianForm;
import React from 'react';

class ServiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vin: '',
            name: '',
            date: '',
            time: '',
            reason: '',
            technician: '',
            technicians: [],
        };

        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
       
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleVinChange(event){
        const value = event.target.value
        this.setState({vin: value})
    }
    handleNameChange(event){
        const value = event.target.value;
        this.setState({name: value})
    }
    handleDateChange(event){
        const value = event.target.value
        this.setState({date: value})
    }
    handleTimeChange(event){
        const value = event.target.value
        this.setState({time: value})
    }
    handleReasonChange(event){
        const value = event.target.value
        this.setState({reason: value})
    }
    
    handleTechnicianChange(event){
        const value = event.target.value
        this.setState({technician: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/'
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json()
            this.setState({technicians: data.technicians})
        }
    }

    async handleSubmit(event){
      event.preventDefault();
      const data = {...this.state}
      delete data.technicians
      const serviceURL = 'http://localhost:8080/api/services/'
      const fetchConfig = {
          method: 'post',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json',}
      };
      const response = await fetch(serviceURL, fetchConfig);
      if (response.ok){
          const newService = await response.json();
          console.log(newService);
          const cleared = {
          vin: '',
          name: '',
          date: '',
          time: '',
          reason: '',
          technician: '',
          }
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
                              <h1>New Service Form</h1>
                            </div>
                            <div className="mb-3">
                              <input
                                type="text"
                                name="vin"
                                placeholder="Vin"
                                onChange={this.handleVinChange}
                                value={this.state.vin}
                                className="form-control form-row mb-3"
                              />
                            </div>
                            <div className="mb-3">
                              <input
                                onChange={this.handleNameChange}
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={this.state.name}
                                className="form-control form-row mb-3"
                              />
                            </div>
                            <div className="mb-3">
                              <input
                                onChange={this.handleDateChange}
                                type="date"
                                name="date"
                                placeholder="Date"
                                value={this.state.date}
                                className="form-control form-row mb-3"
                              />
                            </div>
                            <div className="mb-3">
                              <input
                                onChange={this.handleTimeChange}
                                type="time"
                                name="time"
                                placeholder="Time"
                                value={this.state.time}
                                className="form-control form-row mb-3"
                              />
                            </div>
                            <div className="mb-3">
                              <input
                                onChange={this.handleReasonChange}
                                type="text"
                                name="reason"
                                placeholder="Reason"
                                value={this.state.reason}
                                className="form-control form-row mb-3"
                              />
                            </div>
                          
                            <div className="mb-3">
                                <select  onChange={this.handleTechnicianChange} value={this.state.technician} required name="technician" id="technician" className="form-select">
                                    <option>Choose a technician</option>
                                    {this.state.technicians.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.name}>
                                                {technician.name}
                                            </option>
                                        );
                                    })}
                                </select>
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
}


export default ServiceForm;
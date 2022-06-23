import React from 'react';

class ServiceHistory extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        vin: '',
        appointments: [],
    };

    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    // async componentDidMount(){
    //     const response = await fetch('https://localhost:8080/api/services/');
    //     if (response.ok) {
    //         const data = await response.json();
    //         this.setState({appointments: data.appointments});
    //     }
    // }

    handleVinChange(event) {
        const value = event.target.value
        this.setState({vin: value})
    }
    handleServiceChange(event) {
        const value = event.target.value
        this.setState({services: value})
    }
    async handleSubmit(event){
        event.preventDefault()
        const data = {...this.state}

        const servicesUrl = `https://localhost:8080/api/services/create/${data}/`
        const fetchConfig = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(servicesUrl, fetchConfig);
        if (response.ok){
            const response = await response.json()
        }

    }
    render() {
      const { appointments: appointments } = this.state;
    
      let appointmentsList = appointments.length > 0
        && appointments.map((vin) => {
        return (
          <option key={vin.id} value={vin.id}>{vin.name}</option>
        )
      }, this);
    
    return (
        <div>
        <div className="form-select">
          
        <div className="service-list">
          <h1>Service history</h1>
          <form onSubmit={this.handleSubmit} id="search-vin">
            <div className="form-outline">
              <select
                onChange={this.handleVinChange} value={this.state.vin} 
                className="table table-striped table-hover" id='vin' placeholder="Submit" />
            </div>
          </form>
          </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>VIN</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.appointments.filter(appointments => 
                appointments.vin.map(service => {
                return (
                  <tr key={ service.id }>
                    <td>{ service.vin }</td>
                    <td>{ service.name }</td>
                    <td>{ service.date}</td>
                    <td>{ service.time }</td>
                    <td>{ service.technician.name }</td>
                    <td>{ service.reason }</td>
                    <td>{ service.status.name }</td>
                    <td>{service.appointmentsList}</td>
                  </tr>
              );
          }))}
          </tbody>
        </table>
        </div>
      </div>

    )

    }
}

export default ServiceHistory;
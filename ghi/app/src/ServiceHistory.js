import React from 'react';

class ServiceHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: '',
      appointments: [],
    };
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault()
    const data = { ...this.state }
    delete data.appointments
    const servicesUrl = `http://localhost:8080/api/services/`
    const fetchConfig = {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(servicesUrl, fetchConfig);
    if (response.ok) {
      const newHistory = await response.json()
      this.state.appointments = newHistory.appointments
      console.log('this is our results', newHistory)
      const filtered = this.state.appointments.filter(obj => {
        return obj.vin === this.state.vin
      })
      console.log(filtered)
      const cleared = {

        appointment: '',
      }
      this.setState(cleared)
      console.log(data)
    }

  }

  handleVinChange(event) {
    const value = event.target.value
    this.setState({ vin: value })
  }


  render() {

    return (
      <div>
        <div className="service-list">
          <h1>Service history</h1>
          <form onSubmit={this.handleSubmit} id="search-vin" method='get' >
            <div className="form-outline">
              <input
                onChange={this.handleVinChange} value={this.state.vin} type='search'
                className="table table-striped table-hover" id='vin' placeholder="Vin Number" />
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
            {this.state.appointments.filter(service => service.vin === this.state.vin).map(service => {
              return (
                <tr key={service.id}>
                  <td>{service.vin}</td>
                  <td>{service.name}</td>
                  <td>{service.date}</td>
                  <td>{service.time}</td>
                  <td>{service.technician.name}</td>
                  <td>{service.reason}</td>
                  <td>{service.status.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ServiceHistory;
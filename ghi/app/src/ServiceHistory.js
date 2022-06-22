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

    async componentDidMount(){
        const response = await fetch('https://localhost:8080/api/services/');
        if (response.ok) {
            const data = await response.json();
            this.setState({services: data.services});
        }
    }

    handleVinChange(event) {
        const value = event.target.value
        this.setState({vin: value})
    }
    handleServiceChange(event) {
        const value = event.target.value
        this.setState({services: value})
    }
    handleSubmit(event){
        event.preventDefault()
        const data = {...this.state}


    }
}

export default ServiceHistory;
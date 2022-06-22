import React from 'react';

class ServiceHistory extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        vin: '',
        services: [],
    };

    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind()
    this.handleVinSearch = this.handleVinSearch.bind(this)
    }

    async componentDidMount(){
        const response = await fetch('https://localhost:8080/api/services/');
        if (response.ok) {
            const data = await response.json();
            this.setState({services: data.services});
        }
    }
}

export default ServiceHistory;
import React from 'react';

function ServiceList({ services }) {

    const deleteService = async (id) => {
        fetch(`http://localhost:8080/api/services/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => { window.location.reload(); });
    }
    const completeService = async (id) => {
        fetch(`http://localhost:8080/api/services/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => { window.location.reload(); });
    }

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>VIN number</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>VIP</th>
                    <th>Technician</th>
                    <th>Appointment Complete</th>
                    <th>Cancel Appointment</th></tr>
            </thead>
            <tbody>
                {console.log(services, 'data')}
                {services && services.map(services => {
                    return (
                    <tr key={services.id}>
                        <td>{services.vin}</td>
                        <td>{services.name}</td>
                        <td>{services.date}</td>
                        <td>{services.time}</td>
                        <td>{services.reason}</td>
                        <td>{services.vip}</td>
                        <td>{services.technician.name}</td>
                        <td><button onClick={() => completeService(services.id)} type='button' className='btn btn-outline-dark'>Complete</button></td>
                        <td><button onClick={() => deleteService(services.id)} type='button' className='btn btn-outline-dark'>Cancel</button></td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )

}
export default ServiceList;
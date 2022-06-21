import React from 'react';

function ServiceList({services}){
    const deleteService = async (id) => {
        fetch(`http://localhost:8080/api/services/${id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'
        }
        }).then(() => {window.location.reload();});
    }

    return (

       <table className="table table-striped">
      <thead>
        <tr>
          <th>VIN number</th>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Reason</th>
          <th>VIP?</th>
          <th>Technician</th>
          <th>Appointment Complete</th>
          <th>Cancel Appointment</th>
        </tr>
      </thead>
      <tbody>
        {services.map(services => {
          return (
            <tr key={services.href}>
              <td>{services.vin}</td>
              <td>{services.name}</td>
              <td>{services.date}</td>
              <td>{services.time}</td>
              <td>{services.reason}</td>
              <td>{services.vip}</td>
              <td>{services.technician.name}</td>
              <table className="table table-striped">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Shoe Name</th>
          <th>Shoe Color</th>
          <th>Shoe Photo</th>
          <th>Bin Name</th>
          <th>Delete Shoe</th>
        </tr>
      </thead>
      <tbody>
        {shoes.shoes.map(shoes => {
          return (
            <tr key={shoes.href}>
              <td>{shoes.model_name}</td>
              <td>{shoes.color}</td>
              <td>{shoes.manufacturer}</td>
              <td><img src={ shoes.picture_url } height={100} width={100} ></img></td>
              <td>{shoes.bin.closet_name}</td>
              <td><button onClick={() => deleteShoe(shoes.id)} type='button' className='btn btn-outline-dark'>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>

  );
}

export default ShoeList;
              <td><button onClick={() => deleteService(services.id)} type='button' className='btn btn-outline-dark'>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>

  );
}

export default ServiceList;
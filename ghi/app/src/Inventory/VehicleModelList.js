import React from 'react'

export default function VehicleModelList({vehichleModels}) {
  return (
    <React.Fragment>
    <h1>All Vehicle Models</h1>
      <div className="container-fluid">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              
              <th >Name</th>
              <th >manufacturer</th>
              <th className="d-flex justify-content-md-center">Picture</th>
              
            </tr>
          </thead>
          <tbody>
            {vehichleModels && vehichleModels.map(model => {
              return (
                <tr key={model.id}>
                  <td>{ model.name}</td>
                  <td>{ model.manufacturer.name}</td>
                  <td className="d-flex justify-content-md-center"><img height="75" width="250"className="img-fluid img-thumbnail" src={model.picture_url}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

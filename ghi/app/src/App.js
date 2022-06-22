import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import SalesRepForm from './SalesRepForm';
import SaleRecordForm from './SaleRecordForm';
import SalesList from './SalesList';
import SalesByReps from './SalesByReps';
import ListManufacturers from './ListManufacturers';
import VehicleModelList from './VehicleModelList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelForm from './VehicleModelForm';
import AutomobileInventory from './AutomobileInventory';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';
import TechnicianForm from './TechnicianForm';
function App({customers, cars, salesReps, salesList, manufacturers, vehichleModels, services, technician,}) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="customer">
            <Route path="new" element={<CustomerForm />}/>
          </Route>
          <Route path="employee">
            <Route path="new" element={<SalesRepForm/>}/>
          </Route>

          <Route path="sales">
            <Route path="" element={<SalesList salesList={salesList}/>}/>
            <Route path="by-rep" element={<SalesByReps salesReps={salesReps}/>}/>
            <Route path="create" element={<SaleRecordForm
              customers={customers}
              cars={cars}
              salesReps={salesReps}
            />}/>
            
          </Route>
          <Route path="manufacturers">
            <Route path="" element={<ListManufacturers manufacturers={manufacturers}/>}/>
            <Route path="new" element={<ManufacturerForm/>}/>
          </Route>
          
          <Route path="vehicle-models">
            <Route path="" element={<VehicleModelList vehichleModels={vehichleModels}/>}/>
            <Route path="new" element={<VehicleModelForm manufacturers={manufacturers}/>}/>
          </Route>
          <Route path="automobile">
            <Route path="inventory" element={<AutomobileInventory inventory={cars}/>}/>
            <Route path="add-to-inventory"/>

          </Route>
          <Route path="services">
            <Route path="" element={<ServiceList services={services}/>}/>
            <Route path="new" element={<ServiceForm/>}/>
              
          </Route>
          <Route path="technicians">
            <Route path="" element={<TechnicianForm services={technician}/>}/>

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

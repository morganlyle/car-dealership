import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './Sale/CustomerForm';
import SalesRepForm from './Sale/SalesRepForm';
import SaleRecordForm from './Sale/SaleRecordForm';
import SalesList from './Sale/SalesList';
import SalesByReps from './Sale/SalesByReps';
import ListManufacturers from './Inventory/ListManufacturers';
import VehicleModelList from './Inventory/VehicleModelList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import VehicleModelForm from './Inventory/VehicleModelForm';
import AutomobileInventory from './Inventory/AutomobileInventory';
import ServiceList from './Service/ServiceList';
import ServiceForm from './Service/ServiceForm';
import TechnicianForm from './Service/TechnicianForm';
import ServiceHistory from './Service/ServiceHistory';
import InventoryForm from './Inventory/InventoryForm';
function App({customers, cars, salesReps, salesList, manufacturers, vehichleModels, services, technician,serviceHistory, inventory}) {
  console.log(inventory)
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
            <Route path="add-to-inventory" element={<InventoryForm inventoryTwo={vehichleModels}/> } />

          </Route>
          <Route path="services">
            <Route path="" element={<ServiceList services={services}/>}/>
            <Route path="new" element={<ServiceForm/>}/>
            <Route path='history' element={<ServiceHistory history={serviceHistory}/>}/>
              
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

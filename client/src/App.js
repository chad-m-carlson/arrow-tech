import React from 'react';
import Customers from './components/Customers';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './components/Home';
import CalibrationForm from './components/calibration/CalibrationForm';
import CalibrationReports from './components/calibration/CalibrationReports';
import NoMatch from './components/NoMatch';
import BatchReport from './components/BatchReport';
import CertificateOfCalibration from './components/Pdf_rendering/CertificateOfCalibration';
import CustomerDataForm from './components/calibration/CustomerDataForm';
import DosimeterTemplateForm from './components/DosimeterTemplateForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Switch, Route, } from 'react-router-dom';
// import {Container, } from 'semantic-ui-react';
import { ApolloProvider } from '@apollo/react-hooks';

// import Home from './components/User/Home';
// import NoMatch from './components/NoMatch';


function App() {
  return (
    <>
    <ApolloProvider>
    <NavBar />
    <ToastContainer />
    <div style={{margin: "4rem"}}>
      <FetchUser>
          <Switch>
            {/* <ProtectedRoute exact path='/' component={Home} /> */}
            {/* <AdminRoute exact path='/admin' component={AdminTools} /> */}
            <Route exact path='/' component={Home} />
            <ProtectedRoute exact path='/customers' component={Customers} />
            <ProtectedRoute exact path='/customerform' component={CustomerDataForm} />
            <ProtectedRoute exact path='/calform' component={CalibrationForm} />
            <ProtectedRoute exact path='/calreports' component={CalibrationReports} />
            <ProtectedRoute exact path='/batchreport' component={BatchReport} />
            <ProtectedRoute exact path='/dosimetertemplate' component={DosimeterTemplateForm} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route component={NoMatch} />
          </Switch>
      </FetchUser>
    </div>
    </ApolloProvider>
  </>
  );
}

export default App;

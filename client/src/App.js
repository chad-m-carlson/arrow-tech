import React from "react";
import Customers from "./components/customers/Customers";
import NavBar from "./components/NavBar";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import FetchUser from "./components/authentication/FetchUser";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
// import AdminRoute from './components/AdminRoute';
import Home from "./components/Home";
import CalibrationForm from "./components/calibration/CalibrationForm";
import CalibrationReports from "./components/reports/CalibrationReports";
import NoMatch from "./components/NoMatch";
import BatchReport from "./components/reports/BatchReport";
import CustomerDataForm from "./components/calibration/CustomerDataForm";
import ManageDosimeters from "./components/dosimeters/ManageDosimeters";
import CalibratorManagement from "./components/calibrator/CalibratorManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router-dom";
// import {Container, } from 'semantic-ui-react';
import { ApolloProvider } from "@apollo/react-hooks";

// import Home from './components/User/Home';
// import NoMatch from './components/NoMatch';

function App() {
  return (
    <>
      <ApolloProvider>
        <NavBar />
        <ToastContainer style={{ marginTop: "2.3rem" }} />
        <div id="page-container" style={{ margin: "4rem" }}>
          <FetchUser>
            <Switch>
              {/* <ProtectedRoute exact path='/' component={Home} /> */}
              {/* <AdminRoute exact path='/admin' component={AdminTools} /> */}
              <Route exact path="/" component={Home} />
              <ProtectedRoute exact path="/customers" component={Customers} />
              <ProtectedRoute
                exact
                path="/customerform"
                component={CustomerDataForm}
              />
              <ProtectedRoute
                exact
                path="/calform"
                component={CalibrationForm}
              />
              <ProtectedRoute
                exact
                path="/calreports"
                component={CalibrationReports}
              />
              <ProtectedRoute
                exact
                path="/batchreport"
                component={BatchReport}
              />
              <ProtectedRoute
                exact
                path="/dosimetermanagement"
                component={ManageDosimeters}
              />
              <ProtectedRoute
                exact
                path="/calibratormanagement"
                component={CalibratorManagement}
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route component={NoMatch} />
            </Switch>
          </FetchUser>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;

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
import {Switch, Route, } from 'react-router-dom';
import {Container, } from 'semantic-ui-react';
import { ApolloProvider } from '@apollo/react-hooks';

// import Home from './components/User/Home';
// import NoMatch from './components/NoMatch';


function App() {
  return (
    <>
    <ApolloProvider>
    <NavBar />
    <Container>
      <FetchUser>
        <div style={{marginTop: "4rem"}}>
          <Switch>
            {/* <ProtectedRoute exact path='/' component={Home} /> */}
            {/* <AdminRoute exact path='/admin' component={AdminTools} /> */}
            <Route exact path='/' component={Home} />
            <ProtectedRoute exact path='/customers' component={Customers} />
            <ProtectedRoute exact path='/calform' component={CalibrationForm} />
            <ProtectedRoute exact path='/calreports' component={CalibrationReports} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </FetchUser>
    </Container>
    </ApolloProvider>
  </>
  );
}

export default App;

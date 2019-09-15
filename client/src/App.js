import React from 'react';
import Customers from './components/Customers';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import {Switch, Route, } from 'react-router-dom';
import {Container, } from 'semantic-ui-react';

// import Home from './components/User/Home';
// import NoMatch from './components/NoMatch';


function App() {
  return (
    <>
    <NavBar />
    <Container>
      <FetchUser>
        <div style={{marginTop: "4rem"}}>
          <Switch>
            {/* <ProtectedRoute exact path='/' component={Home} /> */}
            {/* <AdminRoute exact path='/admin' component={AdminTools} /> */}
            <Route exact path='/' component={Home} />
            <Route exact path='/customers' component={Customers} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </FetchUser>
    </Container>
  </>
  );
}

export default App;

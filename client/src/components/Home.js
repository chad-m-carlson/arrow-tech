import React, {useState} from 'react';
import Customers from './Customers';
import {NavLink, } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const [showCustomers, setShowCustomers] = useState(false)
  return ( 
    <Container>
      <div style={{width: "10rem"}}>
        <NavLink to='/customers'>
          <Card>
            <h3 >View All Customers</h3>
          </Card>
        </NavLink>
      </div>
      <div style={{width: "10rem"}}>
        <NavLink to='/calform'>
          <Card>
            <h3 >Calibration Form</h3>
          </Card>
        </NavLink>
      </div>
      <div style={{width: "10rem"}}>
        <NavLink to='/calreports'>
          <Card>
            <h3 >Calibration Reports</h3>
          </Card>
        </NavLink>
      </div>
      <div style={{width: "10rem"}}>
        <NavLink to='/nothing'>
          <Card>
            <h3 >Other Stuff</h3>
          </Card>
        </NavLink>
      </div>
    </Container>
   );
}

const Container = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10rem;
`;

const Card = styled.div `
  display: flex;
  text-align: center;
  align-items: center;
  width: 10rem;
  height: 10rem;
  border: 1px solid #b9babd;
  border-radius: 3px;
  text-decoration: none;
  color: black;
  font-size: 2rem;
  box-shadow: 6px 6px 10px 1px rgba(235,235,235,0.77);
  transition: all .2s;

  &:hover{
    /* text-decoration: none; */
    /* color: black; */
  transform: translateY(-1px);
    box-shadow: 6px 6px 10px 1px rgba(235,235,235,1);
  }
    
`;
 
export default Home;
import React, {useState} from 'react';
import {NavLink,Link } from 'react-router-dom';
import {Popup, Grid, Header, Button, Input} from 'semantic-ui-react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import {LAST_BATCH, } from './graphql/queries';

const Home = () => {
  const [otherBatchNumber, setOtherBatchNumber] =useState('');

  return ( 
    <>
    <Container>
      <>
      <div style={{ opacity: "0.1"}}>
        <NavLink to='/customers' style={{cursor: "not-allowed"}}>
          <Card>
            <h3>All Customers</h3>
          </Card>
        </NavLink>
      </div>
        <Query query={LAST_BATCH}>
        {({ loading, error, data }) => {
            if (loading) return <div>Fetching..</div>
            if (error) return <div>Error!</div>
            if (data)
            return(
              <div style={{}}>
              <NavLink to='/calform'>
                <Card>
                  <h3>Calibration Form</h3>
                </Card>
              </NavLink>
              </div>
              // <Popup trigger={ 
              //   <div style={{}}>
              //     {/* <NavLink to='/calform'> */}
              //       <Card>
              //         <h3 >Calibration Form</h3>
              //       </Card>
              //     {/* </NavLink> */}
              //   </div>} flowing hoverable>
              //   <Grid centered divided columns={3}>
              //     <Grid.Column textAlign='center'>
              //       <Header as='h4'>New Batch</Header>
              //       <p>Start a new batch with new customer</p>
              //       <NavLink to='/calform'>
              //         <Button>Choose</Button>
              //       </NavLink>
              //     </Grid.Column>
              //     <Grid.Column textAlign='center'>
              //       <Header as='h4'>Last Batch</Header>
              //       <p>Continue working on the last batch</p>
              //       <p><i>Batch {data.lastBatch}</i></p>
              //       <Link to={{pathname: '/calform', state: {lastBatch: data.lastBatch}}}>
              //         <Button>Choose</Button>
              //       </Link>
              //     </Grid.Column>
              //     <Grid.Column textAlign='center'>
              //       <Header as='h4'>Other Batch</Header>
              //         <p>Enter a different batch number</p>
              //         <Input 
              //           value={otherBatchNumber}
              //           onChange={(e) => setOtherBatchNumber(parseInt(e.target.value))}
              //         />
              //         <Link to={{pathname: '/calform', state: {lastBatch: otherBatchNumber}}}>
              //           <Button>Choose</Button>
              //         </Link>
              //     </Grid.Column>
              //   </Grid>
              // </Popup>
              )}}
        </Query>
      <div style={{ opacity: "0.1"}}>
        <NavLink to='/calreports' style={{cursor: "not-allowed"}}>
          <Card>
            <h3>Calibration Reports</h3>
          </Card>
        </NavLink>
      </div>
      </>
      <div style={{}}>
        <NavLink to='/batchreport'>
          <Card>
            <h3>Batch Reports</h3>
          </Card>
        </NavLink>
      </div>
      </Container>
      <Container>
      <div style={{}}>
        <NavLink to='/customerform'>
          <Card>
            <h3>New Customer</h3>
          </Card>
        </NavLink>
      </div>
      <div style={{}}>
        <NavLink to='/dosimetertemplate'>
          <Card>
            <h3>New Dosimeter Model</h3>
          </Card>
        </NavLink>
      </div>
      <div style={{ opacity: "0.1"}}>
        <NavLink to='/' style={{cursor: "not-allowed"}}>
          <Card>
            <h3>Other stuff</h3>
          </Card>
        </NavLink>
      </div>
      <div style={{ opacity: "0.1"}}>
        <NavLink to='/' style={{cursor: "not-allowed"}}>
          <Card>
            <h3>Other Stuff</h3>
          </Card>
        </NavLink>
      </div>
    </Container>
    </>
   );
}

const Container = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7rem;
`;

const Card = styled.div `
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 15rem;
  height: 15rem;
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
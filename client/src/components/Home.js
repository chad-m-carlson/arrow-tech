import React, {useState} from 'react';
import {NavLink,Link } from 'react-router-dom';
import {Popup, Grid, Header, Button, Input} from 'semantic-ui-react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'

const LAST_BATCH = gql`
query{
  lastBatch
}
`;

const Home = () => {
  const [otherBatchNumber, setOtherBatchNumber] =useState('');

  return ( 
    <Container>
      <div style={{width: "10rem"}}>
        <NavLink to='/customers'>
          <Card>
            <h3 >View All Customers</h3>
          </Card>
        </NavLink>
      </div>
        <Query query={LAST_BATCH}>
        {({ loading, error, data }) => {
            if (loading) return <div>Fetching..</div>
            if (error) return <div>Error!</div>
            if (data)
            return(
              <Popup trigger={ 
                <div style={{width: "10rem"}}>
                  {/* <NavLink to='/calform'> */}
                    <Card>
                      <h3 >Calibration Form</h3>
                    </Card>
                  {/* </NavLink> */}
                </div>} flowing hoverable>
                <Grid centered divided columns={3}>
                  <Grid.Column textAlign='center'>
                    <Header as='h4'>New Batch</Header>
                    <p>Start a new batch with new customer</p>
                    <NavLink to='/calform'>
                      <Button>Choose</Button>
                    </NavLink>
                  </Grid.Column>
                  <Grid.Column textAlign='center'>
                    <Header as='h4'>Last Batch</Header>
                    <p>Continue working on the last batch</p>
                    <p><i>Batch {data.lastBatch}</i></p>
                    <Link to={{pathname: '/calform', state: {lastBatch: data.lastBatch}}}>
                      <Button>Choose</Button>
                    </Link>
                  </Grid.Column>
                  <Grid.Column textAlign='center'>
                    <Header as='h4'>Other Batch</Header>
                      <p>Enter a different batch number</p>
                      <Input 
                        value={otherBatchNumber}
                        onChange={(e) => setOtherBatchNumber(parseInt(e.target.value))}
                      />
                      <Link to={{pathname: '/calform', state: {lastBatch: otherBatchNumber}}}>
                        <Button>Choose</Button>
                      </Link>
                  </Grid.Column>
                </Grid>
              </Popup>)}}
        </Query>
      <div style={{width: "10rem"}}>
        <NavLink to='/calreports'>
          <Card>
            <h3 >Calibration Reports</h3>
          </Card>
        </NavLink>
      </div>
      <div style={{width: "10rem"}}>
        <NavLink to='/batchreport'>
          <Card>
            <h3 >Batch Reports</h3>
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
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CUSTOMER_QUERY = gql`
query Customer($id: ID!){
  customer(id: $id){
    id
    name
    city
  }
}
`;

const Customer = ({id}) => {
  return ( 
    <>
    <h1>Customer</h1>
    <Query query={CUSTOMER_QUERY} variables={{ id: id}}>
      {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <div>
              <>
                <h1>Customer Name: {data.customer.name}</h1>
                <h1>Customer City: {data.customer.city}</h1>
              </>
            </div>
          )
        }}
    </Query>
    </>
   );
}
 
export default Customer;
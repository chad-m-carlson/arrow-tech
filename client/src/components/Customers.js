import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CUSTOMERS_QUERY = gql`
query{
  customers{
    name
    streetAddress1
    city
    state
    zip
    country
    dosimeters{
      modelNumber
    }
  }
}
`;


const Customers = () => {
  return ( 
    <Query query={CUSTOMERS_QUERY}>
      {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <div>
              {data.customers.map( c => (
                <>
                <h1>{c.name}</h1>
                {c.dosimeters.map( d => 
                <p>{d.modelNumber}</p>
                  )}
                </>
              ))}
            </div>
          )
        }}
    </Query>
   );
}
 
export default Customers;
import React, {useState} from 'react';
import Customer from './Customer';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CUSTOMERS_QUERY = gql`
query{
  customers{
    id
    name
  }
}
`;


const Customers = () => {
  const [showCustomer, setShowCustomer] = useState(false);

  return ( 
    <Query query={CUSTOMERS_QUERY}>
      {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <div>
              {data.customers.map( c => (
                <>
                <h1 onClick={() => setShowCustomer(!showCustomer)}>{c.name}</h1>
                {showCustomer && 
                  <Customer
                    id={c.id}
                  />
                }
                </>
              ))}
            </div>
          )
        }}
    </Query>
   );
}
 
export default Customers;
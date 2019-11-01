import React from 'react';
import DosimeterTemplateForm from './DosimeterTemplateForm';
import DosimeterIndex from './DosimeterIndex';
import { Query } from 'react-apollo';
import {GET_UNIQUE_DOSIMETER_MODELS} from '../graphql/queries';

const ManageDosimeters = () => {
  return ( 
    <div style={{display: "flex", flexDirection: "row"}}>
    <Query query={GET_UNIQUE_DOSIMETER_MODELS} fetchPolicy='no-cache'>
          {({loading, error, data, refetch}) => {
            if (loading) return <div>Fetching..</div>
            if (error) return <div>Error fetching data!</div>
            if (data.dosimeterTemplates) return(
              <>
              <DosimeterTemplateForm 
                refetch={refetch}
              />
              <DosimeterIndex 
                dosimeters={data.dosimeterTemplates}
                refetch={refetch}
              />
              </>
            )
          }}
        </Query>
    </div>
    );
}
 
export default ManageDosimeters;
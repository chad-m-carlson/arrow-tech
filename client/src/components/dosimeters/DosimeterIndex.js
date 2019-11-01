import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {determineCalculatedDosimeterRange} from '../HelperFunctions';
import {DELETE_DOSIMETER_TEMPLATE} from '../graphql/mutations';
import {toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DosimeterIndex = ({dosimeters, refetch}) => {

  const [deleteDosimeterTemplate] = useMutation(DELETE_DOSIMETER_TEMPLATE,{
    onCompleted(data){
      refetch()
      toastMessage(`${data.deleteDosimeterTemplate.dosimeterTemplate.modelNumber} deleted`, 'info')
    }
  });

  const toastMessage = (message, type) => {
    toast(message,{
      type: type,
      autoClose: 4000,
    })
  }

  return ( 
    <div style={{border: ".5px solid grey", padding: "5px", margin: "5px"}}>
      <h2>Dosimeter List</h2>
      <>
        {dosimeters.map( d => 
          <div key={d.id}>
            <p>
              {d.modelNumber} - Range: {determineCalculatedDosimeterRange(d.range, d.isR, d.isMr, d.isSv, d.isMsv)}
            </p>
            <h6 
              onClick={() => deleteDosimeterTemplate({variables: {id: parseInt(d.id)}})}
              style={{cursor: "pointer", color: "blue", marginTop: "-20px"}}
            >
              delete
            </h6>
          </div>
        )}
      </>
    </div>
   );
}
 
export default DosimeterIndex;
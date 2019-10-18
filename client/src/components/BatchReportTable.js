import React from 'react';
import {Table, Icon, } from 'semantic-ui-react';
import {Link } from 'react-router-dom';

const BatchReportTable = ({calData, handleDelete}) => {


  return ( 
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Dosimeter Model Number</Table.HeaderCell>
          <Table.HeaderCell>Dosimeter Serial Number</Table.HeaderCell>
          <Table.HeaderCell>Date Received</Table.HeaderCell>
          <Table.HeaderCell>Calibration Tech</Table.HeaderCell>
          <Table.HeaderCell>VAC Pass</Table.HeaderCell>
          <Table.HeaderCell>VIP Pass</Table.HeaderCell>
          <Table.HeaderCell>ACC Pass</Table.HeaderCell>
          <Table.HeaderCell>EL Pass</Table.HeaderCell>
          <Table.HeaderCell>Final Pass</Table.HeaderCell>
          <Table.HeaderCell>Certificate Number</Table.HeaderCell>
          <Table.HeaderCell>Edit Record</Table.HeaderCell>
          <Table.HeaderCell>Delete Record</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {calData.map( c => {
          const {modelNumber, serialNumber} = c.dosimeter
          const {firstName, lastName} = c.user
          return(
          <Table.Row key={c.id} negative={c.finalPass ? false : true}>
          <Table.Cell>{modelNumber}</Table.Cell>
          <Table.Cell>{serialNumber}</Table.Cell>
          <Table.Cell>{c.dateReceived}</Table.Cell>
          <Table.Cell>{firstName} {lastName}</Table.Cell>
          <Table.Cell>
            <Icon name={c.vacPass ? 'checkmark' : 'close'} color={c.vacPass ? 'green' : 'red'}/>
          </Table.Cell>
          <Table.Cell>
            <Icon name={c.vipPass ? 'checkmark' : 'close'} color={c.vipPass ? 'green' : 'red'}/>
          </Table.Cell>
          <Table.Cell>
          <Icon name={c.accPass ? 'checkmark' : 'close'} color={c.accPass ? 'green' : 'red'}/>
          </Table.Cell>
          <Table.Cell>
            <Icon name={c.elPass ? 'checkmark' : 'close'} color={c.elPass ? 'green' : 'red'}/>
          </Table.Cell>
          <Table.Cell>
            <Icon name={c.finalPass ? 'checkmark' : 'close'} color={c.finalPass ? 'green' : 'red'}/>
          </Table.Cell>
          <Table.Cell>{c.certificateNumber}</Table.Cell>
          <Table.Cell>
            <Link 
              to={{pathname: '/calform', state: {batch: c.batch, calibrationId: c.id, customerId: c.dosimeter.customer.id}}}
            >
              <Icon 
                name='edit' 
                color='green' 
              />
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Icon 
              name='delete' 
              color='red' 
              onClick={() => handleDelete(c.id)} 
              style={{cursor: "pointer"}}
            />
          </Table.Cell>
        </Table.Row>
        )})}
      </Table.Body>
    </Table>
   );
}
 
export default BatchReportTable;
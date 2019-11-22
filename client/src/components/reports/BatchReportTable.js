import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const BatchReportTable = ({ calData, handleDelete }) => {
  const renderPassFail = (tested, value) => {
    if (tested && value) {
      return <Icon name="checkmark" color="green" />;
    } else if (tested && !value) {
      return <Icon name="close" color="red" />;
    } else {
      return <Icon name="circle outline" color="blue" />;
    }
  };

  return (
    <Table celled>
      <Table.Header>
        <Table.Row style={{ textAlign: "center" }}>
          <Table.HeaderCell>Dosimeter Model Number</Table.HeaderCell>
          <Table.HeaderCell>Dosimeter Serial Number</Table.HeaderCell>
          <Table.HeaderCell>VAC Required</Table.HeaderCell>
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
        {calData.map(c => {
          const { modelNumber, serialNumber } = c.dosimeter;
          return (
            <Table.Row
              key={c.id}
              negative={c.finalPass ? false : true}
              style={{ textAlign: "center" }}
            >
              <Table.Cell>{modelNumber}</Table.Cell>
              <Table.Cell>{serialNumber}</Table.Cell>
              <Table.Cell>
                <Icon
                  name={c.vacRequired ? "checkmark" : "close"}
                  color={c.vacRequired ? "green" : "red"}
                />
              </Table.Cell>
              <Table.Cell>
                {!c.vacRequired
                  ? "N/A"
                  : renderPassFail(c.vacTestPerformed, c.vacPass)}
              </Table.Cell>
              <Table.Cell>
                {renderPassFail(c.vipTestPerformed, c.vipPass)}
              </Table.Cell>
              <Table.Cell>
                {renderPassFail(c.accTestPerformed, c.accPass)}
              </Table.Cell>
              <Table.Cell>
                {renderPassFail(c.elTestPerformed, c.elPass)}
              </Table.Cell>
              <Table.Cell>
                <Icon
                  name={c.finalPass ? "checkmark" : "close"}
                  color={c.finalPass ? "green" : "red"}
                />
              </Table.Cell>
              <Table.Cell>{c.certificateNumber}</Table.Cell>
              <Table.Cell>
                <Link
                  to={{
                    pathname: "/calform",
                    state: {
                      batch: c.batch,
                      calibrationId: c.id,
                      customerId: c.dosimeter.customer.id
                    }
                  }}
                >
                  <Icon name="edit" color="green" />
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Icon
                  name="delete"
                  color="red"
                  onClick={() => handleDelete(c.id)}
                  style={{ cursor: "pointer" }}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default BatchReportTable;

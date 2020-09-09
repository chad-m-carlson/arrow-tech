import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    <Table
      celled
      style={{
        position: "relative"
      }}
    >
      <Table.Header>
        <Table.Row style={{ textAlign: "center" }}>
          <StickyHeader>Dosimeter Model Number</StickyHeader>
          <StickyHeader>Dosimeter Serial Number</StickyHeader>
          <StickyHeader>VAC Required</StickyHeader>
          <StickyHeader>VAC Pass</StickyHeader>
          <StickyHeader>VIP Pass</StickyHeader>
          <StickyHeader>ACC Pass</StickyHeader>
          <StickyHeader>EL Pass</StickyHeader>
          <StickyHeader>Final Pass</StickyHeader>
          <StickyHeader>Certificate Number</StickyHeader>
          <StickyHeader>Edit Record</StickyHeader>
          <StickyHeader>Delete Record</StickyHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {calData.map((c, index) => {
          const { modelNumber, serialNumber } = c.dosimeter;
          return (
            <Table.Row
              id={c.id}
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
                      customerId: c.dosimeter.customer.id,
                      calData: calData
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

const StickyHeader = styled.th`
  position: sticky;
  top: 0px;
  background: #f9fafb;
  text-align: inherit;
  color: rgba(0, 0, 0, 0.87);
  padding: 0.92857143em 0.78571429em;
  vertical-align: inherit;
  font-style: none;
  font-weight: 700;
  text-transform: none;
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  border-left: none;
`;

export default BatchReportTable;

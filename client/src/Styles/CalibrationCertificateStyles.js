import styled from "styled-components";

export const TableData = styled.td`
  border: 0.1px solid black;
  color: ${(props) => (props.failed ? "red" : "black")};
  font-weight: ${(props) => (props.failed ? "900" : "300")};
  text-transform: ${(props) => (props.failed ? "uppercase" : "none")};
`;

export const TableHeader = styled.th`
  width: 60px;
  border: 0.1px solid black;
  line-height: 10px;
`;

export const BaseCalDetails = styled.span`
  padding-left: 15px;
  text-decoration: underline;
  font-weight: 700;
`;

export const Header = styled.div`
  display: none;
  height: 155px;
`;

export const PageHeader = styled.div`
  height: 155px;
  position: fixed;
  top: 0mm;
  width: 100%;
  border-bottom: 1px solid black;
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0mm;
  width: 100%;
  border-top: 1px solid black;
`;

export const PageFooter = styled.div`
  display: none;
  height: 50px;
`;

export const Page = styled.div`
  page-break-after: always;
`;

export const CertTitle = styled.h1`
  text-align: center;
  font-weight: 900;
  margin-top: 0px;
`;

export const CertTitleNumber = styled.span`
  position: absolute;
  font-size: 8pt;
  font-weight: 100;
  top: 0in;
  left: 6.25in;
  margin-right: 50px;
  width: 100px;
`;

import styled from 'styled-components';

export const TableData = styled.td `
  border: .1px solid black;
  color: ${props => props.failed ? "red" : "black"};
  font-weight: ${props => props.failed ? "900" : "300"};
  text-transform: ${props => props.failed ? "uppercase" : "none"}
`;

export const TableHeader = styled.th `
  width: 60px;
  border: .1px solid black;
  line-height: 10px;
`;

export const BaseCalDetails = styled.span `
  padding-left: 15px;
  text-decoration: underline;
  font-weight: 700;
`;

export const Header = styled.div `
  display: none;
  height: 100px;
`;

export const PageHeader = styled.div `
  height: 100px;
  position: fixed;
  top: 0mm;
  width: 90%;
  border-bottom: 1px solid black;
`;

export const Footer = styled.div `
  position: fixed;
  bottom: 0mm;
  width: 100%;
  border-top: 1px solid black;
`;

export const PageFooter = styled.div `
  display: none;
  height: 50px;
`;

export const Page = styled.div `
  page-break-after: always;
`;
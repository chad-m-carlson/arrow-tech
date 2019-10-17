import React from 'react';
import Doc from './DocService';
import PdfContainer from './PdfContainer';
import {determineCalculatedDosimeterRange, convertValueReadToMr, } from '../HelperFunctions';
import {Icon} from 'semantic-ui-react';
import styled from 'styled-components';

const CertificateOfCalibration = ({calData}) => {
  const createPdf = (html) => Doc.createPdf(html);

  return ( 
    <PdfContainer createPdf={createPdf}>
      <table style={{maxWidth: "7in", fontSize: "8px", borderCollapse: "collapse"}}>
      <thead>
        <tr textAlign='center'>
          <TableHeader><span>Serial</span><br /><span> Number</span></TableHeader>
          <TableHeader><span>Exposed</span><br /><span>to:</span></TableHeader>
          <TableHeader>As Found Reading</TableHeader>
          <TableHeader><span>Visual</span><br /><span>Pass/Fail</span></TableHeader>
          <TableHeader><span>Mid-Scale</span><br /><span>Accuracy</span></TableHeader>
          <TableHeader>ACC Pass</TableHeader>
          <TableHeader>Electrical Leakage</TableHeader>
          <TableHeader><span>Hermetic</span><br /><span>Sealed</span></TableHeader>
          <TableHeader><span>Final</span><br /><span>Pass/Fail</span></TableHeader>
        </tr>
      </thead>
    
        {calData.map( c => {
          const {modelNumber, serialNumber, range, isR, isMr, isMsv, isSv} = c.dosimeter
          const {firstName, lastName} = c.user
          return(
          <tr key={c.id} style={{textAlign: "center"}}>
          <TableData>{serialNumber}</TableData>
          <TableData>{range / 2} mR</TableData>
          <TableData>{convertValueReadToMr(c.accRead, isR, isMr, isSv, isMsv)} mR </TableData>
          <TableData>
            <Icon name={c.vipPass ? 'checkmark' : 'close'} color={c.vipPass ? 'green' : 'red'}/>
          </TableData>
          <TableData>{(convertValueReadToMr(c.accRead, isR, isMr, isSv, isMsv) / range).toFixed(2) }% </TableData>
          <TableData>
          <Icon name={c.accPass ? 'checkmark' : 'close'} color={c.accPass ? 'green' : 'red'}/>
          </TableData>
          <TableData>
            <Icon name={c.elPass ? 'checkmark' : 'close'} color={c.elPass ? 'green' : 'red'}/>
          </TableData>
          <TableData>
            <Icon name={c.vacPass ? 'checkmark' : 'close'} color={c.vacPass ? 'green' : 'red'}/>
          </TableData>
          <TableData>
            <Icon name={c.finalPass ? 'checkmark' : 'close'} color={c.finalPass ? 'green' : 'red'}/>
          </TableData>
        </tr>
        )})}
      
    </table>
    </PdfContainer>
   );
}

const TableData = styled.td `
  border: .1px solid black;
`;

const TableHeader = styled.th `
  width: 60px;
  border: .1px solid black;
  line-height: 10px;
`;
 
export default CertificateOfCalibration;
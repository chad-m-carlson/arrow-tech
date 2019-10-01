import gql from 'graphql-tag';

export const GET_UNIQUE_DOSIMETER_MODELS = gql`
query{
  uniqueDosimeterModels {
    id
    modelNumber
    range
    isR
    isMr
  }
}
`;

export const GET_ALL_CUSTOMERS_QUERY = gql`
query($batch:Int){
  customers{
    id
    name
    streetAddress1
    streetAddress2
    city
    state
    zip
    country
  }
  lastBatch
  customerByBatch(batch:$batch){
    id
  }
}
`;

export const LAST_BATCH = gql`
query{
  lastBatch
}
`;


export const CALIBRATION_BY_BATCH = gql`
query($batch:Int!, $id:ID){
    lastCalibrationByBatch(batch:$batch){
      id
      userId
      dosimeterId
      tolerance
      dateReceived
      elDateIn
      elDateOut
      accDate
      finalDate
      dueDate
      elPass
      vipPass
      vacPass
      finalPass
      elRead
      accRead
      accPass
      vipProblems
      certificateNumber
    }
    dosimeterByBatch(batch:$batch){
      modelNumber
      serialNumber
    }
  	previousCalibration(batch:$batch, id:$id){
    	id
      userId
      dosimeterId
      tolerance
      dateReceived
      elDateIn
      elDateOut
      accDate
      finalDate
      dueDate
      elPass
      vipPass
      vacPass
      finalPass
      elRead
      accRead
      accPass
      vipProblems
      certificateNumber
  }
  	nextCalibration(batch:$batch, id:$id){
    	id
      userId
      dosimeterId
      tolerance
      dateReceived
      elDateIn
      elDateOut
      accDate
      finalDate
      dueDate
      elPass
      vipPass
      vacPass
      finalPass
      elRead
      accRead
      accPass
      vipProblems
      certificateNumber
    }
  }
`;

export const GET_PREVIOUS_CALIBRATION = gql `
  query($batch:Int!, $id:ID!){
	getPreviousCalibration(batch:$batch, id:$id){
    id
      userId
      dosimeterId
      tolerance
      dateReceived
      elDateIn
      elDateOut
      accDate
      finalDate
      dueDate
      elPass
      vipPass
      vacPass
      finalPass
      elRead
      accRead
      accPass
      vipProblems
      certificateNumber
    }
    dosimeterByBatch(batch:$batch){
      modelNumber
      serialNumber
    }
}
`;


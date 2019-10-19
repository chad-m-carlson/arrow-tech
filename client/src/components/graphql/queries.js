import gql from 'graphql-tag';

export const GET_UNIQUE_DOSIMETER_MODELS = gql`
query{
  uniqueDosimeterModels {
    id
    modelNumber
    range
    isR
    isMr
    isSv
    isMsv
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
    email
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
    # lastCalibrationByBatch(batch:$batch){
    #   id
    #   userId
    #   dosimeterId
    #   tolerance
    #   dateReceived
    #   elDateIn
    #   elDateOut
    #   accDate
    #   finalDate
    #   dueDate
    #   elPass
    #   vipPass
    #   vacPass
    #   finalPass
    #   elRead
    #   accRead
    #   accPass
    #   vipProblems
    #   certificateNumber
    # }
    dosimeterByBatch(batch:$batch, id:$id){
      modelNumber
      serialNumber
      range
      isR
      isMr
      isSv
      isMsv
      id
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

export const CALIBRATIONS_BY_BATCH = gql`
  query($batch:Int!){
  calibrationsByBatch(batch: $batch) {
    id
    userId
    dosimeterId
    calibratorId
    dateReceived
    finalDate
    dueDate
    certificateNumber
    tolerance
    batch
    accRead
    elRead
    vacPass
    vipPass
    accPass
    elPass
    finalPass
    calibrator{
      model
      serialNumber
      tfn
      exposureRate
      date
    }
    user{
      firstName
      lastName
    }
    dosimeter{
      modelNumber
      serialNumber
      range
      isMr
      isMsv
      isR
      isSv
      customer{
        id
        name
        streetAddress1
        streetAddress2
        city
        state
        zip
        country
      }
    }
  } 
}
`;

export const CALIBRATION = gql `
    query Calibration($id:ID!){
    calibration(id:$id){
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
      dosimeter{
        modelNumber
        serialNumber
        range
        isR
        isMr
        isSv
        isMsv
        id
      }
    }
  }
`;


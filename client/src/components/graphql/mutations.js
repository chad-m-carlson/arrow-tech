import gql from 'graphql-tag';

export const CREATE_CALIBRATION_RECORD =  gql`
  mutation CreateCalibrationRecord($id: ID, $user_id: ID, $dosimeter_id: ID, $date_received: String, $el_date_in: String, $el_date_out: String, $acc_date: String, $vac_date_in: String, $vac_date_out: String, $final_date: String,  $due_date: String, $el_pass: Boolean, $vip_pass: Boolean, $vac_pass: Boolean, $acc_pass: Boolean, $final_pass: Boolean,$el_read: Float, $acc_read: Float, $vip_problems: String, $vac_reading: Float, $vac_ref_reading: Float, $certificate_number: String, $batch: Int, $customer_id: Int, $model_number: String, $serial_number: String, $tolerance: Float){
    createCalibrationRecord(input: {id: $id, userId: $user_id, dosimeterId: $dosimeter_id, dateReceived: $date_received, elDateIn: $el_date_in, elDateOut: $el_date_out, accDate: $acc_date, vacDateIn: $vac_date_in, vacDateOut: $vac_date_out, finalDate: $final_date, dueDate: $due_date, elPass: $el_pass, vipPass: $vip_pass, vacPass: $vac_pass, accPass: $acc_pass, finalPass: $final_pass, elRead: $el_read, accRead: $acc_read, vipProblems: $vip_problems, vacReading: $vac_reading, vacRefReading: $vac_ref_reading, certificateNumber: $certificate_number, batch: $batch, customerId: $customer_id, modelNumber: $model_number, serialNumber: $serial_number, tolerance: $tolerance}){
      calibration{
        id
        userId
        dosimeterId
        dateReceived
        elDateIn
        elDateOut
        accDate
        vacDateIn
        vacDateOut
        finalDate
        dueDate
        elPass
        accPass
        finalPass
        elRead
        accRead
        vipProblems
        vacRefReading
        certificateNumber
        batch
        vipPass
        accPass
        vacReading
      }
    }
  }
`;

export const DELETE_CALIBRATION_RECORD = gql`
  mutation DeleteCalibrationRecord($id: Int!){
    deleteCalibrationRecord(input: {id: $id}) {
      clientMutationId
      calibration{
        id
      }
    }
  }	
`;

export const CREATE_CUSTOMER = gql `
  mutation CreateCustomer($id: ID, $name: String!, $street_address1: String!, $street_address2: String, $city: String!, $state: String!, $zip: String!, $country: String!, $email: String) {
    createCustomer(input: {id: $id, name: $name, streetAddress1: $street_address1, streetAddress2: $street_address2, city: $city, state: $state, zip: $zip, country: $country, email: $email}){
      customer{
        id
      }
    } 
  }
`;

export const CREATE_CALIBRATOR_RECORD = gql `
  mutation CreateCalibratorRecord($id: ID, $model: String!, $serial_number: String!, $tfn: String!, $date: String!, $exposure_rate: String!, $batch: Int!) {
    createCalibratorRecord(input: {id: $id, model: $model, serialNumber: $serial_number, tfn: $tfn, date: $date, exposureRate: $exposure_rate, batch: $batch}) {
      calibrator{
        id
      }
    }
  }
`;

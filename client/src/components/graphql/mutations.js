import gql from 'graphql-tag';

export const CREATE_CALIBRATION_RECORD =  gql`
  mutation CreateCalibrationRecord($user_id: Int, $date_received: String, $el_date_in: String, $el_date_out: String, $acc_date: String, $vac_date_in: String, $vac_date_out: String, $final_date: String,  $due_date: String, $el_pass: Boolean, $vip_pass: Boolean, $vac_pass: Boolean, $acc_pass: Boolean, $final_pass: Boolean,$el_read: Float, $acc_read: Float, $vip_problems: String, $vac_reading: Float, $vac_ref_reading: Float, $batch: Int, $customer_id: Int, $model_number: String, $serial_number: String, $tolerance: Float){
    createCalibrationRecord(input: {userId: $user_id, dateReceived: $date_received, elDateIn: $el_date_in, elDateOut: $el_date_out, accDate: $acc_date, vacDateIn: $vac_date_in, vacDateOut: $vac_date_out, finalDate: $final_date, dueDate: $due_date, elPass: $el_pass, vipPass: $vip_pass, vacPass: $vac_pass, accPass: $acc_pass, finalPass: $final_pass, elRead: $el_read, accRead: $acc_read, vipProblems: $vip_problems, vacReading: $vac_reading, vacRefReading: $vac_ref_reading, batch: $batch, customerId: $customer_id, modelNumber: $model_number, serialNumber: $serial_number, tolerance: $tolerance}){
      calibration{
        userId
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
        batch
        vipPass
        accPass
        vacReading
      }
    }
  }
`;
module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :update_user, mutation: Mutations::UpdateUser
    field :create_customer, mutation: Mutations::CreateCustomer
    field :destroy_customer, mutation: Mutations::DestroyCustomer
    field :create_calibration_record, mutation: Mutations::CreateCalibrationRecord
    field :delete_calibration_record, mutation: Mutations::DeleteCalibrationRecord
    field :create_calibrator_record, mutation: Mutations::CreateCalibratorRecord
    field :create_dosimeter_template, mutation: Mutations::CreateDosimeterTemplate
    field :delete_dosimeter_template, mutation: Mutations::DeleteDosimeterTemplate
    field :update_batch_customer, mutation: Mutations::UpdateBatchCustomer
    field :update_active_cal_cert, mutation: Mutations::UpdateActiveCalCert
    field :add_new_calibrator_cert, mutation: Mutations::AddNewCalibratorCert
  end
end

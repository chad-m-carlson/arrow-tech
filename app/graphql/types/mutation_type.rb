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
  end
end

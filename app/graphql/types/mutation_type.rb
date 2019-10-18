module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :update_user, mutation: Mutations::UpdateUser
    field :create_customer, mutation: Mutations::CreateCustomer
    field :destroy_customer, mutation: Mutations::DestroyCustomer
    field :create_calibration_record, mutation: Mutations::CreateCalibrationRecord
    field :delete_calibration_record, mutation: Mutations::DeleteCalibrationRecord
  end
end

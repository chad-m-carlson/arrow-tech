class Mutations::UpdateBatchCustomer < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :batch, Int, required: true

  field :calibration, [Types::CalibrationType], null: true
  field :errors, [String], null: true

  def resolve(id:, batch:)
    calibration = Calibration.where(batch: batch)
    dosimeters = Calibration.where(batch: batch).pluck(:dosimeter_id)

    dosimeters.each { |d| Dosimeter.find(d).update(customer_id: id) }
    {
      calibration: calibration,
      errors: []
    }
  end
end
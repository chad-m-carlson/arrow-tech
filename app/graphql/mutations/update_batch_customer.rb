class Mutations::UpdateBatchCustomer < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :batch, Int, required: true

  field :calibration, [Types::CalibrationType], null: true
  field :errors, [String], null: true
  field :messages, String, null: true

  def resolve(id:, batch:)
    calibration = Calibration.where(batch: batch)
    dosimeters = Calibration.where(batch: batch).pluck(:dosimeter_id)
    @message = "Updated #{dosimeters.length} calibration records with updated customer information"
    begin
      dosimeters.each { |d| Dosimeter.find(d).update(customer_id: id) }
      {
        calibration: calibration,
        errors: [],
        messages: @message
      }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("#{e.record.errors.full_messages.join(', ')}") 
    end
  end
end

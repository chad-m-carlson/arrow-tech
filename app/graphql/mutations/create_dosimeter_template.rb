class Mutations::CreateDosimeterTemplate < Mutations::BaseMutation
  argument :model_number, String, required: false
  argument :unit, String, required: false
  argument :range, Int, required: false

  field :dosimeter_template, Types::DosimeterTemplateType, null: false

  def resolve(model_number:, unit:, range:)
    begin
      dosimeter_template = DosimeterTemplate.create!(
        model_number: model_number,
        range: range,
        is_mr: unit == 'mR',
        is_r: unit == 'R',
        is_msv: unit == 'mSv',
        is_sv: unit == 'Sv'
      )
      { dosimeter_template: dosimeter_template }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("#{e.record.errors.full_messages.join(', ')}") 
    end

  end
end
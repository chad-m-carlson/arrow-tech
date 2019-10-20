class Mutations::CreateDosimeterTemplate < Mutations::BaseMutation
  argument :model_number, String, required: true
  # argument :serial_number, String, required: false
  # argument :is_r, Boolean, required: true
  # argument :is_mr, Boolean, required: true
  # argument :is_sv, Boolean, required: true
  # argument :is_msv, Boolean, required: true
  argument :unit, String, required: true
  argument :range, Int, required: true

  field :dosimeter_template, Types::DosimeterTemplateType, null: false
  field :errors, [String], null: true

  def resolve(model_number:, unit:, range:)
    dosimeter_template = DosimeterTemplate.new(
      model_number: model_number,
      range: range,
      is_mr: unit == 'mR',
      is_r: unit == 'R',
      is_msv: unit == 'mSv',
      is_sv: unit == 'Sv'
    )
    if dosimeter_template.save!
      {
        dosimeter_template: dosimeter_template
      }
    else
      {
        # dosimeter_template.errors
      }
    end
  end
end
class Mutations::DeleteDosimeterTemplate < Mutations::BaseMutation
  argument :id, Int, required: true

  field :dosimeter_template, Types::DosimeterTemplateType, null: true

  def resolve(id:)
    dosimeter_template = DosimeterTemplate.find(id)
    dosimeter_template.destroy

    {
      dosimeter_template: dosimeter_template,
      errors: []
    }
  end
end
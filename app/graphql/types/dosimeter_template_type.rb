module Types
  class DosimeterTemplateType < Types::BaseObject
    field :id, ID, null: false
    field :model_number, String, null: false
    field :serial_number, String, null: true
    field :range, Integer, null: false
    field :is_mr, Boolean, null: false
    field :is_r, Boolean, null: false
    field :is_sv, Boolean, null: false
    field :is_msv, Boolean, null: false
  end
end
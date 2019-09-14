module Types
  class DosimeterType < Types::BaseObject
    field :id, ID, null: false
    field :model_number, String, null: false
    field :serial_number, String, null: false
    field :range, Integer, null: false
    field :is_mR, Boolean, null: false
    field :is_R, Boolean, null: false
  end
end
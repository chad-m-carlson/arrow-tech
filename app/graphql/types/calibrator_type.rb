module Types
  class CalibratorType < Types::BaseObject
    field :id, ID, null: true
    field :model, String, null: true
    field :serial_number, String, null: true
    field :exposure_rate, String, null: true
    field :tfn, String, null: true
    field :date, String, null: true
  end
end

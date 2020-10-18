module Types
  class CalibratorCertType < Types::BaseObject
    field :id, ID, null: false
    field :tfn, String, null: false
    field :date, String, null: false
    field :active, Boolean, null: true
  end


end
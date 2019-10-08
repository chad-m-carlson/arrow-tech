class Dosimeter < ApplicationRecord
  belongs_to :customer
  has_many :calibrations

  validates :serial_number, uniqueness: { case_sensitive: false, scope: :model_number }
end

class Dosimeter < ApplicationRecord
  belongs_to :customer
  has_many :calibrations

  validates :model_number, :serial_number, :range, presence: true
  validates :serial_number, uniqueness: { case_sensitive: false, scope: :model_number }
end

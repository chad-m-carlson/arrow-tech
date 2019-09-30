class Calibration < ApplicationRecord
  belongs_to :dosimeter
  has_many :customer, through: :dosimeters
  belongs_to :user
end

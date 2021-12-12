class Calibrator < ApplicationRecord
  has_many :calibrations

  validates :model, :exposure_rate, :tfn, :date,  presence: {message: "is required"}
end

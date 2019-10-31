class Calibrator < ApplicationRecord
  has_many :calibrations

  validates :model, :exposure_rate, presence: {message: "is required"}
end

class Customer < ApplicationRecord
  has_many :dosimeters, dependent: :destroy
  has_many :calibrations, through: :dosimeters
end

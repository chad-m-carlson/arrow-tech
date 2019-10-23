class Customer < ApplicationRecord
  has_many :dosimeters, dependent: :destroy
  has_many :calibrations, through: :dosimeters

  validates :name, presence: {message: "Customer must have name"}
  validates :street_address_1, presence: {message: "Customer must have street address"}
  validates :city, presence: {message: "Customer must have city"}

end

class Customer < ApplicationRecord
  has_many :dosimeters, dependent: :destroy
  has_many :calibrations, through: :dosimeters

  validates :name, presence: {message: "is required"}
  validates :name, uniqueness: true

end

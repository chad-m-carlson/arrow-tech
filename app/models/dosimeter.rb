class Dosimeter < ApplicationRecord
  belongs_to :customer
  has_many :calibrations
end

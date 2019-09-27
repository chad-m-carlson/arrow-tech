class Dosimeter < ApplicationRecord
  belongs_to :customer
  has_many :calibrations

  validates :serial_numbner, uniquness: { case_sensitive: false }
end

class Calibration < ApplicationRecord
  belongs_to :dosimeter
  has_many :customer, through: :dosimeters
  belongs_to :user
  belongs_to :calibrator, optional: true

  validates :el_date_in, :el_date_out, :acc_date, :batch,  presence: {message: "is required"}
  validates :dosimeter_id, uniqueness: {scope: :batch}

  # def self.prev(batch, cal_id)
  #   Calibration.where("batch =  ? and id < ?", batch, cal_id).last
  # end

  # def self.next(batch, cal_id)
  #   Calibration.where("batch =  ? and id > ?", batch, cal_id).first
  # end
  
end

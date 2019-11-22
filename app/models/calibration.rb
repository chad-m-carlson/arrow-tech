class Calibration < ApplicationRecord
  belongs_to :dosimeter
  has_many :customer, through: :dosimeters
  belongs_to :user
  belongs_to :calibrator, optional: true

  validates :batch,
            :final_date,
            presence: {message: "is required"}
  validates :dosimeter_id, uniqueness: {scope: :batch}

  # def self.prev(batch, cal_id)
  #   Calibration.where("batch =  ? and id < ?", batch, cal_id).last
  # end

  # def self.next(batch, cal_id)
  #   Calibration.where("batch =  ? and id > ?", batch, cal_id).first
  # end
  
end

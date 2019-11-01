class DosimeterTemplate < ApplicationRecord
  validates :model_number, uniqueness: { case_sensitive: false }
  validates :model_number, :range, presence: {message: "is required"}
  
end

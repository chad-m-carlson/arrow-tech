class DosimeterTemplate < ApplicationRecord
  validates :model_number, uniqueness: { case_sensitive: false }
  
end

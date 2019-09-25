module Types
  class QueryType < Types::BaseObject

    field :calibrations, [Types::CalibrationType], null: false
    field :customers, [Types::CustomerType], null: false
    field :dosimeters, [Types::DosimeterType], null: false
    field :users, [Types::UserType], null: false
    
    field :calibration, Types::CalibrationType, null: false do
      argument :id, ID, required: true
    end

    field :calibrations_by_batch, [Types::CalibrationType], null: false do
      argument :batch, Int, required: true
    end

    field :customer, Types::CustomerType, null: false do
      argument :id, ID, required: true
    end
    
    field :dosimeter, Types::DosimeterType, null: false do
      argument :id, ID, required: true
    end
    
    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end
    
    field :unique_dosimeter_models, [Types::DosimeterType], null: false
    
    field :last_batch, Integer, null: false

    def calibrations
      Calibration.all
    end

    def customers
      Customer.all
    end

    def calibrations_by_batch(batch:)
      calibrations = Calibration.where(batch: batch)
    end

    def dosimeters
      Dosimeter.all
    end

    def users
      User.all
    end

    def calibration(id:)
      Calibration.find(id)
    end

    def customer(id:)
      Customer.find(id)
    end
    
    def dosimeter(id:)
      Dosimeter.find(id)
    end
    
    def user(id:)
      User.find(id)
    end

    def unique_dosimeter_models
      Dosimeter.find_by_sql(['
      WITH uniq_dosimeter (id, model_number, is_r, is_mr, range)
      AS(
      SELECT id, model_number, is_r, is_mr, range
      FROM dosimeters
      WHERE id IN
      (SELECT MIN(id) 
      FROM dosimeters 
      GROUP BY model_number 
      ))
      SELECT id, model_number, is_r, is_mr, range
      FROM uniq_dosimeter
      ORDER BY model_number
      '])
    end

    def last_batch
      batch = Calibration.last.batch
    end

  end
end

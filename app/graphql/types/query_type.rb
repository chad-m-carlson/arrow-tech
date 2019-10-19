module Types
  class QueryType < Types::BaseObject

    field :calibrations, [Types::CalibrationType], null: false
    field :customers, [Types::CustomerType], null: false
    field :dosimeters, [Types::DosimeterType], null: false
    field :users, [Types::UserType], null: false
    field :calibrators, [Types::CalibratorType], null: false

    field :calibration, Types::CalibrationType, null: false do
      argument :id, ID, required: true
    end

    field :calibrations_by_batch, [Types::CalibrationType], null: false do
      argument :batch, Int, required: true
    end

    field :last_calibration_by_batch, Types::CalibrationType, null: false do
      argument :batch, Int, required: false
    end

    field :previous_calibration, Types::CalibrationType, null: true do
      argument :batch, Int, required: false
      argument :id, ID, required: false
    end

    field :next_calibration, Types::CalibrationType, null: true do
      argument :batch, Int, required: false
      argument :id, ID, required: false
    end

    field :dosimeter_by_batch, Types::DosimeterType, null: false do
      argument :batch, Int, required: false
      argument :id, ID, required: false
    end

    field :customer_by_batch, Types::CustomerType, null: true do
      argument :batch, Int, required: false
    end

    field :customer, Types::CustomerType, null: false do
      argument :id, ID, required: true
    end

    field :calibrator, Types::CalibratorType, null: false do
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
      Calibration.order(:id).where(batch: batch)
    end

    def last_calibration_by_batch(batch:)
      Calibration.where(batch: batch).last
    end

    def previous_calibration(batch:, id:)
      if id
        Calibration.order(:id).prev(batch, id)
      else
        Calibration.order(:id).where(batch: batch).last
        # last_id = Calibration.last.id
        # Calibration.where("batch =  ? AND id = ?", batch, last_id - 1).first
      end
    end

    def next_calibration(batch:, id:)
      Calibration.order(:id).next(batch, id)
    end

    def dosimeter_by_batch(batch:, id:)
      x = Calibration.order(:id).prev(batch, id)
      if x != nil && id
        x.dosimeter
        # ! .prev method breaks if no more previous calibration records exist. Will have to add error handling here instead of the alert in the dosimeterform
      else
        Calibration.where(batch: batch).last.dosimeter
      end
    end

    def customer_by_batch(batch:)
      customer = Calibration.where(batch: batch)
        if customer.length > 0
          customer.last.dosimeter.customer
        end
    end

    def dosimeters
      Dosimeter.all
    end

    def users
      User.all
    end

    def calibrators
      Calibrator.all
    end

    def calibration(id:)
      Calibration.find(id)
    end

    def customer(id:)
      Customer.find(id)
    end

    def calibrator(id:)
      Calibrator.find(id)
    end

    def dosimeter(id:)
      Dosimeter.find(id)
    end
    
    def user(id:)
      User.find(id)
    end

    def unique_dosimeter_models
      Dosimeter.find_by_sql(['
      WITH uniq_dosimeter (id, model_number, is_r, is_mr, is_sv, is_msv, range)
      AS(
      SELECT id, model_number, is_r, is_mr, is_sv, is_msv, range
      FROM dosimeters
      WHERE id IN
      (SELECT MIN(id) 
      FROM dosimeters 
      GROUP BY model_number 
      ))
      SELECT id, model_number, is_r, is_mr, is_sv, is_msv, range
      FROM uniq_dosimeter
      ORDER BY model_number
      '])
    end

    def last_batch
      batch = Calibration.last.batch
    end

  end
end

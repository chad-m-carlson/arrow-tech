module Types
  class QueryType < Types::BaseObject

    field :calibrations, [Types::CalibrationType], null: false
    field :customers, [Types::CustomerType], null: false
    field :dosimeters, [Types::DosimeterType], null: false
    field :dosimeter_templates, [Types::DosimeterTemplateType], null: false
    field :users, [Types::UserType], null: false
    field :calibrators, [Types::CalibratorType], null: false

    field :batch_by_customer, [Types::CalibrationType], null: false do
      argument :customer_id, Int, required: true
    end

    def batch_by_customer(customer_id:)
      Customer.find(customer_id).calibrations.uniq(&:batch)
    end

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

    field :last_batch, Integer, null: false

    def calibrations
      Calibration.all
    end

    def customers
      Customer.all.order(:name)
    end

    def calibrations_by_batch(batch:)
      Calibration.find_by_sql(["
          SELECT c.id, 
                 dosimeter_id,
                 user_id,
                 tolerance,
                 date_received,
                 el_date_in,
                 el_date_out,
                 acc_date,
                 vac_date_in,
                 vac_date_out,
                 final_date,
                 ship_back_date,
                 due_date,
                 el_pass,
                 vip_pass,
                 vac_pass, 
                 acc_pass, 
                 final_pass, 
                 el_read, 
                 acc_read, 
                 vip_problems, 
                 vac_reading, 
                 vac_ref_reading, 
                 certificate_number, 
                 batch, 
                 c.created_at, 
                 c.updated_at, 
                 calibrator_id, 
                 vac_required, 
                 tech_first_name, 
                 tech_last_name,
                 el_test_performed,
                 vip_test_performed,
                 vac_test_performed,
                 acc_test_performed
          FROM calibrations AS c
          LEFT JOIN dosimeters as d ON c.dosimeter_id = d.id
          WHERE c.batch = ?
          ORDER BY d.model_number, d.serial_number
      ", batch])
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

    def dosimeter_templates
      DosimeterTemplate.all.order(:model_number)
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

    def last_batch
      batch = Calibration.pluck(:batch).uniq.max
    end

  end
end

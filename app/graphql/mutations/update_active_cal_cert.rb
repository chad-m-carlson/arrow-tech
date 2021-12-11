class Mutations::UpdateActiveCalCert < Mutations::BaseMutation
  argument :id, ID, required: true
  field :calibrator_cert, Types::CalibratorCertType, null: false
  #field :errors, String, null: false

  def resolve(id:)
    # CalibratorCert.where(active: true).update(active: false)
    
    calibrator_cert = CalibratorCert.where(id: id).first


    if calibrator_cert.update(active: !calibrator_cert.active)
      # Successful creation, return the created object with no errors
      {
        calibrator_cert: calibrator_cert,
        errors: []
      }
    else
      # Failed save, return the errors to the client
      {
        calibrator_cert: nil,
        errors: cert.errors.full_messages
      }
    end
  end
end
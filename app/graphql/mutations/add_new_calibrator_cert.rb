class Mutations::AddNewCalibratorCert < Mutations::BaseMutation
  argument :tfn, String, required: true
  argument :date, String, required: true
  field :calibrator_cert, Types::CalibratorCertType, null: false


  def resolve(tfn:, date:)

    # CalibratorCert.where(active: true).update(active: false)
    cal_cert = CalibratorCert.create(tfn: tfn, date: date, active: true)

    {calibrator_cert: cal_cert}
  end
end
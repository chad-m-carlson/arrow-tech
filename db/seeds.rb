models = ['AT 138', 'AT 715', 'AT 720', 'AT 725', 'AT 730', 'AT 742', 'AT 746']



20.times do 
  c = Customer.create(
    name: Faker::Company.name,
    street_address_1: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zip: Faker::Address.zip,
    country: Faker::Address.country
  )

  10.times do
    range = rand(100..1000000)
    serial = [*'0'..'9',*'A'..'Z',*'a'..'z']
    if range < 2000
      @is_mR = true
      @is_R = false
    else
      @is_mR = false
      @is_R = true
    end
    Dosimeter.create(
      model_number: models.sample,
      serial_number: Array.new(15){serial.sample}.join,
      range: range,
      is_mR: @is_mR,
      is_R: @is_R,
      customer_id: c.id
    )
  end
end
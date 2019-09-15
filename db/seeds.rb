models = ['AT 138', 'AT 715', 'AT 720', 'AT 725', 'AT 730', 'AT 742', 'AT 746']

batch = 0 

20.times do 
  c = Customer.create(
    name: Faker::Company.name,
    street_address_1: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zip: Faker::Address.zip,
    country: Faker::Address.country, 
    email: Faker::Internet.email
  )
  cert_number = "2019-#{rand(0..100)}"
  batch += 1
  puts "Cert Number: #{cert_number}"
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
    d = Dosimeter.create!(
      model_number: models.sample,
      serial_number: Array.new(15){serial.sample}.join,
      range: range,
      is_mR: @is_mR,
      is_R: @is_R,
      customer_id: c.id
    )
    puts "batch number: #{batch}"
    Calibration.create!(
      dosimeter_id: d.id,
      user_id: rand(1..2),
      tolerance: 0.1,
      date_received: (DateTime.now -1),
      EL_date_in: DateTime.now,
      EL_date_out: (DateTime.now + 2),
      ACC_date: (DateTime.now - 1),
      VAC_date_in: (DateTime.now - 3),
      VAC_date_out: (DateTime.now - 2),
      final_date: (DateTime.now + 2),
      due_date: (DateTime.now + 367),
      final_pass: true,
      certificate_number: cert_number,
      batch: batch
    )
  end
end
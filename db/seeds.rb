models = [['AT 138', 200],['AT 715', 1000], ['AT 720', 2000], ['AT 725', 5000], ['AT 730', 20000], ['AT 742', 200000], ['AT 746', 600000]]

batch = 0 
serial = 0

User.create(email: "test@test.com", password: "password", is_admin: true, first_name: "Chad")
User.create(email: "Bryan@test.com", password: "password", is_admin: true, first_name: "Bryan")

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
  models.each do |model, range|
      if range <= 1000
        @is_mr = true
      else @is_mr = false
      end
      if range > 1000
        @is_r = true
      else @is_r = false
      end
      10.times do
        serial += 1
        d = Dosimeter.create!(
          model_number: model,
          serial_number: serial,
          range: range,
          is_mr: @is_mr,
          is_r: @is_r,
          customer_id: c.id
          )
          puts "batch number: #{batch}"
          Calibration.create!(
            dosimeter_id: d.id,
            user_id: rand(1..2),
            tolerance: 0.1,
            date_received: (DateTime.now -1),
            el_date_in: DateTime.now,
            el_date_out: (DateTime.now + 2),
            acc_date: (DateTime.now - 1),
            vac_date_in: (DateTime.now - 3),
            vac_date_out: (DateTime.now - 2),
            final_date: (DateTime.now + 2),
            due_date: (DateTime.now + 367),
            final_pass: true,
            certificate_number: cert_number,
            batch: batch
          )
      end
    end
end
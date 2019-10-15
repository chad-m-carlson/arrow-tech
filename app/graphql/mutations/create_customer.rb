class Mutations::CreateCustomer < Mutations::BaseMutation
  argument :id, ID, required: false
  argument :name, String, required: true
  argument :street_address1, String, required: true
  argument :street_address2, String, required: false
  argument :city, String, required: true
  argument :state, String, required: true
  argument :zip, String, required: true
  argument :country, String, required: true
  argument :email, String, required: false

  field :customer, Types::CustomerType, null: true

  def resolve(id:, name:, street_address1:, street_address2:, city:, state:, zip:, country:, email:)
    if id
      customer = Customer.find(id)
      binding.pry
      customer.update(name: name,
                      street_address_1: street_address1,
                      street_address_2: street_address2,
                      city: city,
                      state: state,
                      zip: zip,
                      country: country,
                      email: email
                    )
      if customer.save!
        {
          customer: customer
        }
      else 
        {

        }
      end
    else customer = Customer.new(name: name,
                                street_address_1: street_address1,
                                street_address_2: street_address2,
                                city: city,
                                state: state,
                                zip: zip,
                                country: country,
                                email: email
    )
      if customer.save!
        {
          customer: customer
        }
      else
        {

        }
      end
    end
  end
end

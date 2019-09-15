class Mutations::DestroyCustomer < Mutations::BaseMutation
  argument :id, ID, required: true

  field :customer, Types::CustomerType, null: true
  field :errors, [String], null: true

  def resolve(id:)
    customer = Customer.find(id)
    customer.destroy

    {
      customer: customer,
      errors: []
    }
  end
end
class Mutations::UpdateUser < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :first_name, String, required: false
  argument :last_name, String, required: false
  argument :is_admin, Boolean, required: false
  argument :email, String, required: false

  field :user, Types::UserType, null: false
  field :errors, [String], null: false

  def resolve(id:, first_name:, last_name:, is_admin:, email:)
    user = User.find(id)
    if user.update(first_name: first_name, 
                   last_name: last_name, 
                   is_admin: is_admin, 
                   email: email)
      # Successful creation, return the created object with no errors
      {
        user: user,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        user: nil,
        errors: user.errors.full_messages
      }
    end
  end
end
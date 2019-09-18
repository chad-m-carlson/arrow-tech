class Mutations::CreateUser < Mutations::BaseMutation
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :is_admin, Boolean, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :user, Types::UserType, null: false
  field :errors, [String], null: false

  def resolve(first_name:, last_name:, is_admin:, email:, password:, password_confirmation:)
    user = User.new(first_name: first_name,
                    last_name: last_name,
                    is_admin: is_admin, 
                    email: email, 
                    password: password, 
                    password_confirmation: password_confirmation)
    if user.save
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

# mutation CreateUser($first_name:String!, $last_name:String!, $is_admin:Boolean!, $email:String!, $password:String!, $password_confirmation:String!){
#   createUser(input: {firstName:$first_name, lastName:$last_name, isAdmin:$is_admin, email:$email, password:$password, passwordConfirmation:$password_confirmation}){
#     user{
#       firstName
#       lastName
#       isAdmin
#       email
#       password
#       passwordConfirmation
#     }
#     errors
#   }

# }
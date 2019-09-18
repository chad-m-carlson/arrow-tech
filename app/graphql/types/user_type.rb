module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: true
    field :last_name, String,  null: true
    field :email, String, null: false
    field :is_admin, Boolean, null: true
    field :password, String, null: false
    field :password_confirmation, String, null: false
  end
end

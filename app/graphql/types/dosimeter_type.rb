module Types
  class DosimeterType < Types::BaseObject
    field :id, ID, null: false
    field :model_number, String, null: false
    field :serial_number, String, null: false
    field :range, Integer, null: false
    field :is_mr, Boolean, null: false
    field :is_r, Boolean, null: false
    field :calibrations, [Types::CalibrationType], null: false do
      argument :id, ID, required: true
    end

    def calibrations(id:)
      Dosimeter.find(id).calibrations
    end
  end
end

# query{
#   dosimeter(id:395){
#     calibrations(id:395){
#       id
#       batch
#       certificateNumber
#       finalDate
#       dueDate
#       finalPass
#     }
#   }
# }

# query($id: ID!){
#   dosimeter(id: $id){
#     id
#     modelNumber
#     serialNumber
#     calibrations(id: $id){
#       id
#       batch
#       certificateNumber
#       finalDate
#       dueDate
#       finalPass
#     }
#   }
# }
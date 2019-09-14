class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :street_address_1
      t.string :street_address_2
      t.string :city
      t.string :state
      t.string :zip
      t.string :country

      t.timestamps
    end
  end
end

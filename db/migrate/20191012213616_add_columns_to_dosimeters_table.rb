class AddColumnsToDosimetersTable < ActiveRecord::Migration[6.0]
  def change
    add_column :dosimeters, :is_sv, :boolean, default: false 
    add_column :dosimeters, :is_msv, :boolean, default: false
    change_column_default :dosimeters, :is_r, false
    change_column_default :dosimeters, :is_mr, false
  end
end

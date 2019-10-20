class ChangeColumnDefaultsInDosimeterTemplates < ActiveRecord::Migration[6.0]
  def change
    change_column_default :dosimeter_templates, :is_r, false
    change_column_default :dosimeter_templates, :is_mr, false
    change_column_default :dosimeter_templates, :is_sv, false
    change_column_default :dosimeter_templates, :is_msv, false
  end
end

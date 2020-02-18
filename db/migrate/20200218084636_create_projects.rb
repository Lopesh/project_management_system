class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :description
      t.integer :created_by_id
      t.integer :updated_by_id
      t.timestamps
    end
  end
end

class AddTaskDateColumnInTaskTable < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :duration, :datetime
  end
end

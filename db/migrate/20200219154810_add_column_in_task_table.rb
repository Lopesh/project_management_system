class AddColumnInTaskTable < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :is_task_completed, :boolean, default: false
  end
end

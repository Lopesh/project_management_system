class Task < ApplicationRecord
  belongs_to :project, :class_name => "Project", :foreign_key => 'Project_id'
end

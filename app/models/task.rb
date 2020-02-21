class Task < ApplicationRecord
  belongs_to :project, class_name: "Project", foreign_key: "project_id"

  enum priority: {
      'High': 1,
      'Medium': 2,
      'Low': 3
  }
end

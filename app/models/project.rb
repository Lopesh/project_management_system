class Project < ApplicationRecord
  has_many :tasks
  validates_presence_of :name, :description
  belongs_to :created_by, class_name: "User", foreign_key: "created_by_id"
  belongs_to :updated_by, class_name: "User", foreign_key: "created_by_id"
end

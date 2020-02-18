class Project < ApplicationRecord
  has_many :tasks
  validates_presence_of :name, :description
end

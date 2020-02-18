class User < ApplicationRecord
  validates_presence_of :first_name, :last_name, :role
  enum role: {
      'Admin': 1,
      'Project Manager': 2,
      'Developer': 3
  }
end

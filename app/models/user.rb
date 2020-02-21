class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates_presence_of :first_name, :last_name
  enum role: {
      'Admin': 1,
      'Project Manager': 2,
      'Developer': 3
  }

  def to_s
    "#{self.first_name} #{self.last_name}"
  end
end

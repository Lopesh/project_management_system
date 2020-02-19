class UsersController < ApplicationController
  include ApplicationHelper

  def create
    @new_user = User.new(user_params.merge(role: rand(1..3)))
    if @new_user.save
      redirect_to projects_path
    else
      redirect_to projects_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name,
                                  :last_name, :email, :password)
  end
end

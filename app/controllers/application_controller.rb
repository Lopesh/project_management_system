class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  # before_action configure_permitted_parameters, if: :devise_controller?

  protected

=begin
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user|
      user.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
    devise_parameter_sanitizer.permit(:account_update) do |user|
      user.permit(:first_name, :last_name, :avatar, :email, :password, :password_confirmation)
    end
  end
=end
end

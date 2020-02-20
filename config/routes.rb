Rails.application.routes.draw do
    devise_for :users

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'projects#index'
  post "/users" => 'users#create'
  resources :projects
  #   resources :users
  resources :tasks
end

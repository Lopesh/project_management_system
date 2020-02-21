class TasksController < ApplicationController
  before_action :set_task, only: [:update, :edit ]
  def update
    if @task.present?
      @task.is_task_completed = params['checkboxStatus']
      @task.save
      respond_to do |format|
        format.json do
          render json: { successful: params['checkboxStatus'] }
        end
      end
    end
  end

  private
  def set_task
    @task = Task.find(params[:id])
  end
end

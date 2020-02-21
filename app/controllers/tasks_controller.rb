class TasksController < ApplicationController
  before_action :set_task, only: [:update, :edit, :destroy ]

  def create
    @project = Project.find(params['projectId'])
    if @project.present?
      @task = @project.tasks.new({ created_by_id: current_user.id, updated_by_id: current_user.id, name: params['taskName'], description: params['taskDescription'], priority: params['taskPriority'], duration: params['taskDate'] })
      if @task.save
        respond_to do |format|
          format.json do
            render json: { successful: 'true' }
          end
        end
      end
    end
  end

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

  def destroy
    if @task.present?
      if @task.delete
        respond_to do |format|
          format.json do
            render json: { successful: params['checkboxStatus'] }
          end
        end
      end

    end
  end

  private
  def set_task
    @task = Task.find(params[:id])
  end
end

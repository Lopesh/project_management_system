class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :destroy ]
  def index
    @projects = Project.all
  end

  def create
    @project = Project.new
    @project.name = params[:projectName]
    @project.description = params[:projectDescription]
    @project.created_by_id = current_user.id
    @project.updated_by_id = current_user.id
    if @project.save
      respond_to do |format|
        format.json do
          render json: { data: { success: true, project: @project }}
        end
      end
    end

  end

  def show
    respond_to do |format|
      format.json do
        render json: { data: { project: @project.to_json, tasks: @project.tasks.to_json }}
      end
    end
  end

  def destroy
    if @project.present?
      @tasks = @project.tasks
      if @tasks.present?
        @project.tasks.delete_all
      end
      @project.delete
      respond_to do |format|
        format.json do
          render json: { data: { success: "true" }}
        end
      end
    end
=begin
    respond_to do |format|
      format.json do
        render json: { data: { project: @project.to_json, tasks: @project.tasks.to_json }}
      end
    end
=end
  end
  private

  def set_project
    @project = Project.find(params[:id])
  end
end

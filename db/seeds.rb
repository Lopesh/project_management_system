# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if User.all.empty?
  20.times do |user|
    user = User.new({
                        first_name: Faker::Name.first_name,
                        last_name: Faker::Name.last_name,
                        email: "#{Faker::Name.first_name}#{user}@gmail.com",
                        password: "123456",
                        role: rand(1..3)
                    })
    user.save!
  end
end





if Project.all.empty?
  @admin_array = User.where(role: User.roles['Admin']).pluck(:id)
  10.times do |user|
    project = Project.new({
                              name: Faker::Job.title,
                              description: Faker::Lorem.paragraph,
                              created_by_id: @admin_array.sample,
                              updated_by_id: @admin_array.sample
                          })
    project.save!
  end
end


=begin
if Task.all.empty?
  @admin_array = User.where(role: User.roles['Admin']).or(User.where(role: User.roles['Project Manager'])).pluck(:id)
  @projects = Project.all.pluck(:id)
  100.times do |user|
    task = Task.new({
                              name: Faker::Job.title,
                              description: Faker::Job.field,
                              created_by_id: @admin_array.sample,
                              updated_by_id: @admin_array.sample,
                              project_id: @projects.sample
                          })
    task.save!
  end
end
=end


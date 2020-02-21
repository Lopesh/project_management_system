//=================================================================================================
//         This function is call when to view project description
//=================================================================================================

$(document).on("click", ".view-project-description", function () {
    projectID = $(this).data('project-id')
    commonAjaxFunction('/projects/'+projectID, 'get', '', function(response, status, xhr){
        project = JSON.parse(response['data']['project'])
        tasks = JSON.parse(response['data']['tasks'])
        modalBody = "<strong>Description: </strong><br/><p>"+project.description+"</p>"
        modalBody += "<strong class='mb-2'>Tasks: </strong><br/>"
        if(tasks.length > 0){
            tasks.forEach(function(task, index){
                is_checked = task.is_task_completed? 'checked' : ''
                modalBody += "<div class='task-parent-div'><input type='checkbox' id=is_completed_"+task.id+" class='is-completed-checkbox' "+
                    is_checked+"><p>"+task.name+"</p></div>"
            })
        } else {
            modalBody +="<div class='alert alert-light' role='alert'>No Task available for this project</div>"
        }
        setContectToModal(project.name, modalBody)
    })
})

//=================================================================================================
//         This function is call when we click on Delete Button
//=================================================================================================

$(document).on('click', '.destroy-task', function(){
    projectID = $(this).data('project-id')
    commonAjaxFunction('/projects/'+projectID, 'delete', '', function(response, status, xhr){
        if(response['data']['success'] == "true"){
            $('.project-card-'+projectID).remove()
        }
    })
})

//=================================================================================================
//         This function call when we click on green button i.e. "Add New Project"
//=================================================================================================

$('.btn-add-project').on('click', function(){
    var modalBody = "<div id='new-project-add-form'>" +
        "    <div class='form-group'>" +
        "        <label for='project-name'><strong>Task Name</strong></label>" +
        "        <input type='text' required class='form-control' id='project-name' placeholder='Enter Project Name'>" +
        "    </div>" +
        "    <div class='form-group'>" +
        "        <label for='project-description'><strong>Description</strong></label>" +
        "        <textarea class='form-control' id='project-description' placeholder='Enter Project Description'></textarea>" +
        "    </div>" +
        "    <button type='submit' class='btn btn-primary btn-add-project' id='submit-new-project' >Submit</button>" +
        "</div>"
    setContectToModal('Add Project', modalBody)
})

//=================================================================================================
//         This function call when we click on grey button i.e. "Edit Project"
//=================================================================================================

$('.edit-project').on('click', function(){
    var projectID = $(this).data('project-id')
    commonAjaxFunction('/projects/' + projectID + '/edit', 'get', '', function(response, status, xhr){
        if(status == "success"){
            project = JSON.parse(response['data']['project'])
            console.log(project)
            var modalBody = "<div id='new-project-add-form'>" +
                "    <div class='form-group'>" +
                "        <label for='project-name'><strong>Task Name</strong></label>" +
                "        <input type='text' required class='form-control' id='project-name' placeholder='Enter Project Name' value='"+project.name+"'>" +
                "    </div>" +
                "    <div class='form-group'>" +
                "        <label for='project-description'><strong>Description</strong></label>" +
                "        <textarea class='form-control' id='project-description' placeholder='Enter Project Description']>"+project.description+"</textarea>" +
                "    </div>" +
                "    <button type='submit' class='btn btn-primary btn-add-project' id='update-project' data-project-id='"+project.id+"'>Submit</button>" +
                "</div>"
        }
        setContectToModal('Update Project', modalBody)
    })
})

//=================================================================================================
//         This function is call when we click on Add New Task Option
//=================================================================================================


//=================================================================================================
//         This function is call when we click on submit button of new project form
//=================================================================================================

$(document).on('click', '#submit-new-project, #update-project', function (e) {
    var targetId = e.target.id
    var projectName = $('#project-name').val()
    var projectDescription = $('#project-description').val()

     if(targetId == 'submit-new-project'){
        var url = '/projects'
        var method = 'post'
     } else {
         var projectId = $(this).data('project-id')
         var url = '/projects/' + projectId
         var method = 'patch'
     }
    if(projectName != "" && projectDescription != ""){
        var projectName = $('#project-name').val()
        var projectDescription = $('#project-description').val()
        if(projectName != "" && projectDescription != ""){
            commonAjaxFunction(url, method, {  projectName: projectName, projectDescription: projectDescription }, function(response, status, xhr){
                $("#common-modal").modal('hide')
                if(status == "success"){
                    if(targetId == 'submit-new-project'){
                        var project = JSON.parse(response['data']['project'])
                        var body = "<div class='card col-md-5  mt-1 card-override project-card-"+project.id+"'>" +
                            "    <div class='card-body card-body-override  '>" +
                            "        <h5 class='card-title'>"+project.name+"</h5>" +
                            "        <p class='text-muted'>"+project.description.slice(0, 51)+"</p>" +
                            "        <div class='mt-md-3 mb-md-2'>" +
                            "            <div class='row'>" +
                            "                <div class='col-md-3 text-center'>" +
                            "                    <button class='btn btn-success new-task-addition' title='Add New Task' style='width: 100%'>" +
                            "                        <i class='fa fa-plus'></i>" +
                            "                    </button>" +
                            "                </div>" +
                            "                <div class='col-md-3 text-center'>" +
                            "                    <button class='btn btn-warning view-project-description' data-project-id='"+ project.id+ "'  title='View Project' style='width: 100%'>" +
                            "                        <i class='fa fa-eye'></i>" +
                            "                    </button>" +
                            "                </div>" +
                            "                <div class='col-md-3 text-center'>" +
                            "                    <button class='btn btn-secondary' style='width: 100%'>" +
                            "                        <i class='fa fa-pencil'></i>" +
                            "                    </button>" +
                            "                </div>" +
                            "                <div class='col-md-3 text-center'>" +
                            "                    <button class='btn btn-danger destroy-task' data-project-id='"+ project.id+ "' title='Delete Project' style='width: 100%'>" +
                            "                        <i class='fa fa-trash'></i>" +
                            "                    </button>" +
                            "                </div>" +
                            "            </div>" +
                            "        </div>" +
                            "    </div>" +
                            "</div>"
                        $('.project-dashboard').append(body)
                    } else {
                        $('.project-card-'+ projectId +' .card-title').text(projectName)
                        $('.project-card-'+ projectId +' .text-muted').text(projectDescription.slice(0, 51))
                    }
                }
            })
        }
    }
})

//=================================================================================================
//         This function is call when we click on checkbox of project task is done
//=================================================================================================

$(document).on('change', 'input[class="is-completed-checkbox"]', function(){
    var taskId = $(this).attr('id').replace('is_completed_', '')
    var checkboxStatus = $(this).prop('checked')
    commonAjaxFunction('/tasks/'+taskId, 'patch', { checkboxStatus: checkboxStatus }, function(response, status, xhr){

    })
})


//=================================================================================================
//         Common function for all Ajax functionality
//=================================================================================================

function commonAjaxFunction(url, method, data, callbackFunction){
    var response;
    $.ajax({
        url: url,
        method: method,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(res, status, xhr){
            response = res
            callbackFunction(response, status, xhr)
        }
    })
}

//=================================================================================================
//         This function will set the modal content according to the requirement
//=================================================================================================

function setContectToModal(headerTitle, modalBody){
    $('#common-modal-header').text(headerTitle)
    $(".common-modal-body").html(modalBody)
    $("#common-modal").modal('show')
}
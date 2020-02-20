//=================================================================================================
//         This function is call when to view project description
//=================================================================================================

$(".view-project-description").on("click", function () {
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

$('.destroy-task').on('click', function(){
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
//         This function is call when we click on submit button of new project form
//=================================================================================================

$(document).on('click', '#submit-new-project', function (e) {
    var projectName = $('#project-name').val()
    var projectDescription = $('#project-description').val()
    if(projectName != "" && projectDescription != ""){
        commonAjaxFunction('/projects', 'post', {  projectName: projectName, projectDescription: projectDescription }, function(response){
            $("#common-modal").modal('hide')
            console.log(response)
        })
    }
})

//=================================================================================================
//         This function is call when we click on checkbox of project task is done
//=================================================================================================

$(document).on('change', 'input[class="is-completed-checkbox"]', function(){
    var taskId = $(this).attr('id').replace('is_completed_', '')
    var checkboxStatus = $(this).prop('checked')
    commonAjaxFunction('/tasks/'+taskId, 'patch', { checkboxStatus: checkboxStatus }, function(response){

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
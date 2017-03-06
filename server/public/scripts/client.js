var defaultCompletionStatus = false; //sets the status of each task to incomplete on submission

$(document).ready(function(){
  console.log('Sorcery, hell yeah!');

  getTasks();
  // collect value of added task to append DOM and database
  $('#addButton').on('click', function(){
    var newTask = $('#newTask').val();
    var newTaskObject = {
      task: newTask,
      completion_status: defaultCompletionStatus
    };
    $.ajax({
      type: 'POST',
      url: '/task/new',
      data: newTaskObject,
      success: function (response) {
        appendTask(newTaskObject);
      }
    }) //end get ajax
  }); //end of addtask listener

  $('#containAwesomeTasks').on('click', '.completedButton', function(){
    var $selectedTask = $(this).parent().prev().text();
    var $selectedStatus = $(this).data('status');
    var $taskCell = $(this).parent().prev();

    //conditional to change completion_status from defaul to TRUE. Need more time to create toggle ability.
    if ($selectedStatus == false) {
      $selectedStatus = true;
    }
    var statusObject = {
      task: $selectedTask,
      completion_status: $selectedStatus
    }
    $.ajax({
      type: 'PUT',
      url: '/task/done',
      data: statusObject,
      success: function(response){
        $taskCell.addClass('complete');
      }
    })//;end put ajax
  }); //end of completed task listener

  $('#containAwesomeTasks').on('click', '.deleteButton', function(){
    var selectedTask = $(this).parent().prev().prev().text();
    var selectedRowID = $(this).parent().parent().data('id');
    var selectedObject = {
      id: selectedRowID,
      task: selectedTask
    }
    // console.log(selectedObject, ' delete button targeted');

    $.ajax({
      type: 'DELETE',
      url: '/task/delete/',
      data: selectedObject,
      success: function(response){
      getTasks();
      }
    });
  }); //end of delete task listener


}); //end of document ready



function getTasks() {
  $('#containAwesomeTasks').empty();
  $.ajax({
    type: 'GET',
    url: '/task',
    success: function(response) {
      // console.log(response);
      for (var i = 0; i < response.length; i++) {
        $('#containAwesomeTasks').append('<tr data-id="' + response[i].id + '"><td>' + response[i].task + '</td><td><button data-status="' + response[i].completion_status + '" class="completedButton"> &#10004;</button></td><td><button class="deleteButton">&#10134;</button></td></tr>');
      }
    }
  });//end of ajax
};//end of initial get function

function appendTask(response){
  $('#containAwesomeTasks').append('<tr><td>' + response.task + '</td><td><button data-status="' + response.completion_status + '" class="completedButton"> &#10004;</button></td><td><button class="deleteButton">&#10134;</button></td></tr>');
}//end of appending function

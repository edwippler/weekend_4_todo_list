var defaultCompletionStatus = false;

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
        console.log(response);
        appendTask(newTaskObject);
      }
    })
  }); //end of addtask function



//


});


function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/task',
    success: function(response) {
      // console.log(response);
      for (var i = 0; i < response.length; i++) {
      $('#containAwesomeTasks').append('<tr><td>' + response[i].task + '</td><td><button data-status="' + response[i].completion_status + '"> &#10004;</button></td><td><button>&#10134;</button></td></tr>');
    }
    }
  });//end of ajax
};//end of registure listener

function appendTask(response){
  $('#containAwesomeTasks').append('<tr><td>' + response.task + '</td><td><button data-status="' + response.completion_status + '"> &#10004;</button></td><td><button>&#10134;</button></td></tr>');
}

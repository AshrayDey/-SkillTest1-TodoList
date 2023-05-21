let taskArray = [];
const form = document.getElementById("task-form");
const formInput = document.getElementById("task-input");
const taskContainer = document.getElementById("taskContainer");

// Display task in task container
function listTasks(){
   taskContainer.innerHTML = "";
   taskArray.forEach(function(task){
      const taskItem = document.createElement("div");
      taskItem.id = "task";
      taskItem.classList.add("taskInputMainContainer");
      taskItem.innerHTML = `
         <input
            type="text"
            class="task-description"
            id=${task.id}
            value=${task.name}
            readonly
         />
         <span class="options">
            <button class="edit" onclick="editTask(${task.id})">Edit</button>
            <button class="remove" onclick="deleteTask(${task.id})">Remove</button>
         </span>
      `;
      taskContainer.appendChild(taskItem);
   });
}

// Deletes task
function deleteTask(taskID) {
   const filteredTask = taskArray.filter(function(task){
      return task.id != taskID;
   })
   taskArray = filteredTask;
   listTasks();
}

// Edit task
function editTask(taskID) {
   const task = document.getElementById(taskID);
   task.removeAttribute("readonly");
   task.focus();
   task.addEventListener("blur", function(){
      task.setAttribute("readonly", true);
      const editedTask = taskArray.find(function(task){
         return task.id == taskID;
      })
      editedTask.name = task.value;
      const filteredTask = taskArray.filter(function(task){
         return task.id != taskID;
      })
      filteredTask.push(editedTask);
   })
}

// Add task to task container
form.addEventListener("submit", function(event){
   event.preventDefault();
   event.stopPropagation();
   if (formInput.value != "") {
      const task = formInput.value;
      taskArray.push({
         name: task,
         id: Date.now().toString()
      });
      listTasks();
   }
});
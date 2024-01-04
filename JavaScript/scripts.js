import { sortTask } from "./sort.js";
const todayCount = document.querySelector("#todayCount");
const tomorrowCount = document.querySelector("#tomorrowCount");
const laterCount = document.querySelector("#laterCount");
const todoTitle = document.getElementById("todoTitle");
const todoDetails = document.getElementById("todoDetails");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const dueDate = document.getElementById("dueDate");
const deleteTaskBtn = document.getElementById("deleteTask");
const saveTask = document.getElementById("saveTask");
const tasksContainer = document.getElementById("todoList");
const tomorrowList = document.querySelector(".tomorrowList");
const laterList = document.querySelector(".laterList");
const todoList = document.getElementsByTagName("template")[0];
const closeTask = document.getElementById("closeTask");
const inputTaskContainer = document.getElementsByClassName("taskContainer")[0];
const showTask = document.getElementsByClassName("addTask");

dueDate.setAttribute(
  "min",
  (() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    return `${currentYear}-${currentMonth}-${currentDay}`;
  })()
);
for (let i = 0; i < showTask.length; i++) {
  showTask[i].addEventListener("click", () => {
    inputTaskContainer.classList.remove("hideTask");
  });
}
closeTask.addEventListener("click", () => {
  inputTaskContainer.classList.add("hideTask");
});
saveTask.addEventListener("click", createTask);
deleteTaskBtn.addEventListener("click", deleteTask);
let tasks;
localStorage.tasks ? (tasks = JSON.parse(localStorage.tasks)) : (tasks = []);
localStorage.setItem("tasks", JSON.stringify(tasks));
let sortedTask = sortTask(tasks);
localStorage.setItem("sorted", JSON.stringify(sortedTask));

displayTasks();

function displayTasks() {
  todayCount.innerText = sortedTask.today.length;
  tomorrowCount.innerText = sortedTask.tommorow.length;
  laterCount.innerText = sortedTask.later.length;
  sortedTask.today.forEach((currentTask) => {
    let newTask = todoList.content.cloneNode(true);

    newTask.children[0]
      .querySelector(".task")
      .setAttribute(
        "name",
        `todayTask${sortedTask.today.indexOf(currentTask)}`
      );
    newTask.children[0]
      .querySelector(".todo")
      .setAttribute("for", `todayTask${sortedTask.today.indexOf(currentTask)}`);
    newTask.children[0].querySelector(".todo").innerText = currentTask.todo;
    newTask.children[0].querySelector(".taskdate").innerText =
      currentTask.dueDate;
    newTask.children[0].querySelector(".taskcategory").innerText =
      currentTask.category;
    newTask.children[0].querySelector(".taskpriority").innerText =
      currentTask.priority;

    tasksContainer.appendChild(newTask);
  });

  sortedTask.tommorow.forEach((currentTask) => {
    let newTask = todoList.content.cloneNode(true);

    newTask.children[0]
      .querySelector(".task")
      .setAttribute(
        "name",
        `tomorrowTask${sortedTask.today.indexOf(currentTask)}`
      );
    newTask.children[0]
      .querySelector(".todo")
      .setAttribute(
        "for",
        `tomorrowTask${sortedTask.today.indexOf(currentTask)}`
      );
    newTask.children[0].querySelector(".todo").innerText = currentTask.todo;
    newTask.children[0].querySelector(".taskdate").innerText =
      currentTask.dueDate;
    newTask.children[0].querySelector(".taskcategory").innerText =
      currentTask.category;
    newTask.children[0].querySelector(".taskpriority").innerText =
      currentTask.priority;

    tomorrowList.appendChild(newTask);
  });
  sortedTask.later.forEach((currentTask) => {
    let newTask = todoList.content.cloneNode(true);

    newTask.children[0]
      .querySelector(".task")
      .setAttribute(
        "name",
        `laterTask${sortedTask.today.indexOf(currentTask)}`
      );
    newTask.children[0]
      .querySelector(".todo")
      .setAttribute("for", `laterTask${sortedTask.today.indexOf(currentTask)}`);
    newTask.children[0].querySelector(".todo").innerText = currentTask.todo;
    newTask.children[0].querySelector(".taskdate").innerText =
      currentTask.dueDate;
    newTask.children[0].querySelector(".taskcategory").innerText =
      currentTask.category;
    newTask.children[0].querySelector(".taskpriority").innerText =
      currentTask.priority;

    laterList.appendChild(newTask);
  });
}

function createTask() {
  let task = {
    todo: todoTitle.value.toLowerCase().trim(),
    detail: todoDetails.value.toLowerCase().trim(),
    priority: priority.value,
    category: category.value.toLowerCase().trim(),
    dueDate: dueDate.value,
  };

  if (task.todo.length > 2) {
    let exists = taskExist(task);
    if (exists === false) {
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      reload();
      alert("task added sucessfully");
    } else {
      alert("This task already exist.");
    }
  } else {
    alert("Input at least a task title");
  }
}
function deleteTask() {
  let del = confirm("Are you sure you would like to delete this task");
  if (del) {
    let todo = todoTitle.value.toLowerCase().trim();
    for (let index = 0; index < tasks.length; index++) {
      if (tasks[index].todo.toLowerCase() === todo.toLowerCase()) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        alert("Task Deleted");
        reload();
        break;
      }
    }
  } else {
    alert("Task not deleted");
  }
}
function taskExist(task) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].todo === task.todo) {
      return true;
    }
  }
  return false;
}
function clearInput() {
  todoTitle.value = "";
  todoDetails.value = "";
  priority.value = "";
  category.value = "";
  dueDate.value = "";
}
function reload() {
  window.location.reload();
}

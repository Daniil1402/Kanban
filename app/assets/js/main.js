const addTask = document.querySelector(".addTask");
const createButton = addTask.querySelector("#createButton");
const taskName = addTask.querySelector("#taskName");
const newTask = document.querySelector(".tasks");

createButton.addEventListener("click", function () {
  if (taskName.value) {
    const task = document.createElement("div");
    task.classList.add("tasks__item");
    task.textContent = `${taskName.value}`;
    newTask.appendChild(task);
  } else {
    alert("Требуется ввести название задачи!");
  }
});

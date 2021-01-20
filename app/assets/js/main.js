(function () {
  const addTask = document.querySelector(".addTask");
  const createButton = addTask.querySelector("#createButton");
  const taskName = addTask.querySelector("#taskName");
  const newTask = document.querySelector(".tasks");

  let tasks = [];

  const renderTasks = function () {
    for (let item of tasks) {
      const task = document.createElement("div");
      task.classList.add("tasks__item");
      task.textContent = `${item.title}`;
      newTask.appendChild(task);
    }
  };

  if (localStorage.getItem("task") !== null) {
    tasks = JSON.parse(localStorage.getItem("task"));
    renderTasks();
    console.log(tasks);
  } else {
    console.log("no");
  }

  const saveInfo = function (obj) {
    tasks.push(obj);
    localStorage.setItem("task", JSON.stringify(tasks));
  };

  const createObj = function (title) {
    const obj = {
      title: title,
      status: 0,
      id: Date.now(),
    };
    saveInfo(obj);
    return obj;
  };

  const createNewTask = function () {
    if (taskName.value) {
      let taskItem = createObj(taskName.value);
      const task = document.createElement("div");
      task.classList.add("tasks__item");
      task.textContent = `${taskItem.title}`;
      newTask.appendChild(task);
      taskName.value = "";
    } else {
      alert("Требуется ввести название задачи!");
    }
  };

  createButton.addEventListener("click", function () {
    createNewTask();
  });
})();

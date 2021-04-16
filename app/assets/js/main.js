(function () {
  const KEY_ENTER = "Enter";

  const taskTemplate = document.querySelector("#task").content.querySelector(".tasks__item");

  const cards = document.querySelector(".cards");
  const addTask = document.querySelector(".addTask");
  const createButton = addTask.querySelector("#createButton");
  const taskName = addTask.querySelector("#taskName");
  const newTask = cards.querySelector(".tasks");
  const inProgress = cards.querySelector(".inProgress");
  const done = cards.querySelector(".done");
  const bucket = cards.querySelector(".bucket");

  let tasks = [];

  // const createTask = function (taskItem) {
  //   const task = document.createElement("div");
  //   task.setAttribute("data-id", taskItem.id);
  //   task.classList.add("tasks__item");
  //   task.classList.add("borderLeft__gray");
  //   task.textContent = `${taskItem.title}`;
  //   return task;
  // };

  const createTask = function (taskItem) {
    const task = taskTemplate.cloneNode(true);
    const taskTitle = task.querySelector(".task__title");
    task.setAttribute("data-id", taskItem.id);
    task.classList.add("borderLeft__gray");
    taskTitle.value = `${taskItem.title}`;
    return task;
  };

  const renderTasks = function () {
    for (let item of tasks) {
      let task = createTask(item);
      task.className = "tasks__item";
      if (item.status === "tasks") {
        task.classList.add("borderLeft__gray");
        newTask.appendChild(task);
      } else if (item.status === "inProgress") {
        task.classList.add("borderLeft__blue");
        inProgress.appendChild(task);
      } else if (item.status === "done") {
        task.classList.add("borderLeft__green");
        done.appendChild(task);
      } else if (item.status === "bucket") {
        task.classList.add("borderLeft__red");
        bucket.appendChild(task);
      }
    }
  };

  if (localStorage.getItem("task") !== null) {
    tasks = JSON.parse(localStorage.getItem("task"));
    renderTasks();
  } else {
    console.log("no");
  }

  const saveInfo = function () {
    localStorage.setItem("task", JSON.stringify(tasks));
  };

  const createObj = function (title) {
    const obj = {
      title: title,
      status: "tasks",
      id: Date.now(),
    };
    tasks.push(obj);
    saveInfo();
    return obj;
  };

  const createNewTask = function () {
    if (taskName.value) {
      let taskItem = createObj(taskName.value);
      newTask.appendChild(createTask(taskItem));
      taskName.value = "";
    } else {
      alert("Требуется ввести название задачи!");
    }
  };

  createButton.addEventListener("mousedown", function (evt) {
    if (evt.buttons === 1) {
      createNewTask();
    }
  });

  taskName.addEventListener("keydown", function (evt) {
    if (evt.key === KEY_ENTER) {
      createNewTask();
    }
  });

  const changeColor = function (task) {
    let taskParentClass = task.parentElement.className;
    task.className = "tasks__item";
    if (taskParentClass === "tasks") {
      task.classList.add("borderLeft__gray");
    } else if (taskParentClass === "inProgress") {
      task.classList.add("borderLeft__blue");
    } else if (taskParentClass === "done") {
      task.classList.add("borderLeft__green");
    } else if (taskParentClass === "bucket") {
      task.classList.add("borderLeft__red");
    }
  };

  const changeStatus = function (task) {
    let taskId = task.getAttribute("data-id");
    let taskParentClass = task.parentElement.className;
    for (let item of tasks) {
      if (item.id == taskId) {
        item.status = `${taskParentClass}`;
      }
    }
    saveInfo();
  };

  const deleteObj = function (task) {
    let taskId = task.getAttribute("data-id");
    for (let item of tasks) {
      if (item.id == taskId) {
        let elNumber = tasks.indexOf(item);
        tasks.splice(elNumber, 1);
      }
    }
    saveInfo();
  };

  const changeTitle = function (task, title) {
    let taskId = task.getAttribute("data-id");
    for (let item of tasks) {
      if (item.id == taskId) {
        item.title = title.value;
      }
    }
    saveInfo();
  };

  window.main = {
    changeColor,
    changeStatus,
    deleteObj,
    changeTitle,
  };
})();

(function () {
  const TASK_TITLE_MAX_LENGTH = 50;
  const TASK_TITLE_MIN_LENGTH = 3;

  const addTask = document.querySelector(".addTask");
  const createButton = addTask.querySelector("#createButton");
  const taskName = addTask.querySelector("#taskName");

  taskName.addEventListener("input", function () {
    if (taskName.value.length < TASK_TITLE_MIN_LENGTH) {
      taskName.setCustomValidity(`Название задачи должно быть больше ${TASK_TITLE_MIN_LENGTH} символов. Сейчас количество символов ${taskName.value.length}.`);
      createButton.disabled = true;
    } else if (taskName.value.length > TASK_TITLE_MAX_LENGTH) {
      taskName.setCustomValidity(`Название задачи не должно быть больше ${TASK_TITLE_MAX_LENGTH} символов. Сейчас количество символов ${taskName.value.length}.`);
      createButton.disabled = true;
    } else {
      taskName.setCustomValidity(``);
      createButton.disabled = false;
    }
    taskName.reportValidity();
  });
})();

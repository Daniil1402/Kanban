(function () {
  const cards = document.querySelector(".cards");

  const editTaskTitle = function (task) {
    const field = task.querySelector(".task__title");

    const onBlur = function (evt) {
      evt.target.contentEditable = false;
      field.style = "cursor: grub;";
      window.main.changeTitle(task, field);
    };

    let edited = false;
    if (!edited) {
      field.contentEditable = true;
      field.style = "cursor: text;";
      field.focus();
      field.addEventListener("blur", onBlur);
      edited = true;
    } else {
      field.removeEventListener("blur", onBlur);
    }
  };

  const defineTaskAction = function (task, target) {
    if (target.closest(".task__edit")) {
      editTaskTitle(task);
    }
  };

  cards.addEventListener("click", function (evt) {
    const task = evt.target.closest(".tasks__item");
    if (task) {
      defineTaskAction(task, evt.target);
    }
  });
})();

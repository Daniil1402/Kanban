(function () {
  const cards = document.querySelector(".cards");

  // const onBlur = function (evt) {
  //   evt.target.contentEditable = false;
  //   window.main.changeTitle(task, field);
  //   //console.log("1111");
  // };

  const editTaskTitle = function (task) {
    const field = task.querySelector(".task__title");

    const onBlur = function (evt) {
      evt.target.contentEditable = false;
      field.style = "cursor: all-scroll;";
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
      console.log("1111");
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

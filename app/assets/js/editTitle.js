(function () {
  const cards = document.querySelector(".cards");

  cards.addEventListener("click", function (evt) {
    let editPointer = evt.target.closest(".task__edit");
    if (editPointer) {
      let pointerTask = evt.target.closest(".tasks__item");
      let taskTitle = pointerTask.children[0];
      //console.log(taskTitle);
      taskTitle.contentEditable = true;
      taskTitle.focus();
    }
  });
})();

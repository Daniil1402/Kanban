(function () {
  const TASK_HEIGHT = 20;
  const TASK_WIDTH = 270;

  const cardsBlock = document.querySelector(".cards");
  const taskItem = cardsBlock.querySelectorAll(".tasks__item");

  cardsBlock.addEventListener("mousedown", function (evt) {
    console.log(evt.clientX);
    if (evt.buttons === 1 && evt.target.className === "tasks__item") {
      evt.preventDefault();

      evt.target.style.position = "absolute";
      evt.target.style.zIndex = 1000;

      // let stub = document.createElement("div");
      // stub.style.width = TASK_WIDTH + "px";
      // stub.style.height = TASK_HEIGHT + "px";

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      evt.target.style.left = evt.clientX - TASK_WIDTH / 2 + "px";
      evt.target.style.top = evt.clientY - TASK_HEIGHT / 2 + "px";

      let dragged = false;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        let taskTop = evt.target.offsetTop - shift.y;
        let taskLeft = evt.target.offsetLeft - shift.x;
        //let taskX = taskLeft + Math.floor(TASK_WIDTH / 2);
        //let taskY = taskTop + TASK_HEIGHT;

        evt.target.style.left = taskLeft + "px";
        evt.target.style.top = taskTop + "px";
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (dragged) {
          const onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            evt.target.removeEventListener(`click`, onClickPreventDefault);
          };
          evt.target.addEventListener(`click`, onClickPreventDefault);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });
})();

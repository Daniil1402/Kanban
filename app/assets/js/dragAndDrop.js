(function () {
  const TASK_HEIGHT = 20;
  const TASK_WIDTH = 270;

  const cardsBlock = document.querySelector(".cards");
  const inProgress = cardsBlock.querySelector(".inProgress");
  //const taskItem = cardsBlock.querySelectorAll(".tasks__item");

  let coordinatesBlocks = [];

  //console.log(cardsBlock.children);

  const getCoordinates = function () {
    for (let i = 0; i < cardsBlock.children.length; i++) {
      let rect = cardsBlock.children[i].getBoundingClientRect();
      coordinatesBlocks.push(rect);
      console.log(rect);
    }
    //console.log(coordinatesBlocks);
    return coordinatesBlocks;
  };

  // const sticking = function (x, element) {
  //   getCoordinates();
  //   for (let block of coordinatesBlocks) {
  //     let leftLimit = block.left - TASK_WIDTH / 2;
  //     let rightLimit = block.right + TASK_WIDTH / 2;
  //     if (x >= leftLimit && x <= rightLimit) {
  //       inProgress.appendChild(element);
  //     }
  //   }
  // };

  const sticking = function (x, element) {
    getCoordinates();

    for (let i = 0; i < coordinatesBlocks.length; i++) {
      let leftLimit = coordinatesBlocks[i].left - TASK_WIDTH / 2;
      let rightLimit = coordinatesBlocks[i].right + TASK_WIDTH / 2;
      if (x >= leftLimit && x <= rightLimit) {
        //let el = cardsBlock.children[i];
        cardsBlock.children[i].appendChild(element);
        break;
      }
    }
  };

  cardsBlock.addEventListener("mousedown", function (evt) {
    if (evt.buttons === 1 && evt.target.classList.contains("tasks__item")) {
      evt.preventDefault();

      evt.target.style.position = "absolute";
      evt.target.style.zIndex = 1000;
      evt.target.style.transform = "rotate(3deg)";

      const backBlock = document.createElement("div");
      backBlock.classList.add("stub");
      evt.target.after(backBlock);

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      evt.target.style.left = evt.clientX - TASK_WIDTH / 2 + "px";
      evt.target.style.top = evt.clientY - TASK_HEIGHT / 2 + "px";

      let dragged = false;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        //console.log(moveEvt.clientX);

        // if (moveEvt.clientX >= 580 && moveEvt.clientX <= 850) {
        //   inProgress.appendChild(evt.target);
        // }
        //console.log(moveEvt.clientX);

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
          const stub = document.querySelector(".stub");
          stub.remove();
          sticking(upEvt.clientX, evt.target);
          window.main.changeColor(evt.target);
          window.main.changeStatus(evt.target);

          evt.target.style.zIndex = 0;
          evt.target.style.position = "static";
          evt.target.style.transform = "none";

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

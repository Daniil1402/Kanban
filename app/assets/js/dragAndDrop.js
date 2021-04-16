(function () {
  const TASK_HEIGHT = 20;
  const TASK_WIDTH = 270;

  const cardsBlock = document.querySelector(".cards");
  const tasks = cardsBlock.querySelectorAll(".tasks__item");

  let coordinatesTasks = [];

  const getTaskCoordinates = function () {
    for (let i = 0; i < tasks.length; i++) {
      let rect = tasks[i].getBoundingClientRect();
      coordinatesTasks.push(rect);
    }
    //console.log(coordinatesTasks);
  };

  // const stickingY = function (y, element) {
  //   getTaskCoordinates();

  //   for (let i = 0; i < coordinatesTasks.length; i++) {
  //     let topBlock = coordinatesTasks[i].top + 10;
  //     let bottomBlock = coordinatesTasks[i].bottom;
  //     if (y >= topBlock && y <= bottomBlock) {
  //       var taskNumber = i;
  //       break;
  //     }
  //   }
  //   return tasks[taskNumber];
  // };

  let coordinatesBlocks = [];

  const getCoordinates = function () {
    for (let i = 0; i < cardsBlock.children.length; i++) {
      let rect = cardsBlock.children[i].getBoundingClientRect();
      coordinatesBlocks.push(rect);
    }
    return coordinatesBlocks;
  };

  const sticking = function (x, element, y) {
    getCoordinates();
    getTaskCoordinates();
    //let nextTask = stickingY(y, element);
    //console.log(nextTask);

    let blockNumber;

    for (let i = 0; i < coordinatesBlocks.length; i++) {
      let leftLimit = coordinatesBlocks[i].left - TASK_WIDTH / 2;
      let rightLimit = coordinatesBlocks[i].right + TASK_WIDTH / 2;
      if (x >= leftLimit && x <= rightLimit) {
        // cardsBlock.children[i].appendChild(element);
        blockNumber = i;
        break;
      }
    }
    //console.log(blockNumber);
    for (let i = 0; i < coordinatesTasks.length; i++) {
      let topLimit = coordinatesTasks[i].top;
      let bottomLimit = coordinatesTasks[i].bottom + 20;
      if (y >= topLimit && y <= bottomLimit) {
        // cardsBlock.children[blockNumber].appendChild(element);
        const tasksInBlock = cardsBlock.children[blockNumber].querySelectorAll(".tasks__item");
        cardsBlock.children[blockNumber].insertBefore(element, tasksInBlock[i - 1]);
        //console.log(tasksInBlock[i]);
        break;
      }
    }
  };

  const addStub = function () {
    const stub = document.createElement("div");
    stub.classList.add("stub");
    return stub;
    //element.appendChild(stub);
  };

  cardsBlock.addEventListener("mousedown", function (evt) {
    let taskPointer = evt.target.closest(".tasks__item");
    if (evt.buttons === 1 && taskPointer) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      taskPointer.style.left = evt.clientX - TASK_WIDTH / 2 + "px";
      taskPointer.style.top = evt.clientY - TASK_HEIGHT / 2 + "px";

      let dragged = false;
      let flag = false;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        taskPointer.style.position = "absolute";
        taskPointer.style.zIndex = 1000;
        taskPointer.style.transform = "rotate(3deg)";
        taskPointer.style.filter = "brightness(90%)";
        taskPointer.style.cursor = "grabbing";

        if (!flag) {
          const backBlock = document.createElement("div");
          backBlock.classList.add("stub");
          taskPointer.after(backBlock);
          flag = true;
        }

        dragged = true;

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        let taskTop = taskPointer.offsetTop - shift.y;
        let taskLeft = taskPointer.offsetLeft - shift.x;

        taskPointer.style.left = taskLeft + "px";
        taskPointer.style.top = taskTop + "px";

        sticking(moveEvt.clientX, taskPointer, moveEvt.clientY);
        window.main.changeColor(taskPointer);
        window.main.changeStatus(taskPointer);
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (dragged) {
          const stub = document.querySelector(".stub");
          stub.remove();
          // sticking(upEvt.clientX, taskPointer);
          // window.main.changeColor(taskPointer);
          // window.main.changeStatus(taskPointer);

          taskPointer.style.zIndex = 0;
          taskPointer.style.position = "static";
          taskPointer.style.transform = "none";
          taskPointer.style.filter = "brightness(100%)";
          taskPointer.style.cursor = "grab";

          const onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            taskPointer.removeEventListener(`click`, onClickPreventDefault);
          };
          taskPointer.addEventListener(`click`, onClickPreventDefault);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });
})();

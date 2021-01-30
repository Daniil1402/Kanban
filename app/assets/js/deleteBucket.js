(function () {
  const cards = document.querySelector(".cards");
  const bucket = cards.querySelector(".bucket");
  const clearButton = bucket.querySelector("#clearBucket");

  const clearBucket = function () {
    const taskItem = bucket.querySelectorAll(".tasks__item");
    for (let task of taskItem) {
      window.main.deleteObj(task);
      task.remove();
    }
  };

  clearButton.addEventListener("click", clearBucket);
})();

const getElById = (id) => document.getElementById(id);
let floors, lifts;
let q = [];
const start = (ev) => {
  ev.preventDefault();
  floors = Number(getElById("floors").value);
  lifts = Number(getElById("lifts").value);

  if (lifts >= floors) {
    console.log("lifts,floors", lifts, floors);

    alert("The no of lifts must be less than no of floors");
    return;
  }
  run();
};
const moveLif = () => {
  const freeLifts = document.getElementsByClassName("free");
  if (freeLifts.length) {
    let nearest = 999999;
    const currFloor = q.shift();
    let nearestTag = null;
    for (let j = 0; j < freeLifts.length; j++) {
      const currLevel = freeLifts[j].getAttribute("level");

      if (nearest > Math.abs(currFloor - Number(currLevel))) {
        nearest = Math.min(nearest, Math.abs(currFloor - Number(currLevel)));
        nearestTag = freeLifts[j];
      }
    }
    if (
      !nearestTag &&
      Number(freeLifts[0].getAttribute("level")) === Number(currFloor)
    ) {
      nearestTag = freeLifts[0];
    }
    nearestTag.classList.remove("free");
    nearestTag.classList.remove("animation");
    console.log(
      'currFloor - nearestTag.getAttribute("level")',
      currFloor - nearestTag.getAttribute("level")
    );
    const timeToMove =
      2 * (Math.abs(currFloor - nearestTag.getAttribute("level")) + 1);
    nearestTag.style.transition = "bottom " + timeToMove + "s linear";
    nearestTag.style.bottom = (floors - currFloor - 1) * 101 + "px";

    nearestTag.setAttribute("level", currFloor);

    setTimeout(() => {
      setTimeout(() => {
        nearestTag.classList.add("free");

        if (q.length) {
          moveLif();
        }
      }, 3000);
      nearestTag.classList.add("animation");
    }, timeToMove * 1000);
  }
};

const run = () => {
  getElById("back").style.display = "block";
  const game_box = getElById("game_box");
  game_box.innerHTML = null;
  for (let i = 0; i < floors; i++) {
    const floor = document.createElement("div");
    floor.classList.add("floor");
    // floor.classList.add("floor");
    floor.setAttribute("level", i + 1);
    const side = document.createElement("div");
    const upBtn = document.createElement("button");
    const downBtn = document.createElement("button");
    upBtn.innerText = "Up";
    downBtn.innerText = "Down";
    upBtn.addEventListener("click", () => {
      q.push(i + 1);
      moveLif();
    });
    downBtn.addEventListener("click", () => {
      q.push(i + 1);
      moveLif();
    });

    side.appendChild(upBtn);
    side.appendChild(downBtn);
    side.style.width = "100px";
    floor.appendChild(side);
    game_box.appendChild(floor);
  }
  // const
  const liftContainer = document.createElement("div");
  liftContainer.classList.add("lift-container");
  for (let i = 0; i < lifts; i++) {
    const lift = document.createElement("div");
    lift.classList.add("lift");
    lift.classList.add("free");
    lift.setAttribute("level", Number(floors));
    lift.style.width = 100 + "px";
    lift.style.bottom = "-100px";
    lift.style.left =
      (window.innerHeight > 700 ? 0 : 12) + 10 * (i + 1) + i * 10 + "%";

    const leftSide = document.createElement("div");
    // const rightSide = document.createElement("div");
    leftSide.classList.add("leftSide");

    // rightSide.classList.add("rightSide");
    lift.appendChild(leftSide);
    // lift.appendChild(rightSide);
    lift.classList.add("lift");
    liftContainer.appendChild(lift);
  }
  getElById("game_box").appendChild(liftContainer);
};
const restartGame = () => {
  q=[]
  getElById("back").style.display = "none";
  const gameBox = getElById("game_box");
  gameBox.innerHTML = null;

  const gameOuter = document.createElement("div");
  gameOuter.classList.add("game_outer");
  gameBox.append(gameOuter);

  const form = document.createElement("form");
  // gameInner.classList.add("game_inner");
  form.onsubmit = start;
  gameOuter.appendChild(form);

  const gameInner = document.createElement("div");
  gameInner.classList.add("game_inner");
  form.appendChild(gameInner);

  const liftsLabel = document.createElement("label");
  liftsLabel.setAttribute("for", "lifts");
  liftsLabel.innerText = "Lifts";
  gameInner.appendChild(liftsLabel);

  const liftsInput = document.createElement("input");
  liftsInput.id = "lifts";
  liftsInput.classList.add("floor_input");
  liftsInput.setAttribute("placeholder", "Lifts");
  liftsInput.setAttribute("required", "true");
  liftsInput.setAttribute("type", "number");
  liftsInput.setAttribute("max",10);
  liftsInput.setAttribute("min", "1");
  gameInner.appendChild(liftsInput);
  gameInner.appendChild(document.createElement("br"));

  const floorsLabel = document.createElement("label");
  floorsLabel.setAttribute("for", "floors");
  floorsLabel.innerText = "Floors";
  gameInner.appendChild(floorsLabel);

  const floorsInput = document.createElement("input");
  floorsInput.id = "floors";
  floorsInput.classList.add("floor_input");
  floorsInput.setAttribute("placeholder", "Floors");
  floorsInput.setAttribute("required", true);
  floorsInput.setAttribute("type", "number");

  floorsInput.setAttribute("max", "10");
  floorsInput.setAttribute("min", "2");
  gameInner.appendChild(floorsInput);
  gameInner.appendChild(document.createElement("br"));

  const btn = document.createElement("button");
  btn.classList.add("floor_input");
  btn.innerText = "Submit";
  btn.type = "submit";
  // btn.onclick = start;
  gameInner.appendChild(btn);
};
window.onload = () => {
  restartGame();
};

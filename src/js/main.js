const getElById = (id) => document.getElementById(id);
let floors, lifts;
const q = {};
const start = () => {
  floors = getElById("floors").value;
  lifts = getElById("lifts").value;
  if (lifts > 4) {
    getElById("alert").innerText = "Reduce the no of lifts";
    return;
  }
  if (floors > 10) {
    getElById("alert").innerText = "Reduce the no of floors";
    return;
  }
  if (lifts >= floors) {
    console.log("lifts,floors", lifts, floors);
    getElById("alert").innerText =
      "The no of lifts must be less than no of floors";
    return;
  }
  run();
};
const moveLif = (currFloor) => {
  const freeLifts = document.getElementsByClassName("free");
  if (freeLifts.length && !q[currFloor].moving) {
    q[currFloor] = { moving: true };
    let nearest = 999999;
    let nearestTag = null;
    for (let j = 0; j < freeLifts.length; j++) {
      const currLevel = freeLifts[j].getAttribute("level");
      console.log("currLevel", currLevel, currFloor);
      if (nearest > Math.abs(currFloor - Number(currLevel))) {
        nearest = Math.min(nearest, Math.abs(currFloor - Number(currLevel)));
        nearestTag = freeLifts[j];
      }
      if (Number(currLevel) === Number(currFloor)) {
        nearest = Math.min(nearest, Math.abs(currFloor - Number(currLevel)));
        nearestTag = freeLifts[j];
        break;
      }
    }

    nearestTag.classList.remove("free");
    nearestTag.classList.remove("animation");
    nearestTag.style.bottom = (floors - currFloor) * 101 + "px";

    nearestTag.setAttribute("level", currFloor);

    setTimeout(() => {
      setTimeout(() => {
        nearestTag.classList.add("free");

        const newDest = Object.entries(q).find((n) => !n[1].moving);

        console.log("newDest", newDest);
        delete q[currFloor];
        if (newDest) {
          // q[newDest[0] - 1] = { moving: true };
          moveLif(newDest[0]);
        }
      }, 3000);
      nearestTag.classList.add("animation");
    }, 3000);
  }
};
const run = () => {
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
      if (q[i + 1]) {
        return;
      }
      q[i + 1] = {};
      moveLif(i + 1);
    });
    downBtn.addEventListener("click", () => {
      if (q[i + 1]) {
        return;
      }
      q[i + 1] = {};
      moveLif(i + 1);
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
    lift.setAttribute("level", Number(floors) + 1);
    lift.style.width = 100 + "px";
    lift.style.bottom = "-100px";
    lift.style.left = (90 / lifts) * (i + 1) + "%";

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

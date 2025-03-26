var wallet = document.getElementById("wallet");
var card = document.getElementById("card");
var outputDiv = document.getElementById("outputDiv");
var rgCircle = document.querySelectorAll(".rgCircle");

wallet.addEventListener("click", showCard);
var overAllSpeed = 0;
// var reSpeed = 0;
var letStop = 0;

function showCard() {
  card.style.display = "block";
  card.style.position = "absolute";
  card.style.top = "-1%";
  card.addEventListener("click", goToSwipe);
}

function goToSwipe() {
  wallet.removeEventListener("click", showCard);
  card.style.top = "-65%";
  card.style.left = "-40%";
  dragElement(card);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    // console.log(reSpeed, overAllSpeed);
    // if (reSpeed == overAllSpeed - 1 && reSpeed != 0) {
    //   console.log("here");
    //   overAllSpeed += 30;
    // }
    if (elmnt.offsetLeft <= 450 && elmnt.offsetLeft >= -215) {
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      letStop = elmnt.offsetLeft;
      // reSpeed = overAllSpeed;
      overAllSpeed++;

     }
}

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    card.style.left = "-40%";
    if (letStop <= 440) {
      outputDiv.innerHTML = "BAD READ. TRY AGAIN.";
      wrongC();
    } else if (overAllSpeed >= 25 && overAllSpeed <= 65) {
      outputDiv.innerHTML = "ACCEPTED. THANK YOU.";
      rightC();
    } else if (overAllSpeed < 25) {
      outputDiv.innerHTML = "TOO FAST. TRY AGAIN.";
      wrongC();
    } else if (overAllSpeed > 65) {
      outputDiv.innerHTML = "TOO SLOW. TRY AGAIN.";
      wrongC();
    }
    overAllSpeed = 0;
  }
}

function wrongC() {
  document.getElementById("failedSound").currentTime = 0.5;
  document.getElementById("failedSound").play();
  rgCircle[0].style.backgroundColor = "rgb(191, 5, 4, 255)";
  setTimeout(function() {
    rgCircle[0].style.backgroundColor = "rgb(114, 2, 2, 255)";
  }, 500);
}

function rightC() {
  document.getElementById("completedSound").currentTime = 0.25;
  document.getElementById("completedSound").play();
  let firstD = document.createElement("div");
  document.body.appendChild(firstD);
  firstD.classList.add("blackUp");
  firstD.addEventListener("click", function(event) {
    event.stopPropagation();
  });
  let secondD = document.createElement("div");
  firstD.appendChild(secondD);
  secondD.classList.add("whiteUp");
  let xBox = document.createElement("div");
  secondD.appendChild(xBox);
  xBox.classList.add("xBox");
  xBox.innerHTML = "X";
  xBox.addEventListener("click", function() {
    firstD.innerHTML = "";
    document.body.removeChild(firstD);
    outputDiv.innerHTML = "PLEASE SWIPE CARD";
  });
  let taskC = document.createElement("div");
  secondD.appendChild(taskC);
  taskC.innerHTML = "Task Completed!";
  taskC.style.display = "block";
  let aroundBDiv = document.createElement("div");
  secondD.appendChild(aroundBDiv);
  let firstB = document.createElement("button");
  firstB.innerHTML = "Go Back to See All Tasks";
  firstB.addEventListener("click", function() {
    location.replace("../index.html");
  });
  let secondB = document.createElement("button");
  secondB.innerHTML = "View the Next Common Task";
  secondB.addEventListener("click", function() {
    // location.replace("")
  });
  aroundBDiv.appendChild(firstB);
  aroundBDiv.appendChild(secondB);
  rgCircle[1].style.backgroundColor = "rgb(14, 236, 0, 255)";
  setTimeout(function() {
    rgCircle[1].style.backgroundColor = "rgb(0, 203, 11, 255)";
  }, 500);
}

let upperP = document.getElementById("upperP");
let lowerP = document.getElementById("lowerP");
let manifoldsSounds = document.getElementById("manifoldsSounds");
let randA = [];
let randMin = 0;

getReady();

function getReady() {
  for (let j = 0; j < 100; j++) {
    randA = [];
    for (let i = 0; i < 10; i++) {
      keepR();
    }
  }
  
  for (let i = 0; i < randA.length; i++) {
    let newD = document.createElement("div");
    newD.classList.add("numbD");
    newD.innerHTML = randA[i];
    newD.thisN = randA[i];
    newD.addEventListener("click", correctOrder);
    if (i <= 4) {
      upperP.appendChild(newD);
    } else {
      lowerP.appendChild(newD);
    }
  }
}

function keepR() {
  let newR = Math.floor(Math.random() * 10) + 1;
  if (!randA.includes(newR)) {
      randA.push(newR);
  } else {
    keepR();
  }
}

function correctOrder() {
  let whatC = this;
  console.log(whatC.style.backgroundColor);
  if (whatC.style.backgroundColor != "rgb(38, 180, 102)") {
    if (whatC.thisN == randMin + 1) {
      whatC.style.backgroundColor = "rgb(38, 180, 102, 255)";
      randMin++;
      if (randMin == 10) {
        taskComp();
      } else {
        manifoldsSounds.src="manifolds" + randMin + ".mp3";
        manifoldsSounds.play();
      }
    } else {
      manifoldsSounds.src = "manifoldsWrong.mp3";
      manifoldsSounds.play();
      for (let i = 0; i < 3; i++) {
        setTimeout(function() {
        whatC.style.backgroundColor = "rgb(161, 58, 98, 255)";
        setTimeout(function() {
          whatC.style.backgroundColor = "rgb(162, 179, 224, 255)";
        }, 350);
        }, 350);
      }
      setTimeout(function() {
        resetBoxes();
      }, 1000)
    }
  }
}

function taskComp() {
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
    resetBoxes();
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
    location.replace("index.html");
  });
  let secondB = document.createElement("button");
  secondB.innerHTML = "View the Next Short Task";
  secondB.addEventListener("click", function() {
    // location.replace("")
  });
  aroundBDiv.appendChild(firstB);
  aroundBDiv.appendChild(secondB);
  document.getElementById("compA").play();
}

function resetBoxes() {
  for (let i = 0; i < document.querySelectorAll(".numbD").length; i++) {
    document.querySelectorAll(".numbD")[i].style.backgroundColor = "rgb(162, 179, 224, 255)";
    }
    randMin = 0;
}



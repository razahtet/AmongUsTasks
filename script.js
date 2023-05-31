let tabSelect = document.getElementById("tabSelect");
let commonTasksDiv = document.getElementById("commonTasksDiv");
let shortTasksDiv = document.getElementById("shortTasksDiv");

for (let i = 0; i < tabSelect.children.length; i++) {
  tabSelect.children[i].addEventListener("click", showSelectable);
}

function showSelectable() {
  for (let i = 0; i < tabSelect.children.length; i++) {
    tabSelect.children[i].style.borderColor = "crimson";
  }
  this.style.borderColor = "white";
  
  if (this.getAttribute("id") == "commonTasksButton") {
    hideShowElements("inline-block", "none", "none");
  } else if (this.getAttribute("id") == "shortTasksButton") {
    hideShowElements("none", "inline-block", "none");
  } else if (this.getAttribute("id") == "longTasksButton") {
    hideShowElements("none", "none", "inline-block");
  }
}

function hideShowElements(commonS, shortS, longS) {
  commonTasksDiv.style.display = commonS;
  shortTasksDiv.style.display = shortS;
  // tabSelect.children[2].style.display = longS;
}

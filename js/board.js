const STORAGE_TOKEN = "LBRCE7ZOJGJE5A61XE03E0RA3FUCZKJ11X9OKHSK";
let STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let cardsToDo = [];
let cardsInProgress = [];
let cardsAwaitFeedback = [];
let cardsDone = [];
let cardsUrgent = [];
let allTasks = [];
let tasksColumn;
let doneSubtasks = 0;

function init() {
  includeHTML();
  load();
  renderCards();
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

/**
 * Diese funktion rendert alle Spalten nacheinander
 *
 */
function renderCards() {
  renderToDoCards();
  renderInProgressCards();
  renderAwaitFeedbackCards();
  renderDoneCards();
}

function renderToDoCards() {
  let toDoContainer = document.getElementById("toDoContainer");
  toDoContainer.innerHTML = '';
  
  for (let i = 0; i < cardsToDo.length; i++) {
    const task = cardsToDo[i]
    toDoContainer.innerHTML += generateCardHTML(task, i);
    renderUsers(i);
    categoryColor(i);
  }
}

function renderInProgressCards(numberContainer) {
  let inProgressContainer = document.getElementById("inProgressContainer");
  inProgressContainer.innerHTML = '';
  
  for (let i = 0; i < cardsInProgress.length; i++) {
    const task = cardsInProgress[i]
    inProgressContainer.innerHTML += generateCardHTML(task, i);
    renderUsers(i);
  }
}

function renderAwaitFeedbackCards(numberContainer) {
  let awaitFeedbackContainer = document.getElementById("awaitFeedbackContainer");
  awaitFeedbackContainer.innerHTML = '';
  
  for (let i = 0; i < cardsAwaitFeedback.length; i++) {
    const task = cardsAwaitFeedback[i]
    awaitFeedbackContainer.innerHTML += generateCardHTML(task, i);
    renderUsers(i);
  }
}

function renderDoneCards(numberContainer) {
  let doneContainer = document.getElementById("doneContainer");
  doneContainer.innerHTML = '';
  
  for (let i = 0; i < cardsDone.length; i++) {
    const task = cardsDone[i]
    doneContainer.innerHTML += generateCardHTML(task, i);
    renderUsers(i);
  }
}

function renderUsers(i) {
  let userContainer = document.getElementById(`userContainer${i}`);
  userContainer.innerHTML = '';

  for (let j = 0; j < cardsToDo[i].users.length; j++) {
    const user = cardsToDo[i].users[j];

    userContainer.innerHTML += `
      <div class="user-initials" style="background-color: ${user.color};">
        ${user.initials}
      </div>
    `;
  }
}

function renderPopupUsers(i) {
  let userContainer = document.getElementById(`popupUserContainer${i}`);
  userContainer.innerHTML = '';

  for (let j = 0; j < cardsToDo[i].users.length; j++) {
    const user = cardsToDo[i].users[j];

    userContainer.innerHTML += `
      <div class="user-initials" style="background-color: ${user.color};">
        ${user.initials}
      </div>
    `;
  }
}

function renderPopupSubtasks(i) {
  let subtaskContainer = document.getElementById(`task-popup-subtask-container${i}`);
  subtaskContainer.innerHTML = '';

  for (let j = 0; j < cardsToDo[i]['subtasks'].length; j++) {
    const subtask = cardsToDo[i].subtasks[j];

    subtaskContainer.innerHTML += `
      <div class="popup-subtask-container">
        <div><input type="checkbox" id="subtaskCheckbox${i}_${j}" value="${subtask}" onclick="toggleSubtask(${i}, ${j})"></div>
        <div>${subtask}</div>
      </div>
    `;
  }
}

function toggleSubtask(i, j) {
  const subtaskCheckbox = document.getElementById(`subtaskCheckbox${i}_${j}`);
  const doneSubtasksContainer = document.getElementById(`doneSubtasks${i}`);

  if (subtaskCheckbox.checked) {
    doneSubtasksContainer.innerHTML = parseInt(doneSubtasksContainer.innerHTML) + 1;
  } else {
    doneSubtasksContainer.innerHTML = parseInt(doneSubtasksContainer.innerHTML) - 1;
  }
  generateProgressbar(i);
}

function generateCardHTML(task, i) {
  return /*html*/ `
    <div draggable="true" class="card" id="card${task['id']}" onclick="openTaskPopup(${i})">
        <div class="small-card-category" id="category${i}">${task['category']}</div>
        <h3>${task['title']}</h3>
        <p>${task['description']}</p>
        <div class="subtasks-info">
          <div class="progressbar">
            <div id="subtaskProgressbar${i}" class="subtaskProgressbar" style="width:0%"></div>
          </div>
          <p id="doneSubtasks${i}">${doneSubtasks}</p>/${task['subtasks'].length} Subtasks
        </div>
        <div class="card-bottom-section">
          <div class="userContainer" id="userContainer${i}">
          </div>
          <div>${task['prio']}</div>
        </div>
    </div>
    `;
}

function generateProgressbar(i) {
  let progressbar = document.getElementById(`subtaskProgressbar${i}`);
  let amountSubtasks = parseInt(cardsToDo[i]['subtasks'].length);
  let amountDoneSubtasks = parseInt(document.getElementById(`doneSubtasks${i}`).innerHTML);

  progressbar.style.width = ((amountDoneSubtasks/amountSubtasks)*100) + "%";
}

function categoryColor(i) {
  let categoryElement = document.getElementById(`category${i}`);
  let category = document.getElementById(`category${i}`).innerHTML;

  if(category === 'Technical Task') {
    categoryElement.style.backgroundColor = '#1FD7C1';
  } else if(category === 'User Story') {
    categoryElement.style.backgroundColor = '#0038FF';
  } else if(category === 'Feature') {
    categoryElement.style.backgroundColor = '#FF7A00';
  } else if(category === 'Bug') {
    categoryElement.style.backgroundColor = '#FF4646';
  } else if(category === 'Documentation') {
    categoryElement.style.backgroundColor = '#6E52FF';
  } else if(category === 'Design') {
    categoryElement.style.backgroundColor = '#00BEE8';
  } else if(category === 'Testing QA') {
    categoryElement.style.backgroundColor = '#FFE62B';
  } else if(category === 'Analyse/Research') {
    categoryElement.style.backgroundColor = '#C3FF2B';
  }
}

function popupCategoryColor(i) {
  let categoryElement = document.getElementById(`popupCategory${i}`);
  let category = document.getElementById(`popupCategory${i}`).innerHTML;

  if(category === 'Technical Task') {
    categoryElement.style.backgroundColor = '#1FD7C1';
  } else if(category === 'User Story') {
    categoryElement.style.backgroundColor = '#0038FF';
  } else if(category === 'Feature') {
    categoryElement.style.backgroundColor = '#FF7A00';
  } else if(category === 'Bug') {
    categoryElement.style.backgroundColor = '#FF4646';
  } else if(category === 'Documentation') {
    categoryElement.style.backgroundColor = '#6E52FF';
  } else if(category === 'Design') {
    categoryElement.style.backgroundColor = '#00BEE8';
  } else if(category === 'Testing QA') {
    categoryElement.style.backgroundColor = '#FFE62B';
  } else if(category === 'Analyse/Research') {
    categoryElement.style.backgroundColor = '#C3FF2B';
  }
}

function openAddTask(taskContainer) {
  tasksColumn = taskContainer;
  let addTaskTemplate = document.getElementById("addTaskTemplate");
  let overlay = document.getElementById("overlayAddTask");
  let buttonContainer = document.getElementById("buttonContainer");
  addTaskTemplate.style.display = "flex";
  overlay.style.display = "block";
  //overlay.addEventListener("click", closeContactPopupByOverlay);
  buttonContainer.innerHTML = '';
  buttonContainer.innerHTML += generateButtonAddTaskHTML();
}

function generateButtonAddTaskHTML() {
  return /*html*/ `
        <img onclick="closeAddTaskPopup()" class="add-contact-close" src="./assets/icons/Close.png" alt="">

    <div>
      <button class="clear-button">Clear <img src="./assets/icons/close.png" alt="X"></button>
      <button class="task-button" onclick="createTask(tasksColumn)">Create Task <img src="./assets/icons/check.png" alt="OK"></button>
    </div>
  `;
}

function closeAddTaskPopup() {
  let addTaskTemplate = document.getElementById("addTaskTemplate");
  let overlay = document.getElementById("overlay");
  addTaskTemplate.style.display = "none";
  overlay.style.display = "none";
}

function openTaskPopup(i) {
  let taskContainer = document.getElementById('taskPopup');
  taskContainer.innerHTML = '';
  taskContainer.style.display = 'flex';
  const task = cardsToDo[i];
  taskContainer.innerHTML = taskPopup(task, i);
  renderPopupUsers(i);
  renderPopupSubtasks(i);
  popupCategoryColor(i);
}

function taskPopup(task ,i) {
  return `
    <div class="task-popup-top-section">
      <div class="popupCategory" id="popupCategory${i}">${task['category']}</div>
      <img src="./assets/icons/subtask_icons/close.png" alt="X" onclick="closeTaskPopup()">
    </div>
    <h3>${task['title']}</h3>
    <p>${task['description']}</p>
    <p>Due Date: ${task['dueDate']}</p>
    <p>Priority: ${task['prio']}</p>
    <div class="userContainer" id="popupUserContainer${i}"></div>
    <div id="task-popup-subtask-container${i}">
      <span>Subtasks</span>
    </div>
    <div class="task-popup-bottom-section">
      <div><img src="./assets/icons/subtask_icons/delete.png" alt="DEL">Delete</div>
      <img src="./assets/icons/mini_seperator.png" alt="/">
      <div><img src="./assets/icons/subtask_icons/edit.png" alt="EDIT">Edit</div>
    </div>
  `;
}

function closeTaskPopup() {
  let taskContainer = document.getElementById('taskPopup');
  taskContainer.style.display = 'none';
}


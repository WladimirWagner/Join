const STORAGE_URL = "https://join-gruppenarbeit-default-rtdb.europe-west1.firebasedatabase.app/";

let currentUser = null;

async function postData(path = "", data = {}) {
  let response = await fetch(STORAGE_URL + path + ".json", {
    method: 'POST',
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  return responseToJson = await response.json();
}

async function getData(path = "") {
  let response = await fetch(STORAGE_URL + path + ".json");
  return responseToJson = await response.json();
}

async function deleteData(path = "") {
  let response = await fetch(STORAGE_URL + path + ".json", {
    method: 'DELETE',
  });
  return responseToJson = await response.json();
}






async function loadUsers() {
  let loadedUsers = await getData("/users");
  for (const key in loadedUsers) {
    if (Object.hasOwnProperty.call(loadedUsers, key)) {
      users.push(loadedUsers[key]);
    }
  }
}

async function loadCurrentUsers() {
  let loadedCurrentUser = await getData("/currentUser")
  for (const key in loadedCurrentUser) {
    if (Object.hasOwnProperty.call(loadedCurrentUser, key)) {
      currentUser = loadedCurrentUser;
    }
  }
}
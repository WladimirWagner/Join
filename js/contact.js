let contacts = [
  {
    name: "Anna Schmidt",
    email: "anna.schmidt@example.com",
    phone: "+491234567891",
    id: 0,
  },
  {
    name: "Peter Müller",
    email: "peter.mueller@example.com",
    phone: "+491234567892",
    id: 1,
  },
  {
    name: "Julia Wagner",
    email: "julia.wagner@example.com",
    phone: "+491234567893",
    id: 2,
  },
  {
    name: "Markus Meier",
    email: "markus.meier@example.com",
    phone: "+491234567894",
    id: 3,
  },
  {
    name: "Lisa Fischer",
    email: "lisa.fischer@example.com",
    phone: "+491234567895",
    id: 4,
  },
  {
    name: "Michael Schulz",
    email: "michael.schulz@example.com",
    phone: "+491234567896",
    id: 5,
  },
  {
    name: "Sarah Richter",
    email: "sarah.richter@example.com",
    phone: "+491234567897",
    id: 6,
  },
  {
    name: "Stefan Becker",
    email: "stefan.becker@example.com",
    phone: "+491234567898",
    id: 7,
  },
  {
    name: "Maria Keller",
    email: "maria.keller@example.com",
    phone: "+491234567899",
    id: 8,
  },
  {
    name: "Thomas Weber",
    email: "thomas.weber@example.com",
    phone: "+491234567800",
    id: 9,
  },
  {
    name: "Laura Schäfer",
    email: "laura.schaefer@example.com",
    phone: "+491234567801",
    id: 10,
  },
  {
    name: "Andreas Neumann",
    email: "andreas.neumann@example.com",
    phone: "+491234567802",
    id: 11,
  },
  {
    name: "Sandra Schwarz",
    email: "sandra.schwarz@example.com",
    phone: "+491234567803",
    id: 12,
  },
  {
    name: "Patrick Hoffmann",
    email: "patrick.hoffmann@example.com",
    phone: "+491234567804",
    id: 13,
  },
  {
    name: "Nicole Lehmann",
    email: "nicole.lehmann@example.com",
    phone: "+491234567805",
    id: 14,
  },
  {
    name: "Christian Zimmermann",
    email: "christian.zimmermann@example.com",
    phone: "+491234567806",
    id: 15,
  },
  {
    name: "Jessica Braun",
    email: "jessica.braun@example.com",
    phone: "+491234567807",
    id: 16,
  },
  {
    name: "Daniel Wagner",
    email: "daniel.wagner@example.com",
    phone: "+491234567808",
    id: 17,
  },
  {
    name: "Melanie Schmitt",
    email: "melanie.schmitt@example.com",
    phone: "+491234567809",
    id: 18,
  },
];

let firstLetterArray = [];
let foundContacts = [];

function initContact() {
  includeHTML();
  renderContacts();
}

/**
 * renderContacts() reads all function to create the perfect contact list
 *
 */
function renderContacts() {
  sortContacts();
  extractInitials(contacts);
  randomBackgroundColor();
  orderFirstLetter();
  findContactsByFirstLetter();
  renderContactListAlphabet();
}

/**
 * This function sort all contacts from the JSON Array contacts
 *
 * @returns This function compairs each contact if the name comes before or after or at the same place in the alphabet and returns sortet contacts
 */
function sortContacts() {
  contacts.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return contacts;
}

/**
 * This function get the first letter of each name and sirname
 *
 * @param {JSON Array} contactList
 */
function extractInitials(contactList) {
  for (let i = 0; i < contactList.length; i++) {
    let contact = contactList[i];
    let names = contact.name.split(" ");
    let firstNameInitial = names[0].charAt(0).toUpperCase();
    let lastNameInitial = names[names.length - 1].charAt(0).toUpperCase();
    contact.initials = firstNameInitial + lastNameInitial;
  }
}

/**
 * This function gives every contact a random color
 *
 */
function randomBackgroundColor() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let red = Math.floor(Math.random() * 128) + 128; // Wert zwischen 128 und 255 für eine hellere Farbe
    let green = Math.floor(Math.random() * 128) + 128; // Wert zwischen 128 und 255 für eine hellere Farbe
    let blue = Math.floor(Math.random() * 128) + 128; // Wert zwischen 128 und 255 für eine hellere Farbe
    let color = "#" + red.toString(16) + green.toString(16) + blue.toString(16);
    contact.color = color;
  }
}

function orderFirstLetter() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let firstLetter = contact.name.charAt(0);
    if (!firstLetterArray.includes(firstLetter)) {
      firstLetterArray.push(firstLetter);
    }
  }
}

function findContactsByFirstLetter() {
  for (let i = 0; i < firstLetterArray.length; i++) {
    let firstLetter = firstLetterArray[i];
    let contactsWithFirstLetter = [];
    for (let j = 0; j < contacts.length; j++) {
      let contact = contacts[j];
      if (contact.name.charAt(0).toUpperCase() === firstLetter) {
        contactsWithFirstLetter.push(contact);
      }
    }
    if (contactsWithFirstLetter.length > 0) {
      foundContacts.push({
        letter: firstLetter,
        contacts: contactsWithFirstLetter,
      });
    }
  }
  return foundContacts;
}

function renderContactListAlphabet() {
  let scrollableContainer = document.getElementById("scrollable-container");
  scrollableContainer.innerHTML = "";
  scrollableContainer.innerHTML += createButtonAddContact();
  for (let i = 0; i < foundContacts.length; i++) {
    let foundcontact = foundContacts[i];
    scrollableContainer.innerHTML +=
      generateContactAlphabetListHTML(foundcontact);
    let alphabetListBox = document.getElementById(
      `alphabetList${foundcontact.letter}`
    );
    alphabetListBox.innerHTML = "";
    for (let j = 0; j < foundcontact.contacts.length; j++) {
      let eachFoundContact = foundcontact.contacts[j];
      alphabetListBox.innerHTML += generateContactListHTML(eachFoundContact);
    }
  }
}

function createButtonAddContact() {
  return /*html*/ `
    <button onclick="openAddContact()" class="add-new-contact-btn">Add new contact <img src="./assets/img/person_add.svg" alt=""></button>
  `;
}

function generateContactAlphabetListHTML(foundcontact) {
  return /*html*/ `
        <div>
            <h3 class="alphabet-letter">${foundcontact.letter}</h3>
            <div class="line-lightgray"></div>
            <div id="alphabetList${foundcontact.letter}"></div>
        </div>
    `;
}

/**
 * This function create for each contact a container
 *
 * @param {Array} contact
 * @returns div container
 */
function generateContactListHTML(contact) {
  return /*html*/ `
        <div class="contact" onclick="openContact(${contact.id})">
            <div 
            class="initialien-round-container" 
            style="background-color: ${contact.color};">${contact.initials}
            </div>
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-email">${contact.email}</div>
            </div>
        </div>
    `;
}

function findContactById(id) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      return contacts[i];
    }
  }
  return null;
}

function openContact(id) {
  let klickedContact = findContactById(id);
  let contactBoxName = document.getElementById("contactBoxName");
  let contactInformation = document.getElementById("contactInformation");
  contactBoxName.innerHTML = "";
  contactBoxName.innerHTML += generateContactBoxHTML(klickedContact);
  contactInformation.innerHTML = "";
  contactInformation.innerHTML += displayContactInfo(klickedContact);
}

function generateContactBoxHTML(contact) {
  return /*html*/ `
        <div 
          class="initialien-big-round-container white-border" 
          style="background-color: ${contact.color};">${contact.initials}
        </div>
        <div class="contact-box-name-container">
          <p class="contact-box-name">${contact.name}</p>
          <div class="contact-box-edit-delete">
            <div id="edit">
              <img src="../assets/img/edit.svg" alt="">
              <p>Edit</p>
            </div>
            <div id="delete">
              <img src="../assets/img/delete.svg" alt="">
              <p>Delete</p>
            </div>
          </div>
        </div>
        
    `;
}

function displayContactInfo(klickedContact) {
  return /*html*/ `
    <div class="contact-information">
      <p class="contact-info-headline">Contact Information</p>
      <p class="bold">Email</p>
      <p class="email">${klickedContact.email}</p>
      <p class="bold">Phone</p>
      <p class="phonenumber">${klickedContact.phone}</p>
    </div>
  `;
}

function openAddContact() {
  let addContact = document.getElementById('addContact');

  addContact.style.display = 'block'
}

function closeAddContact() {
  let addContact = document.getElementById('addContact');

  addContact.style.display = 'none'
}
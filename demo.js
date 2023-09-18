const users = [];
let userIdCounter = 0;
let editMode = false;
let editSubmissionId = null;

function handleFileInputChange() {
  const fileInput = document.getElementById("avatar");
  const imagePreview = document.getElementById("image");

  const selectedFile = fileInput.files[0];
  let imageURL = ""; // Declare imageURL here

  if (selectedFile) {
    imageURL = URL.createObjectURL(selectedFile);

    imagePreview.src = imageURL;
    imagePreview.style.display = "block";
  } else {
    imageURL = "";
    imagePreview.src = "";
    imagePreview.style.display = "none";
  }
}

document
  .getElementById("avatar")
  .addEventListener("change", handleFileInputChange);

function generateTable() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const password = document.getElementById("password").value;
  const cpassword = document.getElementById("cpassword").value;
  const fileInput = document.getElementById("avatar");
  const imageForm = document.getElementById("image").getAttribute("src");
  const imageToShow = document.getElementById("image");

  if (
    name !== "" &&
    email !== "" &&
    password !== "" &&
    cpassword !== "" &&
    gender !== ""
  ) {
    if (password === cpassword) {
      var newUser = {
        name: name,
        email: email,
        gender: gender,
        password: password,
        cpassword: cpassword,
        image: imageForm,
      };

      //working with Date()
      const now = new Date();
      const hours = now.getHours();
      newUser.dateTime = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()} ${hours}:${now.getMinutes()}`;

      if (editMode) {
        updateUser(newUser, editSubmissionId);
        editMode = false;
        editSubmissionId = null;
      } else {
        userIdCounter++;
        users.push(newUser);
        console.log(users);

        //generate table
        var tableRow = generateTableRow(newUser, users.length - 1);
        document
          .getElementById("userData")
          .insertAdjacentHTML("beforeend", tableRow);
        document.getElementById("tableData").style.display = "block";
        document.getElementById("submitForm").reset();
        fileInput.value = "";
        imageToShow.style.display = "none";

        saveUserToLocalStorage();
      }
    } else {
      alert("Please check confirm password");
    }
  } else {
    alert("Please provide correct credentials");
  }
}

document.getElementById("submitForm").addEventListener("submit", function (e) {
  e.preventDefault();
  generateTable();
});

let serial = 0;

function generateTableRow(newUser, index) {
  ++serial;

  let tableRow =
    "<tr> <td>" +
    serial +
    "</td> <td>" +
    "<img id='tableImg' src='" +
    newUser.image +
    "' alt='Profile Image' style='max-width: 100px; border-radius: 50%;' />" +
    "</td><td>" +
    newUser.name +
    "</td><td>" +
    newUser.email +
    "</td><td>" +
    newUser.gender +
    "</td><td>" +
    newUser.dateTime +
    "</td><td><button class='editButton' onclick='editUser(" +
    index +
    ")'>Edit</button><button class='deleteButton' onclick='deleteUser( " +
    index +
    "  )'>Delete</button></td></tr>";

  saveUserToLocalStorage();

  return tableRow;
}

function editUser(id) {
  const userToEdit = users[id];
  if (userToEdit) {
    console.log(document.getElementById("userData"));
    document.getElementById("name").value = userToEdit.name;
    document.getElementById("email").value = userToEdit.email;
    document.querySelector(
      `input[name="gender"][value="${userToEdit.gender}"]`
    ).checked = true;
    editMode = true;
    editSubmissionId = id;

    // Set the imageURL for the image preview
    // const fileInput = document.getElementById("avatar");
    const imagePreview = document.getElementById("image");
    imagePreview.src = userToEdit.image;
    console.log(imagePreview);
    imagePreview.style.display = "block";
  }
}

function updateUser(newUser, editSubmissionId) {
  const userToUpdate = users[editSubmissionId];
  if (userToUpdate) {
    userToUpdate.name = newUser.name;
    userToUpdate.email = newUser.email;
    userToUpdate.gender = newUser.gender;
    userToUpdate.dateTime = newUser.dateTime;
    userToUpdate.image = newUser.image;
    console.log(userToUpdate.image);

    const row = document.querySelector(
      `#userData tr:nth-child(${editSubmissionId + 1})`
    );
    const cellToUpdate = row.querySelector("td:nth-child(2)");
    console.log(cellToUpdate);
    const columns = row.querySelectorAll("td");

    columns[2].textContent = userToUpdate.name;
    columns[3].textContent = userToUpdate.email;
    columns[4].textContent = userToUpdate.gender;
    columns[5].textContent = userToUpdate.dateTime;

    // Find the img element within the td
    const imgElement = document.querySelector(
      `#userData tr:nth-child( ${editSubmissionId + 1}) td:nth-child(2) img`
    );
    console.log(imgElement);

    if (imgElement) {
      // Update the src attribute of the img element
      imgElement.src = newUser.image;
    }

    editMode = false;
    editSubmissionId = null;
    document.getElementById("submitForm").reset();
    document.getElementById("image").style.display = "none";

    // Use newUser.image as needed
    console.log("Image source:", newUser.image);
  }
  saveUserToLocalStorage();
}

function deleteUser(index) {
  if (index >= 0 && index < users.length) {
    users.splice(index, 1);
    const row = document.querySelector(`#userData tr:nth-child(${index + 1})`);
    row.remove();
    editMode = false;
    editSubmissionId = null;
    document.getElementById("submitForm").reset();

    saveUserToLocalStorage();
  }
}

function saveUserToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users)); // Use "users" as the key
}

function getUsersFromLocalStorage() {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  return storedUsers;
}

document.addEventListener("DOMContentLoaded", function () {
  const storedUsers = getUsersFromLocalStorage();
  users.push(...storedUsers);

  for (let i = 0; i < storedUsers.length; i++) {
    const tableRow = generateTableRow(storedUsers[i], storedUsers.length - 1);
    document
      .getElementById("userData")
      .insertAdjacentHTML("beforeend", tableRow);
  }

  document.getElementById("tableData").style.display = "block";

  console.log("Loaded users:", storedUsers);
});

function clearAll() {
  localStorage.clear();
  document.getElementById("tableData").style.display = "none";
  console.log("Local storage cleared.");
}
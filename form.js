let userForm = document.querySelector("#userdetails");
let fName = document.querySelector("#fname");
let lName = document.querySelector("#lname");
let about = document.querySelector("#about");
let button = document.querySelector("#button");

function validateForm(formData) {
  const errors = {};

  if (!isValidEmail(formData.email)) {
    errors.email = "Invalid email, please enter a valid email.";
    document.querySelector("#email-error").innerText = errors.email;
  }
  if (!isValidPhoneNumber(formData.phoneNumber)) {
    errors.num = "Invalid phone number, please enter a valid phone number.";
    document.querySelector("#phone-error").innerText = errors.num;
  }
  if (!isOneWord(formData.fname)) {
    errors.fName = "Enter a valid first name. Name can only be one word";
    document.querySelector("#fname-error").innerText = errors.fName;
  }
  if (!isOneWord(formData.lname)) {
    errors.lname = "Enter a valid last name. Name can only be one word";
    document.querySelector("#lname-error").innerText = errors.lname;
  }

  if (!isValidAge(formData.dob)) {
    errors.date = "Must be older than 12yrs";
    document.querySelector("#date-error").innerText = errors.date;
  }
  if (!checkCharacters(formData.about)) {
    errors.about = "Enter characters not less than 20 and not more than 1000";
    document.querySelector("#about-error").innerText = errors.about;
  }
  if (Object.keys(errors).length === 0) {
    return true;
  }
  return false;
}

function handleOnSubmit(event) {
  event.preventDefault();
  let formData = {
    fname: userForm.elements["fname"].value,
    lname: userForm.elements["lname"].value,
    email: userForm.elements["email"].value,
    phoneNumber: userForm.elements["phonenumber"].value,
    gender: userForm.elements["gender"].value,
    dob: userForm.elements["date"].value,
    about: userForm.elements["about"].value,
  };
  if (validateForm(formData)) {
    const table = document.querySelector("#tableContent");
    let row = table.insertRow();
    const keys = Object.keys(formData);
    for (let i = 0; i < keys.length; i++) {
      row.insertCell().innerText = formData[keys[i]];
    }
  }
}

function isValidEmail(email) {
  let emailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.toLowerCase().match(emailFormat)) {
    return true;
  }
  return false;
}

function isValidPhoneNumber(num) {
  let isphone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(num);
  return isphone;
}

function checkCharacters(words) {
  let about = words.length;
  if (about >= 20 && about <= 1000) {
    return true;
  }
  return false;
}

function isOneWord(name) {
  return name.trim().split(" ").length === 1;
}

function isValidAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  if (age > 12) {
    return true;
  }
  return false;
}

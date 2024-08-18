let themeSwitch = document.getElementById("theme-switch");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeSwitch.addEventListener("change", toggleDarkMode);

const buttonSubmit = document.getElementById("buttonSubmit");
let count = 3;
const counterElement = document.getElementById("counter");

let scaleFactor = 1;
const modalImage = document.getElementById('modalImage');
function scaleImage() {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
modalImage.style.transform = `scale(${scaleFactor})`;
}

function toggleModal(e) {
  e.preventDefault();
  const modal = document.querySelectorAll(".modal");
  let intervalId = setInterval(scaleImage, 500);
  for (let i = 0; i < modal.length; i++) {
  const modals = modal[i];
  modals.style.display = "flex";
  }

  setTimeout(() => {
    for (let i = 0; i < modal.length; i++) {
      const modals = modal[i];
      modals.style.display = "none";
      clearInterval(intervalId); 
    }
  }, 4000); 
}

const addSignature = (e, person) => {
  e.preventDefault();
  console.log("Form Submitted");


  if (!person.fname) {
    alert("first name required");
    return false;
  }
  if (!person.lname) {
    alert("last name required");
    return false;
  }
  if (!person.email.includes('@') || !person.email.includes('.')) {
    alert("email required");
    return false;
  } 
  const newSignature = document.createElement('p');
  newSignature.textContent = person.fname + "  " + person.lname;
  const signaturesSection = document.querySelector('.signatures');
  signaturesSection.appendChild(newSignature);
  count += 1;
  counterElement.textContent = "🖊️ " + count + " people have signed this petition and support this cause.";
  const pModalText = document.getElementById('thanks-modal-content');
  pModalText.innerHTML = "Thanks " + person.fname + ", Your response has been recorded and this page has been updated. Please refresh the page to get the latest version. You will not be able to use the page until you refresh";
  toggleModal(e);
}
const validateForm = (e) => {
  e.preventDefault();
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
  const person = {
    lname: document.getElementById('lastName').value,
    fname: document.getElementById('firstName').value,
    email: document.getElementById('email').value
  };

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[i].classList.remove('error');
      containsErrors = false;
    }
  }

  if (containsErrors) {
    addSignature(e, person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}
buttonSubmit.addEventListener("click", validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '10s',
  transitionTimingFunction: 'ease'
};

var revealableContainers = document.querySelectorAll(".revealable");

function reveal() {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    } else {
      revealableContainers[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);

const reduceMotionButton = document.getElementById("reduceMotionButton");

function reduceMotion() {
  animation.transitionDuration = '1s';
  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
  }
}

reduceMotionButton.addEventListener("click", reduceMotion);


function toggleMotion() {
  reduceMotionButton.classList.toggle("off");
  reduceMotionButton.classList.toggle("on");
}

reduceMotionButton.addEventListener("click", toggleMotion);

const modalButton = document.getElementById("modalButton");
function closeModal(){
const modals = document.querySelectorAll(".modal");
for (let i = 0; i < modals.length; i++) {
  modals[i].style.display = "none";
  }
}
modalButton.addEventListener("click", closeModal);


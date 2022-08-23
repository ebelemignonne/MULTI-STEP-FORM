var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}














//let eleves = []; // tableau qui stock les information des eleves
let eleves = []; // tableau qui stock le genre feminin
// JSON.parse(eleves);
// localStorage.getItem("eleve", JSON.stringify(eleves));

/*for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}*/

window.addEventListener("load", () => {
  eleves = JSON.parse(localStorage.getItem("lists")) || [];
  viewer();
});

let stockEleve = JSON.parse(localStorage.getItem("eleves"));

function viewer() {
  for (let index = 0; index < stockEleve.length; index++) {
    let table = document.getElementById("eleve");
    table.innerHTML += `
    <tr>
       <td>${stockEleve[index].nom}</td>
       <td>${stockEleve[index].prenom}</td>
       <td>${stockEleve[index].genre}</td>
       <td>${stockEleve[index].date}</td>
       <td>${stockEleve[index].lieu}</td>
       <td>${stockEleve[index].classe}</td>
       <td>${stockEleve[index].nom}</td>
       <td>${stockEleve[index].prenom}</td>
       <td>${stockEleve[index].profession}</td>
       <td>${stockEleve[index].numero}</td>
       <td>${stockEleve[index].email}</td>
    </tr>
    `;
  }
}

function recuperer() {
  event.preventDefault();
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let sexe = document.getElementById("sexe").value;
  let date = document.getElementById("date").value;
  let lieu = document.getElementById("lieu").value;
  let classe = document.getElementById("classe").value;

  let nom_t = document.getElementById("nom_t").value;
  let prenom_t = document.getElementById("prenom_t").value;
  let prefession = document.getElementById("prefession").value;
  let tel = document.getElementById("tel").value;
  let email = document.getElementById("email").value;

  // declare l'objet personne
  const eleve = {
    nom: nom,
    prenom: prenom,
    sexe: sexe,
    date: date,
    lieu: lieu,
    classe: classe,

    nom_t: nom_t,
    prenom_t: prenom_t,
    prefession: prefession,
    tel: tel,
    email: email,
  };
  eleves.push(eleve);

  localStorage.setItem("eleves", JSON.stringify(eleves));

  let table = document.getElementById("eleve");
  table.innerHTML += `
    <tr>
        <td>${nom}</td>
        <td>${prenom}</td>
        <td>${sexe} ans</td>
        <td>${date}</td>
        <td>${lieu}</td>
        <td>${classe}</td>
        <td>${nom_t}</td>
        <td>${prenom_t}</td>
        <td>${prefession} ans</td>
        <td>${tel}</td>
        <td>${email}</td>
    </tr>`;
}

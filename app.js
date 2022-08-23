var currentTab = 0; // L'onglet actuel est défini comme le premier onglet (0)
showTab(currentTab); // Afficher l'onglet en cours

function showTab(n) {
  // Cette fonction affichera l'onglet spécifié du formulaire ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... et corrigez les boutons Précédent/Suivant :
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
  // ... et exécutez une fonction qui affiche l'indicateur de pas correct:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // Cette fonction déterminera quel onglet afficher
  var x = document.getElementsByClassName("tab");
  // Quittez la fonction si un champ de l'onglet actuel n'est pas valide :
  if (n == 1 && !validateForm()) return false;
  // Masquez l'onglet actuel :
  x[currentTab].style.display = "none";
  // Augmenter ou diminuer l'onglet actuel de 1 :
  currentTab = currentTab + n;
  // si vous avez atteint la fin du formulaire... :
  if (currentTab >= x.length) {
    //...le formulaire est soumis:
    document.getElementById("regForm").submit();
    return false;
  }
  // Sinon, affichez le bon onglet :
  showTab(currentTab);
}

function validateForm() {
  // Cette fonction traite de la validation des champs du formulaire
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // Une boucle qui vérifie chaque champ de saisie dans l'onglet actuel :
  for (i = 0; i < y.length; i++) {
    // Si un champ est vide...
    if (y[i].value == "") {
      // ajoutez une classe "invalide" au champ :
      y[i].className += " invalid";
      // et définissez le statut valide actuel sur false :
      valid = false;
    }
  }
  // Si le statut valide est vrai, marquez l'étape comme terminée et valide :
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // retourner le statut valide
}

function fixStepIndicator(n) {
  // Cette fonction supprime la classe "active" de toutes les étapes...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... et ajoute la classe "active" à l'étape courante:
  x[n].className += " active";
}

/*-------------------------------------------------FIN DE LA MANIPULATION DU MULTISTEEP----------------------------------- *\












/*-------------------------------------------------DEBUT DE LA RECUPERATION DES DONNEES DU FORMULAIRE----------------------------------- */


let eleves = []; // tableau qui stock le genre feminin


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
  let classe = document.getElementById("pet-select").value;

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
  console.log(eleves);

  localStorage.setItem("eleves", JSON.stringify(eleves));

  let table = document.getElementById("eleve");
  table.innerHTML += `
      <tr>
          <td>${nom}</td>
          <td>${prenom}</td>
          <td>${sexe}</td>
          <td>${date}</td>
          <td>${lieu}</td>
          <td>${classe}</td>
          
          <td>${nom_t}</td>
          <td>${prenom_t}</td>
          <td>${prefession}</td>
          <td>${tel}</td>
          <td>${email}</td>
      </tr>`;
}

const liste = document.querySelector("#todoList ul");

function init() {
  const formulaire = document.getElementById("formulaire");
  formulaire?.addEventListener("submit", gestionTodo);
  chargerTaches();

  const deleteButton = document.getElementById("delete");

  deleteButton.addEventListener("click", () => {
    const taches = document.querySelectorAll("#todoList ul li");

    taches.forEach((tache) => {
      // Ajouter la classe "tremble" pour déclencher l'animation
      tache.classList.add("tremble");

      // Supprimer la classe "tremble" après l'animation pour pouvoir la rejouer
      tache.addEventListener("animationend", () => {
        tache.classList.remove("tremble");
      });

      // Ajouter un gestionnaire de clic pour supprimer la tâche
      tache.addEventListener("click", () => {
        tache.remove(); // Supprimer la tâche
        MAJ(); // Mettre à jour les données dans le localStorage
        liste?.replaceChildren();
        chargerTaches(); // Recharger les tâches
      });
    });
  });

  const destroyButton = document.getElementById("delete-everything");
  destroyButton?.addEventListener("click", () => {
    const taches = document.querySelectorAll("#todoList ul li");
    let delay = 0;

    taches.forEach((tache, index) => {
      setTimeout(() => {
        tache.remove(); // Supprimer la tâche
        MAJ(); // Mettre à jour les données dans le localStorage
        if (index === taches.length - 1) {
          chargerTaches(); // Recharger les tâches après la suppression de la dernière tâche
        }
      }, delay);

      delay += 300; // Ajouter un délai de 1 seconde entre chaque suppression
    });
  });
}

function gestionTodo(event) {
  event.preventDefault();
  const saisieForm = document.getElementById("saisieTodo");
  if (saisieForm.value.trim() == "") {
    saisieForm.value = "";
    return;
  }

  ajouerTache(saisieForm.value.trim(), false);

  saisieForm.value = "";
  return;
}

function gestionCheck(event) {
  event.target.classList.toggle("barre");
  MAJ();
}

function ajouerTache(text, Estvalide) {
  const li = document.createElement("li");
  li.textContent = text.toUpperCase();
  li.addEventListener("click", gestionCheck);

  if (Estvalide) {
    li.classList.add("barre");
  }

  liste?.appendChild(li);
  MAJ();
}

function MAJ() {
  const tachesDOM = document.querySelectorAll("#todoList ul li");
  let taches = [];

  tachesDOM.forEach((li) => {
    taches.push({
      texte: li.textContent,
      valide: li.classList.contains("barre"),
    });
  });

  localStorage.setItem("taches", JSON.stringify(taches));
}

function chargerTaches() {
  const donnes = localStorage.getItem("taches");
  if (!donnes) return;
  const taches = JSON.parse(donnes);
  taches.forEach((tache) => ajouerTache(tache.texte, tache.valide));
}

init();

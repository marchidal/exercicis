// =========================
// ELEMENTS DEL DOM
// =========================

const registreAlumne = document.getElementById("registre-alumne");
const alumneRegistrat = document.getElementById("alumne-registrat");

const nomAlumneInput = document.getElementById("nom-alumne");
const guardarNomBtn = document.getElementById("guardar-nom-btn");

const nomGuardatText = document.getElementById("nom-guardat");
const errorNom = document.getElementById("error-nom");

const exercicisBtn = document.getElementById("exercicis-btn");
const resultatsBtn = document.getElementById("resultats-btn");


// =========================
// DADES DE L'ALUMNE
// =========================

const CLAU_ALUMNE = "alumne";


// =========================
// CARREGAR ALUMNE
// =========================

function carregarAlumne() {

    const alumneGuardat = localStorage.getItem(CLAU_ALUMNE);

    if (!alumneGuardat) {
        mostrarRegistre();
        return;
    }

    try {

        const alumne = JSON.parse(alumneGuardat);

        if (alumne.nom) {
            mostrarAlumne(alumne.nom);
        } else {
            mostrarRegistre();
        }

    } catch (error) {

        console.error("Error carregant les dades de l'alumne:", error);

        localStorage.removeItem(CLAU_ALUMNE);

        mostrarRegistre();
    }
}


// =========================
// MOSTRAR REGISTRE
// =========================

function mostrarRegistre() {

    registreAlumne.classList.remove("ocult");
    alumneRegistrat.classList.add("ocult");

    nomAlumneInput.focus();
}


// =========================
// MOSTRAR ALUMNE
// =========================

function mostrarAlumne(nom) {

    registreAlumne.classList.add("ocult");
    alumneRegistrat.classList.remove("ocult");

    nomGuardatText.textContent = nom;
}


// =========================
// VALIDAR NOM
// =========================

function validarNom(nom) {

    const nomNet = nom.trim();

    if (nomNet.length < 3) {
        return false;
    }

    return true;
}


// =========================
// GUARDAR NOM
// =========================

function guardarNom() {

    const nom = nomAlumneInput.value.trim();

    errorNom.textContent = "";


    if (!validarNom(nom)) {

        errorNom.textContent =
            "Escriu el teu nom i cognoms abans de continuar.";

        nomAlumneInput.focus();

        return;
    }


    const alumne = {
        nom: nom
    };


    localStorage.setItem(
        CLAU_ALUMNE,
        JSON.stringify(alumne)
    );


    mostrarAlumne(nom);
}


// =========================
// ESDEVENIMENTS DEL NOM
// =========================

guardarNomBtn.addEventListener(
    "click",
    guardarNom
);


nomAlumneInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            guardarNom();
        }

    }
);


// =========================
// NAVEGACIÓ
// =========================

exercicisBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "pages/exercicis.html";

    }
);


resultatsBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "pages/resultats.html";

    }
);


// =========================
// INICI
// =========================

carregarAlumne();
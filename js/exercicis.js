// =========================
// CONFIGURACIÓ
// =========================

const CLAU_RESULTATS = "resultatsExercicis";


// =========================
// CARREGAR RESULTATS
// =========================

function carregarResultats() {

    const guardats =
        localStorage.getItem(CLAU_RESULTATS);

    if (!guardats) {
        return {};
    }

    try {

        return JSON.parse(guardats);

    } catch (error) {

        console.error(
            "Error carregant els resultats:",
            error
        );

        return {};
    }
}


// =========================
// COMPROVAR SI ESTÀ SUPERAT
// =========================

function exerciciSuperat(id, resultats) {

    return (
        resultats[id]?.completat === true
    );
}


// =========================
// COMPROVAR SI ESTÀ DESBLOQUEJAT
// =========================

function exerciciDesbloquejat(
    exercici,
    resultats
) {

    // =========================
    // REQUISITS ESPECIALS
    // =========================

    // Alguns exercicis poden requerir
    // haver superat un exercici
    // d'una altra categoria.
    //
    // Exemple:
    // Intervals 1 requereix Notes 7.

    if (exercici.requereix) {

        const requisits = Array.isArray(
            exercici.requereix
        )
            ? exercici.requereix
            : [exercici.requereix];


        const requisitsSuperats =
            requisits.every(
                id =>
                    exerciciSuperat(
                        id,
                        resultats
                    )
            );


        if (!requisitsSuperats) {
            return false;
        }
    }


    // =========================
    // PRIMER EXERCICI
    // =========================

    // El primer exercici de cada categoria
    // està disponible si compleix
    // els requisits especials.

    if (exercici.numero === 1) {
        return true;
    }


    // =========================
    // EXERCICI ANTERIOR
    // =========================

    // Busquem l'exercici anterior
    // dins de la mateixa categoria.

    const anterior =
        EXERCICIS.find(
            item =>
                item.categoria === exercici.categoria &&
                item.numero === exercici.numero - 1
        );


    if (!anterior) {
        return false;
    }


    // =========================
    // COMPROVAR PROGRÉS
    // =========================

    // L'exercici es desbloqueja
    // quan l'anterior està superat.
    //
    // El percentatge mínim necessari
    // el controla sistema-exercicis.js.

    return exerciciSuperat(
        anterior.id,
        resultats
    );

}


// =========================
// OBTENIR REQUISITS PENDENTS
// =========================

function obtenirRequisitsPendents(exercici, resultats) {

    const pendents = [];

    // Requisits especials d'altres categories

    if (exercici.requereix) {

        const requisits = Array.isArray(exercici.requereix)
            ? exercici.requereix
            : [exercici.requereix];

        requisits.forEach(id => {

            if (!exerciciSuperat(id, resultats)) {

                const requisit = EXERCICIS.find(
                    item => item.id === id
                );

                if (requisit) {
                    pendents.push(requisit);
                }
            }
        });
    }

    // Exercici anterior de la mateixa categoria

    if (exercici.numero > 1) {

        const anterior = EXERCICIS.find(
            item =>
                item.categoria === exercici.categoria &&
                item.numero === exercici.numero - 1
        );

        if (
            anterior &&
            !exerciciSuperat(anterior.id, resultats)
        ) {
            pendents.push(anterior);
        }
    }

    return pendents;
}


// =========================
// GENERAR MISSATGE DE BLOQUEIG
// =========================

function obtenirMissatgeBloqueig(exercici, resultats) {

    const pendents =
        obtenirRequisitsPendents(exercici, resultats);

    if (pendents.length === 0) {
        return "🔒 Aquest exercici està bloquejat.";
    }

    const noms = pendents.map(item => {

        const nomCategoria = item.categoria
            .split("-")
            .map(paraula =>
                paraula.charAt(0).toUpperCase() +
                paraula.slice(1)
            )
            .join(" ");

        return `${nomCategoria} ${item.numero}`;
    });

    return {
        titol: "🔒 Completa",
        requisits: noms
    };
}

// =========================
// OBTENIR NOM DE L'EXERCICI
// =========================

function obtenirNomExercici(boto) {

    // Si existeix un nom personalitzat
    // a data-nom, té prioritat.

    if (boto.dataset.nom) {
        return boto.dataset.nom.trim();
    }


    // Si ja hem guardat el nom original,
    // el reutilitzem.

    if (boto.dataset.nomOriginal) {
        return boto.dataset.nomOriginal;
    }


    // Llegim el nom escrit directament
    // al botó de l'HTML.

    let nom =
        boto.textContent.trim();


    // Eliminem possibles indicadors
    // de bloqueig o superació.
    //
    // Fem servir Unicode per evitar
    // problemes de codificació.

    nom = nom.replace(
        /\s*[\u{1F512}\u2713]\s*$/u,
        ""
    );


    // Eliminem un possible rang
    // afegit anteriorment.

    nom = nom.replace(
        /\s*·\s*[DCBAS]\s*$/,
        ""
    );


    // Guardem el nom personalitzat.

    boto.dataset.nomOriginal = nom;

    return nom;
}


// =========================
// ACTUALITZAR BOTONS
// =========================

function actualitzarExercicis() {

    const resultats =
        carregarResultats();


    const columnes =
        document.querySelectorAll(
            ".columna-exercicis"
        );


    columnes.forEach((columna) => {

        const categoria =
            columna.dataset.categoria;


        const botons =
            columna.querySelectorAll(
                ".exercici"
            );


        botons.forEach((boto) => {

            // =========================
            // CONTENIDOR INDIVIDUAL
            // =========================
            
            // Cada exercici necessita el seu
            // propi contenidor per al tooltip.
            
            if (!boto.parentElement.classList.contains(
                "contenidor-exercici"
            )) {
            
                const contenidorIndividual =
                    document.createElement("div");
            
                contenidorIndividual.className =
                    "contenidor-exercici";
            
                boto.parentNode.insertBefore(
                    contenidorIndividual,
                    boto
                );
            
                contenidorIndividual.appendChild(boto);
            }

            // =========================
            // NOM PERSONALITZAT
            // =========================

            const nomExercici =
                obtenirNomExercici(boto);


            // =========================
            // IDENTIFICAR EXERCICI
            // =========================

            const numero =
                Number(
                    boto.dataset.exercici
                );


            const exercici =
                EXERCICIS.find(
                    item =>
                        item.categoria === categoria &&
                        item.numero === numero
                );


            if (!exercici) {
                return;
            }


            // =========================
            // COMPROVAR ESTAT
            // =========================

            const desbloquejat =
                exerciciDesbloquejat(
                    exercici,
                    resultats
                );


            const superat =
                exerciciSuperat(
                    exercici.id,
                    resultats
                );


            // =========================
            // NETEJAR CLASSES
            // =========================

            boto.classList.remove(
                "disponible",
                "bloquejat",
                "superat",
                "rang-d",
                "rang-c",
                "rang-b",
                "rang-a",
                "rang-s"
            );


            // =========================
            // RANG
            // =========================

            boto.classList.add(
                `rang-${exercici.rang.toLowerCase()}`
            );


            // =========================
            // EXERCICI BLOQUEJAT
            // =========================

            if (!desbloquejat) {
            
                boto.disabled = true;
            
                boto.classList.add(
                    "bloquejat"
                );
            
                boto.textContent =
                    `${nomExercici} · ${exercici.rang} \u{1F512}`;
            
                // Mostrem els requisits pendents
                // quan l'alumne passa el cursor.
            
                // =========================
                // TOOLTIP DE BLOQUEIG
                // =========================
                
                const missatge =
                    obtenirMissatgeBloqueig(exercici, resultats);
                
                boto.removeAttribute("title");
                
                const contenidor = boto.parentElement;
                
                if (contenidor) {
                
                    contenidor.removeAttribute("title");
                    contenidor.classList.add("contenidor-tooltip");
                
                    let tooltip =
                        contenidor.querySelector(".tooltip-bloqueig");
                
                    if (!tooltip) {
                
                        tooltip = document.createElement("span");
                
                        tooltip.className = "tooltip-bloqueig";
                
                        contenidor.appendChild(tooltip);
                    }
                
                    // =========================
                    // CONTINGUT DEL TOOLTIP
                    // =========================
                    
                    tooltip.replaceChildren();
                    
                    const titol = document.createElement("div");
                    titol.className = "tooltip-titol";
                    titol.textContent = missatge.titol;
                    
                    const requadre = document.createElement("div");
                    requadre.className = "tooltip-requisits";
                    
                    missatge.requisits.forEach(nom => {
                    
                        const element = document.createElement("div");
                        element.textContent = nom;
                    
                        requadre.appendChild(element);
                    });
                    
                    tooltip.append(titol, requadre);
                }

                return;
            }


            // =========================
            // EXERCICI DISPONIBLE
            // =========================

            boto.disabled = false;

            // Eliminar el tooltip de bloqueig
            // quan l'exercici està disponible.

            boto.removeAttribute("title");

            const contenidor = boto.parentElement;

            if (contenidor) {

                contenidor.removeAttribute("title");
                contenidor.classList.remove(
                    "contenidor-tooltip"
                );

                const tooltip =
                    contenidor.querySelector(
                        ".tooltip-bloqueig"
                    );

                if (tooltip) {
                    tooltip.remove();
                }
            }

            boto.classList.add(
                "disponible"
            );


            // =========================
            // EXERCICI SUPERAT
            // =========================

            if (superat) {

                boto.classList.add(
                    "superat"
                );

                boto.textContent =
                    `${nomExercici} · ${exercici.rang} \u2713`;

            } else {

                // Exercici disponible
                // però encara no superat.

                boto.textContent =
                    `${nomExercici} · ${exercici.rang}`;

            }

        });

    });
}


// =========================
// OBRIR EXERCICI
// =========================

function prepararEnllacos() {

    const botons =
        document.querySelectorAll(
            ".exercici"
        );


    botons.forEach((boto) => {

        boto.addEventListener(
            "click",
            () => {

                if (boto.disabled) {
                    return;
                }


                const columna =
                    boto.closest(
                        ".columna-exercicis"
                    );


                const categoria =
                    columna.dataset.categoria;


                const numero =
                    Number(
                        boto.dataset.exercici
                    );


                const exercici =
                    EXERCICIS.find(
                        item =>
                            item.categoria === categoria &&
                            item.numero === numero
                    );


                if (!exercici) {
                    return;
                }


                if (!exercici.url) {

                    console.log(
                        "Aquest exercici encara no està creat."
                    );

                    return;
                }


                window.location.href =
                    exercici.url;

            }
        );

    });
}


// =========================
// INICI
// =========================

actualitzarExercicis();
prepararEnllacos();
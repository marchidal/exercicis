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


            // Eliminem classes anteriors.

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


            // Classe de dificultat.

            boto.classList.add(
                `rang-${exercici.rang.toLowerCase()}`
            );


            // Exercici bloquejat.

            if (!desbloquejat) {

                boto.disabled = true;

                boto.classList.add(
                    "bloquejat"
                );

                boto.textContent =
                    `Exercici ${numero} · ${exercici.rang} 🔒`;

                return;
            }


            // Exercici disponible.

            boto.disabled = false;

            boto.classList.add(
                "disponible"
            );


            // Exercici ja superat.

            if (superat) {

                boto.classList.add(
                    "superat"
                );

                boto.textContent =
                    `Exercici ${numero} · ${exercici.rang} ✓`;

            } else {

                boto.textContent =
                    `Exercici ${numero} · ${exercici.rang}`;
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
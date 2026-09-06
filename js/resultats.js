// =========================
// ELEMENTS DEL DOM
// =========================

const nomAlumneText =
    document.getElementById(
        "nom-alumne"
    );

const nivellGeneralText =
    document.getElementById(
        "nivell-general"
    );

const classeGeneralText =
    document.getElementById(
        "classe-general"
    );

const xpTotalText =
    document.getElementById(
        "xp-total"
    );


// =========================
// CONFIGURACIÓ
// =========================

const CLAU_RESULTATS =
    "resultatsExercicis";

const XP_BASE = 50;

const MULTIPLICADOR_NIVELL =
    1.2;


const CATEGORIES = [
    "notes",
    "llenguatge",
    "dictat-ritmic",
    "dictat-melodic"
];


// =========================
// CARREGAR ALUMNE
// =========================

function carregarAlumne() {

    const guardat =
        localStorage.getItem(
            "alumne"
        );


    if (!guardat) {

        nomAlumneText.textContent =
            "Alumne";

        return;
    }


    try {

        const alumne =
            JSON.parse(
                guardat
            );


        nomAlumneText.textContent =
            alumne.nom ||
            "Alumne";

    } catch (error) {

        nomAlumneText.textContent =
            "Alumne";
    }
}


// =========================
// CARREGAR RESULTATS
// =========================

function carregarResultats() {

    const guardats =
        localStorage.getItem(
            CLAU_RESULTATS
        );


    if (!guardats) {
        return {};
    }


    try {

        return JSON.parse(
            guardats
        );

    } catch (error) {

        console.error(
            "Error carregant resultats:",
            error
        );

        return {};
    }
}


// =========================
// XP D'UNA CATEGORIA
// =========================

function calcularXpCategoria(
    categoria,
    resultats
) {

    const exercicis =
        EXERCICIS.filter(
            exercici =>
                exercici.categoria ===
                categoria
        );


    return exercicis.reduce(
        (total, exercici) => {

            const resultat =
                resultats[
                    exercici.id
                ];


            return (
                total +
                (
                    resultat?.xp ||
                    0
                )
            );

        },
        0
    );
}


// =========================
// XP NECESSÀRIA PER NIVELL
// =========================

function xpNecessariaPerNivell(
    nivell
) {

    return Math.round(
        XP_BASE *
        Math.pow(
            MULTIPLICADOR_NIVELL,
            nivell - 1
        )
    );
}


// =========================
// CALCULAR NIVELL
// =========================

function calcularDadesNivell(
    xpTotal
) {

    let nivell = 1;

    let xpRestant =
        xpTotal;


    let xpNecessaria =
        xpNecessariaPerNivell(
            nivell
        );


    while (
        xpRestant >=
        xpNecessaria
    ) {

        xpRestant -=
            xpNecessaria;

        nivell++;


        xpNecessaria =
            xpNecessariaPerNivell(
                nivell
            );
    }


    return {

        nivell:
            nivell,

        xpActual:
            xpRestant,

        xpNecessaria:
            xpNecessaria
    };
}


// =========================
// EXERCICIS D'UN RANG
// =========================

function exercicisRangCompletats(
    categoria,
    rang,
    resultats
) {

    const exercicis =
        EXERCICIS.filter(
            exercici =>
                exercici.categoria ===
                    categoria &&
                exercici.rang ===
                    rang
        );


    if (
        exercicis.length === 0
    ) {

        return false;
    }


    return exercicis.every(
        exercici =>
            resultats[
                exercici.id
            ]?.completat === true
    );
}


// =========================
// RANG D'UNA CATEGORIA
// =========================

function calcularRangCategoria(
    categoria,
    resultats
) {

    let rangActual = "D";


    for (
        let i = 0;
        i < ORDRE_RANGS.length - 1;
        i++
    ) {

        const rang =
            ORDRE_RANGS[i];


        if (
            exercicisRangCompletats(
                categoria,
                rang,
                resultats
            )
        ) {

            rangActual =
                ORDRE_RANGS[
                    i + 1
                ];

        } else {

            break;
        }
    }


    return rangActual;
}


// =========================
// RANG GENERAL
// =========================

function calcularRangGeneral(
    rangs
) {

    let indexMesBaix =
        ORDRE_RANGS.length - 1;


    Object.values(
        rangs
    ).forEach(
        rang => {

            const index =
                ORDRE_RANGS.indexOf(
                    rang
                );


            if (
                index <
                indexMesBaix
            ) {

                indexMesBaix =
                    index;
            }
        }
    );


    return ORDRE_RANGS[
        indexMesBaix
    ];
}


// =========================
// ACTUALITZAR CLASSE VISUAL
// =========================

function aplicarClasse(
    element,
    rang,
    classeBase
) {

    element.className =
        classeBase;


    element.classList.add(
        `classe-${rang.toLowerCase()}`
    );
}


// =========================
// ACTUALITZAR CATEGORIA
// =========================

function actualitzarCategoria(
    categoria,
    xp,
    rang
) {

    const dades =
        calcularDadesNivell(
            xp
        );


    const percentatge =
        (
            dades.xpActual /
            dades.xpNecessaria
        ) *
        100;


    document.getElementById(
        `nivell-${categoria}`
    ).textContent =
        dades.nivell;


    document.getElementById(
        `xp-${categoria}`
    ).textContent =
        dades.xpActual;


    document.getElementById(
        `xp-next-${categoria}`
    ).textContent =
        dades.xpNecessaria;


    document.getElementById(
        `barra-${categoria}`
    ).style.width =
        `${percentatge}%`;


    const classeElement =
        document.getElementById(
            `classe-${categoria}`
        );


    classeElement.textContent =
        rang;


    aplicarClasse(
        classeElement,
        rang,
        "classe-mini"
    );
}


// =========================
// ACTUALITZAR RESULTATS
// =========================

function actualitzarResultats() {

    const resultats =
        carregarResultats();


    let xpTotal = 0;


    const rangs = {};


    CATEGORIES.forEach(
        categoria => {

            const xp =
                calcularXpCategoria(
                    categoria,
                    resultats
                );


            xpTotal += xp;


            const rang =
                calcularRangCategoria(
                    categoria,
                    resultats
                );


            rangs[categoria] =
                rang;


            actualitzarCategoria(
                categoria,
                xp,
                rang
            );
        }
    );


    // =========================
    // XP TOTAL
    // =========================

    xpTotalText.textContent =
        xpTotal;


    // =========================
    // NIVELL GENERAL
    // =========================

    const dadesGeneral =
        calcularDadesNivell(
            xpTotal
        );


    nivellGeneralText.textContent =
        dadesGeneral.nivell;


    // =========================
    // CLASSE GENERAL
    // =========================

    const rangGeneral =
        calcularRangGeneral(
            rangs
        );


    classeGeneralText.textContent =
        `Classe ${rangGeneral}`;


    aplicarClasse(
        classeGeneralText,
        rangGeneral,
        "classe"
    );
}


// =========================
// INICI
// =========================

carregarAlumne();
actualitzarResultats();
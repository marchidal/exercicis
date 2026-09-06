// =========================
// CONFIGURACIÓ GENERAL
// =========================

const CLAU_RESULTATS = "resultatsExercicis";

const XP_BASE = 50;
const MULTIPLICADOR_NIVELL = 1.2;


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
            "Error carregant els resultats:",
            error
        );

        return {};
    }
}


// =========================
// GUARDAR RESULTATS
// =========================

function guardarResultats(
    resultats
) {

    localStorage.setItem(
        CLAU_RESULTATS,
        JSON.stringify(
            resultats
        )
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
// CALCULAR DADES DE NIVELL
// =========================

function calcularDadesNivell(
    xpTotal
) {

    let nivell = 1;
    let xpRestant = xpTotal;

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
        nivell,
        xpActual: xpRestant,
        xpNecessaria
    };
}


// =========================
// XP TOTAL D'UNA CATEGORIA
// =========================

function calcularXpCategoria(
    categoria,
    resultats
) {

    return EXERCICIS
        .filter(
            exercici =>
                exercici.categoria ===
                categoria
        )
        .reduce(
            (total, exercici) => {

                return (
                    total +
                    (
                        resultats[
                            exercici.id
                        ]?.xp || 0
                    )
                );

            },
            0
        );
}


// =========================
// GUARDAR RESULTAT D'EXERCICI
// =========================

function registrarResultatExercici(
    idExercici,
    percentatge
) {

    const exercici =
        obtenirExercici(
            idExercici
        );


    if (!exercici) {

        console.error(
            `No s'ha trobat l'exercici ${idExercici}`
        );

        return null;
    }


    const resultats =
        carregarResultats();


    const xpAnteriorCategoria =
        calcularXpCategoria(
            exercici.categoria,
            resultats
        );


    const xpAconseguida =
        Math.round(
            exercici.xpMax *
            (
                percentatge /
                100
            )
        );


    const superat =
        percentatge >=
        PERCENTATGE_MINIM;


    const resultatAnterior =
        resultats[
            idExercici
        ];


    // =========================
    // JA TENIA UN RESULTAT IGUAL
    // O MILLOR
    // =========================

    if (
        resultatAnterior &&
        resultatAnterior.millorPercentatge >=
        percentatge
    ) {

        return {

            exercici,

            superat:
                resultatAnterior.completat,

            millorPercentatge:
                resultatAnterior.millorPercentatge,

            xpExercici:
                resultatAnterior.xp,

            xpAnteriorCategoria,

            xpNovaCategoria:
                xpAnteriorCategoria,

            xpAfegida:
                0,

            nouRecord:
                false
        };
    }


    // =========================
    // GUARDAR NOU RÈCORD
    // =========================

    resultats[
        idExercici
    ] = {

        completat:
            superat,

        millorPercentatge:
            percentatge,

        xp:
            xpAconseguida
    };


    guardarResultats(
        resultats
    );


    const xpNovaCategoria =
        calcularXpCategoria(
            exercici.categoria,
            resultats
        );


    return {

        exercici,

        superat,

        millorPercentatge:
            percentatge,

        xpExercici:
            xpAconseguida,

        xpAnteriorCategoria,

        xpNovaCategoria,

        xpAfegida:
            xpNovaCategoria -
            xpAnteriorCategoria,

        nouRecord:
            true
    };
}


// =========================
// MOSTRAR ESTAT D'XP
// =========================

function mostrarEstatXp(
    xpTotal,
    elements
) {

    const dades =
        calcularDadesNivell(
            xpTotal
        );


    const percentatge =
        (
            dades.xpActual /
            dades.xpNecessaria
        ) * 100;


    elements.nivell.textContent =
        dades.nivell;


    elements.barra.style.width =
        `${percentatge}%`;


    elements.text.textContent =
        `${dades.xpActual} / ${dades.xpNecessaria} XP`;
}


// =========================
// ANIMAR EXPERIÈNCIA
// =========================

function animarExperiencia(
    xpAnterior,
    xpNova,
    elements
) {

    mostrarEstatXp(
        xpAnterior,
        elements
    );


    if (
        xpNova <=
        xpAnterior
    ) {
        return;
    }


    let xpAnimada =
        xpAnterior;


    setTimeout(() => {

        const interval =
            setInterval(() => {

                xpAnimada++;

                mostrarEstatXp(
                    xpAnimada,
                    elements
                );


                if (
                    xpAnimada >=
                    xpNova
                ) {

                    clearInterval(
                        interval
                    );
                }

            }, 30);

    }, 500);
}


// =========================
// COMPROVAR SI UN EXERCICI
// ESTÀ SUPERAT
// =========================

function exerciciEstaSuperat(
    idExercici
) {

    const resultats =
        carregarResultats();


    return (
        resultats[
            idExercici
        ]?.completat === true
    );
}


// =========================
// MOSTRAR RESULTAT FINAL
// =========================

function mostrarResultatFinalExercici({
    idExercici,
    encerts,
    total,
    percentatge,
    nomCategoria,
    urlFinal
}) {

    // =========================
    // ELEMENTS DEL DOM
    // =========================

    const zonaExercici =
        document.getElementById(
            "zona-exercici"
        );

    const resultatFinal =
        document.getElementById(
            "resultat-final"
        );

    const puntuacioFinal =
        document.getElementById(
            "puntuacio-final"
        );

    const finalitzarBtn =
        document.getElementById(
            "finalitzar-btn"
        );

    const nivellXp =
        document.getElementById(
            "nivell-xp"
        );

    const barraXpFinal =
        document.getElementById(
            "barra-xp-final-progres"
        );

    const textXpFinal =
        document.getElementById(
            "text-xp-final"
        );

    const xpGuanyadaText =
        document.getElementById(
            "xp-guanyada"
        );


    // =========================
    // REGISTRAR RESULTAT
    // =========================

    const dadesResultat =
        registrarResultatExercici(
            idExercici,
            percentatge
        );


    if (!dadesResultat) {

        console.error(
            "No s'ha pogut registrar el resultat."
        );

        return null;
    }


    // =========================
    // CANVIAR DE PANTALLA
    // =========================

    if (zonaExercici) {

        zonaExercici.classList.add(
            "ocult"
        );
    }


    if (resultatFinal) {

        resultatFinal.classList.remove(
            "ocult"
        );

    } else {

        console.error(
            "No s'ha trobat #resultat-final."
        );
    }


    // =========================
    // TEXT DEL RESULTAT
    // =========================

    if (puntuacioFinal) {

        if (
            percentatge >=
            PERCENTATGE_MINIM
        ) {

            puntuacioFinal.innerHTML = `
                ${encerts} de ${total}
                respostes correctes (${percentatge}%).
                <br><br>
                <strong>Exercici superat!</strong>
            `;

        } else {

            puntuacioFinal.innerHTML = `
                ${encerts} de ${total}
                respostes correctes (${percentatge}%).
                <br><br>
                Necessites un mínim del
                <strong>${PERCENTATGE_MINIM}%</strong>
                per superar l'exercici.
            `;
        }

    } else {

        console.error(
            "No s'ha trobat #puntuacio-final."
        );
    }


    // =========================
    // NOM DE LA CATEGORIA
    // =========================

    const nomCategoriaElement =
        document.querySelector(
            "#resum-xp .resum-xp-header > strong"
        );


    if (
        nomCategoriaElement &&
        nomCategoria
    ) {

        nomCategoriaElement.textContent =
            nomCategoria;
    }


    // =========================
    // EXPERIÈNCIA
    // =========================

    if (
        nivellXp &&
        barraXpFinal &&
        textXpFinal &&
        xpGuanyadaText
    ) {

        const elementsXp = {

            nivell:
                nivellXp,

            barra:
                barraXpFinal,

            text:
                textXpFinal
        };


        // Mostrem primer l'estat anterior.

        mostrarEstatXp(
            dadesResultat.xpAnteriorCategoria,
            elementsXp
        );


        // =========================
        // HA GUANYAT XP
        // =========================

        if (
            dadesResultat.xpAfegida > 0
        ) {

            xpGuanyadaText.textContent =
                `+${dadesResultat.xpAfegida} XP`;


            // Esperem que la pantalla final
            // sigui visible abans d'animar.

            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        () => {

                            animarExperiencia(
                                dadesResultat.xpAnteriorCategoria,
                                dadesResultat.xpNovaCategoria,
                                elementsXp
                            );

                        }
                    );
                }
            );

        }


        // =========================
        // NO HA MILLORAT EL RÈCORD
        // =========================

        else {

            xpGuanyadaText.textContent =
                "No has millorat el teu rècord d'XP";


            mostrarEstatXp(
                dadesResultat.xpNovaCategoria,
                elementsXp
            );
        }

    } else {

        console.error(
            "Falten elements HTML de la barra d'XP."
        );

        console.log({

            nivellXp,
            barraXpFinal,
            textXpFinal,
            xpGuanyadaText

        });
    }


    // =========================
    // BOTÓ FINAL
    // =========================

    if (finalitzarBtn) {

        finalitzarBtn.textContent =
            dadesResultat.superat
                ? "Finalitzar"
                : "Tornar-ho a intentar";


        finalitzarBtn.onclick =
            () => {

                if (
                    dadesResultat.superat
                ) {

                    window.location.href =
                        urlFinal;

                } else {

                    window.location.reload();
                }
            };

    } else {

        console.error(
            "No s'ha trobat #finalitzar-btn."
        );
    }


    return dadesResultat;
}
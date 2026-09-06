// =========================
// MOTOR D'EXERCICIS
// ACCENTS MÈTRICS RÍTMICS
// =========================

function iniciarExerciciAccentsMetricsRitmics(
    config
) {


    // =========================
    // ELEMENTS DOM
    // =========================

    const preguntaActualText =
        document.getElementById(
            "pregunta-actual"
        );


    const totalPreguntesText =
        document.getElementById(
            "total-preguntes"
        );


    const indicadorCompas =
        document.getElementById(
            "indicador-compas"
        );


    const zonaFigures =
        document.getElementById(
            "zona-figures-accents"
        );


    const botoFort =
        document.getElementById(
            "boto-fort"
        );


    const botoSemifort =
        document.getElementById(
            "boto-semifort"
        );


    const botoDebil =
        document.getElementById(
            "boto-debil"
        );


    const botoEsborrar =
        document.getElementById(
            "boto-esborrar"
        );


    const botoComprovar =
        document.getElementById(
            "boto-comprovar"
        );


    const feedback =
        document.getElementById(
            "feedback"
        );



    // =========================
    // ESTAT
    // =========================

    let preguntaActual = 0;

    let encerts = 0;

    let compasActual = null;

    let duradaObjectiu = 0;

    let figuresActuals = [];

    let accentsCorrectes = [];

    let respostaAlumne = [];

    let accentSeleccionat = null;

    let respostaValidada = false;

    let historialCompassos = [];



    // =========================
    // VALIDACIÓ
    // =========================

    if (
        !config ||
        !Array.isArray(
            config.compassosDisponibles
        ) ||
        config.compassosDisponibles.length === 0
    ) {

        console.error(
            "No hi ha compassos disponibles."
        );

        return;
    }


    if (
        !Array.isArray(
            config.figuresDisponibles
        ) ||
        config.figuresDisponibles.length === 0
    ) {

        console.error(
            "No hi ha figures disponibles."
        );

        return;
    }


    if (
        !Number.isInteger(
            config.totalPreguntes
        ) ||
        config.totalPreguntes <= 0
    ) {

        console.error(
            "El nombre de preguntes no és vàlid."
        );

        return;
    }


    if (
        !zonaFigures ||
        !botoFort ||
        !botoSemifort ||
        !botoDebil ||
        !botoComprovar
    ) {

        console.error(
            "Falten elements DOM de l'exercici."
        );

        return;
    }



    // =========================
    // ALEATORI
    // =========================

    function obtenirElementAleatori(
        array
    ) {

        if (
            !Array.isArray(array) ||
            array.length === 0
        ) {

            return null;
        }


        return array[
            Math.floor(
                Math.random() *
                array.length
            )
        ];
    }



    // =========================
    // DURADA DEL COMPÀS
    // =========================

    function obtenirDuradaCompas(
        compas
    ) {

        const parts =
            compas.split(
                "/"
            );


        const numerador =
            Number(
                parts[0]
            );


        const denominador =
            Number(
                parts[1]
            );


        return (
            numerador *
            (
                4 /
                denominador
            )
        );
    }



    // =========================
    // ESCOLLIR COMPÀS
    // =========================

    function escollirCompas() {

        let disponibles =
            [
                ...config.compassosDisponibles
            ];


        // =========================
        // EVITAR 3 IGUALS SEGUITS
        // =========================

        if (
            historialCompassos.length >= 2
        ) {

            const ultim =
                historialCompassos[
                    historialCompassos.length - 1
                ];


            const penultim =
                historialCompassos[
                    historialCompassos.length - 2
                ];


            if (
                ultim === penultim
            ) {

                const alternatives =
                    disponibles.filter(
                        compas =>
                            compas !== ultim
                    );


                if (
                    alternatives.length > 0
                ) {

                    disponibles =
                        alternatives;
                }
            }
        }


        const compas =
            obtenirElementAleatori(
                disponibles
            );


        historialCompassos.push(
            compas
        );


        return compas;
    }



    // =========================
    // FIGURES VÀLIDES
    // =========================

    function obtenirFiguresValides() {

        return config.figuresDisponibles.filter(
            figura => {

                const valor =
                    Number(
                        figura.valor
                    );


                return (
                    valor > 0 &&
                    valor <=
                    duradaObjectiu
                );
            }
        );
    }



    // =========================
    // GENERAR SEQÜÈNCIA
    // =========================

    function generarSequencia() {

        const figuresValides =
            obtenirFiguresValides();


        if (
            figuresValides.length === 0
        ) {

            return null;
        }


        let intentsGenerals = 0;


        while (
            intentsGenerals < 500
        ) {

            intentsGenerals++;


            const resultat = [];

            let duradaActual = 0;

            let intentsInterns = 0;


            while (
                duradaActual <
                duradaObjectiu -
                0.000001
            ) {

                intentsInterns++;


                if (
                    intentsInterns > 200
                ) {

                    break;
                }


                const restant =
                    duradaObjectiu -
                    duradaActual;


                const possibles =
                    figuresValides.filter(
                        figura =>
                            Number(
                                figura.valor
                            ) <=
                            restant +
                            0.000001
                    );


                if (
                    possibles.length === 0
                ) {

                    break;
                }


                const figura =
                    obtenirElementAleatori(
                        possibles
                    );


                resultat.push(
                    figura
                );


                duradaActual +=
                    Number(
                        figura.valor
                    );
            }


            const compasComplet =
                Math.abs(
                    duradaActual -
                    duradaObjectiu
                ) <
                0.000001;


            if (
                !compasComplet
            ) {

                continue;
            }


            if (
                resultat.length <= 1
            ) {

                continue;
            }


            const accents =
                calcularAccentsCorrectes(
                    resultat
                );


            const quantitatDownBeats =
                accents.filter(
                    accent =>
                        accent !== null
                ).length;


            // En 3/4 i 4/4
            // volem almenys dues figures
            // que comencin sobre pulsació.

            if (
                (
                    compasActual === "3/4" ||
                    compasActual === "4/4"
                ) &&
                quantitatDownBeats < 2
            ) {

                continue;
            }


            return resultat;
        }


        return null;
    }



    // =========================
    // ACCENT SEGONS PULSACIÓ
    // =========================

    function obtenirAccentPulsacio(
        numeroPulsacio
    ) {

        if (
            compasActual === "2/4"
        ) {

            if (
                numeroPulsacio === 1
            ) {

                return "fort";
            }


            if (
                numeroPulsacio === 2
            ) {

                return "debil";
            }
        }


        if (
            compasActual === "3/4"
        ) {

            if (
                numeroPulsacio === 1
            ) {

                return "fort";
            }


            return "debil";
        }


        if (
            compasActual === "4/4"
        ) {

            if (
                numeroPulsacio === 1
            ) {

                return "fort";
            }


            if (
                numeroPulsacio === 3
            ) {

                return "semifort";
            }


            return "debil";
        }


        return null;
    }



    // =========================
    // CALCULAR ACCENTS CORRECTES
    // =========================

    function calcularAccentsCorrectes(
        figures
    ) {

        const resultat = [];

        let posicioActual = 0;


        figures.forEach(
            figura => {

                const esPulsacio =
                    Math.abs(
                        posicioActual -
                        Math.round(
                            posicioActual
                        )
                    ) <
                    0.000001;


                if (
                    esPulsacio
                ) {

                    const numeroPulsacio =
                        Math.round(
                            posicioActual
                        ) +
                        1;


                    resultat.push(
                        obtenirAccentPulsacio(
                            numeroPulsacio
                        )
                    );

                } else {

                    resultat.push(
                        null
                    );
                }


                posicioActual +=
                    Number(
                        figura.valor
                    );
            }
        );


        return resultat;
    }



    // =========================
    // NOM ACCENT
    // =========================

    function obtenirNomAccent(
        accent
    ) {

        if (
            accent === "fort"
        ) {

            return "Fort";
        }


        if (
            accent === "semifort"
        ) {

            return "Semifort";
        }


        if (
            accent === "debil"
        ) {

            return "Dèbil";
        }


        return "";
    }



    // =========================
    // CREAR FIGURA
    // =========================

    function crearFiguraVisual(
        figura,
        index
    ) {

        const contenidor =
            document.createElement(
                "div"
            );


        contenidor.className =
            "contenidor-figura-accent";


        // =========================
        // BOTÓ FIGURA
        // =========================

        const boto =
            document.createElement(
                "button"
            );


        boto.type =
            "button";


        boto.className =
            "figura-accent-ritmica";


        boto.dataset.index =
            index;


        boto.setAttribute(
            "aria-label",
            figura.nom
                ? figura.nom
                : `Figura ${index + 1}`
        );



        // =========================
        // SÍMBOL
        // =========================

        const simbol =
            document.createElement(
                "span"
            );


        simbol.className =
            "simbol-figura-accent";


        simbol.textContent =
            figura.simbol;


        boto.appendChild(
            simbol
        );



        // =========================
        // ETIQUETA
        // =========================

        const etiqueta =
            document.createElement(
                "span"
            );


        etiqueta.className =
            "etiqueta-figura-accent";


        etiqueta.textContent =
            "";


        boto.appendChild(
            etiqueta
        );



        // =========================
        // CLICK
        // =========================

        boto.addEventListener(
            "click",
            () => {

                assignarAccent(
                    index
                );

            }
        );


        contenidor.appendChild(
            boto
        );


        return contenidor;
    }



    // =========================
    // RENDERITZAR FIGURES
    // =========================

    function renderitzarFigures() {

        zonaFigures.innerHTML =
            "";


        figuresActuals.forEach(
            (
                figura,
                index
            ) => {

                zonaFigures.appendChild(
                    crearFiguraVisual(
                        figura,
                        index
                    )
                );

            }
        );


        actualitzarFiguresVisuals();
    }



    // =========================
    // SELECCIONAR ACCENT
    // =========================

    function seleccionarAccent(
        accent
    ) {

        if (
            respostaValidada
        ) {

            return;
        }


        accentSeleccionat =
            accent;


        actualitzarSelectorVisual();
    }



    // =========================
    // SELECTOR VISUAL
    // =========================

    function actualitzarSelectorVisual() {

        botoFort.classList.toggle(
            "seleccionat",
            accentSeleccionat ===
            "fort"
        );


        botoSemifort.classList.toggle(
            "seleccionat",
            accentSeleccionat ===
            "semifort"
        );


        botoDebil.classList.toggle(
            "seleccionat",
            accentSeleccionat ===
            "debil"
        );
    }



    // =========================
    // ASSIGNAR ACCENT
    // =========================

    function assignarAccent(
        index
    ) {

        if (
            respostaValidada
        ) {

            return;
        }


        if (
            !accentSeleccionat
        ) {

            return;
        }


        // Si tornem a prémer una figura
        // amb el mateix accent,
        // l'esborrem.

        if (
            respostaAlumne[
                index
            ] ===
            accentSeleccionat
        ) {

            respostaAlumne[
                index
            ] =
                null;

        } else {

            respostaAlumne[
                index
            ] =
                accentSeleccionat;
        }


        actualitzarFiguresVisuals();

        actualitzarControls();
    }



    // =========================
    // ACTUALITZAR FIGURES
    // =========================

    function actualitzarFiguresVisuals() {

        const botons =
            zonaFigures.querySelectorAll(
                ".figura-accent-ritmica"
            );


        botons.forEach(
            (
                boto,
                index
            ) => {

                const accent =
                    respostaAlumne[
                        index
                    ];


                boto.classList.remove(
                    "fort",
                    "semifort",
                    "debil"
                );


                const etiqueta =
                    boto.querySelector(
                        ".etiqueta-figura-accent"
                    );


                if (
                    accent
                ) {

                    boto.classList.add(
                        accent
                    );


                    if (
                        etiqueta
                    ) {

                        etiqueta.textContent =
                            obtenirNomAccent(
                                accent
                            );
                    }

                } else {

                    if (
                        etiqueta
                    ) {

                        etiqueta.textContent =
                            "";
                    }
                }

            }
        );
    }



    // =========================
    // COMPROVAR SI ESTÀ COMPLET
    // =========================

    function respostaCompleta() {

        return accentsCorrectes.every(
            (
                accentCorrecte,
                index
            ) => {

                // Si és una figura que
                // no comença sobre pulsació,
                // no cal marcar-la.

                if (
                    accentCorrecte === null
                ) {

                    return true;
                }


                return (
                    typeof respostaAlumne[
                        index
                    ] ===
                    "string"
                );
            }
        );
    }



    // =========================
    // ACTUALITZAR CONTROLS
    // =========================

    function actualitzarControls() {

        botoComprovar.disabled =
            respostaValidada ||
            !respostaCompleta();


        if (
            botoEsborrar
        ) {

            const hiHaResposta =
                respostaAlumne.some(
                    accent =>
                        Boolean(
                            accent
                        )
                );


            botoEsborrar.disabled =
                respostaValidada ||
                !hiHaResposta;
        }
    }



    // =========================
    // ESBORRAR
    // =========================

    function esborrarResposta() {

        if (
            respostaValidada
        ) {

            return;
        }


        respostaAlumne =
            new Array(
                figuresActuals.length
            ).fill(
                null
            );


        actualitzarFiguresVisuals();

        actualitzarControls();
    }



    // =========================
    // COMPARAR
    // =========================

    function compararRespostes() {

        return accentsCorrectes.every(
            (
                accentCorrecte,
                index
            ) => {

                const resposta =
                    respostaAlumne[
                        index
                    ];


                if (
                    accentCorrecte === null
                ) {

                    return (
                        resposta === null
                    );
                }


                return (
                    resposta ===
                    accentCorrecte
                );
            }
        );
    }



    // =========================
    // MOSTRAR SOLUCIÓ
    // =========================

    function mostrarSolucio() {

        const botons =
            zonaFigures.querySelectorAll(
                ".figura-accent-ritmica"
            );


        botons.forEach(
            (
                boto,
                index
            ) => {

                boto.disabled =
                    true;


                const resposta =
                    respostaAlumne[
                        index
                    ];


                const correcta =
                    accentsCorrectes[
                        index
                    ];


                boto.classList.remove(
                    "resposta-correcta",
                    "resposta-incorrecta",
                    "fort",
                    "semifort",
                    "debil"
                );


                const etiqueta =
                    boto.querySelector(
                        ".etiqueta-figura-accent"
                    );


                // =========================
                // FIGURA SOBRE PULSACIÓ
                // =========================

                if (
                    correcta !== null
                ) {

                    boto.classList.add(
                        correcta
                    );


                    if (
                        etiqueta
                    ) {

                        etiqueta.textContent =
                            obtenirNomAccent(
                                correcta
                            );
                    }


                    if (
                        resposta ===
                        correcta
                    ) {

                        boto.classList.add(
                            "resposta-correcta"
                        );

                    } else {

                        boto.classList.add(
                            "resposta-incorrecta"
                        );
                    }

                }


                // =========================
                // FIGURA ENTRE PULSACIONS
                // =========================

                else {

                    if (
                        etiqueta
                    ) {

                        etiqueta.textContent =
                            "";
                    }


                    if (
                        resposta !== null
                    ) {

                        boto.classList.add(
                            "resposta-incorrecta"
                        );
                    }
                }

            }
        );
    }



    // =========================
    // COMPROVAR RESPOSTA
    // =========================

    function comprovarResposta() {

        if (
            respostaValidada ||
            !respostaCompleta()
        ) {

            return;
        }


        respostaValidada =
            true;


        const esCorrecte =
            compararRespostes();


        mostrarSolucio();


        if (
            esCorrecte
        ) {

            encerts++;


            if (
                feedback
            ) {

                feedback.textContent =
                    "Correcte! Has identificat les pulsacions i els seus accents mètrics.";


                feedback.className =
                    "feedback correcte";
            }

        } else {

            if (
                feedback
            ) {

                feedback.textContent =
                    "Incorrecte. Les figures marcades mostren ara els accents mètrics correctes.";


                feedback.className =
                    "feedback incorrecte";
            }
        }


        accentSeleccionat =
            null;


        actualitzarSelectorVisual();

        actualitzarControls();


        setTimeout(
            novaPregunta,
            1800
        );
    }



    // =========================
    // NOVA PREGUNTA
    // =========================

    function novaPregunta() {

        if (
            preguntaActual >=
            config.totalPreguntes
        ) {

            finalitzarExercici();

            return;
        }


        compasActual =
            escollirCompas();


        duradaObjectiu =
            obtenirDuradaCompas(
                compasActual
            );


        figuresActuals =
            generarSequencia();


        if (
            !figuresActuals
        ) {

            console.error(
                "No s'ha pogut generar una seqüència rítmica."
            );

            return;
        }


        accentsCorrectes =
            calcularAccentsCorrectes(
                figuresActuals
            );


        preguntaActual++;


        respostaAlumne =
            new Array(
                figuresActuals.length
            ).fill(
                null
            );


        accentSeleccionat =
            null;


        respostaValidada =
            false;


        if (
            preguntaActualText
        ) {

            preguntaActualText.textContent =
                preguntaActual;
        }


        if (
            totalPreguntesText
        ) {

            totalPreguntesText.textContent =
                config.totalPreguntes;
        }


        if (
            indicadorCompas
        ) {

            indicadorCompas.textContent =
                compasActual;
        }


        if (
            feedback
        ) {

            feedback.textContent =
                "";


            feedback.className =
                "feedback";
        }


        actualitzarSelectorVisual();

        renderitzarFigures();

        actualitzarControls();
    }



    // =========================
    // FINALITZAR
    // =========================

    function finalitzarExercici() {

        const total =
            config.totalPreguntes;


        const percentatge =
            Math.round(
                (
                    encerts /
                    total
                ) *
                100
            );


        if (
            typeof mostrarResultatFinalExercici !==
            "function"
        ) {

            console.error(
                "No s'ha trobat mostrarResultatFinalExercici()."
            );

            return;
        }


        mostrarResultatFinalExercici({

            idExercici:
                config.id,

            encerts:
                encerts,

            total:
                total,

            percentatge:
                percentatge,

            nomCategoria:
                "Llenguatge",

            urlFinal:
                "../../exercicis.html"

        });
    }



    // =========================
    // EVENTS
    // =========================

    botoFort.addEventListener(
        "click",
        () => {

            seleccionarAccent(
                "fort"
            );

        }
    );


    botoSemifort.addEventListener(
        "click",
        () => {

            seleccionarAccent(
                "semifort"
            );

        }
    );


    botoDebil.addEventListener(
        "click",
        () => {

            seleccionarAccent(
                "debil"
            );

        }
    );


    if (
        botoEsborrar
    ) {

        botoEsborrar.addEventListener(
            "click",
            esborrarResposta
        );
    }


    botoComprovar.addEventListener(
        "click",
        comprovarResposta
    );



    // =========================
    // INICI
    // =========================

    if (
        totalPreguntesText
    ) {

        totalPreguntesText.textContent =
            config.totalPreguntes;
    }


    novaPregunta();
}
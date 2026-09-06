// =========================
// MOTOR D'EXERCICIS
// ACCENTS MÈTRICS
// =========================

function iniciarExerciciAccentsMetrics(
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


    const zonaPulsos =
        document.getElementById(
            "zona-pulsos"
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

    let accentSeleccionat = null;

    let respostaAlumne = [];

    let respostaCorrecta = [];

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
        !config.patronsAccentuacio ||
        typeof config.patronsAccentuacio !==
        "object"
    ) {

        console.error(
            "No hi ha patrons d'accentuació."
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
        !zonaPulsos ||
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
    // OBTENIR PATRÓ CORRECTE
    // =========================

    function obtenirPatroCorrecte(
        compas
    ) {

        const patro =
            config.patronsAccentuacio[
                compas
            ];


        if (
            !Array.isArray(
                patro
            ) ||
            patro.length === 0
        ) {

            console.error(
                `No hi ha patró per al compàs ${compas}.`
            );

            return null;
        }


        return [
            ...patro
        ];
    }



    // =========================
    // NOM DE L'ACCENT
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
    // CREAR PULS
    // =========================

    function crearPuls(
        index
    ) {

        const contenidor =
            document.createElement(
                "div"
            );


        contenidor.className =
            "puls-metric";


        // =========================
        // NÚMERO
        // =========================

        const numero =
            document.createElement(
                "div"
            );


        numero.className =
            "numero-puls";


        numero.textContent =
            index + 1;



        // =========================
        // BOTÓ
        // =========================

        const boto =
            document.createElement(
                "button"
            );


        boto.type =
            "button";


        boto.className =
            "boto-puls-metric";


        boto.dataset.index =
            index;


        boto.setAttribute(
            "aria-label",
            `Pulsació ${index + 1}`
        );



        // =========================
        // ETIQUETA
        // =========================

        const etiqueta =
            document.createElement(
                "span"
            );


        etiqueta.className =
            "etiqueta-accent";


        etiqueta.textContent =
            "?";


        boto.appendChild(
            etiqueta
        );


        boto.addEventListener(
            "click",
            () => {

                assignarAccent(
                    index
                );

            }
        );



        // =========================
        // AFEGIR
        // =========================

        contenidor.appendChild(
            numero
        );


        contenidor.appendChild(
            boto
        );


        return contenidor;
    }



    // =========================
    // RENDERITZAR PULSOS
    // =========================

    function renderitzarPulsos() {

        zonaPulsos.innerHTML =
            "";


        respostaCorrecta.forEach(
            (
                accent,
                index
            ) => {

                zonaPulsos.appendChild(
                    crearPuls(
                        index
                    )
                );

            }
        );


        actualitzarPulsosVisuals();
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
            accentSeleccionat === "fort"
        );


        botoSemifort.classList.toggle(
            "seleccionat",
            accentSeleccionat ===
            "semifort"
        );


        botoDebil.classList.toggle(
            "seleccionat",
            accentSeleccionat === "debil"
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


        respostaAlumne[
            index
        ] =
            accentSeleccionat;


        actualitzarPulsosVisuals();

        actualitzarControls();
    }



    // =========================
    // ACTUALITZAR PULSOS
    // =========================

    function actualitzarPulsosVisuals() {

        const botons =
            zonaPulsos.querySelectorAll(
                ".boto-puls-metric"
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


                // =========================
                // NETEJAR
                // =========================

                boto.classList.remove(
                    "fort",
                    "semifort",
                    "debil"
                );


                const etiqueta =
                    boto.querySelector(
                        ".etiqueta-accent"
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
                            "?";
                    }
                }

            }
        );
    }



    // =========================
    // COMPROVAR SI ESTÀ COMPLET
    // =========================

    function respostaCompleta() {

        if (
            respostaAlumne.length !==
            respostaCorrecta.length
        ) {

            return false;
        }


        return respostaCorrecta.every(
            (
                accent,
                index
            ) =>
                typeof respostaAlumne[
                    index
                ] ===
                "string"
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
                respostaCorrecta.length
            ).fill(
                null
            );


        actualitzarPulsosVisuals();

        actualitzarControls();
    }



    // =========================
    // COMPARAR
    // =========================

    function compararRespostes() {

        if (
            respostaAlumne.length !==
            respostaCorrecta.length
        ) {

            return false;
        }


        return respostaCorrecta.every(
            (
                accent,
                index
            ) =>
                respostaAlumne[
                    index
                ] ===
                accent
        );
    }



    // =========================
    // MOSTRAR SOLUCIÓ
    // =========================

    function mostrarSolucio() {

        const botons =
            zonaPulsos.querySelectorAll(
                ".boto-puls-metric"
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
                    respostaCorrecta[
                        index
                    ];


                boto.classList.remove(
                    "resposta-correcta",
                    "resposta-incorrecta"
                );


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



                // =========================
                // MOSTRAR SEMPRE
                // LA SOLUCIÓ CORRECTA
                // =========================

                boto.classList.remove(
                    "fort",
                    "semifort",
                    "debil"
                );


                boto.classList.add(
                    correcta
                );


                const etiqueta =
                    boto.querySelector(
                        ".etiqueta-accent"
                    );


                if (
                    etiqueta
                ) {

                    etiqueta.textContent =
                        obtenirNomAccent(
                            correcta
                        );
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



        // =========================
        // CORRECTE
        // =========================

        if (
            esCorrecte
        ) {

            encerts++;


            if (
                feedback
            ) {

                feedback.textContent =
                    "Correcte! Has identificat bé els accents mètrics.";


                feedback.className =
                    "feedback correcte";
            }

        }


        // =========================
        // INCORRECTE
        // =========================

        else {

            if (
                feedback
            ) {

                feedback.textContent =
                    "Incorrecte. Ara pots veure l'accent correcte de cada pulsació.";


                feedback.className =
                    "feedback incorrecte";
            }
        }


        accentSeleccionat =
            null;


        actualitzarSelectorVisual();

        actualitzarControls();



        // =========================
        // SEGÜENT
        // =========================

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



        // =========================
        // COMPÀS
        // =========================

        compasActual =
            escollirCompas();


        respostaCorrecta =
            obtenirPatroCorrecte(
                compasActual
            );


        if (
            !respostaCorrecta
        ) {

            return;
        }



        // =========================
        // ESTAT
        // =========================

        preguntaActual++;


        accentSeleccionat =
            null;


        respostaAlumne =
            new Array(
                respostaCorrecta.length
            ).fill(
                null
            );


        respostaValidada =
            false;



        // =========================
        // PROGRÉS
        // =========================

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



        // =========================
        // MOSTRAR COMPÀS
        // =========================

        if (
            indicadorCompas
        ) {

            indicadorCompas.textContent =
                compasActual;
        }



        // =========================
        // FEEDBACK
        // =========================

        if (
            feedback
        ) {

            feedback.textContent =
                "";


            feedback.className =
                "feedback";
        }



        // =========================
        // RENDER
        // =========================

        actualitzarSelectorVisual();

        renderitzarPulsos();

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
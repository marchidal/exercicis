// =========================
// MOTOR D'INTERVALS MELÒDICS
// =========================

function iniciarIntervalsMelodics(config) {

    // =========================
    // ELEMENTS HTML
    // =========================

    const botoEscoltar =
        document.getElementById("escoltar-btn");

    const contenidorRespostes =
        document.getElementById("opcions-resposta");

    const feedback =
        document.getElementById("feedback");

    const indicadorPregunta =
        document.getElementById("indicador-pregunta");


    // =========================
    // ESTAT DE L'EXERCICI
    // =========================

    let preguntes = [];

    let indexPregunta = 0;

    let encerts = 0;

    let preguntaActual = null;

    let respostaBloquejada = false;


    // =========================
    // CREAR PREGUNTES
    // =========================

    function crearPreguntes() {

        const resultat = [];


        // -------------------------
        // MODE DIRECCIÓ
        // -------------------------

        if (
            config.mode === "direccio"
        ) {

            const repeticions =
                config.preguntesPerTipus || 4;


            config.direccions.forEach(
                direccio => {

                    for (
                        let i = 0;
                        i < repeticions;
                        i++
                    ) {

                        resultat.push({
                            direccio
                        });
                    }
                }
            );
        }


        // -------------------------
        // MODE INTERVAL
        // -------------------------

        if (
            config.mode === "interval"
        ) {

            const repeticions =
                config.preguntesPerInterval || 2;


            config.intervals.forEach(
                intervalId => {

                    for (
                        let i = 0;
                        i < repeticions;
                        i++
                    ) {

                        resultat.push({
                            intervalId
                        });
                    }
                }
            );
        }


        return barrejarPreguntes(
            resultat
        );
    }


    // =========================
    // BARREJAR
    // =========================

    function barrejarPreguntes(array) {

        const copia = [...array];


        for (
            let i = copia.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );


            [
                copia[i],
                copia[j]
            ] = [
                copia[j],
                copia[i]
            ];
        }


        return copia;
    }


    // =========================
    // GENERAR PREGUNTA
    // =========================

    function prepararPregunta() {

        preguntaActual =
            preguntes[indexPregunta];


        respostaBloquejada = false;


        feedback.textContent = "";
        feedback.className = "feedback";


        actualitzarIndicador();


        // =========================
        // MODE DIRECCIÓ
        // =========================

        if (
            config.mode === "direccio"
        ) {

            prepararPreguntaDireccio();
        }


        // =========================
        // MODE INTERVAL
        // =========================

        if (
            config.mode === "interval"
        ) {

            prepararPreguntaInterval();
        }


        crearBotonsResposta();
    }


    // =========================
    // PREGUNTA DE DIRECCIÓ
    // =========================

    function prepararPreguntaDireccio() {

        const direccio =
            preguntaActual.direccio;


        // -------------------------
        // UNÍSON
        // -------------------------

        if (
            direccio === "uniso"
        ) {

            preguntaActual.interval =
                obtenirInterval("uniso");

        } else {

            preguntaActual.interval =
                obtenirIntervalAleatori(
                    config.intervals
                );
        }


        // =========================
        // TROBAR NOTA VÀLIDA
        // =========================

        preguntaActual.notaInicial =
            obtenirNotaInicialValida(
                preguntaActual.interval,
                direccio
            );
    }


    // =========================
    // PREGUNTA D'INTERVAL
    // =========================

    function prepararPreguntaInterval() {

        const interval =
            obtenirInterval(
                preguntaActual.intervalId
            );


        preguntaActual.interval =
            interval;


        // En aquesta fase no utilitzem
        // uníson tret que estigui configurat.

        let direccions =
            config.direccions || [
                "ascendent",
                "descendent"
            ];


        if (
            interval.semitons === 0
        ) {

            preguntaActual.direccio =
                "uniso";

        } else {

            direccions =
                direccions.filter(
                    direccio =>
                        direccio !== "uniso"
                );


            preguntaActual.direccio =
                elementAleatori(
                    direccions
                );
        }


        preguntaActual.notaInicial =
            obtenirNotaInicialValida(
                interval,
                preguntaActual.direccio
            );
    }


    // =========================
    // NOTA INICIAL VÀLIDA
    // =========================

    function obtenirNotaInicialValida(
        interval,
        direccio
    ) {

        const midiMin =
            config.midiMin ?? 48;

        const midiMax =
            config.midiMax ?? 72;


        const candidates =
            obtenirNotesEntre(
                midiMin,
                midiMax
            );


        const notesValides =
            candidates.filter(
                nota => {

                    let semitons =
                        interval.semitons;


                    if (
                        direccio ===
                        "descendent"
                    ) {

                        semitons =
                            -semitons;
                    }


                    if (
                        direccio ===
                        "uniso"
                    ) {

                        semitons = 0;
                    }


                    const midiFinal =
                        nota.midi +
                        semitons;


                    return (
                        midiFinal >= midiMin &&
                        midiFinal <= midiMax &&
                        existeixNotaMidi(
                            midiFinal
                        )
                    );
                }
            );


        if (
            notesValides.length === 0
        ) {

            console.warn(
                "No hi ha cap nota inicial vàlida."
            );

            return null;
        }


        return elementAleatori(
            notesValides
        );
    }


    // =========================
    // ELEMENT ALEATORI
    // =========================

    function elementAleatori(array) {

        if (
            !array ||
            array.length === 0
        ) {

            return null;
        }


        const index =
            Math.floor(
                Math.random() *
                array.length
            );


        return array[index];
    }


    // =========================
    // CREAR BOTONS
    // =========================

    function crearBotonsResposta() {

        contenidorRespostes.innerHTML = "";


        // -------------------------
        // MODE DIRECCIÓ
        // -------------------------

        if (
            config.mode === "direccio"
        ) {

            const etiquetes = {

                ascendent:
                    "Ascendent",

                descendent:
                    "Descendent",

                uniso:
                    "Uníson"
            };


            config.direccions.forEach(
                direccio => {

                    crearBoto(
                        etiquetes[direccio],
                        direccio
                    );
                }
            );
        }


        // -------------------------
        // MODE INTERVAL
        // -------------------------

        if (
            config.mode === "interval"
        ) {

            config.intervals.forEach(
                intervalId => {

                    const interval =
                        obtenirInterval(
                            intervalId
                        );


                    if (!interval) {
                        return;
                    }


                    crearBoto(
                        interval.abreviatura,
                        interval.id
                    );
                }
            );
        }
    }


    // =========================
    // CREAR UN BOTÓ
    // =========================

    function crearBoto(
        text,
        valor
    ) {

        const boto =
            document.createElement(
                "button"
            );


        boto.type = "button";

        boto.className =
            "opcio-resposta";

        boto.textContent =
            text;

        boto.dataset.valor =
            valor;


        boto.addEventListener(
            "click",
            () => {

                comprovarResposta(
                    valor
                );
            }
        );


        contenidorRespostes.appendChild(
            boto
        );
    }


    // =========================
    // ESCOLTAR
    // =========================

    async function escoltarPregunta() {

        if (
            !preguntaActual ||
            !preguntaActual.notaInicial ||
            !preguntaActual.interval
        ) {

            return;
        }


        await activarAudio();


        reproduirIntervalMelodic(
            preguntaActual.notaInicial,
            preguntaActual.interval,
            preguntaActual.direccio
        );
    }


    // =========================
    // COMPROVAR RESPOSTA
    // =========================

    function comprovarResposta(
        resposta
    ) {

        if (
            respostaBloquejada
        ) {

            return;
        }


        respostaBloquejada = true;


        let respostaCorrecta;


        // -------------------------
        // MODE DIRECCIÓ
        // -------------------------

        if (
            config.mode === "direccio"
        ) {

            respostaCorrecta =
                preguntaActual.direccio;
        }


        // -------------------------
        // MODE INTERVAL
        // -------------------------

        if (
            config.mode === "interval"
        ) {

            respostaCorrecta =
                preguntaActual.interval.id;
        }


        // =========================
        // RESULTAT
        // =========================

        if (
            resposta ===
            respostaCorrecta
        ) {

            encerts++;

            feedback.textContent =
                "Correcte!";

            feedback.className =
                "feedback correcte";

        } else {

            feedback.textContent =
                obtenirMissatgeError(
                    respostaCorrecta
                );

            feedback.className =
                "feedback incorrecte";
        }


        marcarBotons(
            respostaCorrecta,
            resposta
        );


        // =========================
        // SEGÜENT PREGUNTA
        // =========================

        setTimeout(
            () => {

                indexPregunta++;


                if (
                    indexPregunta >=
                    preguntes.length
                ) {

                    finalitzarExercici();

                } else {

                    prepararPregunta();

                    escoltarPregunta();
                }

            },
            1200
        );
    }


    // =========================
    // MISSATGE D'ERROR
    // =========================

    function obtenirMissatgeError(
        respostaCorrecta
    ) {

        if (
            config.mode === "direccio"
        ) {

            const etiquetes = {

                ascendent:
                    "ascendent",

                descendent:
                    "descendent",

                uniso:
                    "uníson"
            };


            return (
                "La resposta correcta era " +
                etiquetes[
                    respostaCorrecta
                ] +
                "."
            );
        }


        const interval =
            obtenirInterval(
                respostaCorrecta
            );


        return (
            "La resposta correcta era " +
            interval.abreviatura +
            "."
        );
    }


    // =========================
    // MARCAR BOTONS
    // =========================

    function marcarBotons(
        correcta,
        resposta
    ) {

        const botons =
            contenidorRespostes.querySelectorAll(
                ".opcio-resposta"
            );


        botons.forEach(
            boto => {

                boto.disabled = true;


                if (
                    boto.dataset.valor ===
                    correcta
                ) {

                    boto.classList.add(
                        "correcta"
                    );
                }


                if (
                    boto.dataset.valor ===
                    resposta &&
                    resposta !== correcta
                ) {

                    boto.classList.add(
                        "incorrecta"
                    );
                }
            }
        );
    }


    // =========================
    // INDICADOR DE PREGUNTA
    // =========================

    function actualitzarIndicador() {

        if (!indicadorPregunta) {
            return;
        }


        indicadorPregunta.textContent =
            `Pregunta ${
                indexPregunta + 1
            } / ${
                preguntes.length
            }`;
    }


    // =========================
    // FINALITZAR
    // =========================

    function finalitzarExercici() {
    
        const total =
            preguntes.length;
    
        const percentatge =
            Math.round(
                (
                    encerts /
                    total
                ) * 100
            );
    
    
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
                "Dictat melòdic",
    
            urlFinal:
                "../../exercicis.html"
    
        });
    }


    // =========================
    // ESDEVENIMENTS
    // =========================

    if (botoEscoltar) {

        botoEscoltar.addEventListener(
            "click",
            escoltarPregunta
        );
    }


    // =========================
    // INICI
    // =========================

    preguntes =
        crearPreguntes();


    if (
        preguntes.length === 0
    ) {

        console.error(
            "No s'han pogut crear preguntes."
        );

        return;
    }


    prepararPregunta();
}
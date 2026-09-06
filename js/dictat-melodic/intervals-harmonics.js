// =========================
// MOTOR D'INTERVALS HARMÒNICS
// =========================

function iniciarIntervalsHarmonics(config) {

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
    // ESTAT
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

        const preguntesGenerades = [];

        const repeticions =
            config.preguntesPerInterval || 4;


        config.intervals.forEach(
            intervalId => {

                for (
                    let i = 0;
                    i < repeticions;
                    i++
                ) {

                    preguntesGenerades.push({
                        intervalId
                    });
                }
            }
        );


        return barrejar(
            preguntesGenerades
        );
    }


    // =========================
    // BARREJAR
    // =========================

    function barrejar(array) {

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
    // PREPARAR PREGUNTA
    // =========================

    function prepararPregunta() {

        preguntaActual =
            preguntes[
                indexPregunta
            ];


        respostaBloquejada =
            false;


        feedback.textContent =
            "";

        feedback.className =
            "feedback";


        const interval =
            obtenirInterval(
                preguntaActual.intervalId
            );


        preguntaActual.interval =
            interval;


        preguntaActual.notaInferior =
            obtenirNotaInferiorValida(
                interval
            );


        actualitzarIndicador();

        crearBotonsResposta();
    }


    // =========================
    // NOTA INFERIOR VÀLIDA
    // =========================

    function obtenirNotaInferiorValida(
        interval
    ) {
    
        // =========================
        // REGISTRE
        // =========================
    
        const midiMin =
            config.midiMin ??
            REGISTRE_AUDITIU.midiMin;
    
        const midiMax =
            config.midiMax ??
            REGISTRE_AUDITIU.midiMax;
    
    
        // =========================
        // NOTES DISPONIBLES
        // =========================
    
        const candidates =
            obtenirNotesEntre(
                midiMin,
                midiMax
            );
    
    
        // =========================
        // COMPROVAR QUE LES DUES
        // NOTES EXISTEIXEN
        // =========================
    
        const notesValides =
            candidates.filter(
                nota => {
    
                    const midiSuperior =
                        nota.midi +
                        interval.semitons;
    
    
                    return (
                        midiSuperior >= midiMin &&
                        midiSuperior <= midiMax &&
                        existeixNotaMidi(
                            midiSuperior
                        )
                    );
                }
            );
    
    
        // =========================
        // CAP NOTA VÀLIDA
        // =========================
    
        if (
            notesValides.length === 0
        ) {
    
            console.warn(
                `No hi ha cap nota inferior vàlida per a l'interval ${interval.id}.`
            );
    
            return null;
        }
    
    
        // =========================
        // ESCOLLIR NOTA ALEATÒRIA
        // =========================
    
        return elementAleatori(
            notesValides
        );
    }


    // =========================
    // CREAR BOTONS
    // =========================

    function crearBotonsResposta() {

        contenidorRespostes.innerHTML =
            "";


        config.respostes.forEach(
            resposta => {

                const boto =
                    document.createElement(
                        "button"
                    );


                boto.type =
                    "button";

                boto.className =
                    "opcio-resposta";

                boto.textContent =
                    resposta.text;

                boto.dataset.valor =
                    resposta.valor;


                boto.addEventListener(
                    "click",
                    () => {

                        comprovarResposta(
                            resposta.valor
                        );
                    }
                );


                contenidorRespostes.appendChild(
                    boto
                );
            }
        );
    }


    // =========================
    // ESCOLTAR
    // =========================

    async function escoltarPregunta() {

        if (
            !preguntaActual ||
            !preguntaActual.interval ||
            !preguntaActual.notaInferior
        ) {

            return;
        }


        await activarAudio();


        reproduirIntervalHarmonic(
            preguntaActual.notaInferior,
            preguntaActual.interval
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


        respostaBloquejada =
            true;


        const respostaCorrecta =
            preguntaActual.interval
                .familiaHarmonica;


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
                `Incorrecte. Era ${obtenirNomFamilia(respostaCorrecta)}.`;

            feedback.className =
                "feedback incorrecte";
        }


        marcarBotons(
            respostaCorrecta,
            resposta
        );


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
    // NOM DE LA FAMÍLIA
    // =========================

    function obtenirNomFamilia(
        familia
    ) {

        const noms = {

            "dissonancia":
                "dissonant",

            "consonancia-imperfecta":
                "consonant imperfecte",

            "consonancia-perfecta":
                "consonant perfecte"

        };


        return noms[familia] || familia;
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

                boto.disabled =
                    true;


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
    // INDICADOR
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
    // FINAL
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
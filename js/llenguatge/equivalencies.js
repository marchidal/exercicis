// =========================
// MOTOR D'EXERCICIS
// EQUIVALÈNCIES DE FIGURES
// =========================

function iniciarExerciciEquivalencies(
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


    const figuraGran =
        document.getElementById(
            "figura-gran"
        );


    const figuraPetita =
        document.getElementById(
            "figura-petita"
        );


    const inputResposta =
        document.getElementById(
            "resposta-equivalencia"
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

    let figuraOrigen = null;

    let figuraEquivalent = null;

    let respostaCorrecta = null;

    let respostaValidada = false;



    // =========================
    // VALIDAR CONFIGURACIÓ
    // =========================

    if (
        !config ||
        !Array.isArray(
            config.figuresDisponibles
        ) ||
        config.figuresDisponibles.length < 2
    ) {

        console.error(
            "La configuració de l'exercici d'equivalències no és vàlida."
        );

        return;
    }


    if (
        !config.totalPreguntes ||
        config.totalPreguntes <= 0
    ) {

        console.error(
            "El nombre total de preguntes no és vàlid."
        );

        return;
    }



    // =========================
    // FIGURA ALEATÒRIA
    // =========================

    function obtenirFiguraAleatoria() {

        const index =
            Math.floor(
                Math.random() *
                config.figuresDisponibles.length
            );


        return config.figuresDisponibles[
            index
        ];
    }



    // =========================
    // GENERAR PARELL VÀLID
    // =========================

    function generarParellFigures() {

        let intents = 0;


        while (
            intents < 100
        ) {

            intents++;


            const origen =
                obtenirFiguraAleatoria();


            const equivalent =
                obtenirFiguraAleatoria();


            if (
                origen.id ===
                equivalent.id
            ) {
                continue;
            }


            const valorOrigen =
                Number(
                    origen.valor
                );


            const valorEquivalent =
                Number(
                    equivalent.valor
                );


            if (
                !Number.isFinite(
                    valorOrigen
                ) ||
                !Number.isFinite(
                    valorEquivalent
                )
            ) {
                continue;
            }


            // Només volem preguntar
            // quantes figures petites
            // caben dins d'una de més gran

            if (
                valorOrigen <=
                valorEquivalent
            ) {
                continue;
            }


            const equivalencia =
                valorOrigen /
                valorEquivalent;


            // Evitem resultats decimals

            if (
                Math.abs(
                    equivalencia -
                    Math.round(
                        equivalencia
                    )
                ) >
                0.000001
            ) {
                continue;
            }


            return {
                origen,
                equivalent,
                resposta:
                    Math.round(
                        equivalencia
                    )
            };
        }


        console.error(
            "No s'ha pogut generar una equivalència vàlida."
        );


        return null;
    }



    // =========================
    // ACTUALITZAR BOTÓ
    // =========================

    function actualitzarBotoComprovar() {

        if (
            !inputResposta ||
            !botoComprovar
        ) {
            return;
        }


        botoComprovar.disabled =
            inputResposta.value.trim() === "" ||
            respostaValidada;
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


        preguntaActual++;


        respostaValidada =
            false;


        const parell =
            generarParellFigures();


        if (!parell) {
            return;
        }


        figuraOrigen =
            parell.origen;


        figuraEquivalent =
            parell.equivalent;


        respostaCorrecta =
            parell.resposta;



        // =========================
        // MOSTRAR FIGURES
        // =========================

        if (figuraGran) {

            figuraGran.textContent =
                figuraOrigen.simbol;
        }


        if (figuraPetita) {

            figuraPetita.textContent =
                figuraEquivalent.simbol;
        }



        // =========================
        // PROGRÉS
        // =========================

        if (preguntaActualText) {

            preguntaActualText.textContent =
                preguntaActual;
        }


        if (totalPreguntesText) {

            totalPreguntesText.textContent =
                config.totalPreguntes;
        }



        // =========================
        // NETEJAR RESPOSTA
        // =========================

        if (inputResposta) {

            inputResposta.value =
                "";

            inputResposta.disabled =
                false;

            inputResposta.focus();
        }


        if (feedback) {

            feedback.textContent =
                "";

            feedback.className =
                "feedback";
        }


        actualitzarBotoComprovar();
    }



    // =========================
    // COMPROVAR RESPOSTA
    // =========================

    function comprovarResposta() {

        if (
            respostaValidada ||
            !inputResposta
        ) {
            return;
        }


        const respostaAlumne =
            Number(
                inputResposta.value
            );


        if (
            !Number.isFinite(
                respostaAlumne
            )
        ) {
            return;
        }


        respostaValidada =
            true;


        inputResposta.disabled =
            true;


        if (botoComprovar) {

            botoComprovar.disabled =
                true;
        }


        const esCorrecta =
            respostaAlumne ===
            respostaCorrecta;



        // =========================
        // FEEDBACK
        // =========================

        if (esCorrecta) {

            encerts++;


            if (feedback) {

                feedback.textContent =
                    `Correcte! Una ${figuraOrigen.nom} equival a ${respostaCorrecta} ${figuraEquivalent.nomPlural}.`;

                feedback.className =
                    "feedback correcte";
            }

        } else {

            if (feedback) {

                feedback.textContent =
                    `Incorrecte. Una ${figuraOrigen.nom} equival a ${respostaCorrecta} ${figuraEquivalent.nomPlural}.`;

                feedback.className =
                    "feedback incorrecte";
            }
        }



        // =========================
        // SEGÜENT AUTOMÀTICAMENT
        // =========================

        setTimeout(
            novaPregunta,
            1400
        );
    }



    // =========================
    // FINALITZAR EXERCICI
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

    if (inputResposta) {

        inputResposta.addEventListener(
            "input",
            actualitzarBotoComprovar
        );


        inputResposta.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Enter" &&
                    botoComprovar &&
                    !botoComprovar.disabled
                ) {

                    comprovarResposta();
                }

            }
        );
    }


    if (botoComprovar) {

        botoComprovar.addEventListener(
            "click",
            comprovarResposta
        );
    }



    // =========================
    // INICI
    // =========================

    if (totalPreguntesText) {

        totalPreguntesText.textContent =
            config.totalPreguntes;
    }


    novaPregunta();
}
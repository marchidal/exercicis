// =========================
// MOTOR D'EXERCICIS
// SUMA DE FIGURES
// =========================

function iniciarExerciciSumes(
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


    const elementsFigures = [

        document.getElementById(
            "primera-figura"
        ),

        document.getElementById(
            "segona-figura"
        ),

        document.getElementById(
            "tercera-figura"
        )

    ];


    const inputResposta =
        document.getElementById(
            "resposta-suma"
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

    let figuresActuals = [];

    let respostaCorrecta = 0;

    let respostaValidada = false;



    // =========================
    // VALIDAR CONFIGURACIÓ
    // =========================

    if (
        !config ||
        !Array.isArray(
            config.figuresDisponibles
        ) ||
        config.figuresDisponibles.length === 0
    ) {

        console.error(
            "La configuració de l'exercici de sumes no és vàlida."
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
    // QUANTITAT DE FIGURES
    // =========================

    const quantitatFigures =
        config.quantitatFigures || 2;



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
    // VALOR DE FIGURA
    // =========================

    function obtenirValorFigura(
        figura
    ) {

        const valor =
            Number(
                figura.valor
            );


        if (
            !Number.isFinite(
                valor
            )
        ) {

            console.error(
                "La figura no té un valor numèric vàlid:",
                figura
            );

            return 0;
        }


        return valor;
    }



    // =========================
    // MOSTRAR FIGURES
    // =========================

    function mostrarFigures() {

        elementsFigures.forEach(
            (
                element,
                index
            ) => {

                if (!element) {
                    return;
                }


                const figura =
                    figuresActuals[
                        index
                    ];


                if (
                    index <
                    quantitatFigures &&
                    figura
                ) {

                    element.textContent =
                        figura.simbol || "";

                    element.hidden =
                        false;

                } else {

                    element.textContent =
                        "";

                    element.hidden =
                        true;
                }

            }
        );
    }



    // =========================
    // FORMATAR NÚMERO
    // =========================

    function formatarNumero(
        valor
    ) {

        return String(
            valor
        ).replace(
            ".",
            ","
        );
    }



    // =========================
    // TEXT DE L'OPERACIÓ
    // =========================

    function obtenirTextOperacio() {

        const valors =
            figuresActuals.map(
                figura =>
                    formatarNumero(
                        obtenirValorFigura(
                            figura
                        )
                    )
            );


        return valors.join(
            " + "
        );
    }



    // =========================
    // ACTUALITZAR BOTÓ
    // =========================

    function actualitzarBotoComprovar() {

        if (!botoComprovar) {
            return;
        }


        const valor =
            inputResposta
                ? inputResposta.value.trim()
                : "";


        botoComprovar.disabled =
            valor === "" ||
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


        figuresActuals =
            [];


        for (
            let i = 0;
            i < quantitatFigures;
            i++
        ) {

            figuresActuals.push(
                obtenirFiguraAleatoria()
            );
        }



        // =========================
        // CALCULAR RESULTAT
        // =========================

        respostaCorrecta =
            figuresActuals.reduce(
                (
                    total,
                    figura
                ) => {

                    return total +
                        obtenirValorFigura(
                            figura
                        );

                },
                0
            );



        // =========================
        // MOSTRAR FIGURES
        // =========================

        mostrarFigures();



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
            Math.abs(
                respostaAlumne -
                respostaCorrecta
            ) <
            0.000001;



        // =========================
        // FEEDBACK
        // =========================

        if (esCorrecta) {

            encerts++;


            if (feedback) {

                feedback.textContent =
                    `Correcte! ${obtenirTextOperacio()} = ${formatarNumero(
                        respostaCorrecta
                    )}.`;

                feedback.className =
                    "feedback correcte";
            }

        } else {

            if (feedback) {

                feedback.textContent =
                    `Incorrecte. ${obtenirTextOperacio()} = ${formatarNumero(
                        respostaCorrecta
                    )}.`;

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
                    event.key === "Enter" &&
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
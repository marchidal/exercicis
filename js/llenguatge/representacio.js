// =========================
// MOTOR D'EXERCICIS
// REPRESENTACIÓ DE FIGURES
// =========================

function iniciarExerciciRepresentacio(
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


    const primeraFiguraElement =
        document.getElementById(
            "primera-figura"
        );


    const segonaFiguraElement =
        document.getElementById(
            "segona-figura"
        );


    const nomPrimeraFigura =
        document.getElementById(
            "nom-primera-figura"
        );


    const nomSegonaFigura =
        document.getElementById(
            "nom-segona-figura"
        );


    const botoPrimeraFigura =
        document.getElementById(
            "boto-primera-figura"
        );


    const botoSegonaFigura =
        document.getElementById(
            "boto-segona-figura"
        );


    const simbolUnitat =
        document.getElementById(
            "simbol-unitat"
        );


    const nomUnitat =
        document.getElementById(
            "nom-unitat"
        );


    const zonaQuadrats =
        document.getElementById(
            "zona-quadrats"
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


    let figura1 = null;

    let figura2 = null;


    let unitatQuadratActual = null;


    let quantitatFigura1 = 0;

    let quantitatFigura2 = 0;


    let colorSeleccionat = 1;

    let respostaValidada = false;


    // 0 = buit
    // 1 = primera figura
    // 2 = segona figura

    let estatQuadrats = [];



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
            "La configuració de les figures disponibles no és vàlida."
        );

        return;
    }


    if (
        !Array.isArray(
            config.unitatsQuadratDisponibles
        ) ||
        config.unitatsQuadratDisponibles.length === 0
    ) {

        console.error(
            "No hi ha unitats de quadrat disponibles."
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
            "El nombre total de preguntes no és vàlid."
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
    // VALOR DE FIGURA
    // =========================

    function obtenirValorFigura(
        figura
    ) {

        if (!figura) {
            return 0;
        }


        const valor =
            Number(
                figura.valor
            );


        if (
            !Number.isFinite(valor) ||
            valor <= 0
        ) {

            return 0;
        }


        return valor;
    }



    // =========================
    // CALCULAR QUADRATS
    // =========================

    function calcularQuantitatQuadrats(
        figura,
        unitat
    ) {

        const valorFigura =
            obtenirValorFigura(
                figura
            );


        const valorUnitat =
            obtenirValorFigura(
                unitat
            );


        if (
            valorFigura <= 0 ||
            valorUnitat <= 0
        ) {

            return null;
        }


        const resultat =
            valorFigura /
            valorUnitat;


        // La figura només és compatible
        // si necessita un nombre enter
        // de quadrats.

        if (
            resultat < 1 ||
            Math.abs(
                resultat -
                Math.round(resultat)
            ) >
            0.000001
        ) {

            return null;
        }


        return Math.round(
            resultat
        );
    }



    // =========================
    // FIGURES COMPATIBLES
    // =========================

    function obtenirFiguresCompatibles(
        unitat
    ) {

        return config.figuresDisponibles.filter(
            figura => {

                const quantitat =
                    calcularQuantitatQuadrats(
                        figura,
                        unitat
                    );


                return (
                    quantitat !== null &&
                    quantitat >= 1
                );
            }
        );
    }



    // =========================
    // UNITATS VÀLIDES
    // =========================

    function obtenirUnitatsValides() {

        return config.unitatsQuadratDisponibles.filter(
            unitat => {

                const valorUnitat =
                    obtenirValorFigura(
                        unitat
                    );


                if (
                    valorUnitat <= 0
                ) {

                    return false;
                }


                const figuresCompatibles =
                    obtenirFiguresCompatibles(
                        unitat
                    );


                // Necessitem almenys dues
                // figures diferents disponibles.

                return (
                    figuresCompatibles.length >= 2
                );
            }
        );
    }



    // =========================
    // GENERAR PREGUNTA
    // =========================

    function generarPregunta() {

        const unitatsValides =
            obtenirUnitatsValides();


        if (
            unitatsValides.length === 0
        ) {

            console.error(
                "No hi ha cap unitat que permeti generar una pregunta vàlida."
            );

            return null;
        }


        const unitat =
            obtenirElementAleatori(
                unitatsValides
            );


        const figuresCompatibles =
            obtenirFiguresCompatibles(
                unitat
            );


        if (
            figuresCompatibles.length < 2
        ) {

            return null;
        }



        // =========================
        // PRIMERA FIGURA
        // =========================

        const primera =
            obtenirElementAleatori(
                figuresCompatibles
            );



        // =========================
        // SEGONA FIGURA
        // =========================
        //
        // Evitem que les dues figures
        // siguin iguals.
        // =========================

        const opcionsSegonaFigura =
            figuresCompatibles.filter(
                figura =>
                    figura.id !==
                    primera.id
            );


        const segona =
            obtenirElementAleatori(
                opcionsSegonaFigura
            );


        if (
            !primera ||
            !segona
        ) {

            return null;
        }



        const quantitat1 =
            calcularQuantitatQuadrats(
                primera,
                unitat
            );


        const quantitat2 =
            calcularQuantitatQuadrats(
                segona,
                unitat
            );


        if (
            quantitat1 === null ||
            quantitat2 === null
        ) {

            return null;
        }


        return {

            unitat:
                unitat,

            figura1:
                primera,

            figura2:
                segona,

            quantitat1:
                quantitat1,

            quantitat2:
                quantitat2

        };
    }



    // =========================
    // MOSTRAR FIGURES
    // =========================

    function mostrarFigures() {

        if (
            primeraFiguraElement
        ) {

            primeraFiguraElement.textContent =
                figura1.simbol || "";
        }


        if (
            segonaFiguraElement
        ) {

            segonaFiguraElement.textContent =
                figura2.simbol || "";
        }


        if (
            nomPrimeraFigura
        ) {

            nomPrimeraFigura.textContent =
                figura1.nom || "";
        }


        if (
            nomSegonaFigura
        ) {

            nomSegonaFigura.textContent =
                figura2.nom || "";
        }



        // =========================
        // SELECTOR PRIMERA FIGURA
        // =========================

        if (
            botoPrimeraFigura
        ) {

            const simbol =
                botoPrimeraFigura.querySelector(
                    ".simbol-selector"
                );


            const nom =
                botoPrimeraFigura.querySelector(
                    ".nom-selector"
                );


            if (simbol) {

                simbol.textContent =
                    figura1.simbol || "";
            }


            if (nom) {

                nom.textContent =
                    figura1.nom || "";
            }
        }



        // =========================
        // SELECTOR SEGONA FIGURA
        // =========================

        if (
            botoSegonaFigura
        ) {

            const simbol =
                botoSegonaFigura.querySelector(
                    ".simbol-selector"
                );


            const nom =
                botoSegonaFigura.querySelector(
                    ".nom-selector"
                );


            if (simbol) {

                simbol.textContent =
                    figura2.simbol || "";
            }


            if (nom) {

                nom.textContent =
                    figura2.nom || "";
            }
        }
    }



    // =========================
    // MOSTRAR UNITAT
    // =========================

    function mostrarUnitat() {

        if (
            simbolUnitat
        ) {

            simbolUnitat.textContent =
                unitatQuadratActual.simbol ||
                "";
        }


        if (
            nomUnitat
        ) {

            nomUnitat.textContent =
                unitatQuadratActual.nom ||
                "";
        }
    }



    // =========================
    // CREAR QUADRATS
    // =========================

    function crearQuadrats() {

        if (
            !zonaQuadrats
        ) {

            return;
        }


        zonaQuadrats.innerHTML =
            "";


        const totalQuadrats =
            quantitatFigura1 +
            quantitatFigura2;


        estatQuadrats =
            new Array(
                totalQuadrats
            ).fill(
                0
            );


        for (
            let i = 0;
            i < totalQuadrats;
            i++
        ) {

            const quadrat =
                document.createElement(
                    "button"
                );


            quadrat.type =
                "button";


            quadrat.className =
                "quadrat-representacio buit";


            quadrat.dataset.index =
                i;


            quadrat.setAttribute(
                "aria-label",
                `Quadrat ${i + 1}`
            );


            quadrat.addEventListener(
                "click",
                () => {

                    pintarQuadrat(
                        i
                    );

                }
            );


            zonaQuadrats.appendChild(
                quadrat
            );
        }


        renderitzarQuadrats();
    }



    // =========================
    // PINTAR QUADRAT
    // =========================

    function pintarQuadrat(
        index
    ) {

        if (
            respostaValidada
        ) {

            return;
        }


        if (
            estatQuadrats[index] ===
            colorSeleccionat
        ) {

            // Si tornem a clicar
            // amb el mateix color,
            // esborrem el quadrat.

            estatQuadrats[index] =
                0;

        } else {

            estatQuadrats[index] =
                colorSeleccionat;
        }


        renderitzarQuadrats();

        actualitzarBotoComprovar();
    }



    // =========================
    // RENDERITZAR QUADRATS
    // =========================

    function renderitzarQuadrats() {

        if (
            !zonaQuadrats
        ) {

            return;
        }


        const quadrats =
            zonaQuadrats.querySelectorAll(
                ".quadrat-representacio"
            );


        quadrats.forEach(
            (
                quadrat,
                index
            ) => {

                quadrat.classList.remove(
                    "figura-1",
                    "figura-2",
                    "buit"
                );


                const estat =
                    estatQuadrats[
                        index
                    ];


                if (
                    estat === 1
                ) {

                    quadrat.classList.add(
                        "figura-1"
                    );

                } else if (
                    estat === 2
                ) {

                    quadrat.classList.add(
                        "figura-2"
                    );

                } else {

                    quadrat.classList.add(
                        "buit"
                    );
                }


                quadrat.disabled =
                    respostaValidada;
            }
        );
    }



    // =========================
    // SELECCIONAR FIGURA
    // =========================

    function seleccionarColor(
        color
    ) {

        if (
            respostaValidada
        ) {

            return;
        }


        colorSeleccionat =
            color;


        actualitzarSelectors();
    }



    // =========================
    // ACTUALITZAR SELECTORS
    // =========================

    function actualitzarSelectors() {

        if (
            botoPrimeraFigura
        ) {

            botoPrimeraFigura.classList.toggle(
                "seleccionat",
                colorSeleccionat === 1
            );
        }


        if (
            botoSegonaFigura
        ) {

            botoSegonaFigura.classList.toggle(
                "seleccionat",
                colorSeleccionat === 2
            );
        }
    }



    // =========================
    // ESBORRAR RESPOSTA
    // =========================

    function esborrarResposta() {

        if (
            respostaValidada
        ) {

            return;
        }


        estatQuadrats.fill(
            0
        );


        renderitzarQuadrats();

        actualitzarBotoComprovar();
    }



    // =========================
    // COMPTAR QUADRATS
    // =========================

    function comptarQuadrats(
        color
    ) {

        return estatQuadrats.filter(
            estat =>
                estat === color
        ).length;
    }



    // =========================
    // ACTUALITZAR BOTÓ
    // =========================

    function actualitzarBotoComprovar() {

        if (
            !botoComprovar
        ) {

            return;
        }


        const quadratsPintats =
            estatQuadrats.filter(
                estat =>
                    estat !== 0
            ).length;


        // Tots els quadrats han
        // d'estar pintats abans
        // de poder comprovar.

        botoComprovar.disabled =
            respostaValidada ||
            estatQuadrats.length === 0 ||
            quadratsPintats !==
            estatQuadrats.length;
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


        const pregunta =
            generarPregunta();


        if (
            !pregunta
        ) {

            console.error(
                "No s'ha pogut generar la pregunta."
            );

            return;
        }


        preguntaActual++;


        respostaValidada =
            false;


        colorSeleccionat =
            1;



        // =========================
        // GUARDAR PREGUNTA
        // =========================

        unitatQuadratActual =
            pregunta.unitat;


        figura1 =
            pregunta.figura1;


        figura2 =
            pregunta.figura2;


        quantitatFigura1 =
            pregunta.quantitat1;


        quantitatFigura2 =
            pregunta.quantitat2;



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
        // MOSTRAR PREGUNTA
        // =========================

        mostrarFigures();

        mostrarUnitat();

        crearQuadrats();

        actualitzarSelectors();



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


        actualitzarBotoComprovar();
    }



    // =========================
    // COMPROVAR RESPOSTA
    // =========================

    function comprovarResposta() {

        if (
            respostaValidada
        ) {

            return;
        }


        const pintatsFigura1 =
            comptarQuadrats(
                1
            );


        const pintatsFigura2 =
            comptarQuadrats(
                2
            );


        const esCorrecta =
            pintatsFigura1 ===
            quantitatFigura1 &&
            pintatsFigura2 ===
            quantitatFigura2;


        respostaValidada =
            true;


        renderitzarQuadrats();


        if (
            botoComprovar
        ) {

            botoComprovar.disabled =
                true;
        }



        // =========================
        // FEEDBACK
        // =========================

        if (
            esCorrecta
        ) {

            encerts++;


            if (
                feedback
            ) {

                feedback.textContent =
                    `Correcte! ${figura1.nom} = ${quantitatFigura1} quadrats i ${figura2.nom} = ${quantitatFigura2} quadrats.`;

                feedback.className =
                    "feedback correcte";
            }

        } else {

            if (
                feedback
            ) {

                feedback.textContent =
                    `Incorrecte. ${figura1.nom} necessita ${quantitatFigura1} quadrats i ${figura2.nom} necessita ${quantitatFigura2} quadrats.`;

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

    if (
        botoPrimeraFigura
    ) {

        botoPrimeraFigura.addEventListener(
            "click",
            () => {

                seleccionarColor(
                    1
                );

            }
        );
    }


    if (
        botoSegonaFigura
    ) {

        botoSegonaFigura.addEventListener(
            "click",
            () => {

                seleccionarColor(
                    2
                );

            }
        );
    }


    if (
        botoEsborrar
    ) {

        botoEsborrar.addEventListener(
            "click",
            esborrarResposta
        );
    }


    if (
        botoComprovar
    ) {

        botoComprovar.addEventListener(
            "click",
            comprovarResposta
        );
    }



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
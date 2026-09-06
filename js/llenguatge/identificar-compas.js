// =========================
// MOTOR D'EXERCICIS
// IDENTIFICAR COMPÀS
// =========================

function iniciarExerciciIdentificarCompas(
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


    const zonaFigures =
        document.getElementById(
            "zona-figures-compas"
        );


    const zonaRespostes =
        document.getElementById(
            "respostes-compas"
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

    let compasCorrecte = null;

    let figuresActuals = [];

    let respostaValidada = false;

    let historialCompassos = [];



    // =========================
    // VALIDAR CONFIGURACIÓ
    // =========================

    if (
        !config ||
        !Array.isArray(
            config.compassosDisponibles
        ) ||
        config.compassosDisponibles.length < 2
    ) {

        console.error(
            "No hi ha prou compassos disponibles."
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
        !zonaRespostes
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
    // BARREJAR ARRAY
    // =========================

    function barrejarArray(
        array
    ) {

        const copia =
            [...array];


        for (
            let i =
                copia.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (
                        i + 1
                    )
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
    // DURADA DEL COMPÀS
    // =========================

    function obtenirDuradaCompas(
        compas
    ) {

        const parts =
            compas.split("/");


        if (
            parts.length !== 2
        ) {

            return null;
        }


        const numerador =
            Number(
                parts[0]
            );


        const denominador =
            Number(
                parts[1]
            );


        if (
            !Number.isFinite(
                numerador
            ) ||
            !Number.isFinite(
                denominador
            ) ||
            numerador <= 0 ||
            denominador <= 0
        ) {

            return null;
        }


        // Els valors de les figures
        // estan expressats en pulsacions
        // de negra.
        //
        // 2/4 = 2
        // 3/4 = 3
        // 4/4 = 4

        return (
            numerador *
            (
                4 /
                denominador
            )
        );
    }



    // =========================
    // FIGURES VÀLIDES
    // =========================

    function obtenirFiguresValides(
        duradaObjectiu
    ) {

        return config.figuresDisponibles.filter(
            figura => {

                const valor =
                    Number(
                        figura.valor
                    );


                return (
                    Number.isFinite(valor) &&
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

    function generarSequencia(
        duradaObjectiu
    ) {

        const figuresValides =
            obtenirFiguresValides(
                duradaObjectiu
            );


        if (
            figuresValides.length === 0
        ) {

            return null;
        }


        let intentsGenerals = 0;


        while (
            intentsGenerals < 300
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


            if (
                resultat.length > 0 &&
                Math.abs(
                    duradaActual -
                    duradaObjectiu
                ) <
                0.000001
            ) {

                return resultat;
            }
        }


        return null;
    }



    // =========================
    // EVITAR REPETIR MASSA
    // EL MATEIX COMPÀS
    // =========================

    function escollirCompas() {

        const disponibles =
            config.compassosDisponibles;


        if (
            disponibles.length === 1
        ) {

            return disponibles[0];
        }


        let candidats =
            [...disponibles];


        // Evitem, si és possible,
        // repetir el mateix compàs
        // tres vegades seguides.

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

                const filtrats =
                    candidats.filter(
                        compas =>
                            compas !== ultim
                    );


                if (
                    filtrats.length > 0
                ) {

                    candidats =
                        filtrats;
                }
            }
        }


        const seleccionat =
            obtenirElementAleatori(
                candidats
            );


        historialCompassos.push(
            seleccionat
        );


        return seleccionat;
    }



    // =========================
    // CREAR FIGURA VISUAL
    // =========================

    function crearFiguraVisual(
        figura
    ) {

        const element =
            document.createElement(
                "span"
            );


        element.className =
            "figura-identificar-compas";


        element.textContent =
            figura.simbol || "";


        element.title =
            figura.nom || "";


        return element;
    }



    // =========================
    // RENDERITZAR FIGURES
    // =========================

    function renderitzarFigures() {

        zonaFigures.innerHTML =
            "";


        figuresActuals.forEach(
            figura => {

                zonaFigures.appendChild(
                    crearFiguraVisual(
                        figura
                    )
                );

            }
        );
    }

    
    // =========================
    // RENDERITZAR RESPOSTES
    // =========================
    
    function renderitzarRespostes() {
    
        const contenidorRespostes =
            document.getElementById(
                "respostes-compas"
            );
    
    
        if (
            !contenidorRespostes
        ) {
    
            console.error(
                "No s'ha trobat #respostes-compas."
            );
    
            return;
        }
    
    
        contenidorRespostes.innerHTML =
            "";
    
    
        config.compassosDisponibles.forEach(
            compas => {
    
                const boto =
                    document.createElement(
                        "button"
                    );
    
    
                boto.type =
                    "button";
    
    
                boto.className =
                    "boto-resposta-compas";
    
    
                boto.dataset.compas =
                    compas;
    
    
                boto.textContent =
                    compas;
    
    
                boto.addEventListener(
                    "click",
                    () => {
    
                        comprovarResposta(
                            compas,
                            boto
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
    // COMPROVAR RESPOSTA
    // =========================

    function comprovarResposta(
        resposta,
        botoSeleccionat
    ) {

        if (
            respostaValidada
        ) {

            return;
        }


        respostaValidada =
            true;


        const esCorrecte =
            resposta ===
            compasCorrecte;


        const botons =
            zonaRespostes.querySelectorAll(
                ".boto-resposta-compas"
            );


        botons.forEach(
            boto => {

                boto.disabled =
                    true;


                const compasBoto =
                    boto.dataset.compas;


                if (
                    compasBoto ===
                    compasCorrecte
                ) {

                    boto.classList.add(
                        "resposta-correcta"
                    );
                }
            }
        );



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
                    `Correcte! El compàs és ${compasCorrecte}.`;


                feedback.className =
                    "feedback correcte";
            }

        }


        // =========================
        // INCORRECTE
        // =========================

        else {

            botoSeleccionat.classList.add(
                "resposta-incorrecta"
            );


            if (
                feedback
            ) {

                feedback.textContent =
                    `Incorrecte. El compàs correcte és ${compasCorrecte}.`;


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


        respostaValidada =
            false;


        compasCorrecte =
            escollirCompas();


        const duradaObjectiu =
            obtenirDuradaCompas(
                compasCorrecte
            );


        if (
            duradaObjectiu === null
        ) {

            console.error(
                `Compàs no vàlid: ${compasCorrecte}`
            );

            return;
        }


        const sequencia =
            generarSequencia(
                duradaObjectiu
            );


        if (
            !sequencia
        ) {

            console.error(
                `No s'ha pogut generar una seqüència per al compàs ${compasCorrecte}.`
            );

            return;
        }


        preguntaActual++;


        figuresActuals =
            sequencia;



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
        // NETEJAR FEEDBACK
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
        // MOSTRAR PREGUNTA
        // =========================

        renderitzarFigures();

        renderitzarRespostes();
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
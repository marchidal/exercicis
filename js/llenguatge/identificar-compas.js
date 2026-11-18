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
    
        // =========================
        // GENERADOR ORIGINAL
        // =========================
    
        // Els exercicis que no utilitzen
        // patrons de semicorxeres mantenen
        // el funcionament anterior.
    
        if (
            config.patronsSemicorxeres !== true
        ) {
    
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
                    duradaObjectiu - 0.000001
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
                                restant + 0.000001
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
                    ) < 0.000001
                ) {
                    return resultat;
                }
            }
    
            return null;
        }
    
        // =========================
        // FIGURES DISPONIBLES
        // =========================
    
        const negra =
            figuresValides.find(
                figura =>
                    figura.id === "negra"
            );
    
        const blanca =
            figuresValides.find(
                figura =>
                    figura.id === "blanca"
            );
    
        const corxera =
            figuresValides.find(
                figura =>
                    figura.id === "corxera"
            );
    
        const semicorxera =
            figuresValides.find(
                figura =>
                    figura.id === "semicorxera"
            );
    
        // =========================
        // PATRONS D'UNA PULSACIÓ
        // =========================
    
        const patrons = [];
    
        // Negra
        if (negra) {
    
            patrons.push([
                negra
            ]);
        }
    
        // Dues corxeres
        if (corxera) {
    
            patrons.push([
                corxera,
                corxera
            ]);
        }
    
        // =========================
        // PATRONS AMB SEMICORXERES
        // =========================
    
        if (semicorxera) {
    
            // 16 + 16 + 16 + 16
            patrons.push([
                semicorxera,
                semicorxera,
                semicorxera,
                semicorxera
            ]);
    
            if (
                corxera &&
                config.semicorxeresAgrupades !== true
            ) {
    
                // 8 + 16 + 16
                patrons.push([
                    corxera,
                    semicorxera,
                    semicorxera
                ]);
    
                // 16 + 16 + 8
                patrons.push([
                    semicorxera,
                    semicorxera,
                    corxera
                ]);
    
                // 16 + 8 + 16
                patrons.push([
                    semicorxera,
                    corxera,
                    semicorxera
                ]);
            }
        }
    
        // =========================
        // CONSTRUIR COMPÀS
        // =========================
    
        const resultat = [];
    
        let duradaActual = 0;
    
        let intents = 0;
    
        while (
            duradaActual <
            duradaObjectiu - 0.000001
        ) {
    
            intents++;
    
            if (
                intents > 100
            ) {
                return null;
            }
    
            const restant =
                duradaObjectiu -
                duradaActual;
    
            const opcions = [];
    
            // =========================
            // PATRONS D'UNA PULSACIÓ
            // =========================
    
            if (
                restant >=
                1 - 0.000001
            ) {
    
                patrons.forEach(
                    patro => {
    
                        opcions.push({
                            figures: patro,
                            valor: 1
                        });
                    }
                );
            }
    
            // =========================
            // BLANCA
            // =========================
    
            if (
                blanca &&
                restant >=
                2 - 0.000001
            ) {
    
                opcions.push({
                    figures: [
                        blanca
                    ],
                    valor: 2
                });
            }
    
            if (
                opcions.length === 0
            ) {
                return null;
            }
    
            const opcio =
                obtenirElementAleatori(
                    opcions
                );
    
            resultat.push(
                ...opcio.figures
            );
    
            duradaActual +=
                opcio.valor;
        }
    
        return resultat.length > 0
            ? resultat
            : null;
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
                "Compassos",

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
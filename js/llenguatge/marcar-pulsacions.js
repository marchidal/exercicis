// =========================
// MOTOR D'EXERCICIS
// MARCAR PULSACIONS
// =========================

function iniciarExerciciMarcarPulsacions(
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
            "zona-figures-pulsacions"
        );


    const botoComprovar =
        document.getElementById(
            "boto-comprovar"
        );


    const botoEsborrar =
        document.getElementById(
            "boto-esborrar"
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

    let duradaObjectiu = null;

    let figuresActuals = [];

    let pulsacionsCorrectes = [];

    let seleccioAlumne = [];

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
// SENSE SÍNCOPES
// =========================

function generarSequenciaSenseSincopes() {

    const resultat = [];


    // =========================
    // BUSCAR FIGURES
    // =========================

    const negra =
        config.figuresDisponibles.find(
            figura =>
                figura.id === "negra"
        );


    const blanca =
        config.figuresDisponibles.find(
            figura =>
                figura.id === "blanca"
        );


    const corxera =
        config.figuresDisponibles.find(
            figura =>
                figura.id === "corxera"
        );


    const semicorxera =
        config.figuresDisponibles.find(
            figura =>
                figura.id ===
                "semicorxera"
        );


    // =========================
    // PATRONS D'UNA PULSACIÓ
    // =========================

    const patronsUnaPulsacio = [];


    // Negra

    if (negra) {

        patronsUnaPulsacio.push(
            [
                negra
            ]
        );
    }


    // Dues corxeres

    if (corxera) {

        patronsUnaPulsacio.push(
            [
                corxera,
                corxera
            ]
        );
    }


    // =========================
    // PATRONS AMB SEMICORXERES
    // =========================

    if (
        config.patronsSemicorxeres ===
        true &&
        semicorxera
    ) {

        // 16 + 16 + 16 + 16

        patronsUnaPulsacio.push(
            [
                semicorxera,
                semicorxera,
                semicorxera,
                semicorxera
            ]
        );


        // 8 + 16 + 16

        if (corxera) {

            patronsUnaPulsacio.push(
                [
                    corxera,
                    semicorxera,
                    semicorxera
                ]
            );


            // 16 + 16 + 8

            patronsUnaPulsacio.push(
                [
                    semicorxera,
                    semicorxera,
                    corxera
                ]
            );


            // 16 + 8 + 16

            patronsUnaPulsacio.push(
                [
                    semicorxera,
                    corxera,
                    semicorxera
                ]
            );
        }
    }


    if (
        patronsUnaPulsacio.length === 0
    ) {

        return null;
    }


    // =========================
    // CONSTRUIR COMPÀS
    // =========================

    let posicioActual = 0;

    let intents = 0;


    while (
        posicioActual <
        duradaObjectiu -
        0.000001
    ) {

        intents++;


        if (
            intents > 100
        ) {

            return null;
        }


        const restant =
            duradaObjectiu -
            posicioActual;


        const opcions = [];


        // =========================
        // PATRONS D'UNA PULSACIÓ
        // =========================

        if (
            restant >=
            1 - 0.000001
        ) {

            patronsUnaPulsacio.forEach(
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


        posicioActual +=
            opcio.valor;
    }


    // =========================
    // EVITAR COMPÀS
    // D'UNA SOLA FIGURA
    // =========================

    if (
        resultat.length <= 1
    ) {

        return generarSequenciaSenseSincopes();
    }


    return resultat;
}



// =========================
// OBTENIR PATRONS
// DE SEMICORXERES
// =========================

function obtenirPatronsSemicorxeres() {

    if (
        config.patronsSemicorxeres !== true
    ) {

        return [];
    }


    const corxera =
        config.figuresDisponibles.find(
            figura =>
                figura.id === "corxera"
        );


    const semicorxera =
        config.figuresDisponibles.find(
            figura =>
                figura.id === "semicorxera"
        );


    if (!semicorxera) {

        return [];
    }


    const patrons = [];


    // =========================
    // 16 + 16 + 16 + 16
    // =========================

    patrons.push({

        tipus: "patro",

        valor: 1,

        figures: [
            semicorxera,
            semicorxera,
            semicorxera,
            semicorxera
        ]

    });


    if (corxera) {

        // =========================
        // 8 + 16 + 16
        // =========================

        patrons.push({

            tipus: "patro",

            valor: 1,

            figures: [
                corxera,
                semicorxera,
                semicorxera
            ]

        });


        // =========================
        // 16 + 16 + 8
        // =========================

        patrons.push({

            tipus: "patro",

            valor: 1,

            figures: [
                semicorxera,
                semicorxera,
                corxera
            ]

        });


        // =========================
        // 16 + 8 + 16
        // =========================

        patrons.push({

            tipus: "patro",

            valor: 1,

            figures: [
                semicorxera,
                corxera,
                semicorxera
            ]

        });
    }


    return patrons;
}

// =========================
// COMPROVAR SI HI HA SÍNCOPE
// =========================

function teSincopa(
    sequencia
) {

    let posicio = 0;


    for (
        const figura of sequencia
    ) {

        const durada =
            Number(
                figura.valor
            );


        const inici =
            posicio;


        const final =
            posicio +
            durada;


        // =========================
        // COMENÇA FORA DE PULSACIÓ
        // =========================

        const comencaForaPulsacio =
            Math.abs(
                inici -
                Math.round(inici)
            ) >
            0.000001;


        // =========================
        // TRAVESSA UNA PULSACIÓ
        // =========================

        const seguentPulsacio =
            Math.ceil(
                inici + 0.000001
            );


        const travessaPulsacio =
            seguentPulsacio <
            final -
            0.000001;


        // =========================
        // SÍNCOPE
        // =========================

        if (
            comencaForaPulsacio &&
            travessaPulsacio
        ) {

            return true;
        }


        posicio =
            final;
    }


    return false;
}


// =========================
// GENERAR SEQÜÈNCIA
// =========================

function generarSequencia() {

    // =========================
    // MODE SENSE SÍNCOPES
    // =========================

    if (
        config.senseSincopes === true
    ) {

        return generarSequenciaSenseSincopes();
    }


    // =========================
    // MODE NORMAL
    // =========================

    const figuresValides =
        obtenirFiguresValides();


    if (
        figuresValides.length === 0
    ) {

        return null;
    }

    // =========================
    // FIGURES INDIVIDUALS
    // =========================
    
    // Si treballem amb patrons de
    // semicorxeres, la semicorxera
    // NO es pot generar individualment.
    
    const figuresIndividuals =
        config.patronsSemicorxeres === true
    
            ? figuresValides.filter(
                figura =>
                    figura.id !==
                    "semicorxera"
            )
    
            : figuresValides;
    
    
    // =========================
    // PATRONS DE SEMICORXERES
    // =========================
    
    const patronsSemicorxeres =
        obtenirPatronsSemicorxeres();


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


            // =========================
            // OPCIONS INDIVIDUALS
            // =========================
            
            const possiblesFigures =
                figuresIndividuals
                    .filter(
                        figura =>
                            Number(
                                figura.valor
                            ) <=
                            restant +
                            0.000001
                    )
                    .map(
                        figura => ({
            
                            tipus: "figura",
            
                            valor:
                                Number(
                                    figura.valor
                                ),
            
                            figures: [
                                figura
                            ]
            
                        })
                    );
            
            
            // =========================
            // PATRONS POSSIBLES
            // =========================
            
            // =========================
            // ESTEM SOBRE UNA PULSACIÓ?
            // =========================
            
            const estaSobrePulsacio =
                Math.abs(
                    duradaActual -
                    Math.round(
                        duradaActual
                    )
                ) <
                0.000001;
            
            
            // =========================
            // PATRONS POSSIBLES
            // =========================
            
            // Els patrons amb semicorxeres
            // només poden començar exactament
            // sobre una pulsació.
            //
            // D'aquesta manera, les síncopes
            // només es poden crear amb
            // negres i corxeres.
            
            const possiblesPatrons =
                estaSobrePulsacio
            
                    ? patronsSemicorxeres.filter(
                        patro =>
                            patro.valor <=
                            restant +
                            0.000001
                    )
            
                    : [];
            
            
            // =========================
            // TOTES LES OPCIONS
            // =========================
            
            const possibles = [
            
                ...possiblesFigures,
            
                ...possiblesPatrons
            
            ];


            if (
                possibles.length === 0
            ) {

                break;
            }


            const opcio =
                obtenirElementAleatori(
                    possibles
                );
            
            
            // =========================
            // AFEGIR FIGURA O PATRÓ
            // =========================
            
            resultat.push(
                ...opcio.figures
            );
            
            
            duradaActual +=
                opcio.valor;
        }


        // =========================
        // DURADA EXACTA
        // =========================

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


        // =========================
        // EVITAR UNA SOLA FIGURA
        // =========================

        if (
            resultat.length <= 1
        ) {

            continue;
        }


        // =========================
        // PULSACIONS CORRECTES
        // =========================

        const pulsacions =
            calcularPulsacionsCorrectes(
                resultat
            );


        const quantitatPulsacions =
            pulsacions.length;


        // =========================
        // MÍNIM DE PULSACIONS
        // =========================

        let minimPulsacions = 0;


        if (
            config.minimPulsacions &&
            Number.isFinite(
                config.minimPulsacions[
                    compasActual
                ]
            )
        ) {

            minimPulsacions =
                config.minimPulsacions[
                    compasActual
                ];
        }

        else if (
            compasActual === "3/4" ||
            compasActual === "4/4"
        ) {

            // Comportament anterior
            minimPulsacions = 2;
        }


        if (
            quantitatPulsacions <
            minimPulsacions
        ) {

            continue;
        }

        // =========================
        // SÍNCOPE OBLIGATÒRIA
        // =========================
        
        const necessitaSincopa =
            Number.isFinite(
                config.preguntesAmbSincopa
            ) &&
            preguntaActual <=
                config.preguntesAmbSincopa;
        
        
        if (
            necessitaSincopa &&
            !teSincopa(resultat)
        ) {
        
            continue;
        }


        return resultat;
    }


    return null;
}


    // =========================
    // CALCULAR PULSACIONS
    // CORRECTES
    // =========================

    function calcularPulsacionsCorrectes(
        figures
    ) {

        const resultat = [];

        let posicioActual = 0;


        figures.forEach(
            (
                figura,
                index
            ) => {


                // =========================
                // COMPROVAR SI COMENÇA
                // EN UNA PULSACIÓ
                // =========================

                const posicioArrodonida =
                    Math.round(
                        posicioActual
                    );


                const esPuls =
                    Math.abs(
                        posicioActual -
                        posicioArrodonida
                    ) <
                    0.000001;


                if (
                    esPuls
                ) {

                    resultat.push(
                        index
                    );
                }



                // =========================
                // AVANÇAR
                // =========================

                posicioActual +=
                    Number(
                        figura.valor
                    );
            }
        );


        return resultat;
    }



    // =========================
    // CREAR FIGURA VISUAL
    // =========================

    function crearFiguraVisual(
        figura,
        index
    ) {

        const boto =
            document.createElement(
                "button"
            );


        boto.type =
            "button";


        boto.className =
            "figura-pulsacio";


        boto.dataset.index =
            index;



        // =========================
        // SÍMBOL
        // =========================

        const simbol =
            document.createElement(
                "span"
            );


        simbol.className =
            "simbol-figura-pulsacio";


        simbol.textContent =
            figura.simbol || "";



        // =========================
        // AFEGIR SÍMBOL
        // =========================

        boto.appendChild(
            simbol
        );



        // =========================
        // CLIC
        // =========================

        boto.addEventListener(
            "click",
            () => {

                seleccionarFigura(
                    index
                );

            }
        );


        return boto;
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


        actualitzarSeleccioVisual();
    }



    // =========================
    // SELECCIONAR FIGURA
    // =========================

    function seleccionarFigura(
        index
    ) {

        if (
            respostaValidada
        ) {

            return;
        }


        const posicio =
            seleccioAlumne.indexOf(
                index
            );


        if (
            posicio === -1
        ) {

            seleccioAlumne.push(
                index
            );

        } else {

            seleccioAlumne.splice(
                posicio,
                1
            );
        }


        actualitzarSeleccioVisual();

        actualitzarBotoComprovar();
    }



    // =========================
    // ACTUALITZAR SELECCIÓ
    // VISUAL
    // =========================

    function actualitzarSeleccioVisual() {

        const botons =
            zonaFigures.querySelectorAll(
                ".figura-pulsacio"
            );


        botons.forEach(
            (
                boto,
                index
            ) => {

                const seleccionada =
                    seleccioAlumne.includes(
                        index
                    );


                boto.classList.toggle(
                    "seleccionada",
                    seleccionada
                );
            }
        );
    }



    // =========================
    // BOTÓ COMPROVAR
    // =========================

    function actualitzarBotoComprovar() {

        botoComprovar.disabled =
            respostaValidada ||
            seleccioAlumne.length === 0;
    }



    // =========================
    // ESBORRAR
    // =========================

    function esborrarSeleccio() {

        if (
            respostaValidada
        ) {

            return;
        }


        seleccioAlumne =
            [];


        actualitzarSeleccioVisual();

        actualitzarBotoComprovar();
    }



    // =========================
    // COMPARAR SELECCIONS
    // =========================

    function compararSeleccions(
        resposta,
        correcta
    ) {

        if (
            resposta.length !==
            correcta.length
        ) {

            return false;
        }


        const respostaOrdenada =
            [...resposta].sort(
                (
                    a,
                    b
                ) =>
                    a - b
            );


        const correctaOrdenada =
            [...correcta].sort(
                (
                    a,
                    b
                ) =>
                    a - b
            );


        return respostaOrdenada.every(
            (
                valor,
                index
            ) =>
                valor ===
                correctaOrdenada[index]
        );
    }



    // =========================
    // MOSTRAR SOLUCIÓ
    // =========================

    function mostrarSolucio() {

        const botons =
            zonaFigures.querySelectorAll(
                ".figura-pulsacio"
            );


        botons.forEach(
            (
                boto,
                index
            ) => {

                boto.disabled =
                    true;


                const haSeleccionat =
                    seleccioAlumne.includes(
                        index
                    );


                const hauriaSeleccionat =
                    pulsacionsCorrectes.includes(
                        index
                    );


                // =========================
                // FIGURA CORRECTA
                // =========================

                if (
                    hauriaSeleccionat
                ) {

                    boto.classList.add(
                        "pulsacio-correcta"
                    );
                }


                // =========================
                // FIGURA MARCADA
                // INCORRECTAMENT
                // =========================

                if (
                    haSeleccionat &&
                    !hauriaSeleccionat
                ) {

                    boto.classList.add(
                        "pulsacio-error"
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
            respostaValidada
        ) {

            return;
        }


        if (
            seleccioAlumne.length === 0
        ) {

            return;
        }


        respostaValidada =
            true;


        const esCorrecte =
            compararSeleccions(
                seleccioAlumne,
                pulsacionsCorrectes
            );


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
                    "Correcte! Has marcat totes les figures que comencen sobre una pulsació.";


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
                    "Incorrecte. Les figures en verd són les que comencen sobre les pulsacions del compàs.";


                feedback.className =
                    "feedback incorrecte";
            }
        }


        actualitzarBotoComprovar();



        // =========================
        // SEGÜENT PREGUNTA
        // =========================

        setTimeout(
            novaPregunta,
            1700
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
        // ESCOLLIR COMPÀS
        // =========================

        compasActual =
            escollirCompas();


        duradaObjectiu =
            obtenirDuradaCompas(
                compasActual
            );


        if (
            duradaObjectiu === null
        ) {

            console.error(
                `No s'ha pogut calcular la durada del compàs ${compasActual}.`
            );

            return;
        }



        // =========================
        // GENERAR SEQÜÈNCIA
        // =========================

        const sequencia =
            generarSequencia();


        if (
            !sequencia
        ) {

            console.error(
                "No s'ha pogut generar una seqüència."
            );

            return;
        }



        // =========================
        // ACTUALITZAR ESTAT
        // =========================

        preguntaActual++;


        figuresActuals =
            sequencia;


        pulsacionsCorrectes =
            calcularPulsacionsCorrectes(
                figuresActuals
            );


        seleccioAlumne =
            [];


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
        // RENDER
        // =========================

        renderitzarFigures();

        actualitzarBotoComprovar();
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

    botoComprovar.addEventListener(
        "click",
        comprovarResposta
    );


    if (
        botoEsborrar
    ) {

        botoEsborrar.addEventListener(
            "click",
            esborrarSeleccio
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
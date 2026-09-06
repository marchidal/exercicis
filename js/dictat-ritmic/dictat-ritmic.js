// =========================
// MOTOR DE DICTAT RÍTMIC
// =========================

function iniciarDictatRitmic(config) {


    // =========================
    // ELEMENTS HTML
    // =========================

    const botoEscoltar =
        document.querySelector(
            "#boto-escoltar"
        );


    const reproduccionsText =
        document.querySelector(
            "#reproduccions-restants"
        );


    const respostaVisual =
        document.querySelector(
            "#resposta-ritmica"
        );


    const botonsFigures =
        document.querySelectorAll(
            "[data-figura]"
        );


    const botoEsborrar =
        document.querySelector(
            "#boto-esborrar"
        );


    const botoEscoltarResposta =
        document.querySelector(
            "#boto-escoltar-resposta"
        );


    const botoComprovar =
        document.querySelector(
            "#boto-comprovar"
        );


    const botoSeguent =
        document.querySelector(
            "#boto-seguent"
        );


    const feedback =
        document.querySelector(
            "#feedback"
        );


    const preguntaActualText =
        document.querySelector(
            "#pregunta-actual"
        );


    const totalPreguntesText =
        document.querySelector(
            "#total-preguntes"
        );



    // =========================
    // ESTAT DE L'EXERCICI
    // =========================

    let preguntaActual = 0;

    let encerts = 0;

    let dictatActual = [];

    let respostaAlumne = [];

    let reproduccionsUtilitzades = 0;

    let reproduint = false;

    let respostaValidada = false;



    // =========================
    // AUDIO
    // =========================

    let contextAudio = null;



    function obtenirContextAudio() {

        if (!contextAudio) {

            contextAudio =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();
        }


        return contextAudio;
    }



    async function activarAudioRitmic() {

        const context =
            obtenirContextAudio();


        if (
            context.state ===
            "suspended"
        ) {

            await context.resume();
        }
    }



    // =========================
    // TEMPO
    // =========================

    function obtenirDuradaPuls() {

        return (
            60 /
            config.tempo
        );
    }



    // =========================
    // PULSOS PER COMPÀS
    // =========================

    function obtenirPulsosPerCompas() {

        const parts =
            config.compas.split("/");


        const numerador =
            Number(parts[0]);


        const denominador =
            Number(parts[1]);


        if (
            !Number.isFinite(numerador) ||
            !Number.isFinite(denominador)
        ) {

            return 0;
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
    // CLIC DE METRÒNOM
    // =========================

    function crearClic(
        temps,
        accent = false
    ) {

        const context =
            obtenirContextAudio();


        const oscilador =
            context.createOscillator();


        const guany =
            context.createGain();


        oscilador.connect(
            guany
        );


        guany.connect(
            context.destination
        );


        oscilador.type =
            "sine";


        oscilador.frequency.setValueAtTime(
            accent
                ? 1200
                : 850,
            temps
        );


        guany.gain.setValueAtTime(
            0.0001,
            temps
        );


        guany.gain.exponentialRampToValueAtTime(
            accent
                ? 0.18
                : 0.11,
            temps + 0.005
        );


        guany.gain.exponentialRampToValueAtTime(
            0.0001,
            temps + 0.06
        );


        oscilador.start(
            temps
        );


        oscilador.stop(
            temps + 0.07
        );
    }



    // =========================
    // COP RÍTMIC
    // =========================

    function crearCop(
        temps
    ) {

        const context =
            obtenirContextAudio();


        const oscilador =
            context.createOscillator();


        const guany =
            context.createGain();


        oscilador.connect(
            guany
        );


        guany.connect(
            context.destination
        );


        oscilador.type =
            "triangle";


        oscilador.frequency.setValueAtTime(
            180,
            temps
        );


        oscilador.frequency.exponentialRampToValueAtTime(
            90,
            temps + 0.06
        );


        guany.gain.setValueAtTime(
            0.0001,
            temps
        );


        guany.gain.exponentialRampToValueAtTime(
            0.35,
            temps + 0.005
        );


        guany.gain.exponentialRampToValueAtTime(
            0.0001,
            temps + 0.12
        );


        oscilador.start(
            temps
        );


        oscilador.stop(
            temps + 0.13
        );
    }



    // =========================
    // DURADA FIGURA EN SEGONS
    // =========================

    function obtenirDuradaFiguraSegons(
        figura
    ) {

        const pulsos =
            obtenirDuradaEnPulsos(
                figura,
                "4"
            );


        return (
            pulsos *
            obtenirDuradaPuls()
        );
    }



    // =========================
    // GENERAR UN COMPÀS
    // =========================

    function generarCompas() {
    
        const patrons =
            config.patronsDisponibles;
    
    
        // =========================
        // VALIDAR CONFIGURACIÓ
        // =========================
    
        if (
            !Array.isArray(
                patrons
            ) ||
            patrons.length === 0
        ) {
    
            console.error(
                "No hi ha patrons rítmics disponibles."
            );
    
            return null;
        }
    
    
        // =========================
        // DURADA DEL COMPÀS
        // =========================
    
        const duradaObjectiu =
            obtenirDuradaCompas(
                config.compas
            );
    
    
        // =========================
        // RESULTAT
        // =========================
    
        const resultat = [];
    
        let duradaActual = 0;
    
        let intents = 0;
    
    
        // =========================
        // OMPLIR COMPÀS
        // =========================
    
        while (
            duradaActual <
            duradaObjectiu -
            0.000001
        ) {
    
            intents++;
    
    
            if (
                intents > 200
            ) {
    
                console.error(
                    "No s'ha pogut generar un compàs vàlid amb els patrons disponibles."
                );
    
                return null;
            }
    
    
            // =========================
            // TRIAR PATRÓ
            // =========================
    
            const patro =
                patrons[
                    Math.floor(
                        Math.random() *
                        patrons.length
                    )
                ];
    
    
            // =========================
            // DURADA DEL PATRÓ
            // =========================
    
            const duradaPatro =
                obtenirDuradaSequencia(
                    patro
                );
    
    
            if (
                duradaPatro <= 0
            ) {
    
                console.warn(
                    `Patró rítmic no vàlid: ${patro}`
                );
    
                continue;
            }
    
    
            // =========================
            // COMPROVAR SI CAP
            // =========================
    
            if (
                duradaActual +
                duradaPatro >
                duradaObjectiu +
                0.000001
            ) {
    
                continue;
            }
    
    
            // =========================
            // CONVERTIR PATRÓ
            // A FIGURES INDIVIDUALS
            // =========================
    
            const figuresPatro =
                patro
                    .trim()
                    .split(/\s+/);
    
    
            resultat.push(
                ...figuresPatro
            );
    
    
            duradaActual +=
                duradaPatro;
        }
    
    
        return resultat;
    }



    // =========================
    // GENERAR DICTAT
    // =========================

    function generarDictat() {

        const compassos = [];


        for (
            let i = 0;
            i <
            config.compassosPerDictat;
            i++
        ) {

            let compas = null;


            while (!compas) {

                compas =
                    generarCompas();
            }


            compassos.push(
                compas
            );
        }


        return compassos;
    }



    // =========================
    // APLANAR DICTAT
    // =========================

    function aplanarDictat(
        compassos
    ) {

        return compassos.flat();
    }



    // =========================
    // PROGRAMAR SEQÜÈNCIA
    // =========================

    function programarSequencia(
        sequencia,
        tempsInici
    ) {

        let temps =
            tempsInici;


        sequencia.forEach(
            figura => {

                const dades =
                    obtenirFiguraRitmica(
                        figura
                    );


                if (!dades) {

                    return;
                }


                // Els silencis ocupen temps
                // però no generen cap atac.

                if (
                    dades.tipus ===
                    "nota"
                ) {

                    crearCop(
                        temps
                    );
                }


                temps +=
                    obtenirDuradaFiguraSegons(
                        figura
                    );
            }
        );


        return temps;
    }



    // =========================
    // REPRODUIR DICTAT
    // =========================

    async function reproduirDictat() {

        if (reproduint) {

            return;
        }


        if (
            reproduccionsUtilitzades >=
            config.maxReproduccions
        ) {

            return;
        }


        reproduint =
            true;


        await activarAudioRitmic();


        reproduccionsUtilitzades++;


        actualitzarReproduccions();



        const context =
            obtenirContextAudio();


        const duradaPuls =
            obtenirDuradaPuls();


        const pulsosPerCompas =
            obtenirPulsosPerCompas();


        const pulsosEntrada =
            config.pulsosEntrada ??
            pulsosPerCompas;


        const pulsosDictat =
            pulsosPerCompas *
            config.compassosPerDictat;


        const pulsosTotals =
            pulsosEntrada +
            pulsosDictat;


        const margeInicial =
            0.1;


        const iniciMetronom =
            context.currentTime +
            margeInicial;



        // =========================
        // METRÒNOM
        // =========================
        //
        // Sona durant el compàs
        // d'entrada i durant tot
        // el dictat.
        //
        // El primer puls de cada
        // compàs queda accentuat.
        // =========================

        for (
            let i = 0;
            i <
            pulsosTotals;
            i++
        ) {

            const pulsDinsCompas =
                i %
                pulsosPerCompas;


            const accent =
                pulsDinsCompas === 0;


            crearClic(
                iniciMetronom +
                (
                    i *
                    duradaPuls
                ),
                accent
            );
        }



        // =========================
        // INICI DEL DICTAT
        // =========================

        const iniciDictat =
            iniciMetronom +
            (
                pulsosEntrada *
                duradaPuls
            );


        const finalDictat =
            programarSequencia(
                aplanarDictat(
                    dictatActual
                ),
                iniciDictat
            );



        // =========================
        // FINAL DEL METRÒNOM
        // =========================

        const finalMetronom =
            iniciMetronom +
            (
                pulsosTotals *
                duradaPuls
            );


        const finalReproduccio =
            Math.max(
                finalDictat,
                finalMetronom
            );


        const tempsRestant =
            Math.max(
                0,
                (
                    finalReproduccio -
                    context.currentTime
                ) *
                1000
            );


        setTimeout(
            () => {

                reproduint =
                    false;

            },
            tempsRestant + 100
        );
    }



    // =========================
    // REPRODUIR RESPOSTA
    // =========================

    async function reproduirResposta() {

        if (
            reproduint ||
            respostaAlumne.length === 0
        ) {

            return;
        }


        reproduint =
            true;


        await activarAudioRitmic();


        const context =
            obtenirContextAudio();


        const duradaPuls =
            obtenirDuradaPuls();


        const pulsosPerCompas =
            obtenirPulsosPerCompas();


        const inici =
            context.currentTime +
            0.1;



        // =========================
        // METRÒNOM DE LA RESPOSTA
        // =========================
        //
        // També mantenim el metrònom
        // mentre l'alumne escolta
        // la seva resposta.
        // =========================

        const pulsosResposta =
            pulsosPerCompas *
            config.compassosPerDictat;


        for (
            let i = 0;
            i <
            pulsosResposta;
            i++
        ) {

            const accent =
                (
                    i %
                    pulsosPerCompas
                ) === 0;


            crearClic(
                inici +
                (
                    i *
                    duradaPuls
                ),
                accent
            );
        }



        const finalResposta =
            programarSequencia(
                respostaAlumne,
                inici
            );


        const finalMetronom =
            inici +
            (
                pulsosResposta *
                duradaPuls
            );


        const finalReproduccio =
            Math.max(
                finalResposta,
                finalMetronom
            );


        const tempsRestant =
            Math.max(
                0,
                (
                    finalReproduccio -
                    context.currentTime
                ) *
                1000
            );


        setTimeout(
            () => {

                reproduint =
                    false;

            },
            tempsRestant + 100
        );
    }



    // =========================
    // DURADA DE LA RESPOSTA
    // =========================

    function obtenirDuradaResposta() {

        return respostaAlumne.reduce(
            (
                total,
                figura
            ) => {

                return (
                    total +
                    obtenirDuradaFigura(
                        figura
                    )
                );

            },
            0
        );
    }



    // =========================
    // DURADA TOTAL DEL DICTAT
    // =========================

    function obtenirDuradaTotalDictat() {

        return (
            obtenirDuradaCompas(
                config.compas
            ) *
            config.compassosPerDictat
        );
    }



    // =========================
    // AFEGIR FIGURA
    // =========================

    function afegirFigura(
        figura
    ) {

        if (
            respostaValidada
        ) {

            return;
        }


        if (
            !existeixFiguraRitmica(
                figura
            )
        ) {

            console.error(
                `Figura rítmica desconeguda: ${figura}`
            );


            return;
        }


        const duradaActual =
            obtenirDuradaResposta();


        const duradaFigura =
            obtenirDuradaFigura(
                figura
            );


        const duradaMaxima =
            obtenirDuradaTotalDictat();



        if (
            duradaActual +
            duradaFigura >
            duradaMaxima +
            0.000001
        ) {

            return;
        }


        respostaAlumne.push(
            figura
        );


        renderitzarResposta();
    }



    // =========================
    // ESBORRAR ÚLTIMA FIGURA
    // =========================

    function esborrarUltimaFigura() {

        if (
            respostaValidada
        ) {

            return;
        }


        if (
            respostaAlumne.length === 0
        ) {

            return;
        }


        respostaAlumne.pop();


        renderitzarResposta();
    }



    // =========================
    // SEPARAR EN COMPASSOS
    // =========================

    function separarRespostaEnCompassos() {

        const compassos = [];


        let compasActual = [];


        let duradaActual = 0;


        const duradaCompas =
            obtenirDuradaCompas(
                config.compas
            );



        respostaAlumne.forEach(
            figura => {

                const durada =
                    obtenirDuradaFigura(
                        figura
                    );


                // Si una figura travessaria
                // una barra de compàs,
                // no la col·loquem dins
                // del compàs anterior.

                if (
                    duradaActual +
                    durada >
                    duradaCompas +
                    0.000001
                ) {

                    compassos.push(
                        compasActual
                    );


                    compasActual = [];


                    duradaActual = 0;
                }


                compasActual.push(
                    figura
                );


                duradaActual +=
                    durada;


                if (
                    Math.abs(
                        duradaActual -
                        duradaCompas
                    ) <
                    0.000001
                ) {

                    compassos.push(
                        compasActual
                    );


                    compasActual = [];


                    duradaActual = 0;
                }
            }
        );


        if (
            compasActual.length >
            0
        ) {

            compassos.push(
                compasActual
            );
        }


        return compassos;
    }

    // =========================
    // AGRUPAR FIGURES PER PULSOS
    // =========================
    //
    // Agrupa les figures curtes que
    // pertanyen al mateix puls.
    //
    // Exemple en 4/4:
    //
    // 16 + 8 + 16
    //
    // forma un únic puls i, per tant,
    // un únic grup visual.
    // =========================
    
    function agruparFiguresPerPulsos(
        compas
    ) {
    
        const resultat = [];
    
    
        // =========================
        // DURADA DEL PULS
        // =========================
    
        const partsCompas =
            config.compas.split("/");
    
    
        const denominador =
            Number(
                partsCompas[1]
            );
    
    
        const duradaPuls =
            1 / denominador;
    
    
        // =========================
        // ESTAT
        // =========================
    
        let grupActual = [];
    
        let posicioActual = 0;
    
    
        // =========================
        // TANCAR GRUP
        // =========================
    
        function tancarGrup() {
    
            if (
                grupActual.length === 0
            ) {
                return;
            }
    
    
            resultat.push(
                [...grupActual]
            );
    
    
            grupActual = [];
        }
    
    
        // =========================
        // RECÓRRER COMPÀS
        // =========================
    
        compas.forEach(
            figura => {
    
                const durada =
                    obtenirDuradaFigura(
                        figura
                    );
    
    
                const esFiguraCurta =
                    durada <
                    duradaPuls -
                    0.000001;
    
    
                // =========================
                // FIGURA LLARGA
                // =========================
    
                if (!esFiguraCurta) {
    
                    tancarGrup();
    
    
                    resultat.push(
                        [figura]
                    );
    
    
                    posicioActual +=
                        durada;
    
    
                    return;
                }
    
    
                // =========================
                // FIGURA CURTA
                // =========================
    
                grupActual.push(
                    figura
                );
    
    
                posicioActual +=
                    durada;
    
    
                // =========================
                // COMPROVAR FINAL DE PULS
                // =========================
    
                const pulsosCompletats =
                    posicioActual /
                    duradaPuls;
    
    
                const finalDePuls =
                    Math.abs(
                        pulsosCompletats -
                        Math.round(
                            pulsosCompletats
                        )
                    ) <
                    0.000001;
    
    
                if (finalDePuls) {
    
                    tancarGrup();
                }
            }
        );
    
    
        // =========================
        // GRUP INCOMPLET
        // =========================
    
        tancarGrup();
    
    
        return resultat;
    } 

    // =========================
    // CREAR ELEMENT D'UN GRUP
    // =========================
    
    function crearElementGrupRitmic(
        figures
    ) {
    
        // =========================
        // UNA SOLA FIGURA
        // =========================
    
        if (
            figures.length === 1
        ) {
    
            return crearElementFigura(
                figures[0]
            );
        }
    
    
        // =========================
        // GRUP DE FIGURES
        // =========================
    
        const element =
            document.createElement(
                "div"
            );
    
    
        element.className =
            "figura-ritmica figura-ritmica--grup";
    
    
        const textRitmic =
            figures.join(" ");
    
    
        const notacio =
            crearNotacioRitmica(
                textRitmic
            );
    
    
        element.appendChild(
            notacio
        );
    
    
        return element;
    }

    
    // =========================
    // RENDERITZAR RESPOSTA
    // =========================
    
    function renderitzarResposta() {
    
        if (!respostaVisual) {
            return;
        }
    
    
        // =========================
        // NETEJAR RESPOSTA
        // =========================
    
        respostaVisual.innerHTML =
            "";
    
    
        // =========================
        // SEPARAR EN COMPASSOS
        // =========================
    
        const compassos =
            separarRespostaEnCompassos();
    
    
        // =========================
        // DIBUIXAR COMPASSOS
        // =========================
    
        compassos.forEach(
            (
                compas,
                indexCompas
            ) => {
    
                const elementCompas =
                    document.createElement(
                        "div"
                    );
    
    
                elementCompas.className =
                    "compas-ritmic";
    
    
                // =========================
                // AGRUPAR PER PULSOS
                // =========================
    
                const grups =
                    agruparFiguresPerPulsos(
                        compas
                    );
    
    
                // =========================
                // DIBUIXAR GRUPS
                // =========================
    
                grups.forEach(
                    figures => {
    
                        const element =
                            crearElementGrupRitmic(
                                figures
                            );
    
    
                        elementCompas.appendChild(
                            element
                        );
                    }
                );
    
    
                respostaVisual.appendChild(
                    elementCompas
                );
    
    
                // =========================
                // BARRA DE COMPÀS
                // =========================
    
                if (
                    indexCompas <
                    config.compassosPerDictat - 1
                ) {
    
                    const barra =
                        document.createElement(
                            "div"
                        );
    
    
                    barra.className =
                        "barra-compas";
    
    
                    respostaVisual.appendChild(
                        barra
                    );
                }
            }
        );
    
    
        // =========================
        // ACTUALITZAR BOTONS
        // =========================
    
        actualitzarBotons();
    
    
        // =========================
        // SCROLL AUTOMÀTIC
        // =========================
        //
        // Quan la resposta supera
        // l'amplada disponible,
        // avancem automàticament
        // fins a l'última figura.
        // =========================
    
        const liniaRitmica =
            respostaVisual.closest(
                ".linia-ritmica"
            );
    
    
        if (liniaRitmica) {
    
            requestAnimationFrame(
                () => {
    
                    liniaRitmica.scrollTo({
                        left:
                            liniaRitmica.scrollWidth,
                        behavior:
                            "smooth"
                    });
                }
            );
        }
    }



    // =========================
    // CREAR FIGURA VISUAL
    // =========================
    //
    // Versió provisional.
    //
    // Més endavant substituirem
    // aquests símbols pel sistema
    // gràfic definitiu.
    // =========================

    // =========================
    // CREAR FIGURA VISUAL
    // =========================
    
    function crearElementFigura(
        figura
    ) {
    
        const element =
            document.createElement(
                "div"
            );
    
    
        element.className =
            "figura-ritmica";
    
    
        element.dataset.figura =
            figura;
    
    
        const notacio =
            crearFiguraRitmicaVisual(
                figura
            );
    
    
        element.appendChild(
            notacio
        );
    
    
        return element;
    }



    // =========================
    // REPRODUCCIONS RESTANTS
    // =========================

    function actualitzarReproduccions() {

        const restants =
            Math.max(
                0,
                config.maxReproduccions -
                reproduccionsUtilitzades
            );


        if (reproduccionsText) {

            reproduccionsText.textContent =
                restants;
        }


        if (botoEscoltar) {

            botoEscoltar.disabled =
                reproduccionsUtilitzades >=
                config.maxReproduccions;
        }
    }



    // =========================
    // ACTUALITZAR BOTONS
    // =========================

    function actualitzarBotons() {

        const duradaResposta =
            obtenirDuradaResposta();


        const duradaTotal =
            obtenirDuradaTotalDictat();


        const respostaCompleta =
            Math.abs(
                duradaResposta -
                duradaTotal
            ) <
            0.000001;



        if (botoComprovar) {

            botoComprovar.disabled =
                !respostaCompleta ||
                respostaValidada;
        }



        if (botoEsborrar) {

            botoEsborrar.disabled =
                respostaAlumne.length === 0 ||
                respostaValidada;
        }



        if (botoEscoltarResposta) {

            botoEscoltarResposta.disabled =
                respostaAlumne.length === 0;
        }



        botonsFigures.forEach(
            boto => {

                const figura =
                    boto.dataset.figura;


                const duradaFigura =
                    obtenirDuradaFigura(
                        figura
                    );


                const noCap =
                    duradaResposta +
                    duradaFigura >
                    duradaTotal +
                    0.000001;


                boto.disabled =
                    respostaValidada ||
                    noCap;
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



        const duradaResposta =
            obtenirDuradaResposta();


        const duradaTotal =
            obtenirDuradaTotalDictat();



        if (
            Math.abs(
                duradaResposta -
                duradaTotal
            ) >
            0.000001
        ) {

            return;
        }



        const respostaCorrecta =
            aplanarDictat(
                dictatActual
            );


        const correcte =
            compararSequenciesRitmiques(
                respostaAlumne,
                respostaCorrecta
            );


        respostaValidada =
            true;



        if (correcte) {

            encerts++;


            if (feedback) {

                feedback.textContent =
                    "Correcte!";


                feedback.className =
                    "feedback correcte";
            }

        } else {

            if (feedback) {

                feedback.textContent =
                    "No és correcte.";


                feedback.className =
                    "feedback incorrecte";
            }
        }



        if (botoComprovar) {

            botoComprovar.hidden =
                true;
        }



        if (botoSeguent) {

            botoSeguent.hidden =
                false;


            if (
                preguntaActual >=
                config.totalPreguntes
            ) {

                botoSeguent.textContent =
                    "Veure resultat";

            } else {

                botoSeguent.textContent =
                    "Següent";
            }
        }


        actualitzarBotons();
    }



    // =========================
    // NOVA PREGUNTA
    // =========================

    function novaPregunta() {

        preguntaActual++;



        // =========================
        // FINAL DE L'EXERCICI
        // =========================

        if (
            preguntaActual >
            config.totalPreguntes
        ) {

            finalitzarExercici();


            return;
        }



        // =========================
        // PREPARAR DICTAT
        // =========================

        dictatActual =
            generarDictat();


        respostaAlumne = [];


        reproduccionsUtilitzades =
            0;


        respostaValidada =
            false;



        // =========================
        // FEEDBACK
        // =========================

        if (feedback) {

            feedback.textContent =
                "";


            feedback.className =
                "feedback";
        }



        // =========================
        // COMPROVAR
        // =========================

        if (botoComprovar) {

            botoComprovar.hidden =
                false;


            botoComprovar.disabled =
                true;
        }



        // =========================
        // SEGÜENT
        // =========================

        if (botoSeguent) {

            botoSeguent.hidden =
                true;


            botoSeguent.textContent =
                "Següent";
        }



        // =========================
        // INDICADOR
        // =========================

        if (preguntaActualText) {

            preguntaActualText.textContent =
                preguntaActual;
        }



        // =========================
        // ACTUALITZAR INTERFÍCIE
        // =========================

        renderitzarResposta();


        actualitzarReproduccions();


        actualitzarBotons();



        // IMPORTANT:
        //
        // No reproduïm el dictat
        // automàticament.
        //
        // L'alumne ha de prémer
        // "Escoltar dictat".
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



        // =========================
        // SISTEMA GENERAL
        // =========================
        //
        // No canviem manualment
        // la pantalla.
        //
        // sistema-exercicis.js
        // ja s'encarrega de:
        //
        // - registrar resultat
        // - calcular XP
        // - ocultar l'exercici
        // - mostrar resultat final
        // - animar la barra d'XP
        // - configurar Finalitzar
        // =========================

        if (
            typeof mostrarResultatFinalExercici ===
            "function"
        ) {

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
                    "Dictat rítmic",

                urlFinal:
                    "../../exercicis.html"

            });

        } else {

            console.error(
                "No s'ha trobat mostrarResultatFinalExercici()."
            );
        }
    }



    // =========================
    // EVENTS
    // =========================

    if (botoEscoltar) {

        botoEscoltar.addEventListener(
            "click",
            reproduirDictat
        );
    }



    botonsFigures.forEach(
        boto => {

            boto.addEventListener(
                "click",
                () => {

                    const figura =
                        boto.dataset.figura;


                    afegirFigura(
                        figura
                    );
                }
            );
        }
    );



    if (botoEsborrar) {

        botoEsborrar.addEventListener(
            "click",
            esborrarUltimaFigura
        );
    }



    if (botoEscoltarResposta) {

        botoEscoltarResposta.addEventListener(
            "click",
            reproduirResposta
        );
    }



    if (botoComprovar) {

        botoComprovar.addEventListener(
            "click",
            comprovarResposta
        );
    }



    if (botoSeguent) {

        botoSeguent.addEventListener(
            "click",
            novaPregunta
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
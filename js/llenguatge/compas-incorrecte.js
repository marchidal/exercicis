// =========================
// MOTOR D'EXERCICIS
// COMPÀS INCORRECTE
// =========================

function iniciarExerciciCompasIncorrecte(
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


    const zonaCompassos =
        document.getElementById(
            "zona-compassos"
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

    let compassosActuals = [];

    let indexIncorrecte = null;

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
            "No hi ha figures disponibles."
        );

        return;
    }


    if (
        !config.compas ||
        typeof config.compas !==
        "string"
    ) {

        console.error(
            "El compàs no és vàlid."
        );

        return;
    }


    if (
        !Number.isInteger(
            config.quantitatCompassos
        ) ||
        config.quantitatCompassos < 2
    ) {

        console.error(
            "La quantitat de compassos no és vàlida."
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



    // =========================
    // DURADA DEL COMPÀS
    // =========================

    function obtenirDuradaCompas() {

        const parts =
            config.compas.split("/");


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



    const duradaObjectiu =
        obtenirDuradaCompas();


    if (
        duradaObjectiu === null
    ) {

        console.error(
            "No s'ha pogut calcular la durada del compàs."
        );

        return;
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



    const figuresValides =
        obtenirFiguresValides();


    if (
        figuresValides.length === 0
    ) {

        console.error(
            "No hi ha figures vàlides per generar compassos."
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
    // DURADA D'UNA SEQÜÈNCIA
    // =========================

    function obtenirDuradaSequencia(
        figures
    ) {

        return figures.reduce(
            (
                total,
                figura
            ) => {

                return (
                    total +
                    Number(
                        figura.valor
                    )
                );

            },
            0
        );
    }



    // =========================
    // GENERAR SEQÜÈNCIA
    // D'UNA DURADA CONCRETA
    // =========================

    function generarSequenciaDurada(
        duradaDesitjada
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
                duradaDesitjada -
                0.000001
            ) {

                intentsInterns++;


                if (
                    intentsInterns > 200
                ) {

                    break;
                }


                const restant =
                    duradaDesitjada -
                    duradaActual;


                const figuresPossibles =
                    figuresValides.filter(
                        figura =>
                            Number(
                                figura.valor
                            ) <=
                            restant +
                            0.000001
                    );


                if (
                    figuresPossibles.length === 0
                ) {

                    break;
                }


                const figura =
                    obtenirElementAleatori(
                        figuresPossibles
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
                    duradaDesitjada
                ) <
                0.000001
            ) {

                return resultat;
            }
        }


        return null;
    }



    // =========================
    // GENERAR COMPÀS CORRECTE
    // =========================

    function generarCompasCorrecte() {

        return generarSequenciaDurada(
            duradaObjectiu
        );
    }



    // =========================
    // DIFERÈNCIES PERMESES
    // =========================

    function obtenirDiferenciesPermeses() {

        const diferenciesPossibles = [
            0.25,
            0.5,
            1
        ];


        return diferenciesPossibles.filter(
            diferencia => {

                const duradaCurta =
                    duradaObjectiu -
                    diferencia;


                const duradaLlarga =
                    duradaObjectiu +
                    diferencia;


                const potGenerarCurt =
                    duradaCurta > 0;


                const potGenerarLlarg =
                    duradaLlarga > 0;


                return (
                    potGenerarCurt ||
                    potGenerarLlarg
                );
            }
        );
    }



    // =========================
    // GENERAR COMPÀS CURT
    // =========================

    function generarCompasCurt() {

        const diferencies =
            barrejarArray(
                obtenirDiferenciesPermeses()
            );


        for (
            const diferencia
            of diferencies
        ) {

            const duradaIncorrecta =
                duradaObjectiu -
                diferencia;


            if (
                duradaIncorrecta <= 0
            ) {

                continue;
            }


            const resultat =
                generarSequenciaDurada(
                    duradaIncorrecta
                );


            if (
                resultat &&
                resultat.length > 0
            ) {

                return resultat;
            }
        }


        return null;
    }



    // =========================
    // GENERAR COMPÀS LLARG
    // =========================

    function generarCompasLlarg() {

        const diferencies =
            barrejarArray(
                obtenirDiferenciesPermeses()
            );


        for (
            const diferencia
            of diferencies
        ) {

            const duradaIncorrecta =
                duradaObjectiu +
                diferencia;


            const resultat =
                generarSequenciaDurada(
                    duradaIncorrecta
                );


            if (
                resultat &&
                resultat.length > 0
            ) {

                return resultat;
            }
        }


        return null;
    }



    // =========================
    // GENERAR COMPÀS INCORRECTE
    // =========================

    function generarCompasIncorrecte() {

        const tipusInicial =
            Math.random() < 0.5
                ? "curt"
                : "llarg";


        if (
            tipusInicial === "curt"
        ) {

            const curt =
                generarCompasCurt();


            if (curt) {

                return curt;
            }


            return generarCompasLlarg();

        } else {

            const llarg =
                generarCompasLlarg();


            if (llarg) {

                return llarg;
            }


            return generarCompasCurt();
        }
    }



    // =========================
    // GENERAR PREGUNTA
    // =========================

    function generarPregunta() {

        const compassos = [];



        // =========================
        // COMPASSOS CORRECTES
        // =========================

        for (
            let i = 0;
            i <
            config.quantitatCompassos - 1;
            i++
        ) {

            const compas =
                generarCompasCorrecte();


            if (!compas) {

                console.error(
                    "No s'ha pogut generar un compàs correcte."
                );

                return null;
            }


            compassos.push({

                figures:
                    compas,

                correcte:
                    true

            });
        }



        // =========================
        // COMPÀS INCORRECTE
        // =========================

        const incorrecte =
            generarCompasIncorrecte();


        if (!incorrecte) {

            console.error(
                "No s'ha pogut generar el compàs incorrecte."
            );

            return null;
        }


        compassos.push({

            figures:
                incorrecte,

            correcte:
                false

        });



        // =========================
        // BARREJAR POSICIONS
        // =========================

        return barrejarArray(
            compassos
        );
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
            "figura-compas-incorrecte";


        element.textContent =
            figura.simbol || "";


        element.title =
            figura.nom || "";


        return element;
    }



    // =========================
    // RENDERITZAR COMPASSOS
    // =========================

    function renderitzarCompassos() {

        if (
            !zonaCompassos
        ) {

            return;
        }


        zonaCompassos.innerHTML =
            "";


        compassosActuals.forEach(
            (
                compas,
                index
            ) => {

                const boto =
                    document.createElement(
                        "button"
                    );


                boto.type =
                    "button";


                boto.className =
                    "compas-opcio";


                boto.dataset.index =
                    index;



                // =========================
                // NÚMERO DEL COMPÀS
                // =========================

                const numero =
                    document.createElement(
                        "div"
                    );


                numero.className =
                    "numero-compas";


                numero.textContent =
                    `Compàs ${index + 1}`;



                // =========================
                // FIGURES
                // =========================

                const figures =
                    document.createElement(
                        "div"
                    );


                figures.className =
                    "figures-compas";


                compas.figures.forEach(
                    figura => {

                        figures.appendChild(
                            crearFiguraVisual(
                                figura
                            )
                        );

                    }
                );



                // =========================
                // MUNTAR BOTÓ
                // =========================

                boto.appendChild(
                    numero
                );


                boto.appendChild(
                    figures
                );



                // =========================
                // EVENT
                // =========================

                boto.addEventListener(
                    "click",
                    () => {

                        seleccionarCompas(
                            index
                        );

                    }
                );


                zonaCompassos.appendChild(
                    boto
                );
            }
        );
    }



    // =========================
    // SELECCIONAR COMPÀS
    // =========================

    function seleccionarCompas(
        index
    ) {

        if (
            respostaValidada
        ) {

            return;
        }


        respostaValidada =
            true;


        const compasSeleccionat =
            compassosActuals[
                index
            ];


        const esCorrecte =
            compasSeleccionat.correcte ===
            false;



        // =========================
        // TROBAR INCORRECTE
        // =========================

        indexIncorrecte =
            compassosActuals.findIndex(
                compas =>
                    compas.correcte ===
                    false
            );



        // =========================
        // DESACTIVAR BOTONS
        // =========================

        const botons =
            zonaCompassos.querySelectorAll(
                ".compas-opcio"
            );


        botons.forEach(
            (
                boto,
                botoIndex
            ) => {

                boto.disabled =
                    true;


                if (
                    botoIndex ===
                    indexIncorrecte
                ) {

                    boto.classList.add(
                        "compas-correcte"
                    );
                }


                if (
                    botoIndex ===
                    index &&
                    !esCorrecte
                ) {

                    boto.classList.add(
                        "compas-error"
                    );
                }
            }
        );



        // =========================
        // DURADA INCORRECTA
        // =========================

        const duradaIncorrecta =
            obtenirDuradaSequencia(
                compassosActuals[
                    indexIncorrecte
                ].figures
            );


        const diferencia =
            Math.abs(
                duradaIncorrecta -
                duradaObjectiu
            );



        // =========================
        // TEXT DIFERÈNCIA
        // =========================

        let textDiferencia;


        if (
            diferencia === 1
        ) {

            textDiferencia =
                "1 pulsació";

        } else {

            textDiferencia =
                `${formatarNumero(diferencia)} pulsacions`;
        }



        // =========================
        // FEEDBACK
        // =========================

        if (
            esCorrecte
        ) {

            encerts++;


            if (
                feedback
            ) {

                if (
                    duradaIncorrecta <
                    duradaObjectiu
                ) {

                    feedback.textContent =
                        `Correcte! Al compàs ${indexIncorrecte + 1} li falten ${textDiferencia}.`;

                } else {

                    feedback.textContent =
                        `Correcte! Al compàs ${indexIncorrecte + 1} li sobren ${textDiferencia}.`;
                }


                feedback.className =
                    "feedback correcte";
            }

        } else {

            if (
                feedback
            ) {

                if (
                    duradaIncorrecta <
                    duradaObjectiu
                ) {

                    feedback.textContent =
                        `Incorrecte. El compàs ${indexIncorrecte + 1} és el que està malament: li falten ${textDiferencia}.`;

                } else {

                    feedback.textContent =
                        `Incorrecte. El compàs ${indexIncorrecte + 1} és el que està malament: li sobren ${textDiferencia}.`;
                }


                feedback.className =
                    "feedback incorrecte";
            }
        }



        // =========================
        // SEGÜENT AUTOMÀTICAMENT
        // =========================

        setTimeout(
            novaPregunta,
            1600
        );
    }



    // =========================
    // FORMATAR NÚMERO
    // =========================

    function formatarNumero(
        numero
    ) {

        return String(
            numero
        ).replace(
            ".",
            ","
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


        const pregunta =
            generarPregunta();


        if (!pregunta) {

            console.error(
                "No s'ha pogut generar una nova pregunta."
            );

            return;
        }


        preguntaActual++;


        respostaValidada =
            false;


        compassosActuals =
            pregunta;


        indexIncorrecte =
            null;



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
        // INDICADOR DE COMPÀS
        // =========================

        if (
            indicadorCompas
        ) {

            indicadorCompas.textContent =
                config.compas;
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
        // MOSTRAR COMPASSOS
        // =========================

        renderitzarCompassos();
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
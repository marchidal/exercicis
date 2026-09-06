// =========================
// MOTOR DE DICTAT MELÒDIC
// =========================

function iniciarDictatMelodic(config) {

    // =========================
    // ELEMENTS DEL DOM
    // =========================

    const botoEscoltar =
        document.getElementById(
            "escoltar-btn"
        );

    const botoEscoltarResposta =
        document.getElementById(
            "escoltar-resposta-btn"
        );

    const botoEsborrar =
        document.getElementById(
            "esborrar-btn"
        );

    const botoComprovar =
        document.getElementById(
            "comprovar-btn"
        );

    const opcionsNotes =
        document.getElementById(
            "opcions-notes"
        );

    const pentagrama =
        document.getElementById(
            "pentagrama-dictat"
        );

    const feedback =
        document.getElementById(
            "feedback"
        );

    const indicadorPregunta =
        document.getElementById(
            "indicador-pregunta"
        );


    // =========================
    // ESTAT
    // =========================

    let preguntes = [];

    let indexPregunta = 0;

    let encerts = 0;

    let dictatActual = [];

    let respostaAlumne = [];

    let respostaBloquejada = false;

    let reproduccionsActuals = 0;


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

        const index =
            Math.floor(
                Math.random() *
                array.length
            );


        return array[index];
    }


    // =========================
    // CREAR UN DICTAT
    // =========================

    function crearDictat() {

        const longitud =
            config.longitud || 4;


        const notesDisponibles =
            config.notesDisponibles
                .map(
                    id =>
                        obtenirNota(id)
                )
                .filter(Boolean);


        if (
            notesDisponibles.length === 0
        ) {

            console.error(
                "No hi ha notes disponibles per crear el dictat."
            );

            return [];
        }


        const dictat = [];


        // =========================
        // PRIMERA NOTA
        // =========================

        // La primera nota també és
        // aleatòria, però l'alumne
        // la veurà abans d'escoltar.

        const primeraNota =
            elementAleatori(
                notesDisponibles
            );


        dictat.push(
            primeraNota
        );


        // =========================
        // RESTA DE NOTES
        // =========================

        while (
            dictat.length <
            longitud
        ) {

            const nota =
                elementAleatori(
                    notesDisponibles
                );


            dictat.push(
                nota
            );
        }


        return dictat;
    }


    // =========================
    // CREAR PREGUNTES
    // =========================

    function crearPreguntes() {

        const total =
            config.totalPreguntes || 8;


        const resultat = [];


        for (
            let i = 0;
            i < total;
            i++
        ) {

            resultat.push(
                crearDictat()
            );
        }


        return resultat;
    }


    // =========================
    // PREPARAR PREGUNTA
    // =========================

    function prepararPregunta() {
    
        dictatActual =
            preguntes[
                indexPregunta
            ];
    
    
        // La primera nota ja està
        // donada a l'alumne.
    
        respostaAlumne = [
            dictatActual[0]
        ];
    
    
        respostaBloquejada =
            false;
    
    
        // Reiniciem el nombre
        // d'escoltes per a cada pregunta.
    
        reproduccionsActuals = 0;
    
    
        feedback.textContent =
            "";
    
        feedback.className =
            "feedback";
    
    
        actualitzarIndicador();
    
        crearBotonsNotes();
    
        dibuixarPentagrama();
    
        actualitzarControls();
    }


    // =========================
    // CREAR BOTONS DE NOTES
    // =========================

    function crearBotonsNotes() {

        opcionsNotes.innerHTML =
            "";


        config.notesDisponibles.forEach(
            id => {

                const nota =
                    obtenirNota(id);


                if (!nota) {
                    return;
                }


                const boto =
                    document.createElement(
                        "button"
                    );


                boto.type =
                    "button";

                boto.className =
                    "opcio-nota";


                boto.textContent =
                    nota.nomCurt;


                boto.addEventListener(
                    "click",
                    () => {

                        afegirNota(
                            nota
                        );
                    }
                );


                opcionsNotes.appendChild(
                    boto
                );
            }
        );
    }


    // =========================
    // AFEGIR NOTA
    // =========================

    function afegirNota(nota) {

        if (
            respostaBloquejada
        ) {
            return;
        }


        if (
            respostaAlumne.length >=
            config.longitud
        ) {
            return;
        }


        respostaAlumne.push(
            nota
        );


        dibuixarPentagrama();

        actualitzarControls();
    }


    // =========================
    // ESBORRAR ÚLTIMA NOTA
    // =========================

    function esborrarUltimaNota() {

        if (
            respostaBloquejada
        ) {
            return;
        }


        // La primera nota no es pot
        // eliminar perquè forma part
        // de l'enunciat.

        if (
            respostaAlumne.length <= 1
        ) {
            return;
        }


        respostaAlumne.pop();


        dibuixarPentagrama();

        actualitzarControls();
    }


    // =========================
    // ACTUALITZAR CONTROLS
    // =========================

    function actualitzarControls() {
    
        const completa =
            respostaAlumne.length ===
            config.longitud;
    
    
        // =========================
        // COMPROVAR
        // =========================
    
        botoComprovar.disabled =
            !completa ||
            respostaBloquejada;
    
    
        // =========================
        // ESCOLTAR RESPOSTA
        // =========================
    
        botoEscoltarResposta.disabled =
            !completa ||
            respostaBloquejada;
    
    
        // =========================
        // ESBORRAR
        // =========================
    
        botoEsborrar.disabled =
            respostaAlumne.length <= 1 ||
            respostaBloquejada;
    
    
        // =========================
        // ESCOLTAR DICTAT
        // =========================
    
        const maxReproduccions =
            config.maxReproduccions ??
            Infinity;
    
    
        const reproduccionsRestants =
            maxReproduccions -
            reproduccionsActuals;
    
    
        botoEscoltar.disabled =
            respostaBloquejada ||
            reproduccionsRestants <= 0;
    
    
        // Si hi ha límit, mostrem
        // quantes escoltes queden.
    
        if (
            Number.isFinite(
                maxReproduccions
            )
        ) {
    
            if (
                reproduccionsRestants > 0
            ) {
    
                botoEscoltar.innerHTML = `
                    <span class="icona-escoltar">
                        ▶
                    </span>
    
                    Escoltar
                    (${reproduccionsRestants})
                `;
    
            } else {
    
                botoEscoltar.textContent =
                    "No queden reproduccions";
            }
    
        } else {
    
            botoEscoltar.innerHTML = `
                <span class="icona-escoltar">
                    ▶
                </span>
    
                Escoltar
            `;
        }
    
    
        // =========================
        // BOTONS DE NOTES
        // =========================
    
        const botons =
            opcionsNotes.querySelectorAll(
                ".opcio-nota"
            );
    
    
        botons.forEach(
            boto => {
    
                boto.disabled =
                    completa ||
                    respostaBloquejada;
            }
        );
    }


    // =========================
    // POSICIÓ VERTICAL
    // =========================

    function obtenirPosicioPentagrama(
        nota
    ) {
    
        const posicions = {
    
            // =========================
            // OCTAVA 2
            // =========================
    
            C2: 0,
            D2: 0.5,
            E2: 1,
            F2: 1.5,
            G2: 2,
            A2: 2.5,
            B2: 3,
    
    
            // =========================
            // OCTAVA 3
            // =========================
    
            C3: 3.5,
            D3: 4,
            E3: 4.5,
            F3: 5,
            G3: 5.5,
            A3: 6,
            B3: 6.5,
    
    
            // =========================
            // DO SUPERIOR
            // =========================
    
            C4: 7
    
        };
    
    
        if (
            posicions[nota.id] ===
            undefined
        ) {
    
            console.warn(
                `No hi ha posició de pentagrama definida per a ${nota.id}`
            );
    
            return 1;
        }
    
    
        return posicions[
            nota.id
        ];
    }


    // =========================
    // DIBUIXAR PENTAGRAMA
    // =========================

    function dibuixarPentagrama() {
    
        const amplada = 700;
        const alcada = 260;
    
        const iniciX = 70;
        const finalX = 630;
    
        const primeraLiniaY = 170;
        const distanciaLinies = 25;
    
    
        // =========================
        // LÍNIES DEL PENTAGRAMA
        // =========================
    
        let linies = "";
    
    
        for (
            let i = 0;
            i < 5;
            i++
        ) {
    
            const y =
                primeraLiniaY -
                (
                    i *
                    distanciaLinies
                );
    
    
            linies += `
                <line
                    x1="${iniciX}"
                    y1="${y}"
                    x2="${finalX}"
                    y2="${y}"
                    stroke="black"
                    stroke-width="2"
                />
            `;
        }
    
    
        // =========================
        // NOTES
        // =========================
    
        let capsNotes = "";
    
    
        const espaiDisponible =
            390;
    
    
        const separacio =
            config.longitud > 1
                ? espaiDisponible /
                    (
                        config.longitud - 1
                    )
                : 0;
    
    
        for (
            let i = 0;
            i < config.longitud;
            i++
        ) {
    
            const x =
                210 +
                (
                    i *
                    separacio
                );
    
    
            const nota =
                respostaAlumne[i];
    
    
            // =========================
            // POSICIÓ BUIDA
            // =========================
    
            if (!nota) {
    
                capsNotes += `
                    <circle
                        cx="${x}"
                        cy="225"
                        r="5"
                        fill="#c7c7c7"
                    />
                `;
    
                continue;
            }
    
    
            // =========================
            // POSICIÓ DE LA NOTA
            // =========================
    
            const posicio =
                obtenirPosicioPentagrama(
                    nota
                );
    
    
            const y =
                primeraLiniaY -
                (
                    (posicio - 1) *
                    distanciaLinies
                );
    
    
            // =========================
            // LÍNIES ADDICIONALS GREUS
            // =========================
    
            // Les posicions 0, -1, -2...
            // necessiten línies addicionals
            // per sota del pentagrama.
    
            if (
                posicio <= 0
            ) {
    
                for (
                    let p = 0;
                    p >= posicio;
                    p--
                ) {
    
                    // Només dibuixem línies,
                    // no espais.
    
                    if (
                        Number.isInteger(p)
                    ) {
    
                        const yLinia =
                            primeraLiniaY -
                            (
                                (p - 1) *
                                distanciaLinies
                            );
    
    
                        capsNotes += `
                            <line
                                x1="${x - 24}"
                                y1="${yLinia}"
                                x2="${x + 24}"
                                y2="${yLinia}"
                                stroke="black"
                                stroke-width="2"
                            />
                        `;
                    }
                }
            }
    
    
            // =========================
            // LÍNIES ADDICIONALS AGUDES
            // =========================
    
            // La cinquena línia del
            // pentagrama correspon a
            // la posició 5.
            //
            // Per sobre, les posicions
            // 6, 7, 8... poden necessitar
            // línies addicionals.
    
            if (
                posicio >= 6
            ) {
    
                for (
                    let p = 6;
                    p <= posicio;
                    p++
                ) {
    
                    if (
                        Number.isInteger(p)
                    ) {
    
                        const yLinia =
                            primeraLiniaY -
                            (
                                (p - 1) *
                                distanciaLinies
                            );
    
    
                        capsNotes += `
                            <line
                                x1="${x - 24}"
                                y1="${yLinia}"
                                x2="${x + 24}"
                                y2="${yLinia}"
                                stroke="black"
                                stroke-width="2"
                            />
                        `;
                    }
                }
            }
    
    
            // =========================
            // CAP DE NOTA
            // =========================
    
            const classe =
                i === 0
                    ? "nota-donada"
                    : "nota-resposta";
    
    
            capsNotes += `
                <ellipse
                    cx="${x}"
                    cy="${y}"
                    rx="13"
                    ry="9"
                    class="${classe}"
                    transform="rotate(-20 ${x} ${y})"
                />
            `;
        }
    
    
        // =========================
        // SVG
        // =========================
    
        pentagrama.innerHTML = `
    
            <svg
                viewBox="0 0 ${amplada} ${alcada}"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Resposta del dictat melòdic"
            >
    
                ${linies}
    
    
                <!-- CLAU DE SOL -->
    
                <text
                    x="85"
                    y="175"
                    font-size="100"
                    font-family="serif"
                >
                    𝄞
                </text>
    
    
                ${capsNotes}
    
            </svg>
        `;
    }


    // =========================
    // ESCOLTAR DICTAT
    // =========================

    async function escoltarDictat() {
    
        if (
            respostaBloquejada
        ) {
            return;
        }
    
    
        const maxReproduccions =
            config.maxReproduccions ??
            Infinity;
    
    
        if (
            reproduccionsActuals >=
            maxReproduccions
        ) {
            return;
        }
    
    
        reproduccionsActuals++;
    
    
        actualitzarControls();
    
    
        await activarAudio();
    
    
        reproduirSequencia(
            dictatActual,
            config.separacioNotes || 1.05
        );
    }


    // =========================
    // ESCOLTAR RESPOSTA
    // =========================

    async function escoltarResposta() {

        if (
            respostaAlumne.length !==
            config.longitud
        ) {
            return;
        }


        await activarAudio();


        reproduirSequencia(
            respostaAlumne,
            config.separacioNotes || 1.05
        );
    }


    // =========================
    // COMPROVAR RESPOSTA
    // =========================

    function comprovarResposta() {
    
        if (
            respostaBloquejada ||
            respostaAlumne.length !==
            config.longitud
        ) {
            return;
        }
    
    
        respostaBloquejada =
            true;
    
    
        const correcte =
            respostaAlumne.every(
                (nota, index) =>
                    nota.id ===
                    dictatActual[index].id
            );
    
    
        if (correcte) {
    
            encerts++;
    
            feedback.textContent =
                "Correcte!";
    
            feedback.className =
                "feedback correcte";
    
        } else {
    
            feedback.textContent =
                "Incorrecte.";
    
            feedback.className =
                "feedback incorrecte";
        }
    
    
        actualitzarControls();
    
    
        setTimeout(
            () => {
    
                indexPregunta++;
    
    
                if (
                    indexPregunta >=
                    preguntes.length
                ) {
    
                    finalitzarExercici();
    
                } else {
    
                    // Preparem el nou dictat,
                    // però NO el reproduïm.
                    //
                    // L'alumne tindrà temps
                    // de veure la primera nota
                    // i situar-se al pentagrama.
    
                    prepararPregunta();
                }
    
            },
            1300
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
                ) *
                100
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

    botoEscoltar.addEventListener(
        "click",
        escoltarDictat
    );


    botoEscoltarResposta.addEventListener(
        "click",
        escoltarResposta
    );


    botoEsborrar.addEventListener(
        "click",
        esborrarUltimaNota
    );


    botoComprovar.addEventListener(
        "click",
        comprovarResposta
    );


    // =========================
    // INICI
    // =========================

    preguntes =
        crearPreguntes();


    prepararPregunta();
}
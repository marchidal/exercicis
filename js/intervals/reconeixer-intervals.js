// ============================================================
// MOTOR D'EXERCICIS D'INTERVALS
// ============================================================
//
// Permet:
// - Mostrar dos notes en un pentagrama
// - Calcular la distància en semitons
// - Identificar intervals de 2m a 8J
// - Respondre distància i interval
// - Bloquejar opcions segons el nivell
// - Generar preguntes equilibrades
//
// ============================================================


// ============================================================
// DADES MUSICALS
// ============================================================

const NOTES_INTERVALS = [

    { nom: "Do", lletra: "C", semito: 0 },
    { nom: "Re", lletra: "D", semito: 2 },
    { nom: "Mi", lletra: "E", semito: 4 },
    { nom: "Fa", lletra: "F", semito: 5 },
    { nom: "Sol", lletra: "G", semito: 7 },
    { nom: "La", lletra: "A", semito: 9 },
    { nom: "Si", lletra: "B", semito: 11 }

];


// ============================================================
// DEFINICIÓ DELS INTERVALS
// ============================================================

const TIPUS_INTERVALS = [

    {
        id: "2m",
        nom: "Segona menor",
        grau: 2,
        semitons: 1
    },

    {
        id: "2M",
        nom: "Segona major",
        grau: 2,
        semitons: 2
    },

    {
        id: "3m",
        nom: "Tercera menor",
        grau: 3,
        semitons: 3
    },

    {
        id: "3M",
        nom: "Tercera major",
        grau: 3,
        semitons: 4
    },

    {
        id: "4J",
        nom: "Quarta justa",
        grau: 4,
        semitons: 5
    },

    {
        id: "5J",
        nom: "Quinta justa",
        grau: 5,
        semitons: 7
    },

    {
        id: "6m",
        nom: "Sisena menor",
        grau: 6,
        semitons: 8
    },

    {
        id: "6M",
        nom: "Sisena major",
        grau: 6,
        semitons: 9
    },

    {
        id: "7m",
        nom: "Setena menor",
        grau: 7,
        semitons: 10
    },

    {
        id: "7M",
        nom: "Setena major",
        grau: 7,
        semitons: 11
    },

    {
        id: "8J",
        nom: "Octava justa",
        grau: 8,
        semitons: 12
    }

];


// ============================================================
// DISTÀNCIES DISPONIBLES
// ============================================================

const DISTANCIES_INTERVALS = [

    { semitons: 1, text: "½ to" },
    { semitons: 2, text: "1 to" },
    { semitons: 3, text: "1½ tons" },
    { semitons: 4, text: "2 tons" },
    { semitons: 5, text: "2½ tons" },
    { semitons: 6, text: "3 tons" },
    { semitons: 7, text: "3½ tons" },
    { semitons: 8, text: "4 tons" },
    { semitons: 9, text: "4½ tons" },
    { semitons: 10, text: "5 tons" },
    { semitons: 11, text: "5½ tons" },
    { semitons: 12, text: "6 tons" }

];


// ============================================================
// ESTAT DEL MOTOR
// ============================================================

let configuracioIntervals = null;

let preguntesIntervals = [];

let preguntaActualIntervals = 0;

let encertsIntervals = 0;

let respostaDistancia = null;

let respostaInterval = null;

let preguntaComprovada = false;


// ============================================================
// FUNCIONS AUXILIARS
// ============================================================

function obtenirElementAleatoriIntervals(
    elements
) {

    return elements[
        Math.floor(
            Math.random() *
            elements.length
        )
    ];

}


function barrejarElementsIntervals(
    elements
) {

    const resultat = [
        ...elements
    ];


    for (
        let i = resultat.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            resultat[i],
            resultat[j]
        ] = [
            resultat[j],
            resultat[i]
        ];

    }


    return resultat;
}


// ============================================================
// OBTENIR DEFINICIÓ D'UN INTERVAL
// ============================================================

function obtenirTipusInterval(
    id
) {

    return TIPUS_INTERVALS.find(
        interval =>
            interval.id === id
    ) || null;

}


// ============================================================
// OBTENIR DEFINICIÓ D'UNA DISTÀNCIA
// ============================================================

function obtenirDistanciaInterval(
    semitons
) {

    return DISTANCIES_INTERVALS.find(
        distancia =>
            distancia.semitons === semitons
    ) || null;

}


// ============================================================
// CALCULAR ALTURA ABSOLUTA D'UNA NOTA
// ============================================================

function calcularSemitoAbsolut(
    nota
) {

    const definicio =
        NOTES_INTERVALS[
            nota.index
        ];


    return (
        nota.octava * 12 +
        definicio.semito
    );

}


// ============================================================
// CALCULAR DISTÀNCIA ENTRE DUES NOTES
// ============================================================

function calcularDistanciaSemitons(
    nota1,
    nota2
) {

    return Math.abs(
        calcularSemitoAbsolut(
            nota2
        ) -
        calcularSemitoAbsolut(
            nota1
        )
    );

}


// ============================================================
// CALCULAR NOMBRE DIATÒNIC
// ============================================================

function calcularGrauInterval(
    nota1,
    nota2
) {

    const posicio1 =
        nota1.octava * 7 +
        nota1.index;


    const posicio2 =
        nota2.octava * 7 +
        nota2.index;


    return (
        Math.abs(
            posicio2 -
            posicio1
        ) + 1
    );

}


// ============================================================
// IDENTIFICAR INTERVAL
// ============================================================

function identificarInterval(
    nota1,
    nota2
) {

    const semitons =
        calcularDistanciaSemitons(
            nota1,
            nota2
        );


    const grau =
        calcularGrauInterval(
            nota1,
            nota2
        );


    return TIPUS_INTERVALS.find(
        interval =>
            interval.grau === grau &&
            interval.semitons === semitons
    ) || null;

}


// ============================================================
// CREAR NOTA
// ============================================================

function crearNotaInterval(
    index,
    octava
) {

    const definicio =
        NOTES_INTERVALS[
            index
        ];


    return {

        index: index,

        octava: octava,

        nom: definicio.nom,

        lletra: definicio.lletra,

        semito: definicio.semito

    };

}


// ============================================================
// GENERAR PARELLES D'UN INTERVAL
// ============================================================

function generarParellesInterval(idInterval) {

    const tipus = obtenirTipusInterval(idInterval);

    if (!tipus) {
        return [];
    }

    const parelles = [];

    // =========================
    // REGISTRE CONFIGURABLE
    // =========================

    // Si l'exercici no especifica el registre,
    // utilitzem Do3 - Do4 per defecte.

    const notaMinima =
        configuracioIntervals.notaMinima || "C3";

    const notaMaxima =
        configuracioIntervals.notaMaxima || "C4";

    // =========================
    // CONVERTIR NOTA A POSICIÓ
    // =========================

    function obtenirPosicio(nomNota) {

        const lletres = [
            "C", "D", "E", "F", "G", "A", "B"
        ];

        const lletra = nomNota.charAt(0).toUpperCase();

        const octava = Number(
            nomNota.slice(1)
        );

        const index = lletres.indexOf(lletra);

        if (
            index === -1 ||
            !Number.isInteger(octava)
        ) {
            throw new Error(
                `Nota no vàlida: ${nomNota}`
            );
        }

        return octava * 7 + index;
    }

    const posicioMinima =
        obtenirPosicio(notaMinima);

    const posicioMaxima =
        obtenirPosicio(notaMaxima);

    // =========================
    // GENERAR PARELLES
    // =========================

    for (
        let posicio1 = posicioMinima;
        posicio1 <= posicioMaxima;
        posicio1++
    ) {

        const posicio2 =
            posicio1 + tipus.grau - 1;

        if (posicio2 > posicioMaxima) {
            continue;
        }

        // =========================
        // PRIMERA NOTA
        // =========================

        const index1 = posicio1 % 7;

        const octava1 = Math.floor(
            posicio1 / 7
        );

        const nota1 = crearNotaInterval(
            index1,
            octava1
        );

        // =========================
        // SEGONA NOTA
        // =========================

        const index2 = posicio2 % 7;

        const octava2 = Math.floor(
            posicio2 / 7
        );

        const nota2 = crearNotaInterval(
            index2,
            octava2
        );

        // =========================
        // COMPROVAR INTERVAL
        // =========================

        const intervalCalculat =
            identificarInterval(
                nota1,
                nota2
            );

        if (
            !intervalCalculat ||
            intervalCalculat.id !== idInterval
        ) {
            continue;
        }

        // =========================
        // GUARDAR PARELLA
        // =========================

        parelles.push({

            nota1: nota1,

            nota2: nota2,

            interval: tipus,

            semitons: tipus.semitons

        });
    }

    return parelles;
}


// ============================================================
// GENERAR UNA PREGUNTA
// ============================================================

function generarPreguntaInterval(
    idInterval
) {

    const parelles =
        generarParellesInterval(
            idInterval
        );


    if (
        parelles.length === 0
    ) {

        return null;
    }


    const parella =
        obtenirElementAleatoriIntervals(
            parelles
        );


    // =========================
    // MOVIMENT
    // =========================

    const moviment =
        configuracioIntervals.moviment ||
        "ascendent";


    let descendent = false;


    if (
        moviment === "descendent"
    ) {

        descendent = true;

    } else if (
        moviment === "mixt"
    ) {

        descendent =
            Math.random() < 0.5;

    }


    if (
        descendent
    ) {

        return {

            nota1: parella.nota2,

            nota2: parella.nota1,

            interval: parella.interval,

            semitons: parella.semitons

        };

    }


    return {

        nota1: parella.nota1,

        nota2: parella.nota2,

        interval: parella.interval,

        semitons: parella.semitons

    };

}


// ============================================================
// GENERAR TOTES LES PREGUNTES
// ============================================================

function generarPreguntesIntervals() {

    const resultat = [];

    const total =
        configuracioIntervals.totalPreguntes || 10;

    const repartiment =
        configuracioIntervals.preguntesPerInterval || null;

    const disponibles =
        configuracioIntervals.intervalsDisponibles;

    const moviment =
        configuracioIntervals.moviment || "ascendent";

    // ========================================================
    // CREAR PREGUNTA A PARTIR D'UNA PARELLA
    // ========================================================

    function crearPreguntaDesDeParella(parella) {

        let descendent = false;

        if (moviment === "descendent") {

            descendent = true;

        } else if (moviment === "mixt") {

            descendent = Math.random() < 0.5;
        }

        return {

            nota1: descendent
                ? parella.nota2
                : parella.nota1,

            nota2: descendent
                ? parella.nota1
                : parella.nota2,

            interval: parella.interval,

            semitons: parella.semitons
        };
    }

    // ========================================================
    // IDENTIFICAR UNA PARELLA DE NOTES
    // ========================================================

    function obtenirClauParella(parella) {

        const nota1 =
            parella.nota1.lletra +
            parella.nota1.octava;

        const nota2 =
            parella.nota2.lletra +
            parella.nota2.octava;

        // La clau és independent del moviment.

        return [nota1, nota2]
            .sort()
            .join("-");
    }

    // ========================================================
    // CREAR BOSSES DE PARELLES PER INTERVAL
    // ========================================================

    const bosses = {};

    function obtenirBossa(idInterval) {

        if (!bosses[idInterval]) {

            bosses[idInterval] = {

                totes: generarParellesInterval(idInterval),

                pendents: []
            };
        }

        return bosses[idInterval];
    }

    // ========================================================
    // OBTENIR UNA PARELLA SENSE REPETICIONS
    // ========================================================

    function obtenirParella(idInterval, clauAnterior = null) {

        const bossa = obtenirBossa(idInterval);

        if (bossa.totes.length === 0) {

            return null;
        }

        // Quan s'esgoten les parelles disponibles,
        // comencem una nova ronda.

        if (bossa.pendents.length === 0) {

            bossa.pendents =
                barrejarElementsIntervals(bossa.totes);
        }

        // Intentem evitar repetir la parella anterior.

        let index = bossa.pendents.findIndex(
            parella =>
                obtenirClauParella(parella) !== clauAnterior
        );

        // Si no hi ha alternativa, utilitzem
        // la primera parella disponible.

        if (index === -1) {

            index = 0;
        }

        const [parella] =
            bossa.pendents.splice(index, 1);

        return parella;
    }

    // ========================================================
    // PREPARAR LA SEQÜÈNCIA D'INTERVALS
    // ========================================================

    const sequenciaIntervals = [];

    if (repartiment) {

        for (
            const [idInterval, quantitat]
            of Object.entries(repartiment)
        ) {

            for (let i = 0; i < quantitat; i++) {

                sequenciaIntervals.push(idInterval);
            }
        }
    }

    // Completem fins al total configurat.

    while (
        sequenciaIntervals.length < total &&
        disponibles.length > 0
    ) {

        const idInterval =
            obtenirElementAleatoriIntervals(disponibles);

        sequenciaIntervals.push(idInterval);
    }

    // Barregem els tipus d'interval.

    const sequenciaBarrejada =
        barrejarElementsIntervals(
            sequenciaIntervals.slice(0, total)
        );

    // ========================================================
    // GENERAR LES PREGUNTES
    // ========================================================

    let clauAnterior = null;

    for (const idInterval of sequenciaBarrejada) {

        const parella =
            obtenirParella(idInterval, clauAnterior);

        if (!parella) {

            console.warn(
                `No hi ha parelles disponibles per a ${idInterval}`
            );

            continue;
        }

        const pregunta =
            crearPreguntaDesDeParella(parella);

        resultat.push(pregunta);

        clauAnterior =
            obtenirClauParella(parella);
    }

    return resultat;
}


// ============================================================
// FORMAT DEL NOM DE LA NOTA
// ============================================================

function obtenirNomNotaInterval(
    nota
) {

    return (
        nota.nom +
        nota.octava
    );

}


// ============================================================
// DIBUIXAR PENTAGRAMA
// ============================================================

function dibuixarPentagramaIntervals(nota1, nota2) {

    const contenidor = document.getElementById(
        "pentagrama-intervals"
    );

    if (!contenidor) return;

    const svgNS = "http://www.w3.org/2000/svg";

    const amplada = 460;

    const yLiniaInferior = 170;
    const separacioLinies = 20;

    // ========================================================
    // POSICIÓ VERTICAL DE LES NOTES
    // ========================================================

    function obtenirYNota(nota) {

        // Numeració utilitzada a la web:
        // Do3 és el Do central.
        // Mi3 ocupa la primera línia del pentagrama.
    
        const posicioMi3 = 3 * 7 + 2;
    
        const posicioNota =
            nota.octava * 7 + nota.index;
    
        const diferencia =
            posicioNota - posicioMi3;
    
        return yLiniaInferior - diferencia * 10;
    }

    const yNota1 = obtenirYNota(nota1);
    const yNota2 = obtenirYNota(nota2);

    // ========================================================
    // ALTURA DINÀMICA
    // ========================================================

    // Reservem espai per a les notes, les línies
    // addicionals i les pliques.

    const yMesBaixa = Math.max(yNota1, yNota2);

    const alcada = Math.max(
        260,
        yMesBaixa + 35
    );

    const svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute(
        "viewBox",
        `0 0 ${amplada} ${alcada}`
    );

    svg.setAttribute(
        "class",
        "pentagrama-svg-intervals"
    );

    svg.setAttribute("role", "img");

    svg.setAttribute(
        "aria-label",
        `Pentagrama en clau de Sol amb les notes ${nota1.nom}${nota1.octava} i ${nota2.nom}${nota2.octava}`
    );

    // ========================================================
    // CREAR LÍNIA
    // ========================================================

    function afegirLinia(
        x1,
        y1,
        x2,
        y2,
        gruix = 1.5
    ) {

        const linia = document.createElementNS(
            svgNS,
            "line"
        );

        linia.setAttribute("x1", x1);
        linia.setAttribute("y1", y1);

        linia.setAttribute("x2", x2);
        linia.setAttribute("y2", y2);

        linia.setAttribute(
            "stroke",
            "currentColor"
        );

        linia.setAttribute(
            "stroke-width",
            gruix
        );

        svg.appendChild(linia);
    }

    // ========================================================
    // CINC LÍNIES DEL PENTAGRAMA
    // ========================================================

    for (let i = 0; i < 5; i++) {

        const y =
            yLiniaInferior - i * separacioLinies;

        afegirLinia(
            35,
            y,
            425,
            y
        );
    }

    // ========================================================
    // CLAU DE SOL
    // ========================================================

    const clau = document.createElementNS(
        svgNS,
        "text"
    );

    clau.setAttribute("x", 65);
    clau.setAttribute("y", 183);

    clau.setAttribute("font-size", 105);

    clau.setAttribute(
        "font-family",
        '"Noto Music", "Bravura", "Segoe UI Symbol", serif'
    );

    clau.setAttribute(
        "fill",
        "currentColor"
    );

    clau.textContent = "𝄞";

    svg.appendChild(clau);

    // ========================================================
    // DIBUIXAR NOTA
    // ========================================================

    function dibuixarNota(nota, x) {

        const y = obtenirYNota(nota);

        // ----------------------------------------------------
        // LÍNIES ADDICIONALS INFERIORS
        // ----------------------------------------------------

        if (y >= yLiniaInferior + 20) {

            for (
                let liniaY = yLiniaInferior + 20;
                liniaY <= y;
                liniaY += 20
            ) {

                afegirLinia(
                    x - 20,
                    liniaY,
                    x + 20,
                    liniaY
                );
            }
        }

        // ----------------------------------------------------
        // LÍNIES ADDICIONALS SUPERIORS
        // ----------------------------------------------------

        const yLiniaSuperior =
            yLiniaInferior - 80;

        if (y <= yLiniaSuperior - 20) {

            for (
                let liniaY = yLiniaSuperior - 20;
                liniaY >= y;
                liniaY -= 20
            ) {

                afegirLinia(
                    x - 20,
                    liniaY,
                    x + 20,
                    liniaY
                );
            }
        }

        // ----------------------------------------------------
        // CAP DE NOTA
        // ----------------------------------------------------

        const cap = document.createElementNS(
            svgNS,
            "ellipse"
        );

        cap.setAttribute("cx", x);
        cap.setAttribute("cy", y);

        cap.setAttribute("rx", 13);
        cap.setAttribute("ry", 9);

        cap.setAttribute(
            "fill",
            "currentColor"
        );

        cap.setAttribute(
            "transform",
            `rotate(-20 ${x} ${y})`
        );

        svg.appendChild(cap);

        // ----------------------------------------------------
        // PLICA
        // ----------------------------------------------------

        const plicaAmunt = y >= 130;

        const xPlica =
            plicaAmunt ? x + 12 : x - 12;

        const yFinal =
            plicaAmunt ? y - 65 : y + 65;

        afegirLinia(
            xPlica,
            y,
            xPlica,
            yFinal,
            2
        );
    }

    // ========================================================
    // DIBUIXAR LES DUES NOTES
    // ========================================================

    dibuixarNota(nota1, 210);
    dibuixarNota(nota2, 310);

    // ========================================================
    // MOSTRAR PENTAGRAMA
    // ========================================================

    contenidor.replaceChildren(svg);
}


// ============================================================
// CREAR BOTONS DE DISTÀNCIA
// ============================================================

function crearBotonsDistancies() {

    const contenidor =
        document.getElementById(
            "opcions-distancies"
        );


    if (
        !contenidor
    ) {

        return;
    }


    contenidor.innerHTML = "";


    const disponibles =
        configuracioIntervals.distanciesDisponibles;


    DISTANCIES_INTERVALS.forEach(
        distancia => {

            const boto =
                document.createElement(
                    "button"
                );


            boto.type = "button";

            boto.className =
                "opcio-interval opcio-distancia";


            boto.textContent =
                distancia.text;


            boto.dataset.semitons =
                distancia.semitons;


            const disponible =
                disponibles.includes(
                    distancia.semitons
                );


            if (
                !disponible
            ) {

                boto.disabled = true;

                boto.classList.add(
                    "opcio-bloquejada"
                );

            }


            boto.addEventListener(
                "click",
                () => {

                    seleccionarDistancia(
                        distancia.semitons
                    );

                }
            );


            contenidor.appendChild(
                boto
            );

        }
    );

}


// ============================================================
// CREAR BOTONS D'INTERVAL
// ============================================================

function crearBotonsIntervals() {

    const contenidor =
        document.getElementById(
            "opcions-intervals"
        );


    if (
        !contenidor
    ) {

        return;
    }


    contenidor.innerHTML = "";


    const disponibles =
        configuracioIntervals.intervalsDisponibles;


    TIPUS_INTERVALS.forEach(
        interval => {

            const boto =
                document.createElement(
                    "button"
                );


            boto.type = "button";

            boto.className =
                "opcio-interval opcio-tipus-interval";


            boto.textContent =
                interval.id;


            boto.title =
                interval.nom;


            boto.dataset.interval =
                interval.id;


            const disponible =
                disponibles.includes(
                    interval.id
                );


            if (
                !disponible
            ) {

                boto.disabled = true;

                boto.classList.add(
                    "opcio-bloquejada"
                );

            }


            boto.addEventListener(
                "click",
                () => {

                    seleccionarInterval(
                        interval.id
                    );

                }
            );


            contenidor.appendChild(
                boto
            );

        }
    );

}


// ============================================================
// SELECCIONAR DISTÀNCIA
// ============================================================

function seleccionarDistancia(
    semitons
) {

    if (
        preguntaComprovada
    ) {

        return;
    }


    respostaDistancia =
        semitons;


    document.querySelectorAll(
        "#opcions-distancies .opcio-distancia"
    ).forEach(
        boto => {

            boto.classList.toggle(
                "seleccionada",
                Number(
                    boto.dataset.semitons
                ) === semitons
            );

        }
    );


    actualitzarBotoComprovar();

}


// ============================================================
// SELECCIONAR INTERVAL
// ============================================================

function seleccionarInterval(
    idInterval
) {

    if (
        preguntaComprovada
    ) {

        return;
    }


    respostaInterval =
        idInterval;


    document.querySelectorAll(
        "#opcions-intervals .opcio-tipus-interval"
    ).forEach(
        boto => {

            boto.classList.toggle(
                "seleccionada",
                boto.dataset.interval ===
                    idInterval
            );

        }
    );


    actualitzarBotoComprovar();

}


// ============================================================
// ACTUALITZAR BOTÓ COMPROVAR
// ============================================================

function actualitzarBotoComprovar() {

    const boto =
        document.getElementById(
            "boto-comprovar"
        );


    if (
        !boto
    ) {

        return;
    }


    boto.disabled =
        respostaDistancia === null ||
        respostaInterval === null ||
        preguntaComprovada;

}


// ============================================================
// MOSTRAR PREGUNTA
// ============================================================

function mostrarPreguntaIntervals() {

    const pregunta = preguntesIntervals[preguntaActualIntervals];

    if (!pregunta) {
        mostrarResultatFinalIntervals();
        return;
    }

    // ========================================================
    // REINICIAR RESPOSTES
    // ========================================================

    respostaDistancia = null;
    respostaInterval = null;

    preguntaComprovada = false;

    // ========================================================
    // PROGRÉS
    // ========================================================

    const indicador = document.getElementById("pregunta-actual");

    if (indicador) {
        indicador.textContent = preguntaActualIntervals + 1;
    }

    const total = document.getElementById("total-preguntes");

    if (total) {
        total.textContent = preguntesIntervals.length;
    }

    // ========================================================
    // PENTAGRAMA
    // ========================================================

    dibuixarPentagramaIntervals(
        pregunta.nota1,
        pregunta.nota2
    );

    // ========================================================
    // RECREAR BOTONS
    // ========================================================

    crearBotonsDistancies();
    crearBotonsIntervals();

    // ========================================================
    // NETEJAR FEEDBACK
    // ========================================================

    const feedback = document.getElementById("feedback");

    if (feedback) {

        feedback.textContent = "";
        feedback.className = "feedback";
    }

    // ========================================================
    // RESTABLIR BOTÓ COMPROVAR
    // ========================================================

    const boto = document.getElementById("boto-comprovar");

    if (boto) {

        boto.textContent = "Comprovar";

        boto.disabled = true;

        boto.onclick = comprovarRespostaIntervals;
    }
}


// ============================================================
// COMPROVAR RESPOSTES
// ============================================================

function comprovarRespostaIntervals() {

    if (
        preguntaComprovada
    ) {

        return;
    }


    if (
        respostaDistancia === null ||
        respostaInterval === null
    ) {

        return;
    }


    const pregunta =
        preguntesIntervals[
            preguntaActualIntervals
        ];


    if (
        !pregunta
    ) {

        return;
    }


    preguntaComprovada = true;


    // =========================
    // COMPROVAR DISTÀNCIA
    // =========================

    const distanciaCorrecta =
        respostaDistancia ===
        pregunta.semitons;


    // =========================
    // COMPROVAR INTERVAL
    // =========================

    const intervalCorrecte =
        respostaInterval ===
        pregunta.interval.id;


    // =========================
    // ENCERT COMPLET
    // =========================

    const encert =
        distanciaCorrecta &&
        intervalCorrecte;


    if (
        encert
    ) {

        encertsIntervals++;

    }


    // =========================
    // MARCAR BOTONS
    // =========================

    document.querySelectorAll(
        "#opcions-distancies button"
    ).forEach(
        boto => {

            if (
                Number(
                    boto.dataset.semitons
                ) === pregunta.semitons
            ) {

                boto.classList.add(
                    "correcta"
                );

            } else if (
                Number(
                    boto.dataset.semitons
                ) === respostaDistancia
            ) {

                boto.classList.add(
                    "incorrecta"
                );

            }


            boto.disabled = true;

        }
    );


    document.querySelectorAll(
        "#opcions-intervals button"
    ).forEach(
        boto => {

            if (
                boto.dataset.interval ===
                pregunta.interval.id
            ) {

                boto.classList.add(
                    "correcta"
                );

            } else if (
                boto.dataset.interval ===
                respostaInterval
            ) {

                boto.classList.add(
                    "incorrecta"
                );

            }


            boto.disabled = true;

        }
    );


    // =========================
    // FEEDBACK
    // =========================

    const feedback =
        document.getElementById(
            "feedback"
        );


    const distancia =
        obtenirDistanciaInterval(
            pregunta.semitons
        );


    const nomNota1 =
        obtenirNomNotaInterval(
            pregunta.nota1
        );


    const nomNota2 =
        obtenirNomNotaInterval(
            pregunta.nota2
        );


    if (
        feedback
    ) {

        feedback.className =
            encert
                ? "feedback correcte"
                : "feedback incorrecte";


        feedback.textContent =
            encert

                ? (
                    "Correcte! Entre " +
                    nomNota1 +
                    " i " +
                    nomNota2 +
                    " hi ha " +
                    distancia.text +
                    ". Formen una " +
                    pregunta.interval.nom.toLowerCase() +
                    " (" +
                    pregunta.interval.id +
                    ")."
                )

                : (
                    "La distància entre " +
                    nomNota1 +
                    " i " +
                    nomNota2 +
                    " és de " +
                    distancia.text +
                    ". Formen una " +
                    pregunta.interval.nom.toLowerCase() +
                    " (" +
                    pregunta.interval.id +
                    ")."
                );

    }


    // ============================================================
    // AVANÇAR AUTOMÀTICAMENT DESPRÉS DE COMPROVAR
    // ============================================================
    
    const boto =
        document.getElementById(
            "boto-comprovar"
        );
    
    // Bloquegem el botó mentre es mostra el resultat.
    
    if (boto) {
    
        boto.disabled = true;
    
        boto.textContent = "Comprovat";
    
    }
    
    // Esperem 1,5 segons perquè l'alumne
    // pugui veure si ha encertat o no.
    
    setTimeout(() => {
    
        avancarPreguntaIntervals();
    
    }, 1500);

}


// ============================================================
// AVANÇAR PREGUNTA
// ============================================================

function avancarPreguntaIntervals() {

    // ========================================================
    // EVITAR AVANÇAR SENSE COMPROVAR
    // ========================================================

    if (!preguntaComprovada) {
        return;
    }

    // ========================================================
    // AVANÇAR
    // ========================================================

    preguntaActualIntervals++;

    // ========================================================
    // FINAL DE L'EXERCICI
    // ========================================================

    if (preguntaActualIntervals >= preguntesIntervals.length) {

        mostrarResultatFinalIntervals();

        return;
    }

    // ========================================================
    // MOSTRAR SEGÜENT PREGUNTA
    // ========================================================

    mostrarPreguntaIntervals();
}

// ============================================================
// MOSTRAR RESULTAT FINAL D'INTERVALS
// ============================================================

function mostrarResultatFinalIntervals() {

    // =========================
    // CALCULAR RESULTAT
    // =========================

    const total =
        preguntesIntervals.length;

    const encerts =
        encertsIntervals;

    const percentatge =
        total > 0
            ? Math.round(
                (encerts / total) * 100
            )
            : 0;


    // =========================
    // REGISTRAR RESULTAT I XP
    // =========================

    mostrarResultatFinalExercici({

        idExercici:
            configuracioIntervals.id,

        encerts:
            encerts,

        total:
            total,

        percentatge:
            percentatge,

        nomCategoria:
            "Intervals",

        urlFinal:
            "../../exercicis.html"

    });

}


// ============================================================
// INICIAR EXERCICI
// ============================================================

function iniciarExerciciIntervals(
    configuracio
) {

    configuracioIntervals =
        configuracio;


    preguntaActualIntervals = 0;

    encertsIntervals = 0;


    // =========================
    // GENERAR PREGUNTES
    // =========================

    preguntesIntervals =
        generarPreguntesIntervals();


    // =========================
    // CREAR OPCIONS
    // =========================

    crearBotonsDistancies();

    crearBotonsIntervals();


    // =========================
    // CONFIGURAR BOTÓ
    // =========================

    const boto =
        document.getElementById(
            "boto-comprovar"
        );


    if (
        boto
    ) {

        boto.onclick =
            comprovarRespostaIntervals;

    }


    // =========================
    // MOSTRAR PRIMERA PREGUNTA
    // =========================

    mostrarPreguntaIntervals();

}
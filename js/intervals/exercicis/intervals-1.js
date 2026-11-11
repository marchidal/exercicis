// ============================================================
// INTERVALS 1
// ============================================================
//
// Reconeixement de segones menors i majors.
//
// L'alumne ha de respondre:
//
// 1. Quina distància hi ha entre les dues notes?
// 2. Quin interval formen?
//
// ============================================================


const configuracioIntervals1 = {

    // =========================
    // IDENTIFICADOR
    // =========================

    id: "intervals-1",

    // =========================
    // REGISTRE DE NOTES
    // =========================
    
    notaMinima: "C3",
    notaMaxima: "C4",

    // =========================
    // INTERVALS DISPONIBLES
    // =========================

    // Només segones menors i majors.
    // La resta d'intervals apareixeran
    // bloquejats a la pantalla.

    intervalsDisponibles: [

        "2m",
        "2M"

    ],


    // =========================
    // DISTÀNCIES DISPONIBLES
    // =========================

    // Les distàncies s'expressen
    // internament en semitons.
    //
    // 1 semitò = mig to
    // 2 semitons = un to

    distanciesDisponibles: [

        1,
        2

    ],


    // =========================
    // MOVIMENT DE LES NOTES
    // =========================

    // En aquest primer exercici,
    // les notes apareixen sempre
    // en sentit ascendent.
    //
    // Opcions del motor:
    //
    // "ascendent"
    // "descendent"
    // "mixt"

    alteracions: "sense",
    moviment: "mixt",


    // =========================
    // NOMBRE DE PREGUNTES
    // =========================

    totalPreguntes: 8,


    // =========================
    // REPARTIMENT D'INTERVALS
    // =========================

    // Garantim que apareguin
    // tantes segones menors
    // com segones majors.
    //
    // L'ordre serà aleatori.

    preguntesPerInterval: {

        "2m": 5,
        "2M": 5

    }

};


// ============================================================
// INICIAR EXERCICI
// ============================================================

iniciarExerciciIntervals(
    configuracioIntervals1
);
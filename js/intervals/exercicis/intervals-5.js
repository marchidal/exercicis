// ============================================================
// INTERVALS 4
// QUARTES I QUINTES
// ============================================================

const configuracioIntervals5 = {

    id: "intervals-5",

    // ========================================================
    // REGISTRE DE LES NOTES
    // ========================================================

    // El registre arriba fins a Fa4 per permetre
    // generar la quinta disminuïda Si3 - Fa4.

    notaMinima: "C3",
    notaMaxima: "F4",

    // ========================================================
    // INTERVALS DISPONIBLES
    // ========================================================

    intervalsDisponibles: [
        "2m",
        "2M",
        "3m",
        "3M",
        "4J",
        "4aug",
        "5dis",
        "5J"
    ],

    // ========================================================
    // DISTÀNCIES DISPONIBLES (EN SEMITONS)
    // ========================================================

    distanciesDisponibles: [
        1,
        2,
        3,
        4,
        5,  // 2½ tons
        6,  // 3 tons
        7   // 3½ tons
    ],

    // ========================================================
    // CONFIGURACIÓ DE LES ALTERACIONS
    // ========================================================

    // alteracions: "sense",
    // alteracions: "amb",
    // alteracions: "mixt",

    alteracions: "sense",

    // ========================================================
    // MOVIMENT DE LES NOTES
    // ========================================================

    alteracions: "sense",
    moviment: "mixt",

    // ========================================================
    // NOMBRE TOTAL DE PREGUNTES
    // ========================================================

    totalPreguntes: 14,

    // ========================================================
    // REPARTIMENT EQUILIBRAT
    // ========================================================

    preguntesPerInterval: {
        "2m": 2,
        "2M": 2,
        "3m": 2,
        "3M": 2,
        "4J": 2,
        "4aug": 2,
        "5dis": 2,
        "5J": 2
    }

};

// ============================================================
// INICIAR EXERCICI
// ============================================================

iniciarExerciciIntervals(configuracioIntervals5);

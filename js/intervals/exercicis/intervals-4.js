// ============================================================
// INTERVALS 4
// QUARTES I QUINTES
// ============================================================

const configuracioIntervals4 = {

    id: "intervals-4",

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
        "4J",
        "4aug",
        "5dis",
        "5J"
    ],

    // ========================================================
    // DISTÀNCIES DISPONIBLES (EN SEMITONS)
    // ========================================================

    distanciesDisponibles: [
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
    moviment: "mixt",

    // ========================================================
    // MOVIMENT DE LES NOTES
    // ========================================================

    moviment: "ascendent",

    // ========================================================
    // NOMBRE TOTAL DE PREGUNTES
    // ========================================================

    totalPreguntes: 12,

    // ========================================================
    // REPARTIMENT EQUILIBRAT
    // ========================================================

    preguntesPerInterval: {
        "4J": 3,
        "4aug": 3,
        "5dis": 3,
        "5J": 3
    }

};

// ============================================================
// INICIAR EXERCICI
// ============================================================

iniciarExerciciIntervals(configuracioIntervals4);

// ============================================================
// INTERVALS 3
// REPÀS DE SEGONES I TERCERES
// ============================================================

const configuracioIntervals3 = {

    id: "intervals-3",

    // Registre de les notes
    notaMinima: "C3",
    notaMaxima: "C4",

    // Intervals disponibles
    intervalsDisponibles: [
        "2m",
        "2M",
        "3m",
        "3M"
    ],

    // Distàncies disponibles (en semitons)
    distanciesDisponibles: [
        1,
        2,
        3,
        4
    ],

    // Moviment de les notes
    alteracions: "sense",
    moviment: "mixt",

    // Nombre total de preguntes
    totalPreguntes: 8,

    // Repartiment equilibrat
    preguntesPerInterval: {
        "2m": 3,
        "2M": 3,
        "3m": 3,
        "3M": 3
    }

};

// ============================================================
// INICIAR EXERCICI
// ============================================================

iniciarExerciciIntervals(configuracioIntervals3);
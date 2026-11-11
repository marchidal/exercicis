// ============================================================
// INTERVALS 2
// TERCERES MENORS I MAJORS
// ============================================================

const configuracioIntervals2 = {

    id: "intervals-2",

    // =========================
    // REGISTRE DE NOTES
    // =========================

    notaMinima: "C3",
    notaMaxima: "C4",

    // =========================
    // INTERVALS DISPONIBLES
    // =========================

    intervalsDisponibles: [
        "3m",
        "3M"
    ],

    // =========================
    // DISTÀNCIES DISPONIBLES
    // =========================

    distanciesDisponibles: [
        3,
        4
    ],

    // =========================
    // MOVIMENT
    // =========================

    alteracions: "sense",
    moviment: "mixt",

    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 8,

    preguntesPerInterval: {
        "3m": 5,
        "3M": 5
    }

};


// ============================================================
// INICIAR EXERCICI
// ============================================================

iniciarExerciciIntervals(
    configuracioIntervals2
);
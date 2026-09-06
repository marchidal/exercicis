const configuracioLlenguatge7 = {

    id: "llenguatge-7",


    // =========================
    // COMPASSOS DISPONIBLES
    // =========================

    compassosDisponibles: [
        "2/4",
        "3/4",
        "4/4"
    ],


    // =========================
    // PATRONS D'ACCENTUACIÓ
    // =========================

    patronsAccentuacio: {

        "2/4": [
            "fort",
            "debil"
        ],

        "3/4": [
            "fort",
            "debil",
            "debil"
        ],

        "4/4": [
            "fort",
            "debil",
            "semifort",
            "debil"
        ]

    },


    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 10

};


// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciAccentsMetrics(
    configuracioLlenguatge7
);
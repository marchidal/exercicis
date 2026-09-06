const configuracioLlenguatge8 = {

    id: "llenguatge-8",


    // =========================
    // COMPASSOS DISPONIBLES
    // =========================

    compassosDisponibles: [
        "2/4",
        "3/4",
        "4/4"
    ],


    // =========================
    // FIGURES DISPONIBLES
    // =========================

    figuresDisponibles: [

        {
            id: "redonda",
            nom: "redonda",
            simbol: "𝅝",
            valor: 4
        },

        {
            id: "blanca",
            nom: "blanca",
            simbol: "𝅗𝅥",
            valor: 2
        },

        {
            id: "negra",
            nom: "negra",
            simbol: "𝅘𝅥",
            valor: 1
        },

        {
            id: "corxera",
            nom: "corxera",
            simbol: "𝅘𝅥𝅮",
            valor: 0.5
        },

        {
            id: "semicorxera",
            nom: "semicorxera",
            simbol: "𝅘𝅥𝅯",
            valor: 0.25
        }

    ],


    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 8

};


// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciAccentsMetricsRitmics(
    configuracioLlenguatge8
);
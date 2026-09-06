const configuracioLlenguatge5 = {

    id: "llenguatge-5",


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

    totalPreguntes: 10

};


// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciIdentificarCompas(
    configuracioLlenguatge5
);
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
    // REGLES DE GENERACIÓ
    // =========================

    // Cap figura o patró pot travessar
    // una pulsació del compàs.

    senseSincopes: true,


    // Les semicorxeres només apareixen
    // dins de patrons d'una pulsació.

    patronsSemicorxeres: true,


    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 10

};


// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciMarcarPulsacions(
    configuracioLlenguatge7
);
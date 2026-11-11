const configuracioLlenguatge8 = {

    id: "pulsacio-3",


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
        }

    ],


    // =========================
    // REGLES DE GENERACIÓ
    // =========================

    // Aquí sí permetem síncopes.

    senseSincopes: false,


    // No utilitzem semicorxeres.

    patronsSemicorxeres: false,


    // Nombre mínim de figures
    // que han de començar exactament
    // sobre una pulsació del metrònom.

    minimPulsacions: {

        "2/4": 1,

        "3/4": 2,

        "4/4": 2

    },



    // =========================
    // SÍNCOPES OBLIGATÒRIES
    // =========================
    
    preguntesAmbSincopa: 4,


    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 10

};


// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciMarcarPulsacions(
    configuracioLlenguatge8
);
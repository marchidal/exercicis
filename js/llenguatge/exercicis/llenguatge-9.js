const configuracioLlenguatge9 = {

    id: "llenguatge-9",


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

    // En aquest exercici
    // sí que permetem síncopes.

    senseSincopes: false,


    // Les semicorxeres només poden
    // aparèixer en patrons controlats.

    patronsSemicorxeres: true,


    // Patrons permesos:
    //
    // 16 + 16 + 16 + 16
    // 8  + 16 + 16
    // 16 + 16 + 8
    // 16 + 8  + 16

    patronsSemicorxeresPermesos: [

        [
            "semicorxera",
            "semicorxera",
            "semicorxera",
            "semicorxera"
        ],

        [
            "corxera",
            "semicorxera",
            "semicorxera"
        ],

        [
            "semicorxera",
            "semicorxera",
            "corxera"
        ],

        [
            "semicorxera",
            "corxera",
            "semicorxera"
        ]

    ],


    // =========================
    // MÍNIM DE PULSACIONS
    // =========================

    minimPulsacions: {

        "2/4": 1,

        "3/4": 2,

        "4/4": 2

    },


    // =========================
    // SÍNCOPES OBLIGATÒRIES
    // =========================
    
    preguntesAmbSincopa: 5,

    
    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 10

};


// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciMarcarPulsacions(
    configuracioLlenguatge9
);
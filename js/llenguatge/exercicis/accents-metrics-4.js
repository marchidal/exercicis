// =========================
// ACCENTS MÈTRICS 1
// CONFIGURACIÓ DE L'EXERCICI
// =========================

const configuracioAccentsMetrics4 = {

    id: "accents-metrics-4",


    // =========================
    // COMPASSOS DISPONIBLES
    // =========================

    compassosDisponibles: [
        "3/4",
        "4/4"
    ],


    // =========================
    // FIGURES DISPONIBLES
    // =========================

    figuresDisponibles: [

        {
            id: "blanca",
            nom: "Blanca",
            simbol: "𝅗𝅥",
            valor: 2
        },

        {
            id: "negra",
            nom: "Negra",
            simbol: "𝅘𝅥",
            valor: 1
        },

        {
            id: "corxera",
            nom: "Corxera",
            simbol: "𝅘𝅥𝅮",
            valor: 0.5
        },

        {
            id: "semicorxera",
            simbol: "𝅘𝅥𝅯",
            valor: 0.25
        }
    ],


    // =========================
    // CONTROL DE SÍNCOPES
    // =========================

    senseSincopes: false,

    // =========================
    // PATRONS DE SEMICORXERES
    // =========================
    
    patronsSemicorxeres: true,

    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 10,
    
    preguntesAmbSincopa: 4

};


// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciAccentsMetricsRitmics(
    configuracioAccentsMetrics4
);
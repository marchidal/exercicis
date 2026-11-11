// =========================
// ACCENTS MÈTRICS 1
// CONFIGURACIÓ DE L'EXERCICI
// =========================

const configuracioAccentsMetrics3 = {

    id: "accents-metrics-3",


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
        }

    ],


    // =========================
    // CONTROL DE SÍNCOPES
    // =========================

    senseSincopes: false,

    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 10,
    
    preguntesAmbSincopa: 7

};


// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciAccentsMetricsRitmics(
    configuracioAccentsMetrics3
);
// =========================
// NOTES 19 - CLAU DE FA
// =========================

const configuracioNotes = {

    id: "notes-19",

    // Clau musical
    clau: "fa",

    // =========================
    // EQUIVALÈNCIES
    // =========================

    equivalencies: [],

    // =========================
    // NOTES AL PENTAGRAMA
    // =========================

    notesPentagrama: [
        {
            nom: "do",
            alternatives: ["do", "c"],
            posicio: 2.5,
            pes: 3
        },
        {
            nom: "mi",
            alternatives: ["mi", "e"],
            posicio: 3.5,
            pes: 3
        },

        {
            nom: "la",
            alternatives: ["la", "a"],
            posicio: 5,
            pes: 4
        }
    ]

};

// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciNotes(configuracioNotes);
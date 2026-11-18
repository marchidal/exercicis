// =========================
// NOTES 20 - CLAU DE FA
// =========================

const configuracioNotes = {

    id: "notes-20",

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
            pes: 2
        },
        {
            nom: "mi",
            alternatives: ["mi", "e"],
            posicio: 3.5,
            pes: 2
        },

        {
            nom: "la",
            alternatives: ["la", "a"],
            posicio: 5,
            pes: 3
        },

        {
            nom: "re",
            alternatives: ["re", "d"],
            posicio: 3,
            pes: 4
        },
    ]

};

// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciNotes(configuracioNotes);
// =========================
// NOTES 24 - CLAU DE FA
// =========================

const configuracioNotes = {

    id: "notes-24",

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
            pes: 2
        },

        {
            nom: "re",
            alternatives: ["re", "d"],
            posicio: 3,
            pes: 3
        },

        {
            nom: "sol",
            alternatives: ["sol", "g"],
            posicio: 4.5,
            pes: 4
        },

        {
            nom: "do",
            alternatives: ["do", "c"],
            posicio: 6,
            liniaAddicional: true,
            pes: 4
        },

        {
            nom: "fa",
            alternatives: ["fa", "f"],
            posicio: 4,
            pes: 4
        },

        {
            nom: "si",
            alternatives: ["si", "b"],
            posicio: 5.5,
            pes: 3
        },
    ]

};

// =========================
// INICIAR EXERCICI
// =========================

iniciarExerciciNotes(configuracioNotes);
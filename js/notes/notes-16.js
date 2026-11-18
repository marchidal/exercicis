const configuracioNotes = {

    id: "notes-16",


    // =========================
    // EQUIVALÈNCIES
    // =========================

    equivalencies: [

        // Repàs

        {
            pregunta: "Do = ?",
            resposta: "c",
            pes: 1
        },

        {
            pregunta: "Re = ?",
            resposta: "d",
            pes: 1
        },

        {
            pregunta: "Mi = ?",
            resposta: "e",
            pes: 1
        },

        {
            pregunta: "Fa = ?",
            resposta: "f",
            pes: 1
        },

        {
            pregunta: "Sol = ?",
            resposta: "g",
            pes: 1
        },

        {
            pregunta: "La = ?",
            resposta: "a",
            pes: 1
        },

        {
            pregunta: "Si = ?",
            resposta: "b",
            pes: 1
        }

    ],


    // =========================
    // NOTES DEL PENTAGRAMA
    // =========================

    notesPentagrama: [

        // =========================
        // REPÀS: DO3 - SOL4
        // =========================

        {
            nom: "do",
            alternatives: ["do", "c"],
            posicio: 3.5,
            pes: 1
        },

        {
            nom: "re",
            alternatives: ["re", "d"],
            posicio: 4,
            pes: 1
        },

        {
            nom: "mi",
            alternatives: ["mi", "e"],
            posicio: 4.5,
            pes: 1
        },

        {
            nom: "fa",
            alternatives: ["fa", "f"],
            posicio: 5,
            pes: 1
        },

        {
            nom: "sol",
            alternatives: ["sol", "g"],
            posicio: 5.5,
            pes: 1
        },
        
        {
            nom: "la",
            alternatives: ["la", "a"],
            posicio: 6,
            liniaAddicional: true,
            pes: 1
        },

        {
            nom: "si",
            alternatives: ["si", "b"],
            posicio: -0.5,
            liniaAddicional: true,
            pes: 1
        },

        {
            nom: "la",
            alternatives: ["la", "a"],
            posicio: -1,
            liniaAddicional: true,
            pes: 1
        },

        {
            nom: "sol",
            alternatives: ["sol", "g"],
            posicio: -1.5,
            liniaAddicional: true,
            pes: 1
        },

        // =========================
        // NOTA NOVA: FA2
        // =========================

        {
            nom: "fa",
            alternatives: ["fa", "f"],
            posicio: -2,
            liniaAddicional: true,
            pes: 3
        }
        
    ]
};


iniciarExerciciNotes(
    configuracioNotes
);
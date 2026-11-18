const configuracioNotes = {

    id: "notes-17",


    // =========================
    // EQUIVALÈNCIES
    // =========================

    equivalencies: [

        // Repàs

        {
            pregunta: "C = ?",
            resposta: "do",
            pes: 1
        },

        {
            pregunta: "D = ?",
            resposta: "re",
            pes: 1
        },

        {
            pregunta: "E = ?",
            resposta: "mi",
            pes: 1
        },

        {
            pregunta: "F = ?",
            resposta: "fa",
            pes: 1
        },

        {
            pregunta: "G = ?",
            resposta: "sol",
            pes: 1
        },

        {
            pregunta: "A = ?",
            resposta: "la",
            pes: 1
        },

        {
            pregunta: "B = ?",
            resposta: "si",
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

        {
            nom: "fa",
            alternatives: ["fa", "f"],
            posicio: -2,
            liniaAddicional: true,
            pes: 1
        },

        // =========================
        // NOTA NOVA: Mi 2
        // =========================        
        
        {
            nom: "mi",
            alternatives: ["mi", "e"],
            posicio: -2.5,
            liniaAddicional: true,
            pes: 3
        },
    ]
};


iniciarExerciciNotes(
    configuracioNotes
);
const configuracioNotes = {

    id: "notes-7",


    // =========================
    // EQUIVALÈNCIES
    // =========================

    equivalencies: [

        // Nota nova: Si / B

        {
            pregunta: "B = ?",
            resposta: "si",
            pes: 3
        },

        {
            pregunta: "Si = ?",
            resposta: "b",
            pes: 3
        },


        // Repàs

        {
            pregunta: "C = ?",
            resposta: "do",
            pes: 1
        },

        {
            pregunta: "Do = ?",
            resposta: "c",
            pes: 1
        },

        {
            pregunta: "D = ?",
            resposta: "re",
            pes: 1
        },

        {
            pregunta: "Re = ?",
            resposta: "d",
            pes: 1
        },

        {
            pregunta: "E = ?",
            resposta: "mi",
            pes: 1
        },

        {
            pregunta: "Mi = ?",
            resposta: "e",
            pes: 1
        },

        {
            pregunta: "F = ?",
            resposta: "fa",
            pes: 1
        },

        {
            pregunta: "Fa = ?",
            resposta: "f",
            pes: 1
        },

        {
            pregunta: "G = ?",
            resposta: "sol",
            pes: 1
        },

        {
            pregunta: "Sol = ?",
            resposta: "g",
            pes: 1
        },

        {
            pregunta: "A = ?",
            resposta: "la",
            pes: 1
        },

        {
            pregunta: "La = ?",
            resposta: "a",
            pes: 1
        }

    ],


    // =========================
    // NOTES DEL PENTAGRAMA
    // =========================

    notesPentagrama: [

        // Repàs

        {
            nom: "do",
            alternatives: ["do", "c"],
            posicio: 0,
            liniaAddicional: true,
            pes: 1
        },

        {
            nom: "re",
            alternatives: ["re", "d"],
            posicio: 0.5,
            pes: 1
        },

        {
            nom: "mi",
            alternatives: ["mi", "e"],
            posicio: 1,
            pes: 1
        },

        {
            nom: "fa",
            alternatives: ["fa", "f"],
            posicio: 1.5,
            pes: 1
        },

        {
            nom: "sol",
            alternatives: ["sol", "g"],
            posicio: 2,
            pes: 1
        },

        {
            nom: "la",
            alternatives: ["la", "a"],
            posicio: 2.5,
            pes: 1
        },

        {
            nom: "do",
            alternatives: ["do", "c"],
            posicio: 3.5,
            pes: 1
        },


        // =========================
        // NOTA NOVA: SI 3
        // =========================

        {
            nom: "si",
            alternatives: ["si", "b"],
            posicio: 3,
            pes: 6
        }

    ]
};


iniciarExerciciNotes(
    configuracioNotes
);
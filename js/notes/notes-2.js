const configuracioNotes = {

    id: "notes-2",


    // =========================
    // EQUIVALÈNCIES
    // =========================

    equivalencies: [

        {
            pregunta: "A = ?",
            resposta: "la",
            pes: 2
        },

        {
            pregunta: "La = ?",
            resposta: "a",
            pes: 2
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
            pregunta: "G = ?",
            resposta: "sol",
            pes: 1
        },

        {
            pregunta: "Sol = ?",
            resposta: "g",
            pes: 1
        }

    ],


    // =========================
    // NOTES DEL PENTAGRAMA
    // =========================

    notesPentagrama: [

        {
            nom: "mi",
            alternatives: [
                "mi",
                "e"
            ],
            posicio: 1,
            pes: 2
        },

        {
            nom: "sol",
            alternatives: [
                "sol",
                "g"
            ],
            posicio: 2,
            pes: 2
        },

        {
            nom: "la",
            alternatives: [
                "la",
                "a"
            ],
            posicio: 2.5,
            pes: 6
        }

    ]
};


iniciarExerciciNotes(
    configuracioNotes
);
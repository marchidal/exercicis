const configuracioNotes = {

    id: "notes-3",


    // =========================
    // EQUIVALÈNCIES
    // =========================

    equivalencies: [

        // Nota nova: Do / C

        {
            pregunta: "C = ?",
            resposta: "do",
            pes: 3
        },

        {
            pregunta: "Do = ?",
            resposta: "c",
            pes: 3
        },


        // Repàs: Mi / E

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


        // Repàs: Sol / G

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


        // Repàs: La / A

        {
            pregunta: "A = ?",
            resposta: "la",
            pes: 2
        },

        {
            pregunta: "La = ?",
            resposta: "a",
            pes: 2
        }

    ],


    // =========================
    // NOTES DEL PENTAGRAMA
    // =========================

    notesPentagrama: [

        // Repàs

        {
            nom: "mi",
            alternatives: [
                "mi",
                "e"
            ],
            posicio: 1,
            pes: 3
        },

        {
            nom: "sol",
            alternatives: [
                "sol",
                "g"
            ],
            posicio: 2,
            pes: 3
        },

        {
            nom: "la",
            alternatives: [
                "la",
                "a"
            ],
            posicio: 2.5,
            pes: 3
        },


        // Nota nova

        {
            nom: "do",
            alternatives: [
                "do",
                "c"
            ],

            posicio: -1,

            liniaAddicional: true,

            pes: 6
        }

    ]
};


iniciarExerciciNotes(
    configuracioNotes
);
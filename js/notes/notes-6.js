const configuracioNotes = {

    id: "notes-6",


    // =========================
    // EQUIVALÈNCIES
    // =========================

    equivalencies: [

        // Nota nova: Fa / F

        {
            pregunta: "F = ?",
            resposta: "fa",
            pes: 3
        },

        {
            pregunta: "Fa = ?",
            resposta: "f",
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
            alternatives: [
                "do",
                "c"
            ],
            posicio: 0,
            liniaAddicional: true,
            pes: 1
        },

        {
            nom: "re",
            alternatives: [
                "re",
                "d"
            ],
            posicio: 0.5,
            pes: 1
        },

        {
            nom: "mi",
            alternatives: [
                "mi",
                "e"
            ],
            posicio: 1,
            pes: 1
        },

        {
            nom: "sol",
            alternatives: [
                "sol",
                "g"
            ],
            posicio: 2,
            pes: 1
        },

        {
            nom: "la",
            alternatives: [
                "la",
                "a"
            ],
            posicio: 2.5,
            pes: 1
        },

        {
            nom: "do",
            alternatives: [
                "do",
                "c"
            ],
            posicio: 3.5,
            pes: 2
        },


        // =========================
        // NOTA NOVA: FA
        // =========================

        {
            nom: "fa",
            alternatives: [
                "fa",
                "f"
            ],

            // Primer espai
            posicio: 1.5,

            pes: 6
        }

    ]
};


iniciarExerciciNotes(
    configuracioNotes
);
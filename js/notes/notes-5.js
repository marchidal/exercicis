const configuracioNotes = {

    id: "notes-5",


    // =========================
    // EQUIVALÈNCIES
    // =========================

    equivalencies: [

        // Nota treballada: Do / C

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


        // Repàs

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
            alternatives: [
                "do",
                "c"
            ],
            posicio: 0,
            liniaAddicional: true,
            pes: 2
        },

        {
            nom: "re",
            alternatives: [
                "re",
                "d"
            ],
            posicio: 0.5,
            pes: 2
        },

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
            pes: 2
        },


        // Nota nova: Do 4

        {
            nom: "do",
            alternatives: [
                "do",
                "c"
            ],

            // Tercer espai del pentagrama
            posicio: 3.5,

            pes: 6
        }

    ]
};


iniciarExerciciNotes(
    configuracioNotes
);
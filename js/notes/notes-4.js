const configuracioNotes = {

    id: "notes-4",


    // =========================
    // EQUIVALÈNCIES
    // =========================

    equivalencies: [

        // Nota nova: Re / D

        {
            pregunta: "D = ?",
            resposta: "re",
            pes: 3
        },

        {
            pregunta: "Re = ?",
            resposta: "d",
            pes: 3
        },


        // Repàs

        {
            pregunta: "C = ?",
            resposta: "do",
            pes: 2
        },

        {
            pregunta: "Do = ?",
            resposta: "c",
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
            pes: 2
        },


        // Nota nova: Re

        {
            nom: "re",
            alternatives: [
                "re",
                "d"
            ],

            // Espai sota la primera línia
            posicio: 0.5,

            pes: 6
        }

    ]
};


iniciarExerciciNotes(
    configuracioNotes
);
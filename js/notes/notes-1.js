const configuracioNotes = {

    id: "notes-1",

    equivalencies: [

        {
            pregunta: "E = ?",
            resposta: "mi"
        },

        {
            pregunta: "G = ?",
            resposta: "sol"
        },

        {
            pregunta: "Mi = ?",
            resposta: "e"
        },

        {
            pregunta: "Sol = ?",
            resposta: "g"
        }

    ],

    repeticionsEquivalencies: 2,


    notesPentagrama: [

       {
           nom: "mi",
           alternatives: ["mi", "e"],
           posicio: 1
       },
       
       {
           nom: "sol",
           alternatives: ["sol", "g"],
           posicio: 2
       }

    ],

    repeticionsNotes: 4
};


iniciarExerciciNotes(
    configuracioNotes
);
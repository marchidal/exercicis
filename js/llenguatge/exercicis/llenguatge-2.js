const configuracioLlenguatge2 = {

    id: "llenguatge-2",

    figuresDisponibles: [

        {
            id: "redonda",
            nom: "redonda",
            nomPlural: "redondes",
            simbol: "𝅝",
            valor: 4
        },

        {
            id: "blanca",
            nom: "blanca",
            nomPlural: "blanques",
            simbol: "𝅗𝅥",
            valor: 2
        },

        {
            id: "negra",
            nom: "negra",
            nomPlural: "negres",
            simbol: "𝅘𝅥",
            valor: 1
        },

        {
            id: "corxera",
            nom: "corxera",
            nomPlural: "corxeres",
            simbol: "𝅘𝅥𝅮",
            valor: 0.5
        },

        {
            id: "semicorxera",
            nom: "semicorxera",
            nomPlural: "semicorxeres",
            simbol: "𝅘𝅥𝅯",
            valor: 0.25
        }

    ],

    totalPreguntes: 12
};


iniciarExerciciEquivalencies(
    configuracioLlenguatge2
);
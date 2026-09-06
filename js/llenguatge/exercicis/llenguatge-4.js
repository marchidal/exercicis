const configuracioLlenguatge4 = {

    id: "llenguatge-4",

    compas: "4/4",

    figuresDisponibles: [

        {
            id: "blanca",
            nom: "blanca",
            simbol: "𝅗𝅥",
            valor: 2
        },

        {
            id: "negra",
            nom: "negra",
            simbol: "𝅘𝅥",
            valor: 1
        },

        {
            id: "corxera",
            nom: "corxera",
            simbol: "𝅘𝅥𝅮",
            valor: 0.5
        },

        {
            id: "semicorxera",
            nom: "semicorxera",
            simbol: "𝅘𝅥𝅯",
            valor: 0.25
        }

    ],

    quantitatCompassos: 4,

    totalPreguntes: 10
};


iniciarExerciciCompasIncorrecte(
    configuracioLlenguatge4
);
const configuracioLlenguatge1 = {

    id: "llenguatge-1",

    quantitatFigures: 3,

    figuresDisponibles: [

        {
            id: "redonda",
            simbol: "𝅝",
            valor: 4
        },

        {
            id: "blanca",
            simbol: "𝅗𝅥",
            valor: 2
        },

        {
            id: "negra",
            simbol: "𝅘𝅥",
            valor: 1
        },

        {
            id: "corxera",
            simbol: "𝅘𝅥𝅮",
            valor: 0.5
        },

        {
            id: "semicorxera",
            simbol: "𝅘𝅥𝅯",
            valor: 0.25
        }

    ],

    totalPreguntes: 10
};


iniciarExerciciSumes(
    configuracioLlenguatge1
);
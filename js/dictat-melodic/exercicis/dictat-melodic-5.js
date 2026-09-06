const configuracioDictatMelodic5 = {

    id: "dictat-melodic-5",

    tipus: "intervals-harmonics",

    intervals: [
        "2m",
        "2M",
        "3M",
        "3m",
        "4J",
        "5J"
    ],

    respostes: [

        {
            valor: "dissonancia",
            text: "Dissonant"
        },

        {
            valor: "consonancia-imperfecta",
            text: "Consonant imperfecte"
        },

        {
            valor: "consonancia-perfecta",
            text: "Consonant perfecte"
        }

    ],

    preguntesPerInterval: 2
};


iniciarIntervalsHarmonics(
    configuracioDictatMelodic5
);
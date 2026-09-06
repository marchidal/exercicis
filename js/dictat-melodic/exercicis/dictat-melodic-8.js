const configuracioDictatMelodic8 = {

    id: "dictat-melodic-8",

    tipus: "intervals-harmonics",

    intervals: [
        "2m",
        "2M",
        "3m",
        "3M",
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
    configuracioDictatMelodic8
);
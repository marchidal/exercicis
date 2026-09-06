const configuracioDictatMelodic2 = {

    id: "dictat-melodic-2",

    tipus: "intervals-harmonics",

    intervals: [
        "2m",
        "3M",
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

    preguntesPerInterval: 4
};


iniciarIntervalsHarmonics(
    configuracioDictatMelodic2
);
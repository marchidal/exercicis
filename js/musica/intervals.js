// =========================
// CATÀLEG D'INTERVALS
// =========================

const INTERVALS = [

    {
        id: "uniso",
        nom: "Uníson",
        abreviatura: "U",
        semitons: 0,
        familiaHarmonica: "consonancia-perfecta"
    },

    {
        id: "2m",
        nom: "2a menor",
        abreviatura: "2m",
        semitons: 1,
        familiaHarmonica: "dissonancia"
    },

    {
        id: "2M",
        nom: "2a major",
        abreviatura: "2M",
        semitons: 2,
        familiaHarmonica: "dissonancia"
    },

    {
        id: "3m",
        nom: "3a menor",
        abreviatura: "3m",
        semitons: 3,
        familiaHarmonica: "consonancia-imperfecta"
    },

    {
        id: "3M",
        nom: "3a major",
        abreviatura: "3M",
        semitons: 4,
        familiaHarmonica: "consonancia-imperfecta"
    },

    {
        id: "4J",
        nom: "4a justa",
        abreviatura: "4J",
        semitons: 5,
        familiaHarmonica: "consonancia-perfecta"
    },

    {
        id: "trito",
        nom: "4a augmentada / 5a disminuïda",
        abreviatura: "4aug / 5dis",
        semitons: 6,
        familiaHarmonica: "dissonancia"
    },

    {
        id: "5J",
        nom: "5a justa",
        abreviatura: "5J",
        semitons: 7,
        familiaHarmonica: "consonancia-perfecta"
    },

    {
        id: "6m",
        nom: "6a menor",
        abreviatura: "6m",
        semitons: 8,
        familiaHarmonica: "consonancia-imperfecta"
    },

    {
        id: "6M",
        nom: "6a major",
        abreviatura: "6M",
        semitons: 9,
        familiaHarmonica: "consonancia-imperfecta"
    },

    {
        id: "7m",
        nom: "7a menor",
        abreviatura: "7m",
        semitons: 10,
        familiaHarmonica: "dissonancia"
    },

    {
        id: "7M",
        nom: "7a major",
        abreviatura: "7M",
        semitons: 11,
        familiaHarmonica: "dissonancia"
    },

    {
        id: "8J",
        nom: "8a justa",
        abreviatura: "8J",
        semitons: 12,
        familiaHarmonica: "consonancia-perfecta"
    }

];


// =========================
// BUSCAR INTERVAL PER ID
// =========================

function obtenirInterval(id) {

    return INTERVALS.find(
        interval => interval.id === id
    );
}


// =========================
// BUSCAR INTERVAL PER SEMITONS
// =========================

function obtenirIntervalPerSemitons(semitons) {

    return INTERVALS.find(
        interval =>
            interval.semitons === semitons
    );
}


// =========================
// INTERVALS D'UNA FAMÍLIA
// =========================

function obtenirIntervalsPerFamilia(
    familia
) {

    return INTERVALS.filter(
        interval =>
            interval.familiaHarmonica ===
            familia
    );
}


// =========================
// COMPROVAR FAMÍLIA HARMÒNICA
// =========================

function intervalPertanyFamilia(
    intervalId,
    familia
) {

    const interval =
        obtenirInterval(
            intervalId
        );

    if (!interval) {
        return false;
    }

    return (
        interval.familiaHarmonica ===
        familia
    );
}


// =========================
// INTERVAL ALEATORI
// =========================

function obtenirIntervalAleatori(
    ids
) {

    const disponibles =
        ids
            .map(
                id =>
                    obtenirInterval(id)
            )
            .filter(Boolean);


    if (
        disponibles.length === 0
    ) {
        return null;
    }


    const index =
        Math.floor(
            Math.random() *
            disponibles.length
        );


    return disponibles[index];
}
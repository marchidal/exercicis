// =========================
// SISTEMA RÍTMIC GENERAL
// =========================
//
// Llenguatge:
//
// 1    = redonda
// 2    = blanca
// 4    = negra
// 8    = corxera
// 16   = semicorxera
//
// 01   = silenci de redonda
// 02   = silenci de blanca
// 04   = silenci de negra
// 08   = silenci de corxera
// 016  = silenci de semicorxera
//
// 2.   = blanca amb puntet
// 4.   = negra amb puntet
// 8.   = corxera amb puntet
//
// Exemples de grups:
// "8 8"
// "8 16 16"
// "16 16 8"
//
// Més endavant:
// "{3: 8 8 8}"
// =========================


// =========================
// FIGURES DISPONIBLES
// =========================

const FIGURES_RITMIQUES = {

    // =========================
    // NOTES
    // =========================

    "1": {
        id: "1",
        nom: "Redonda",
        tipus: "nota",
        valor: 1,
        durada: 1,
        puntet: false
    },

    "2": {
        id: "2",
        nom: "Blanca",
        tipus: "nota",
        valor: 2,
        durada: 1 / 2,
        puntet: false
    },

    "4": {
        id: "4",
        nom: "Negra",
        tipus: "nota",
        valor: 4,
        durada: 1 / 4,
        puntet: false
    },

    "8": {
        id: "8",
        nom: "Corxera",
        tipus: "nota",
        valor: 8,
        durada: 1 / 8,
        puntet: false
    },

    "16": {
        id: "16",
        nom: "Semicorxera",
        tipus: "nota",
        valor: 16,
        durada: 1 / 16,
        puntet: false
    },


    // =========================
    // SILENCIS
    // =========================

    "01": {
        id: "01",
        nom: "Silenci de redonda",
        tipus: "silenci",
        valor: 1,
        durada: 1,
        puntet: false
    },

    "02": {
        id: "02",
        nom: "Silenci de blanca",
        tipus: "silenci",
        valor: 2,
        durada: 1 / 2,
        puntet: false
    },

    "04": {
        id: "04",
        nom: "Silenci de negra",
        tipus: "silenci",
        valor: 4,
        durada: 1 / 4,
        puntet: false
    },

    "08": {
        id: "08",
        nom: "Silenci de corxera",
        tipus: "silenci",
        valor: 8,
        durada: 1 / 8,
        puntet: false
    },

    "016": {
        id: "016",
        nom: "Silenci de semicorxera",
        tipus: "silenci",
        valor: 16,
        durada: 1 / 16,
        puntet: false
    },


    // =========================
    // FIGURES AMB PUNTET
    // =========================

    "2.": {
        id: "2.",
        nom: "Blanca amb puntet",
        tipus: "nota",
        valor: 2,
        durada: 3 / 4,
        puntet: true
    },

    "4.": {
        id: "4.",
        nom: "Negra amb puntet",
        tipus: "nota",
        valor: 4,
        durada: 3 / 8,
        puntet: true
    },

    "8.": {
        id: "8.",
        nom: "Corxera amb puntet",
        tipus: "nota",
        valor: 8,
        durada: 3 / 16,
        puntet: true
    },


    // =========================
    // SILENCIS AMB PUNTET
    // =========================

    "02.": {
        id: "02.",
        nom: "Silenci de blanca amb puntet",
        tipus: "silenci",
        valor: 2,
        durada: 3 / 4,
        puntet: true
    },

    "04.": {
        id: "04.",
        nom: "Silenci de negra amb puntet",
        tipus: "silenci",
        valor: 4,
        durada: 3 / 8,
        puntet: true
    },

    "08.": {
        id: "08.",
        nom: "Silenci de corxera amb puntet",
        tipus: "silenci",
        valor: 8,
        durada: 3 / 16,
        puntet: true
    }

};


// =========================
// OBTENIR FIGURA
// =========================

function obtenirFiguraRitmica(
    id
) {

    return (
        FIGURES_RITMIQUES[id] ??
        null
    );
}


// =========================
// COMPROVAR FIGURA
// =========================

function existeixFiguraRitmica(
    id
) {

    return Boolean(
        FIGURES_RITMIQUES[id]
    );
}


// =========================
// DURADA D'UNA FIGURA
// =========================

function obtenirDuradaFigura(
    id
) {

    const figura =
        obtenirFiguraRitmica(
            id
        );


    if (!figura) {

        console.error(
            `Figura rítmica desconeguda: ${id}`
        );

        return 0;
    }


    return figura.durada;
}


// =========================
// DURADA RESPECTE AL PULS
// =========================
//
// Exemple:
// figura = blanca
// puls = negra
//
// 1/2 ÷ 1/4 = 2 pulsos
// =========================

function obtenirDuradaEnPulsos(
    idFigura,
    idPuls = "4"
) {

    const duradaFigura =
        obtenirDuradaFigura(
            idFigura
        );

    const duradaPuls =
        obtenirDuradaFigura(
            idPuls
        );


    if (
        duradaFigura <= 0 ||
        duradaPuls <= 0
    ) {

        return 0;
    }


    return (
        duradaFigura /
        duradaPuls
    );
}


// =========================
// INTERPRETAR UN SÍMBOL
// =========================
//
// Això ens permet continuar
// utilitzant el llenguatge
// de l'antiga web.
//
// Exemples:
// "4"
// "04"
// "4."
// "08."
// =========================

function interpretarFiguraRitmica(
    text
) {

    if (
        typeof text !==
        "string"
    ) {

        return null;
    }


    const simbol =
        text.trim();


    if (!simbol) {
        return null;
    }


    const figura =
        obtenirFiguraRitmica(
            simbol
        );


    if (!figura) {

        console.warn(
            `Símbol rítmic no reconegut: ${simbol}`
        );

        return null;
    }


    return {
        ...figura
    };
}


// =========================
// INTERPRETAR UNA SEQÜÈNCIA
// =========================
//
// "8 8"
// ->
// [
//     corxera,
//     corxera
// ]
// =========================

function interpretarSequenciaRitmica(
    text
) {

    if (
        typeof text !==
        "string"
    ) {

        return [];
    }


    const contingut =
        text.trim();


    if (!contingut) {
        return [];
    }


    return contingut
        .split(/\s+/)
        .map(
            simbol =>
                interpretarFiguraRitmica(
                    simbol
                )
        )
        .filter(Boolean);
}


// =========================
// DURADA D'UNA SEQÜÈNCIA
// =========================

function obtenirDuradaSequencia(
    sequencia
) {

    let figures;


    if (
        typeof sequencia ===
        "string"
    ) {

        figures =
            interpretarSequenciaRitmica(
                sequencia
            );

    } else if (
        Array.isArray(
            sequencia
        )
    ) {

        figures =
            sequencia
                .map(
                    figura => {

                        if (
                            typeof figura ===
                            "string"
                        ) {

                            return interpretarFiguraRitmica(
                                figura
                            );
                        }


                        return figura;
                    }
                )
                .filter(Boolean);

    } else {

        return 0;
    }


    return figures.reduce(
        (
            total,
            figura
        ) => {

            return (
                total +
                figura.durada
            );

        },
        0
    );
}


// =========================
// DURADA D'UN COMPÀS
// =========================
//
// "4/4" -> 1 redonda
// "3/4" -> 3/4
// "2/4" -> 1/2
// "6/8" -> 6/8
// =========================

function obtenirDuradaCompas(
    compas
) {

    if (
        typeof compas !==
        "string"
    ) {

        return 0;
    }


    const parts =
        compas.split("/");


    if (
        parts.length !== 2
    ) {

        return 0;
    }


    const numerador =
        Number(parts[0]);

    const denominador =
        Number(parts[1]);


    if (
        !Number.isFinite(
            numerador
        ) ||
        !Number.isFinite(
            denominador
        ) ||
        numerador <= 0 ||
        denominador <= 0
    ) {

        return 0;
    }


    return (
        numerador /
        denominador
    );
}


// =========================
// COMPROVAR SI CABEN
// LES FIGURES AL COMPÀS
// =========================

function sequenciaCapAlCompas(
    sequencia,
    compas
) {

    const duradaSequencia =
        obtenirDuradaSequencia(
            sequencia
        );


    const duradaCompas =
        obtenirDuradaCompas(
            compas
        );


    const tolerancia =
        0.000001;


    return (
        Math.abs(
            duradaSequencia -
            duradaCompas
        ) <
        tolerancia
    );
}


// =========================
// COMPARAR DUES SEQÜÈNCIES
// =========================
//
// De moment la resposta ha de ser
// exactament la mateixa.
//
// ["2", "2"]
// és igual a
// ["2", "2"]
//
// però no a
// ["1"]
//
// Encara que musicalment ocupin
// el mateix temps.
// =========================

function compararSequenciesRitmiques(
    sequenciaA,
    sequenciaB
) {

    if (
        !Array.isArray(
            sequenciaA
        ) ||
        !Array.isArray(
            sequenciaB
        )
    ) {

        return false;
    }


    if (
        sequenciaA.length !==
        sequenciaB.length
    ) {

        return false;
    }


    return sequenciaA.every(
        (
            figura,
            index
        ) => {

            const idA =
                typeof figura ===
                "string"
                    ? figura
                    : figura.id;


            const figuraB =
                sequenciaB[index];


            const idB =
                typeof figuraB ===
                "string"
                    ? figuraB
                    : figuraB.id;


            return (
                idA === idB
            );
        }
    );
}
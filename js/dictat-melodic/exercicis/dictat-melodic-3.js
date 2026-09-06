// =========================
// DICTAT MELÒDIC 3
// DICTAT DE 4 NOTES
// =========================

const configuracioDictatMelodic3 = {

    id: "dictat-melodic-3",

    tipus: "dictat-melodic",


    // =========================
    // NOTES DISPONIBLES
    // =========================

    notesDisponibles: [
        "E2",
        "G2"
    ],


    // =========================
    // LONGITUD DEL DICTAT
    // =========================

    longitud: 4,


    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 6,


    // =========================
    // REPRODUCCIONS
    // =========================

    // Nombre màxim de vegades
    // que es pot escoltar cada dictat.

    maxReproduccions: 3,


    // =========================
    // RITME
    // =========================

    // Totes les notes tenen
    // la mateixa durada.
    //
    // De moment equivaldran
    // conceptualment a negres.

    separacioNotes: 1.05
};


// =========================
// INICIAR EXERCICI
// =========================

iniciarDictatMelodic(
    configuracioDictatMelodic3
);
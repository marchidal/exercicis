// =========================
// DICTAT RÍTMIC 1
// REDONDA I BLANCA
// =========================

const configuracioDictatRitmic4 = {

    id: "dictat-ritmic-4",

    tipus: "dictat-ritmic",


    // =========================
    // COMPÀS
    // =========================

    compas: "4/4",


    // =========================
    // TEMPO
    // =========================

    tempo: 60,


    // =========================
    // COMPÀS D'ENTRADA
    // =========================

    // 4 pulsacions de metrònom
    // abans de començar el dictat.

    pulsosEntrada: 4,


    // =========================
    // FIGURES DISPONIBLES
    // =========================

    patronsDisponibles: [
        "2",
        "4",
        "8 8"
    ],


    // =========================
    // LONGITUD DEL DICTAT
    // =========================

    // Dos compassos de 4/4.
    //
    // Exemples:
    //
    // | redonda | blanca blanca |
    //
    // | blanca blanca | redonda |
    //
    // | blanca blanca | blanca blanca |

    compassosPerDictat: 2,


    // =========================
    // PREGUNTES
    // =========================

    totalPreguntes: 6,


    // =========================
    // REPRODUCCIONS
    // =========================

    maxReproduccions: 6
};


// =========================
// INICIAR EXERCICI
// =========================

iniciarDictatRitmic(
    configuracioDictatRitmic4
);
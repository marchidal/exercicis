// =========================
// CATÀLEG DE NOTES MUSICALS
// =========================

const NOTES_MUSICALS = [

    // =========================
    // OCTAVA 2
    // =========================

    {
        id: "C2",
        nom: "Do2",
        nomCurt: "Do",
        lletra: "C",
        midi: 36,
        frequencia: 65.41,
        audio: "C2.wav"
    },

    {
        id: "C#2",
        nom: "Do#2",
        nomCurt: "Do#",
        lletra: "C#",
        midi: 37,
        frequencia: 69.30,
        audio: "Cs2.wav"
    },

    {
        id: "D2",
        nom: "Re2",
        nomCurt: "Re",
        lletra: "D",
        midi: 38,
        frequencia: 73.42,
        audio: "D2.wav"
    },

    {
        id: "D#2",
        nom: "Re#2",
        nomCurt: "Re#",
        lletra: "D#",
        midi: 39,
        frequencia: 77.78,
        audio: "Ds2.wav"
    },

    {
        id: "E2",
        nom: "Mi2",
        nomCurt: "Mi",
        lletra: "E",
        midi: 40,
        frequencia: 82.41,
        audio: "E2.wav"
    },

    {
        id: "F2",
        nom: "Fa2",
        nomCurt: "Fa",
        lletra: "F",
        midi: 41,
        frequencia: 87.31,
        audio: "F2.wav"
    },

    {
        id: "F#2",
        nom: "Fa#2",
        nomCurt: "Fa#",
        lletra: "F#",
        midi: 42,
        frequencia: 92.50,
        audio: "Fs2.wav"
    },

    {
        id: "G2",
        nom: "Sol2",
        nomCurt: "Sol",
        lletra: "G",
        midi: 43,
        frequencia: 98.00,
        audio: "G2.wav"
    },

    {
        id: "G#2",
        nom: "Sol#2",
        nomCurt: "Sol#",
        lletra: "G#",
        midi: 44,
        frequencia: 103.83,
        audio: "Gs2.wav"
    },

    {
        id: "A2",
        nom: "La2",
        nomCurt: "La",
        lletra: "A",
        midi: 45,
        frequencia: 110.00,
        audio: "A2.wav"
    },

    {
        id: "A#2",
        nom: "La#2",
        nomCurt: "La#",
        lletra: "A#",
        midi: 46,
        frequencia: 116.54,
        audio: "As2.wav"
    },

    {
        id: "B2",
        nom: "Si2",
        nomCurt: "Si",
        lletra: "B",
        midi: 47,
        frequencia: 123.47,
        audio: "B2.wav"
    },


    // =========================
    // OCTAVA 3
    // =========================

    {
        id: "C3",
        nom: "Do3",
        nomCurt: "Do",
        lletra: "C",
        midi: 48,
        frequencia: 130.81,
        audio: "C3.wav"
    },

    {
        id: "C#3",
        nom: "Do#3",
        nomCurt: "Do#",
        lletra: "C#",
        midi: 49,
        frequencia: 138.59,
        audio: "Cs3.wav"
    },

    {
        id: "D3",
        nom: "Re3",
        nomCurt: "Re",
        lletra: "D",
        midi: 50,
        frequencia: 146.83,
        audio: "D3.wav"
    },

    {
        id: "D#3",
        nom: "Re#3",
        nomCurt: "Re#",
        lletra: "D#",
        midi: 51,
        frequencia: 155.56,
        audio: "Ds3.wav"
    },

    {
        id: "E3",
        nom: "Mi3",
        nomCurt: "Mi",
        lletra: "E",
        midi: 52,
        frequencia: 164.81,
        audio: "E3.wav"
    },

    {
        id: "F3",
        nom: "Fa3",
        nomCurt: "Fa",
        lletra: "F",
        midi: 53,
        frequencia: 174.61,
        audio: "F3.wav"
    },

    {
        id: "F#3",
        nom: "Fa#3",
        nomCurt: "Fa#",
        lletra: "F#",
        midi: 54,
        frequencia: 185.00,
        audio: "Fs3.wav"
    },

    {
        id: "G3",
        nom: "Sol3",
        nomCurt: "Sol",
        lletra: "G",
        midi: 55,
        frequencia: 196.00,
        audio: "G3.wav"
    },

    {
        id: "G#3",
        nom: "Sol#3",
        nomCurt: "Sol#",
        lletra: "G#",
        midi: 56,
        frequencia: 207.65,
        audio: "Gs3.wav"
    },

    {
        id: "A3",
        nom: "La3",
        nomCurt: "La",
        lletra: "A",
        midi: 57,
        frequencia: 220.00,
        audio: "A3.wav"
    },

    {
        id: "A#3",
        nom: "La#3",
        nomCurt: "La#",
        lletra: "A#",
        midi: 58,
        frequencia: 233.08,
        audio: "As3.wav"
    },

    {
        id: "B3",
        nom: "Si3",
        nomCurt: "Si",
        lletra: "B",
        midi: 59,
        frequencia: 246.94,
        audio: "B3.wav"
    },


    // =========================
    // OCTAVA 4
    // =========================

    {
        id: "C4",
        nom: "Do4",
        nomCurt: "Do",
        lletra: "C",
        midi: 60,
        frequencia: 261.63,
        audio: "C4.wav"
    }

];


// =========================
// REGISTRE AUDITIU GENERAL
// =========================

const REGISTRE_AUDITIU = {
    midiMin: 36, // C2
    midiMax: 60  // C4
};


// =========================
// BUSCAR NOTA PER ID
// =========================

function obtenirNota(id) {

    return NOTES_MUSICALS.find(
        nota => nota.id === id
    );
}


// =========================
// BUSCAR NOTA PER MIDI
// =========================

function obtenirNotaPerMidi(midi) {

    return NOTES_MUSICALS.find(
        nota => nota.midi === midi
    );
}


// =========================
// OBTENIR NOTA DESPLAÇADA
// =========================

function obtenirNotaDesplacada(
    notaInicial,
    semitons
) {

    const midiFinal =
        notaInicial.midi + semitons;

    return obtenirNotaPerMidi(
        midiFinal
    );
}


// =========================
// COMPROVAR SI EXISTEIX
// =========================

function existeixNotaMidi(midi) {

    return NOTES_MUSICALS.some(
        nota => nota.midi === midi
    );
}


// =========================
// NOTES DINS D'UN REGISTRE
// =========================

function obtenirNotesEntre(
    midiMin,
    midiMax
) {

    return NOTES_MUSICALS.filter(
        nota =>
            nota.midi >= midiMin &&
            nota.midi <= midiMax
    );
}


// =========================
// NOTA ALEATÒRIA
// =========================

function obtenirNotaAleatoria(
    midiMin = REGISTRE_AUDITIU.midiMin,
    midiMax = REGISTRE_AUDITIU.midiMax
) {

    const notesDisponibles =
        obtenirNotesEntre(
            midiMin,
            midiMax
        );


    if (
        notesDisponibles.length === 0
    ) {
        return null;
    }


    const index =
        Math.floor(
            Math.random() *
            notesDisponibles.length
        );


    return notesDisponibles[index];
}
// =========================
// MOTOR D'ÀUDIO AMB SAMPLES
// =========================

let contextAudio = null;

const buffersAudio = new Map();

let samplesCarregats = false;


// =========================
// RUTA DELS SAMPLES
// =========================

const SCRIPT_AUDIO =
    document.currentScript;


const URL_AUDIO_JS =
    SCRIPT_AUDIO
        ? SCRIPT_AUDIO.src
        : window.location.href;


const RUTA_PIANO =
    new URL(
        "../../assets/audio/piano/",
        URL_AUDIO_JS
    ).href;


console.log(
    "RUTA_PIANO:",
    RUTA_PIANO
);
// =========================
// OBTENIR CONTEXT D'ÀUDIO
// =========================

function obtenirContextAudio() {

    if (!contextAudio) {

        contextAudio =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    return contextAudio;
}


// =========================
// ACTIVAR ÀUDIO
// =========================

async function activarAudio() {

    const context =
        obtenirContextAudio();


    if (
        context.state === "suspended"
    ) {

        await context.resume();
    }


    if (!samplesCarregats) {

        await carregarSamplesPiano();
    }
}


// =========================
// CARREGAR UN SAMPLE
// =========================

async function carregarSample(
    nota
) {

    const context =
        obtenirContextAudio();


    const resposta =
        await fetch(
            RUTA_PIANO +
            nota.audio
        );


    if (!resposta.ok) {

        throw new Error(
            `No s'ha pogut carregar ${nota.audio}`
        );
    }


    const arrayBuffer =
        await resposta.arrayBuffer();


    const audioBuffer =
        await context.decodeAudioData(
            arrayBuffer
        );


    buffersAudio.set(
        nota.id,
        audioBuffer
    );
}


// =========================
// CARREGAR TOTS ELS SAMPLES
// =========================

async function carregarSamplesPiano() {

    if (samplesCarregats) {
        return;
    }


    try {

        await Promise.all(
            NOTES_MUSICALS.map(
                nota =>
                    carregarSample(
                        nota
                    )
            )
        );


        samplesCarregats = true;


        console.log(
            "Samples de piano carregats."
        );

    } catch (error) {

        console.error(
            "Error carregant els samples:",
            error
        );

        throw error;
    }
}


// =========================
// CREAR FONT D'ÀUDIO
// =========================

function crearFontNota(
    nota,
    tempsInici,
    volum = 0.8,
    durada = 1
) {

    const context =
        obtenirContextAudio();


    const buffer =
        buffersAudio.get(
            nota.id
        );


    if (!buffer) {

        console.warn(
            `No hi ha buffer per a ${nota.id}`
        );

        return null;
    }


    const font =
        context.createBufferSource();


    const guany =
        context.createGain();


    font.buffer =
        buffer;


    guany.gain.setValueAtTime(
        volum,
        tempsInici
    );


    font.connect(
        guany
    );


    guany.connect(
        context.destination
    );


    return {
        font,
        guany,
        durada
    };
}


// =========================
// REPRODUIR UNA NOTA
// =========================

async function reproduirNota(
    nota,
    inici = 0,
    volum = 0.8
) {

    await activarAudio();


    const context =
        obtenirContextAudio();


    const tempsInici =
        context.currentTime +
        inici;


    const fontNota =
        crearFontNota(
            nota,
            tempsInici,
            volum
        );


    if (!fontNota) {
        return;
    }


    fontNota.font.start(
        tempsInici
    );
}


// =========================
// INTERVAL MELÒDIC
// =========================

async function reproduirIntervalMelodic(
    notaInicial,
    interval,
    direccio
) {

    if (
        !notaInicial ||
        !interval
    ) {
        return;
    }


    await activarAudio();


    let semitons =
        interval.semitons;


    // =========================
    // DIRECCIÓ
    // =========================

    if (
        direccio === "descendent"
    ) {

        semitons =
            -semitons;
    }


    if (
        direccio === "uniso"
    ) {

        semitons = 0;
    }


    // =========================
    // NOTA FINAL
    // =========================

    const notaFinal =
        obtenirNotaDesplacada(
            notaInicial,
            semitons
        );


    if (!notaFinal) {

        console.warn(
            "No existeix la nota final."
        );

        return;
    }


    const context =
        obtenirContextAudio();


    const ara =
        context.currentTime;


    // =========================
    // PRIMERA NOTA
    // =========================

    const primera =
        crearFontNota(
            notaInicial,
            ara,
            0.8
        );


    if (primera) {

        primera.font.start(
            ara,
            0,
            1
        );
    }


    // =========================
    // SEGONA NOTA
    // =========================

    // La primera dura 1 segon.
    // Deixem 0.05 segons de separació.

    const retard =
        1.05;


    const segona =
        crearFontNota(
            notaFinal,
            ara + retard,
            0.8
        );


    if (segona) {

        segona.font.start(
            ara + retard,
            0,
            1
        );
    }
}


// =========================
// INTERVAL HARMÒNIC
// =========================

async function reproduirIntervalHarmonic(
    notaInferior,
    interval
) {

    if (
        !notaInferior ||
        !interval
    ) {
        return;
    }


    await activarAudio();


    const notaSuperior =
        obtenirNotaDesplacada(
            notaInferior,
            interval.semitons
        );


    if (!notaSuperior) {

        console.warn(
            "No existeix la nota superior."
        );

        return;
    }


    const context =
        obtenirContextAudio();


    // =========================
    // AJUDA AUDITIVA
    // =========================

    const esConsonanciaImperfecta =
        interval.familiaHarmonica ===
        "consonancia-imperfecta";


    // Una mica menys de volum.

    const volum =
        esConsonanciaImperfecta
            ? 0.52
            : 0.65;


    // Una mica menys d'atac:
    // fem començar el sample uns
    // mil·lisegons més endavant.

    const offsetSample =
        esConsonanciaImperfecta
            ? 0.035
            : 0;


    // =========================
    // INICI
    // =========================

    const tempsInici =
        context.currentTime + 0.05;


    const inferior =
        crearFontNota(
            notaInferior,
            tempsInici,
            volum
        );


    const superior =
        crearFontNota(
            notaSuperior,
            tempsInici,
            volum
        );


    // =========================
    // REPRODUIR
    // =========================

    if (inferior) {

        inferior.font.start(
            tempsInici,
            offsetSample,
            1.3
        );
    }


    if (superior) {

        superior.font.start(
            tempsInici,
            offsetSample,
            1.3
        );
    }
}


// =========================
// SEQÜÈNCIA DE NOTES
// =========================

async function reproduirSequencia(
    notes,
    separacio = 1.05
) {

    if (
        !Array.isArray(notes) ||
        notes.length === 0
    ) {
        return;
    }


    await activarAudio();


    const context =
        obtenirContextAudio();


    const iniciGeneral =
        context.currentTime +
        0.05;


    notes.forEach(
        (nota, index) => {

            const tempsInici =
                iniciGeneral +
                (
                    index *
                    separacio
                );


            const fontNota =
                crearFontNota(
                    nota,
                    tempsInici,
                    0.8
                );


            if (!fontNota) {
                return;
            }


            // =========================
            // COMENÇAR NOTA
            // =========================

            fontNota.font.start(
                tempsInici
            );


            // =========================
            // ATURAR NOTA
            // =========================

            // La nota s'atura just abans
            // que comenci la següent.

            const durada =
                separacio - 0.02;


            fontNota.font.stop(
                tempsInici +
                durada
            );
        }
    );
}
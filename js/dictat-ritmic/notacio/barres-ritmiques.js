// =========================
// BARRES RÍTMIQUES
// =========================
//
// Calcula la geometria de les
// barres compartides entre
// figures curtes.
//
// Exemples:
//
// 8 8
// 16 16 16 16
// 8 16 16
// 16 16 8
// 16 8 16
//
// =========================



// =========================
// CONSTANTS DE DIBUIX
// =========================
//
// Aquestes mesures han de
// coincidir amb el CSS.
//
// =========================

const AMPLADA_FIGURA_RITMICA = 46;

const ESPAI_ENTRE_FIGURES = 8;

const POSICIO_PLICA_X = 31;

const PRIMERA_BARRA_Y = 6;

const DISTANCIA_ENTRE_BARRES = 8;

const AMPLADA_GANXO = 16;



// =========================
// OBTENIR NOMBRE DE BARRES
// =========================
//
// 8  -> 1
// 16 -> 2
// 32 -> 3
//
// =========================

function obtenirBarresNecessaries(
    simbol
) {

    if (
        !simbol ||
        simbol.type !== "note"
    ) {

        return 0;
    }


    return obtenirNombreBarresFigura(
        simbol.value
    );
}



// =========================
// CREAR LAYOUT DEL GRUP
// =========================
//
// Funció principal.
//
// Rep un array de símbols ja
// interpretats pel parser.
//
// Retorna:
//
// {
//     barres: [...],
//     figuresBarrades: Set(...)
// }
//
// =========================

function crearLayoutBarresRitmiques(
    simbols
) {

    if (!Array.isArray(simbols)) {

        throw new TypeError(
            "Els símbols del grup han de ser un array."
        );
    }



    const quantitatsBarres =
        simbols.map(
            obtenirBarresNecessaries
        );



    const segments =
        crearSegmentsBarres(
            quantitatsBarres,
            simbols
        );



    const figuresBarrades =
        obtenirFiguresBarrades(
            segments
        );



    return {

        barres:
            segments.map(
                segment =>
                    posicionarSegmentBarra(
                        segment
                    )
            ),

        figuresBarrades

    };
}



// =========================
// CREAR SEGMENTS
// =========================
//
// Analitza cada nivell
// independentment.
//
// nivell 0 = primera barra
// nivell 1 = segona barra
// nivell 2 = tercera barra
//
// =========================

function crearSegmentsBarres(
    quantitatsBarres,
    simbols
) {

    const segments = [];



    const maximBarres =
        quantitatsBarres.length > 0
            ? Math.max(
                ...quantitatsBarres
            )
            : 0;



    for (
        let nivell = 0;
        nivell < maximBarres;
        nivell++
    ) {

        const actives =
            quantitatsBarres.map(
                quantitat =>
                    quantitat > nivell
            );



        let iniciGrup = null;



        for (
            let index = 0;
            index <= actives.length;
            index++
        ) {

            const activa =
                index < actives.length
                    ? actives[index]
                    : false;



            if (
                activa &&
                iniciGrup === null
            ) {

                iniciGrup =
                    index;
            }



            if (
                !activa &&
                iniciGrup !== null
            ) {

                const finalGrup =
                    index - 1;



                afegirSegmentDelBloc(
                    segments,
                    iniciGrup,
                    finalGrup,
                    nivell,
                    quantitatsBarres,
                    simbols
                );



                iniciGrup =
                    null;
            }
        }
    }



    return segments;
}



// =========================
// AFEGIR SEGMENT D'UN BLOC
// =========================
//
// Si hi ha almenys dues
// figures consecutives,
// dibuixem una barra completa.
//
// Si només hi ha una figura
// en aquell nivell, intentem
// crear un ganxo.
//
// Exemple:
//
// 16 8 16
//
// primera barra:
//   0 -------- 2
//
// segona barra:
//
//   0 ->        <- 2
//
// =========================

function afegirSegmentDelBloc(
    segments,
    inici,
    final,
    nivell,
    quantitatsBarres,
    simbols
) {

    // =========================
    // BARRA COMPARTIDA
    // =========================

    if (
        final > inici
    ) {

        segments.push({

            tipus: "completa",

            nivell,

            inici,

            final

        });


        return;
    }



    // =========================
    // GANXO
    // =========================

    const index =
        inici;



    const direccio =
        obtenirDireccioGanxo(
            index,
            nivell,
            quantitatsBarres,
            simbols
        );



    if (!direccio) {

        return;
    }



    segments.push({

        tipus: "ganxo",

        nivell,

        inici: index,

        final: index,

        direccio

    });
}



// =========================
// DIRECCIÓ DEL GANXO
// =========================
//
// Cas típic:
//
// 16 8 16
//
// primera semicorxera:
// ganxo cap a la dreta
//
// última semicorxera:
// ganxo cap a l'esquerra
//
// =========================

function obtenirDireccioGanxo(
    index,
    nivell,
    quantitatsBarres,
    simbols
) {

    const anterior =
        index - 1;


    const seguent =
        index + 1;



    const anteriorExisteix =
        anterior >= 0;


    const seguentExisteix =
        seguent <
        quantitatsBarres.length;



    const anteriorEsNota =
        anteriorExisteix &&
        simbols[anterior] &&
        simbols[anterior].type ===
            "note";


    const seguentEsNota =
        seguentExisteix &&
        simbols[seguent] &&
        simbols[seguent].type ===
            "note";



    const anteriorTeBarraInferior =
        anteriorExisteix &&
        quantitatsBarres[anterior] >
            0;


    const seguentTeBarraInferior =
        seguentExisteix &&
        quantitatsBarres[seguent] >
            0;



    // Prioritat:
    // unir visualment cap al centre
    // del grup.

    if (
        seguentEsNota &&
        seguentTeBarraInferior
    ) {

        return "dreta";
    }



    if (
        anteriorEsNota &&
        anteriorTeBarraInferior
    ) {

        return "esquerra";
    }



    return null;
}



// =========================
// FIGURES BARRADES
// =========================
//
// Indica quines figures formen
// part d'almenys una barra.
//
// Això ens servirà per eliminar
// les banderes individuals.
//
// =========================

function obtenirFiguresBarrades(
    segments
) {

    const resultat =
        new Set();



    segments.forEach(
        segment => {

            if (
                segment.tipus ===
                "completa"
            ) {

                for (
                    let index =
                        segment.inici;

                    index <=
                    segment.final;

                    index++
                ) {

                    resultat.add(
                        index
                    );
                }

            } else {

                resultat.add(
                    segment.inici
                );
            }
        }
    );



    return resultat;
}



// =========================
// POSICIONAR SEGMENT
// =========================
//
// Converteix índexs musicals
// en coordenades visuals.
//
// =========================

function posicionarSegmentBarra(
    segment
) {

    const pas =
        AMPLADA_FIGURA_RITMICA +
        ESPAI_ENTRE_FIGURES;



    const xPlicaInici =
        segment.inici *
            pas +
        POSICIO_PLICA_X;



    const y =
        PRIMERA_BARRA_Y +
        (
            segment.nivell *
            DISTANCIA_ENTRE_BARRES
        );



    // =========================
    // BARRA COMPLETA
    // =========================

    if (
        segment.tipus ===
        "completa"
    ) {

        const xPlicaFinal =
            segment.final *
                pas +
            POSICIO_PLICA_X;



        return {

            tipus:
                "completa",

            nivell:
                segment.nivell,

            left:
                xPlicaInici,

            top:
                y,

            width:
                Math.max(
                    0,
                    xPlicaFinal -
                    xPlicaInici +
                    3
                )

        };
    }



    // =========================
    // GANXO
    // =========================

    if (
        segment.direccio ===
        "dreta"
    ) {

        return {

            tipus:
                "ganxo",

            direccio:
                "dreta",

            nivell:
                segment.nivell,

            left:
                xPlicaInici,

            top:
                y,

            width:
                AMPLADA_GANXO

        };
    }



    return {

        tipus:
            "ganxo",

        direccio:
            "esquerra",

        nivell:
            segment.nivell,

        left:
            xPlicaInici -
            AMPLADA_GANXO,

        top:
            y,

        width:
            AMPLADA_GANXO

    };
}



// =========================
// CREAR ELEMENT DE BARRA
// =========================
//
// Crea el <span> visual.
//
// =========================

function crearElementBarraRitmica(
    barra
) {

    const element =
        document.createElement(
            "span"
        );



    element.classList.add(
        "grup-ritmic__barra"
    );



    element.classList.add(
        `grup-ritmic__barra--nivell-${barra.nivell + 1}`
    );



    if (
        barra.tipus ===
        "ganxo"
    ) {

        element.classList.add(
            "grup-ritmic__barra--ganxo"
        );


        element.classList.add(
            `grup-ritmic__barra--ganxo-${barra.direccio}`
        );
    }



    element.style.left =
        `${barra.left}px`;


    element.style.top =
        `${barra.top}px`;


    element.style.width =
        `${barra.width}px`;



    return element;
}



// =========================
// PROVA DE CÀLCUL
// =========================
//
// provarBarresRitmiques();
//
// Aquesta prova encara no
// dibuixa les figures.
// Només mostra els resultats
// a consola.
//
// =========================

function provarBarresRitmiques() {

    const proves = [

        "8 8",

        "16 16",

        "16 16 16 16",

        "8 16 16",

        "16 16 8",

        "16 8 16",

        "32 32 32 32"

    ];



    proves.forEach(
        text => {

            const contingut =
                interpretarContingutRitmic(
                    text
                );



            if (
                contingut.type !==
                "group"
            ) {

                return;
            }



            const layout =
                crearLayoutBarresRitmiques(
                    contingut.symbols
                );



            console.log(
                text,
                layout
            );
        }
    );
}
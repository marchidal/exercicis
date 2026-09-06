// =========================
// NOTACIÓ RÍTMICA
// =========================
//
// Uneix:
//
// - parser-ritmic.js
// - figures-ritmiques.js
// - barres-ritmiques.js
//
// Permet transformar:
//
// "4"
// "8 8"
// "16 8 16"
// "{3: 8 8 8}"
//
// en elements visuals.
//
// =========================



// =========================
// CREAR CONTINGUT VISUAL
// =========================
//
// Funció principal.
//
// Exemple:
//
// crearNotacioRitmica(
//     "16 8 16"
// )
//
// =========================

function crearNotacioRitmica(
    text
) {

    const contingut =
        interpretarContingutRitmic(
            text
        );



    const contenidor =
        document.createElement(
            "div"
        );


    contenidor.className =
        "notacio-ritmica";



    const elementVisual =
        renderitzarContingutRitmic(
            contingut
        );



    contenidor.appendChild(
        elementVisual
    );



    return contenidor;
}



// =========================
// RENDERITZAR CONTINGUT
// =========================

function renderitzarContingutRitmic(
    contingut
) {

    if (
        !contingut ||
        typeof contingut !==
            "object"
    ) {

        throw new TypeError(
            "El contingut rítmic no és vàlid."
        );
    }



    switch (
        contingut.type
    ) {

        case "note":

            return renderitzarNotaRitmica(
                contingut
            );


        case "rest":

            return renderitzarSilenciTemporal(
                contingut
            );


        case "group":

            return renderitzarGrupRitmic(
                contingut
            );


        case "tuplet":

            return renderitzarTupletTemporal(
                contingut
            );


        default:

            throw new Error(
                `Tipus rítmic desconegut: "${contingut.type}"`
            );
    }
}



// =========================
// RENDERITZAR NOTA
// =========================

function renderitzarNotaRitmica(
    simbol
) {

    const contenidor =
        document.createElement(
            "span"
        );


    contenidor.className =
        "simbol-ritmic";



    const nota =
        crearFiguraRitmicaIndividual(
            simbol.value
        );



    contenidor.appendChild(
        nota
    );



    // =========================
    // PUNTET
    // =========================

    if (
        simbol.dotted
    ) {

        contenidor.appendChild(
            crearPuntetRitmic()
        );
    }



    return contenidor;
}



// =========================
// RENDERITZAR GRUP
// =========================
//
// Exemples:
//
// 8 8
//
// 16 16 16 16
//
// 8 16 16
//
// 16 8 16
//
// =========================

function renderitzarGrupRitmic(
    grup
) {

    const elementGrup =
        document.createElement(
            "span"
        );


    elementGrup.className =
        "grup-ritmic";



    // =========================
    // CALCULAR BARRES
    // =========================

    const layout =
        crearLayoutBarresRitmiques(
            grup.symbols
        );



    // =========================
    // CREAR FIGURES
    // =========================

    grup.symbols.forEach(
        (
            simbol,
            index
        ) => {

            const wrapper =
                document.createElement(
                    "span"
                );


            wrapper.className =
                "grup-ritmic__figura";



            let element;



            // =========================
            // NOTA
            // =========================

            if (
                simbol.type ===
                "note"
            ) {

                element =
                    crearFiguraRitmicaIndividual(
                        simbol.value
                    );



                // =========================
                // ELIMINAR BANDERES
                // =========================
                //
                // Si forma part d'un grup
                // barrat, la bandera
                // individual desapareix.
                // =========================

                if (
                    layout
                        .figuresBarrades
                        .has(
                            index
                        )
                ) {

                    eliminarBanderesFigura(
                        element
                    );
                }



                wrapper.appendChild(
                    element
                );



                if (
                    simbol.dotted
                ) {

                    wrapper.appendChild(
                        crearPuntetRitmic()
                    );
                }

            }



            // =========================
            // SILENCI
            // =========================

            else if (
                simbol.type ===
                "rest"
            ) {

                wrapper.appendChild(
                    renderitzarSilenciTemporal(
                        simbol
                    )
                );
            }



            elementGrup.appendChild(
                wrapper
            );
        }
    );



    // =========================
    // DIBUIXAR BARRES
    // =========================

    layout.barres.forEach(
        barra => {

            const elementBarra =
                crearElementBarraRitmica(
                    barra
                );


            elementGrup.appendChild(
                elementBarra
            );
        }
    );



    return elementGrup;
}



// =========================
// PUNTET
// =========================

function crearPuntetRitmic() {

    const punt =
        document.createElement(
            "span"
        );


    punt.className =
        "puntet-ritmic";


    return punt;
}



// =========================
// SILENCI TEMPORAL
// =========================
//
// De moment només és un
// placeholder.
//
// Al següent bloc
// incorporarem els silencis
// reals de la web antiga.
//
// =========================

function renderitzarSilenciTemporal(
    simbol
) {

    const element =
        document.createElement(
            "span"
        );


    element.className =
        "silenci-ritmic-temporal";


    element.textContent =
        `0${simbol.value}`;



    if (
        simbol.dotted
    ) {

        element.textContent +=
            ".";
    }



    return element;
}



// =========================
// TUPLET TEMPORAL
// =========================
//
// El parser ja entén
// {3: 8 8 8}
//
// però el dibuix definitiu
// arribarà al bloc de tuplets.
//
// =========================

function renderitzarTupletTemporal(
    tuplet
) {

    const contenidor =
        document.createElement(
            "span"
        );


    contenidor.className =
        "tuplet-ritmic-temporal";



    const numero =
        document.createElement(
            "span"
        );


    numero.className =
        "tuplet-ritmic-temporal__numero";


    numero.textContent =
        tuplet.count;



    const grup =
        renderitzarGrupRitmic({

            type:
                "group",

            symbols:
                tuplet.symbols

        });



    contenidor.append(
        numero,
        grup
    );



    return contenidor;
}



// =========================
// API COMPATIBLE
// =========================
//
// Aquesta funció manté
// compatibilitat amb el
// dictat rítmic actual.
//
// Abans:
//
// crearFiguraRitmicaVisual(
//     "1"
// )
//
// Ara pot rebre també:
//
// crearFiguraRitmicaVisual(
//     "16 8 16"
// )
//
// =========================

function crearFiguraRitmicaVisual(
    figura
) {

    const contenidor =
        document.createElement(
            "div"
        );


    contenidor.className =
        "figura-ritmica";



    contenidor.dataset.figura =
        figura;



    try {

        contenidor.appendChild(

            crearNotacioRitmica(
                figura
            )

        );

    } catch (
        error
    ) {

        console.error(
            "Error creant la figura rítmica:",
            figura,
            error
        );



        const fallback =
            document.createElement(
                "span"
            );


        fallback.className =
            "figura-ritmica-temporal";


        fallback.textContent =
            figura;



        contenidor.appendChild(
            fallback
        );
    }



    return contenidor;
}



// =========================
// PROVA VISUAL
// =========================
//
// provarNotacioRitmica();
//
// =========================

function provarNotacioRitmica() {

    const proves = [

        "1",

        "2",

        "4",

        "8",

        "16",

        "32",

        "8 8",

        "16 16",

        "16 16 16 16",

        "8 16 16",

        "16 16 8",

        "16 8 16",

        "32 32 32 32",

        "4.",

        "8.",

        "{3: 8 8 8}"

    ];



    const zona =
        document.createElement(
            "div"
        );


    zona.className =
        "prova-notacio-ritmica";



    proves.forEach(
        text => {

            const fila =
                document.createElement(
                    "div"
                );


            fila.className =
                "prova-notacio-ritmica__fila";



            const etiqueta =
                document.createElement(
                    "div"
                );


            etiqueta.className =
                "prova-notacio-ritmica__etiqueta";


            etiqueta.textContent =
                text;



            const visual =
                crearNotacioRitmica(
                    text
                );



            fila.append(
                etiqueta,
                visual
            );


            zona.appendChild(
                fila
            );
        }
    );



    document.body.appendChild(
        zona
    );
}
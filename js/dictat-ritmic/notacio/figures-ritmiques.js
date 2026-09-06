// =========================
// FIGURES RÍTMIQUES
// =========================
//
// Aquest fitxer crea
// les figures musicals
// individuals.
//
// Encara NO gestiona:
//
// - grups
// - barres compartides
// - silencis
// - tresets
//
// Això s'afegirà en altres
// mòduls.
//
// =========================



// =========================
// CREAR NOTA BASE
// =========================
//
// Totes les figures parteixen
// d'aquesta estructura.
//
// =========================

function crearNotaBase({

    capPle = true,

    plica = true,

    classeExtra = ""

} = {}) {


    const nota =
        document.createElement(
            "span"
        );


    nota.classList.add(
        "nota-ritmica"
    );



    if (classeExtra) {

        nota.classList.add(
            classeExtra
        );
    }



    // =========================
    // PLICA
    // =========================

    if (plica) {

        const plicaElement =
            document.createElement(
                "span"
            );


        plicaElement.classList.add(
            "nota-ritmica__plica"
        );


        nota.appendChild(
            plicaElement
        );
    }



    // =========================
    // CAP
    // =========================

    const cap =
        document.createElement(
            "span"
        );


    cap.classList.add(
        "nota-ritmica__cap"
    );


    cap.classList.add(

        capPle
            ? "nota-ritmica__cap--ple"
            : "nota-ritmica__cap--buit"

    );


    nota.appendChild(
        cap
    );



    return nota;
}



// =========================
// CREAR BANDERA
// =========================
//
// Les corxeres, semicorxeres
// i fuses porten banderes
// quan NO estan agrupades.
//
// =========================

function crearBanderaRitmica(
    nivell
) {

    const bandera =
        document.createElement(
            "span"
        );


    bandera.classList.add(
        "nota-ritmica__bandera"
    );


    bandera.classList.add(
        `nota-ritmica__bandera--${nivell}`
    );


    return bandera;
}



// =========================
// REDONDA
// =========================
//
// Valor:
//
// 1
//
// Cap buit.
// Sense plica.
//
// =========================

function crearRedondaRitmica() {

    return crearNotaBase({

        capPle: false,

        plica: false,

        classeExtra:
            "nota-ritmica--redonda"

    });
}



// =========================
// BLANCA
// =========================
//
// Valor:
//
// 2
//
// Cap buit.
// Amb plica.
//
// =========================

function crearBlancaRitmica() {

    return crearNotaBase({

        capPle: false,

        plica: true,

        classeExtra:
            "nota-ritmica--blanca"

    });
}



// =========================
// NEGRA
// =========================
//
// Valor:
//
// 4
//
// Cap ple.
// Amb plica.
//
// =========================

function crearNegraRitmica() {

    return crearNotaBase({

        capPle: true,

        plica: true,

        classeExtra:
            "nota-ritmica--negra"

    });
}



// =========================
// CORXERA
// =========================
//
// Valor:
//
// 8
//
// Cap ple.
// Plica.
// 1 bandera.
//
// =========================

function crearCorxeraRitmica() {

    const nota =
        crearNotaBase({

            capPle: true,

            plica: true,

            classeExtra:
                "nota-ritmica--corxera"

        });



    nota.appendChild(

        crearBanderaRitmica(
            1
        )

    );



    return nota;
}



// =========================
// SEMICORXERA
// =========================
//
// Valor:
//
// 16
//
// Cap ple.
// Plica.
// 2 banderes.
//
// =========================

function crearSemicorxeraRitmica() {

    const nota =
        crearNotaBase({

            capPle: true,

            plica: true,

            classeExtra:
                "nota-ritmica--semicorxera"

        });



    nota.appendChild(

        crearBanderaRitmica(
            1
        )

    );


    nota.appendChild(

        crearBanderaRitmica(
            2
        )

    );



    return nota;
}



// =========================
// FUSA
// =========================
//
// Valor:
//
// 32
//
// Cap ple.
// Plica.
// 3 banderes.
//
// =========================

function crearFusaRitmica() {

    const nota =
        crearNotaBase({

            capPle: true,

            plica: true,

            classeExtra:
                "nota-ritmica--fusa"

        });



    nota.appendChild(

        crearBanderaRitmica(
            1
        )

    );


    nota.appendChild(

        crearBanderaRitmica(
            2
        )

    );


    nota.appendChild(

        crearBanderaRitmica(
            3
        )

    );



    return nota;
}



// =========================
// REGISTRE DE FIGURES
// =========================
//
// Ens permet obtenir
// automàticament el constructor
// segons el valor.
//
// =========================

const CONSTRUCTORS_FIGURES_RITMIQUES = {

    1:
        crearRedondaRitmica,

    2:
        crearBlancaRitmica,

    4:
        crearNegraRitmica,

    8:
        crearCorxeraRitmica,

    16:
        crearSemicorxeraRitmica,

    32:
        crearFusaRitmica

};



// =========================
// OBTENIR CONSTRUCTOR
// =========================

function obtenirConstructorFiguraRitmica(
    valor
) {

    return (
        CONSTRUCTORS_FIGURES_RITMIQUES[
            Number(valor)
        ] ??
        null
    );
}



// =========================
// CREAR FIGURA
// =========================
//
// Funció pública principal.
//
// Exemple:
//
// crearFiguraRitmicaIndividual(16)
//
// =========================

function crearFiguraRitmicaIndividual(
    valor
) {

    const constructor =
        obtenirConstructorFiguraRitmica(
            valor
        );



    if (!constructor) {

        console.error(
            `No existeix una figura rítmica per al valor "${valor}".`
        );


        return crearFiguraRitmicaTemporal(
            valor
        );
    }



    const figura =
        constructor();



    figura.dataset.valor =
        String(valor);



    return figura;
}



// =========================
// FIGURA TEMPORAL
// =========================
//
// Només s'utilitza com fallback.
//
// =========================

function crearFiguraRitmicaTemporal(
    valor
) {

    const element =
        document.createElement(
            "span"
        );


    element.classList.add(
        "figura-ritmica-temporal"
    );


    element.textContent =
        String(valor);


    return element;
}



// =========================
// ELIMINAR BANDERES
// =========================
//
// Aquesta funció serà important
// per barres-ritmiques.js.
//
// Quan una corxera o semicorxera
// forma part d'un grup barrat,
// les banderes individuals
// desapareixen.
//
// =========================

function eliminarBanderesFigura(
    element
) {

    if (!element) {

        return;
    }



    element
        .querySelectorAll(
            ".nota-ritmica__bandera"
        )
        .forEach(
            bandera => {

                bandera.remove();

            }
        );
}



// =========================
// NOMBRE DE BARRES
// =========================
//
// Ens servirà per calcular
// els grups:
//
// 8  -> 1
// 16 -> 2
// 32 -> 3
//
// =========================

function obtenirNombreBarresFigura(
    valor
) {

    switch (
        Number(valor)
    ) {

        case 8:

            return 1;


        case 16:

            return 2;


        case 32:

            return 3;


        default:

            return 0;
    }
}



// =========================
// PROVA
// =========================
//
// provarFiguresRitmiques();
//
// =========================

function provarFiguresRitmiques() {

    const valors = [
        1,
        2,
        4,
        8,
        16,
        32
    ];



    const zona =
        document.createElement(
            "div"
        );


    zona.className =
        "prova-figures-ritmiques";


    document.body.appendChild(
        zona
    );



    valors.forEach(
        valor => {

            const contenidor =
                document.createElement(
                    "div"
                );


            contenidor.className =
                "prova-figura-ritmica";



            const figura =
                crearFiguraRitmicaIndividual(
                    valor
                );



            const etiqueta =
                document.createElement(
                    "span"
                );


            etiqueta.textContent =
                valor;



            contenidor.append(
                figura,
                etiqueta
            );


            zona.appendChild(
                contenidor
            );

        }
    );
}
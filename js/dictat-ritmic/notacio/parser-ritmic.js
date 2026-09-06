// =========================
// PARSER RÍTMIC
// =========================
//
// Converteix el llenguatge rítmic
// en objectes musicals interns.
//
// Exemples:
//
// "4"
// "04"
// "4."
// "08."
//
// "8 8"
// "16 8 16"
//
// "{3: 8 8 8}"
//
// =========================



// =========================
// VALORS PERMESOS
// =========================
//
// 1  = redonda
// 2  = blanca
// 4  = negra
// 8  = corxera
// 16 = semicorxera
// 32 = fusa
// =========================

const VALORS_RITMICS_PERMESOS = [
    1,
    2,
    4,
    8,
    16,
    32
];



// =========================
// INTERPRETAR CONTINGUT
// =========================
//
// Aquesta és la funció principal.
//
// Retorna:
// - note
// - rest
// - group
// - tuplet
// =========================

function interpretarContingutRitmic(
    text
) {

    if (
        typeof text !==
        "string"
    ) {

        throw new TypeError(
            "El contingut rítmic ha de ser una cadena de text."
        );
    }



    const textNet =
        text.trim();



    if (!textNet) {

        throw new Error(
            "El contingut rítmic no pot estar buit."
        );
    }



    // =========================
    // GRUP IRREGULAR
    // =========================
    //
    // Hem de comprovar això
    // abans de separar per espais.
    //
    // Exemple:
    //
    // {3: 8 8 8}
    // =========================

    if (
        esGrupIrregular(
            textNet
        )
    ) {

        return interpretarGrupIrregular(
            textNet
        );
    }



    // =========================
    // FIGURES / GRUP NORMAL
    // =========================

    const tokens =
        textNet.split(
            /\s+/
        );



    // Una sola figura.

    if (
        tokens.length === 1
    ) {

        return interpretarTokenRitmic(
            tokens[0]
        );
    }



    // Diverses figures:
    //
    // 8 8
    // 16 8 16
    // 8. 16

    return {

        type: "group",

        symbols:
            tokens.map(
                interpretarTokenRitmic
            )

    };
}



// =========================
// DETECTAR GRUP IRREGULAR
// =========================

function esGrupIrregular(
    text
) {

    return (
        text.startsWith("{") &&
        text.endsWith("}")
    );
}



// =========================
// INTERPRETAR GRUP IRREGULAR
// =========================
//
// Exemple:
//
// {3: 8 8 8}
//
// ->
//
// {
//     type: "tuplet",
//     count: 3,
//     symbols: [...]
// }
//
// =========================

function interpretarGrupIrregular(
    text
) {

    const coincidencia =
        text.match(
            /^\{\s*(\d+)\s*:\s*(.+)\s*\}$/
        );



    if (!coincidencia) {

        throw new Error(
            `Grup irregular no vàlid: "${text}"`
        );
    }



    const quantitat =
        Number(
            coincidencia[1]
        );


    const contingut =
        coincidencia[2]
            .trim();



    if (
        !Number.isInteger(
            quantitat
        ) ||
        quantitat < 2
    ) {

        throw new Error(
            `Nombre de grup irregular no vàlid: "${quantitat}"`
        );
    }



    if (!contingut) {

        throw new Error(
            "Un grup irregular ha de contenir figures."
        );
    }



    const tokens =
        contingut.split(
            /\s+/
        );



    return {

        type: "tuplet",

        count:
            quantitat,

        symbols:
            tokens.map(
                interpretarTokenRitmic
            )

    };
}



// =========================
// INTERPRETAR TOKEN
// =========================
//
// Exemples:
//
// 4
// 04
// 4.
// 08.
//
// Retorna:
//
// {
//     type: "note",
//     value: 4,
//     dotted: false
// }
//
// =========================

function interpretarTokenRitmic(
    token
) {

    if (
        typeof token !==
        "string"
    ) {

        throw new TypeError(
            "La figura rítmica ha de ser una cadena de text."
        );
    }



    const tokenNet =
        token.trim();



    if (!tokenNet) {

        throw new Error(
            "La figura rítmica no pot estar buida."
        );
    }



    // =========================
    // PUNTET
    // =========================

    const dotted =
        tokenNet.endsWith(
            "."
        );



    const tokenSensePunt =
        dotted
            ? tokenNet.slice(
                0,
                -1
            )
            : tokenNet;



    // =========================
    // SILENCI
    // =========================
    //
    // 04  = silenci de negra
    // 08  = silenci de corxera
    // 016 = silenci de semicorxera
    // =========================

    const esSilenci =
        tokenSensePunt.startsWith(
            "0"
        );



    const valorText =
        esSilenci
            ? tokenSensePunt.slice(
                1
            )
            : tokenSensePunt;



    // =========================
    // VALIDACIÓ
    // =========================

    if (!valorText) {

        throw new Error(
            `Figura rítmica no vàlida: "${token}"`
        );
    }



    if (
        !/^\d+$/.test(
            valorText
        )
    ) {

        throw new Error(
            `Figura rítmica no vàlida: "${token}"`
        );
    }



    const valor =
        Number(
            valorText
        );



    if (
        !VALORS_RITMICS_PERMESOS.includes(
            valor
        )
    ) {

        throw new Error(
            `Valor rítmic no permès: "${valor}"`
        );
    }



    // =========================
    // RESULTAT
    // =========================

    return {

        type:
            esSilenci
                ? "rest"
                : "note",

        value:
            valor,

        dotted:
            dotted

    };
}



// =========================
// CONVERTIR A TEXT
// =========================
//
// Fa l'operació contrària.
//
// Exemple:
//
// {
//     type: "rest",
//     value: 8,
//     dotted: true
// }
//
// ->
//
// "08."
//
// Ens serà útil més endavant
// per reproducció, comparació,
// timeline i depuració.
// =========================

function convertirObjecteRitmicAText(
    simbol
) {

    if (
        !simbol ||
        typeof simbol !==
            "object"
    ) {

        throw new TypeError(
            "El símbol rítmic no és vàlid."
        );
    }



    const punt =
        simbol.dotted
            ? "."
            : "";



    if (
        simbol.type ===
        "rest"
    ) {

        return (
            `0${simbol.value}${punt}`
        );
    }



    if (
        simbol.type ===
        "note"
    ) {

        return (
            `${simbol.value}${punt}`
        );
    }



    throw new Error(
        `Tipus rítmic no compatible: "${simbol.type}"`
    );
}



// =========================
// FUNCIÓ DE PROVA
// =========================
//
// Podem executar-la des de
// la consola del navegador.
//
// provarParserRitmic();
//
// =========================

function provarParserRitmic() {

    const proves = [

        "1",

        "2",

        "4",

        "8",

        "16",

        "32",

        "04",

        "08",

        "016",

        "4.",

        "08.",

        "8 8",

        "16 16 16 16",

        "8 16 16",

        "16 8 16",

        "16 16 8",

        "{3: 8 8 8}",

        "{3: 4 4 4}",

        "{3: 4 8}"

    ];



    proves.forEach(
        prova => {

            try {

                console.log(
                    prova,
                    "→",
                    interpretarContingutRitmic(
                        prova
                    )
                );

            } catch (
                error
            ) {

                console.error(
                    prova,
                    error
                );
            }
        }
    );
}
// =========================
// CONFIGURACIÓ GENERAL
// =========================

const PERCENTATGE_MINIM = 75;

const ORDRE_RANGS = [
    "D",
    "C",
    "B",
    "A",
    "S"
];


// =========================
// CATÀLEG D'EXERCICIS
// =========================

const EXERCICIS = [

    // =========================
    // NOTES
    // =========================

    {
        id: "notes-1",
        categoria: "notes",
        numero: 1,
        rang: "D",
        xpMax: 50,
        url: "exercicis/notes/notes-1.html"
    },

    {
        id: "notes-2",
        categoria: "notes",
        numero: 2,
        rang: "D",
        xpMax: 50,
        url: "exercicis/notes/notes-2.html"
    },

    {
        id: "notes-3",
        categoria: "notes",
        numero: 3,
        rang: "D",
        xpMax: 50,
        url: "exercicis/notes/notes-3.html"
    },

    {
        id: "notes-4",
        categoria: "notes",
        numero: 4,
        rang: "D",
        xpMax: 50,
        url: "exercicis/notes/notes-4.html"
    },

    {
        id: "notes-5",
        categoria: "notes",
        numero: 5,
        rang: "D",
        xpMax: 60,
        url: "exercicis/notes/notes-5.html"
    },
 
    {
        id: "notes-6",
        categoria: "notes",
        numero: 6,
        rang: "D",
        xpMax: 60,
        url: "exercicis/notes/notes-6.html"
    },
    
    {
        id: "notes-7",
        categoria: "notes",
        numero: 7,
        rang: "D",
        xpMax: 60,
        url: "exercicis/notes/notes-7.html"
    },    

    {
        id: "notes-8",
        categoria: "notes",
        numero: 8,
        rang: "C",
        xpMax: 65,
        url: "exercicis/notes/notes-8.html"
    },
    
    {
        id: "notes-9",
        categoria: "notes",
        numero: 9,
        rang: "C",
        xpMax: 65,
        url: "exercicis/notes/notes-9.html"
    },
    
    {
        id: "notes-10",
        categoria: "notes",
        numero: 10,
        rang: "C",
        xpMax: 65,
        url: "exercicis/notes/notes-10.html"
    },
    
    {
        id: "notes-11",
        categoria: "notes",
        numero: 11,
        rang: "C",
        xpMax: 65,
        url: "exercicis/notes/notes-11.html"
    },
    
    {
        id: "notes-12",
        categoria: "notes",
        numero: 12,
        rang: "C",
        xpMax: 65,
        url: "exercicis/notes/notes-12.html"
    },

    // =========================
    // VALORS
    // =========================
    
    {
        id: "valors-1",
        categoria: "valors",
        numero: 1,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/valors-1.html"
    },
    
    {
        id: "valors-2",
        categoria: "valors",
        numero: 2,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/valors-2.html"
    },
    
    {
        id: "valors-3",
        categoria: "valors",
        numero: 3,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/valors-3.html"
    },

    {
        id: "valors-4",
        categoria: "valors",
        numero: 4,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/valors-4.html"
    },
    
    {
        id: "valors-5",
        categoria: "valors",
        numero: 5,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/valors-5.html"
    },    
    
    {
        id: "valors-6",
        categoria: "valors",
        numero: 6,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/valors-6.html"
    },    

    // =========================
    // COMPASSOS
    // =========================
    
    {
        id: "compassos-1",
        categoria: "compassos",
        numero: 1,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/compassos-1.html",
        requereix: "valors-2"
    },
    
    {
        id: "compassos-2",
        categoria: "compassos",
        numero: 2,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/compassos-2.html"
    },

    {
        id: "compassos-3",
        categoria: "compassos",
        numero: 3,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/compassos-3.html"
    },
    
    {
        id: "compassos-4",
        categoria: "compassos",
        numero: 4,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/compassos-4.html"
    },
    
    {
        id: "compassos-5",
        categoria: "compassos",
        numero: 5,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/compassos-5.html",
        requereix: "valors-6"
    },    
 
    {
        id: "compassos-6",
        categoria: "compassos",
        numero: 6,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/compassos-6.html"
    },      
    
    // =========================
    // PULSACIÓ
    // =========================
    
    {
        id: "pulsacio-1",
        categoria: "pulsacio",
        numero: 1,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/pulsacio-1.html",
        requereix: "compassos-4"
    },
    
    {
        id: "pulsacio-2",
        categoria: "pulsacio",
        numero: 2,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/pulsacio-2.html",
        requereix: "compassos-6"
    },
    
    {
        id: "pulsacio-3",
        categoria: "pulsacio",
        numero: 3,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/pulsacio-3.html"
    },
    
    {
        id: "pulsacio-4",
        categoria: "pulsacio",
        numero: 4,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/pulsacio-4.html"
    },
    
    
    // =========================
    // ACCENTS MÈTRICS
    // =========================
    
    {
        id: "accents-metrics-1",
        categoria: "accents-metrics",
        numero: 1,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/accents-metrics-1.html",
        requereix: "pulsacio-1"
    },

    {
        id: "accents-metrics-2",
        categoria: "accents-metrics",
        numero: 2,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/accents-metrics-2.html",
        requereix: "pulsacio-2"
    },

    {
        id: "accents-metrics-3",
        categoria: "accents-metrics",
        numero: 3,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/accents-metrics-3.html",
        requereix: "pulsacio-3"
    },

    {
        id: "accents-metrics-4",
        categoria: "accents-metrics",
        numero: 4,
        rang: "C",
        xpMax: 60,
        url: "exercicis/llenguatge/accents-metrics-4.html",
        requereix: "pulsacio-4"
    },

    // =========================
    // INTERVALS
    // =========================
    
    {
    id: "intervals-1",
    categoria: "intervals",
    numero: 1,
    rang: "D",
    xpMax: 50,
    url: "exercicis/intervals/intervals-1.html",
    requereix: "notes-7"
    },

    {
    id: "intervals-2",
    categoria: "intervals",
    numero: 2,
    rang: "D",
    xpMax: 50,
    url: "exercicis/intervals/intervals-2.html"
    },

    {
    id: "intervals-3",
    categoria: "intervals",
    numero: 3,
    rang: "D",
    xpMax: 50,
    url: "exercicis/intervals/intervals-3.html"
    },

    {
    id: "intervals-4",
    categoria: "intervals",
    numero: 4,
    rang: "C",
    xpMax: 50,
    url: "exercicis/intervals/intervals-4.html",
    requereix: "notes-12"
    },

    {
    id: "intervals-5",
    categoria: "intervals",
    numero: 5,
    rang: "C",
    xpMax: 50,
    url: "exercicis/intervals/intervals-5.html",
    },
    
    
    // =========================
    // DICTAT RÍTMIC
    // =========================

    {
        id: "dictat-ritmic-1",
        categoria: "dictat-ritmic",
        numero: 1,
        rang: "D",
        xpMax: 50,
        url: "exercicis/dictat-ritmic/dictat-ritmic-1.html"
    },

    {
        id: "dictat-ritmic-2",
        categoria: "dictat-ritmic",
        numero: 2,
        rang: "D",
        xpMax: 50,
        url: "exercicis/dictat-ritmic/dictat-ritmic-2.html"
    },

    {
        id: "dictat-ritmic-3",
        categoria: "dictat-ritmic",
        numero: 3,
        rang: "D",
        xpMax: 50,
        url: "exercicis/dictat-ritmic/dictat-ritmic-3.html"
    },

   {
        id: "dictat-ritmic-4",
        categoria: "dictat-ritmic",
        numero: 4,
        rang: "D",
        xpMax: 50,
        url: "exercicis/dictat-ritmic/dictat-ritmic-4.html"
    },

    {
        id: "dictat-ritmic-5",
        categoria: "dictat-ritmic",
        numero: 5,
        rang: "D",
        xpMax: 60,
        url: "exercicis/dictat-ritmic/dictat-ritmic-5.html"
    },

    {
        id: "dictat-ritmic-6",
        categoria: "dictat-ritmic",
        numero: 6,
        rang: "D",
        xpMax: 60,
        url: "exercicis/dictat-ritmic/dictat-ritmic-6.html"
    },
    
    {
        id: "dictat-ritmic-7",
        categoria: "dictat-ritmic",
        numero: 7,
        rang: "D",
        xpMax: 60,
        url: "exercicis/dictat-ritmic/dictat-ritmic-7.html"
    },

    {
        id: "dictat-ritmic-8",
        categoria: "dictat-ritmic",
        numero: 8,
        rang: "D",
        xpMax: 60,
        url: "exercicis/dictat-ritmic/dictat-ritmic-8.html"
    },      


    // =========================
    // DICTAT MELÒDIC
    // =========================

{
    id: "dictat-melodic-1",
    categoria: "dictat-melodic",
    numero: 1,
    rang: "D",
    xpMax: 50,
    url: "exercicis/dictat-melodic/dictat-melodic-1.html"
},

{
    id: "dictat-melodic-2",
    categoria: "dictat-melodic",
    numero: 2,
    rang: "D",
    xpMax: 50,
    url: "exercicis/dictat-melodic/dictat-melodic-2.html"
},

{
    id: "dictat-melodic-3",
    categoria: "dictat-melodic",
    numero: 3,
    rang: "D",
    xpMax: 50,
    url: "exercicis/dictat-melodic/dictat-melodic-3.html"
},

{
    id: "dictat-melodic-4",
    categoria: "dictat-melodic",
    numero: 4,
    rang: "D",
    xpMax: 50,
    url: "exercicis/dictat-melodic/dictat-melodic-4.html"
},

{
    id: "dictat-melodic-5",
    categoria: "dictat-melodic",
    numero: 5,
    rang: "D",
    xpMax: 50,
    url: "exercicis/dictat-melodic/dictat-melodic-5.html"
},

{
    id: "dictat-melodic-6",
    categoria: "dictat-melodic",
    numero: 6,
    rang: "D",
    xpMax: 60,
    url: "exercicis/dictat-melodic/dictat-melodic-6.html"
},

{
    id: "dictat-melodic-7",
    categoria: "dictat-melodic",
    numero: 7,
    rang: "D",
    xpMax: 60,
    url: "exercicis/dictat-melodic/dictat-melodic-7.html"
},

{
    id: "dictat-melodic-8",
    categoria: "dictat-melodic",
    numero: 8,
    rang: "D",
    xpMax: 60,
    url: "exercicis/dictat-melodic/dictat-melodic-8.html"
},

{
    id: "dictat-melodic-9",
    categoria: "dictat-melodic",
    numero: 9,
    rang: "D",
    xpMax: 60,
    url: "exercicis/dictat-melodic/dictat-melodic-9.html"
},

{
    id: "dictat-melodic-10",
    categoria: "dictat-melodic",
    numero: 10,
    rang: "C",
    xpMax: 70,
    url: "exercicis/dictat-melodic/dictat-melodic-10.html"
}

];


// =========================
// BUSCAR EXERCICI
// =========================

function obtenirExercici(id) {

    return EXERCICIS.find(
        exercici => exercici.id === id
    );
}
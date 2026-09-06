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
        xpMax: 60,
        url: "exercicis/notes/notes-8.html"
    },    

    // =========================
    // LLENGUATGE
    // =========================

    {
        id: "llenguatge-1",
        categoria: "llenguatge",
        numero: 1,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/llenguatge-1.html"
    },

    {
        id: "llenguatge-2",
        categoria: "llenguatge",
        numero: 2,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/llenguatge-2.html"
    },

    {
        id: "llenguatge-3",
        categoria: "llenguatge",
        numero: 3,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/llenguatge-3.html"
    },

    {
        id: "llenguatge-4",
        categoria: "llenguatge",
        numero: 4,
        rang: "D",
        xpMax: 50,
        url: "exercicis/llenguatge/llenguatge-4.html"
    },

    {
        id: "llenguatge-5",
        categoria: "llenguatge",
        numero: 5,
        rang: "D",
        xpMax: 60,
        url: "exercicis/llenguatge/llenguatge-5.html"
    },

    {
        id: "llenguatge-6",
        categoria: "llenguatge",
        numero: 6,
        rang: "D",
        xpMax: 60,
        url: "exercicis/llenguatge/llenguatge-6.html"
    },    

    {
        id: "llenguatge-7",
        categoria: "llenguatge",
        numero: 7,
        rang: "D",
        xpMax: 60,
        url: "exercicis/llenguatge/llenguatge-7.html"
    },
    
    {
        id: "llenguatge-8",
        categoria: "llenguatge",
        numero: 8,
        rang: "D",
        xpMax: 60,
        url: "exercicis/llenguatge/llenguatge-8.html"
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
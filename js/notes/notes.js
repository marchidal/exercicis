// =========================
// MOTOR D'EXERCICIS DE NOTES
// =========================

function iniciarExerciciNotes(config) {

    // =========================
    // ELEMENTS DEL DOM
    // =========================

    const explicacio =
        document.querySelector(".explicacio");

    const comencarBtn =
        document.getElementById("comencar-btn");

    const part1 =
        document.getElementById("part-1");

    const part2 =
        document.getElementById("part-2");

    const preguntaEquivalencia =
        document.getElementById(
            "pregunta-equivalencia"
        );

    const respostaEquivalencia =
        document.getElementById(
            "resposta-equivalencia"
        );

    const comprovarEquivalenciaBtn =
        document.getElementById(
            "comprovar-equivalencia"
        );

    const feedbackEquivalencia =
        document.getElementById(
            "feedback-equivalencia"
        );

    const pentagrama =
        document.getElementById(
            "pentagrama"
        );

    const respostaNota =
        document.getElementById(
            "resposta-nota"
        );

    const comprovarNotaBtn =
        document.getElementById(
            "comprovar-nota"
        );

    const feedbackNota =
        document.getElementById(
            "feedback-nota"
        );

    const resultatFinal =
        document.getElementById(
            "resultat-final"
        );

    const puntuacioFinal =
        document.getElementById(
            "puntuacio-final"
        );

    const finalitzarBtn =
        document.getElementById(
            "finalitzar-btn"
        );


    // XP

    const nivellXp =
        document.getElementById(
            "nivell-xp"
        );

    const barraXpFinal =
        document.getElementById(
            "barra-xp-final-progres"
        );

    const textXpFinal =
        document.getElementById(
            "text-xp-final"
        );

    const xpGuanyadaText =
        document.getElementById(
            "xp-guanyada"
        );


    // =========================
    // ESTAT
    // =========================

    let indexEquivalencia = 0;
    let indexNota = 0;

    let encertsEquivalencies = 0;
    let encertsNotes = 0;

    let respostaCorrecta = null;

    let exerciciSuperatActual = false;


    // =========================
    // BARREJAR
    // =========================

    function barrejar(array) {

        const copia = [...array];

        for (
            let i = copia.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );

            [
                copia[i],
                copia[j]
            ] = [
                copia[j],
                copia[i]
            ];
        }

        return copia;
    }


    // =========================
    // PREPARAR EQUIVALÈNCIES
    // =========================

    const preguntesEquivalencies =
        barrejar(
            config.equivalencies.flatMap(
                equivalencia => {
    
                    const repeticions =
                        equivalencia.pes || 1;
    
                    return Array(
                        repeticions
                    ).fill(equivalencia);
                }
            )
        );
        
    // =========================
    // PREPARAR NOTES
    // =========================

    const preguntesNotes =
        barrejar(
            config.notesPentagrama.flatMap(
                nota => {
    
                    const repeticions =
                        nota.pes || 1;
    
                    return Array(
                        repeticions
                    ).fill(nota);
                }
            )
        );
     
    // =========================
    // COMENÇAR
    // =========================

    comencarBtn.addEventListener(
        "click",
        () => {

            explicacio.classList.add(
                "ocult"
            );

            part1.classList.remove(
                "ocult"
            );

            novaEquivalencia();
        }
    );


    // =========================
    // EQUIVALÈNCIES
    // =========================

    function novaEquivalencia() {

        feedbackEquivalencia.textContent =
            "";

        feedbackEquivalencia.className =
            "feedback";

        respostaEquivalencia.value =
            "";

        respostaEquivalencia.focus();


        const pregunta =
            preguntesEquivalencies[
                indexEquivalencia
            ];


        preguntaEquivalencia.textContent =
            pregunta.pregunta;


        respostaCorrecta =
            pregunta.resposta
                .trim()
                .toLowerCase();
    }


    function comprovarEquivalencia() {

        const resposta =
            respostaEquivalencia.value
                .trim()
                .toLowerCase();


        if (!resposta) {
            return;
        }


        if (
            resposta ===
            respostaCorrecta
        ) {

            feedbackEquivalencia.textContent =
                "Correcte!";

            feedbackEquivalencia.className =
                "feedback correcte";

            encertsEquivalencies++;

        } else {

            feedbackEquivalencia.textContent =
                `Incorrecte. La resposta era ${respostaCorrecta}.`;

            feedbackEquivalencia.className =
                "feedback incorrecte";
        }


        indexEquivalencia++;


        bloquejarControl(
            comprovarEquivalenciaBtn,
            respostaEquivalencia
        );


        setTimeout(() => {

            desbloquejarControl(
                comprovarEquivalenciaBtn,
                respostaEquivalencia
            );


            if (
                indexEquivalencia <
                preguntesEquivalencies.length
            ) {

                novaEquivalencia();

            } else {

                iniciarPentagrama();
            }

        }, 1000);
    }


    // =========================
    // PENTAGRAMA
    // =========================

    function iniciarPentagrama() {

        part1.classList.add(
            "ocult"
        );

        part2.classList.remove(
            "ocult"
        );

        novaNota();
    }


    function novaNota() {

        feedbackNota.textContent =
            "";

        feedbackNota.className =
            "feedback";

        respostaNota.value =
            "";

        respostaNota.focus();


        respostaCorrecta =
            preguntesNotes[
                indexNota
            ];


        dibuixarPentagrama(
            respostaCorrecta
        );
    }


    // =========================
    // DIBUIXAR PENTAGRAMA
    // =========================

    function dibuixarPentagrama(nota) {
    
        const amplada = 600;
        const alcada = 240;
    
        const iniciX = 80;
        const finalX = 520;
    
        const distanciaLinies = 25;
        const primeraLiniaY = 160;
    
    
        // =========================
        // POSICIÓ DE LA NOTA
        // =========================
    
        const posicio =
            nota.posicio ??
            nota.linia;
    
    
        const notaY =
            primeraLiniaY -
            (
                (posicio - 1) *
                distanciaLinies
            );
    
    
        // =========================
        // DIRECCIÓ DE LA PLICA
        // =========================
    
        // Des del Si3 (posició 3)
        // la plica va cap avall i a l'esquerra.
    
        const plicaAvall =
            posicio >= 3;
    
    
        const plica =
            plicaAvall
                ? `
                    <line
                        x1="308"
                        y1="${notaY}"
                        x2="308"
                        y2="${notaY + 55}"
                        stroke="black"
                        stroke-width="4"
                    />
                `
                : `
                    <line
                        x1="332"
                        y1="${notaY}"
                        x2="332"
                        y2="${notaY - 55}"
                        stroke="black"
                        stroke-width="4"
                    />
                `;
    
    
        // =========================
        // PENTAGRAMA
        // =========================
    
        let linies = "";
    
    
        for (
            let i = 0;
            i < 5;
            i++
        ) {
    
            const y =
                primeraLiniaY -
                (
                    i *
                    distanciaLinies
                );
    
    
            linies += `
                <line
                    x1="${iniciX}"
                    y1="${y}"
                    x2="${finalX}"
                    y2="${y}"
                    stroke="black"
                    stroke-width="2"
                />
            `;
        }
    
    
        // =========================
        // LÍNIA ADDICIONAL
        // =========================
    
        let liniaAddicional = "";
    
    
        if (nota.liniaAddicional) {
    
            liniaAddicional = `
                <line
                    x1="292"
                    y1="${notaY}"
                    x2="348"
                    y2="${notaY}"
                    stroke="black"
                    stroke-width="2"
                />
            `;
        }
    
    
        // =========================
        // DIBUIXAR SVG
        // =========================
    
        pentagrama.innerHTML = `
    
            <svg
                viewBox="0 0 ${amplada} ${alcada}"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Pentagrama amb una nota musical"
            >
    
                ${linies}
    
                <!-- Clau de Sol -->
    
                <text
                    x="95"
                    y="165"
                    font-size="100"
                    font-family="serif"
                >
                    𝄞
                </text>
    
                <!-- Línia addicional -->
    
                ${liniaAddicional}
    
                <!-- Cap de la nota -->
    
                <ellipse
                    cx="320"
                    cy="${notaY}"
                    rx="13"
                    ry="9"
                    fill="black"
                    transform="rotate(-20 320 ${notaY})"
                />
    
                <!-- Plica -->
    
                ${plica}
    
            </svg>
        `;
    }


    // =========================
    // COMPROVAR NOTA
    // =========================

    function comprovarNota() {

        const resposta =
            respostaNota.value
                .trim()
                .toLowerCase();


        if (!resposta) {
            return;
        }


        const alternatives =
            respostaCorrecta
                .alternatives
                .map(
                    alternativa =>
                        alternativa
                            .trim()
                            .toLowerCase()
                );


        if (
            alternatives.includes(
                resposta
            )
        ) {

            feedbackNota.textContent =
                "Correcte!";

            feedbackNota.className =
                "feedback correcte";

            encertsNotes++;

        } else {

            feedbackNota.textContent =
                `Incorrecte. Era ${respostaCorrecta.alternatives.join(" / ")}.`;

            feedbackNota.className =
                "feedback incorrecte";
        }


        indexNota++;


        bloquejarControl(
            comprovarNotaBtn,
            respostaNota
        );


        setTimeout(() => {

            desbloquejarControl(
                comprovarNotaBtn,
                respostaNota
            );


            if (
                indexNota <
                preguntesNotes.length
            ) {

                novaNota();

            } else {

                acabarExercici();
            }

        }, 1000);
    }


    // =========================
    // BLOQUEJAR CONTROLS
    // =========================

    function bloquejarControl(
        boto,
        input
    ) {

        boto.disabled = true;
        input.disabled = true;
    }


    function desbloquejarControl(
        boto,
        input
    ) {

        boto.disabled = false;
        input.disabled = false;
    }


    // =========================
    // FINAL
    // =========================

    function acabarExercici() {

        part2.classList.add(
            "ocult"
        );

        resultatFinal.classList.remove(
            "ocult"
        );


        const encertsTotals =
            encertsEquivalencies +
            encertsNotes;


        const totalPreguntes =
            preguntesEquivalencies.length +
            preguntesNotes.length;


        const percentatge =
            Math.round(
                (
                    encertsTotals /
                    totalPreguntes
                ) * 100
            );


        const dadesResultat =
            registrarResultatExercici(
                config.id,
                percentatge
            );


        if (!dadesResultat) {
            return;
        }


        exerciciSuperatActual =
            dadesResultat.superat;


        if (
            percentatge >=
            PERCENTATGE_MINIM
        ) {

            puntuacioFinal.innerHTML = `
                ${encertsTotals} de ${totalPreguntes}
                respostes correctes (${percentatge}%).
                <br><br>
                <strong>Exercici superat!</strong>
            `;

        } else {

            puntuacioFinal.innerHTML = `
                ${encertsTotals} de ${totalPreguntes}
                respostes correctes (${percentatge}%).
                <br><br>
                Necessites un mínim del
                <strong>${PERCENTATGE_MINIM}%</strong>
                per superar l'exercici.
            `;
        }


        mostrarExperiencia(
            dadesResultat
        );


        finalitzarBtn.textContent =
            exerciciSuperatActual
                ? "Finalitzar"
                : "Tornar-ho a intentar";
    }


    // =========================
    // EXPERIÈNCIA
    // =========================

    function mostrarExperiencia(
        dadesResultat
    ) {

        const elementsXp = {

            nivell:
                nivellXp,

            barra:
                barraXpFinal,

            text:
                textXpFinal
        };


        if (
            dadesResultat.xpAfegida >
            0
        ) {

            xpGuanyadaText.textContent =
                `+${dadesResultat.xpAfegida} XP`;


            animarExperiencia(
                dadesResultat.xpAnteriorCategoria,
                dadesResultat.xpNovaCategoria,
                elementsXp
            );

        } else {

            xpGuanyadaText.textContent =
                "No has millorat el teu rècord d'XP";


            mostrarEstatXp(
                dadesResultat.xpNovaCategoria,
                elementsXp
            );
        }
    }


    // =========================
    // EVENTOS
    // =========================

    comprovarEquivalenciaBtn
        .addEventListener(
            "click",
            comprovarEquivalencia
        );


    respostaEquivalencia
        .addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !comprovarEquivalenciaBtn.disabled
                ) {

                    comprovarEquivalencia();
                }
            }
        );


    comprovarNotaBtn
        .addEventListener(
            "click",
            comprovarNota
        );


    respostaNota
        .addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !comprovarNotaBtn.disabled
                ) {

                    comprovarNota();
                }
            }
        );


    finalitzarBtn
        .addEventListener(
            "click",
            () => {

                if (
                    exerciciSuperatActual
                ) {

                    window.location.href =
                        "../../exercicis.html";

                } else {

                    window.location.reload();
                }
            }
        );
}
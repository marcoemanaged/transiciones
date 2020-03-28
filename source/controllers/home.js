const { createCanvas, loadImage } = require('canvas');

mvc.controller({
    name: "home",
    action: "index",
    path: ""
}, function (req, res) {
    // Datos de la Imagen y el Canvas
    let width = 1060;
    let height = 1060;
    const canvas = createCanvas(1060, 1060);
    const ctx = canvas.getContext('2d');

    // carga de la imagen base
    loadImage('content/bg.png').then((image) => {
        /*
            ##############################
            #### NO CAMBIAR EL CÓDIGO ####
            #### CRÍTICO LOS CÁLCULOS ####
            ##############################
        */
        ctx.drawImage(image, 0, 0, 1060, 1060);
        ctx.beginPath();

        ctx.strokeStyle = 'orange'
        // Calculo del centro de la imagen
        let centerStrock = 4;
        let center = {
            x: (width / 2) - centerStrock,
            y: (height / 2) - centerStrock,
        }

        // Descomentar linea para ver el punto en el centro de la imagen
        //ctx.strokeRect(center.x, center.y, centerStrock, centerStrock);

        // Matemática para calcular la Y dentro de una Circunferencia de un circulo negativa
        function getY(circulo) {
            // (x - h)2 + (y - k)2 = r2

            let xVal = (circulo.x - circulo.h) * (circulo.x - circulo.h);
            let rVal = circulo.r * circulo.r;
            let yVal = rVal - xVal;
            yVal = Math.sqrt(yVal);
            yVal = circulo.k - yVal;

            return yVal;
        }

        // Matemática para calcular la Y dentro de una Circunferencia de un circulo positiva
        function getYMinus(circulo) {
            // (x - h)2 + (y - k)2 = r2

            let xVal = (circulo.x - circulo.h) * (circulo.x - circulo.h);
            let rVal = circulo.r * circulo.r;
            let yVal = rVal - xVal;
            yVal = Math.sqrt(yVal);
            yVal = circulo.k + yVal;

            return yVal;
        }

        // Creación del objeto base para guardar todas las coordenadas de las respuestas en la imagen
        function getBase(h, k, r, base) {
            return {
                base: base,
                x: h + base,
                y: 0,
                h: h,
                k: k,
                r: r
            };
        }

        // Obtener el valor de un procentaje para un radio
        function getValueFromP(r, p) {
            return p * r / 100;
        }

        // Crear el punto dentro de una circunferencia, y asignarlo a un número
        function createPoint (x, y, r, p, center, minus, showInCanvas) {
            minus = minus === undefined ? false : minus;

            let base = getBase(x, y, r, getValueFromP(r, p));
            base.y = !minus ? getY(base) : getYMinus(base);

            if(showInCanvas) {
                ctx.strokeRect(base.x, base.y, center, center);
            }

            return base;
        }

        // Constantes que tienen los valores de el primer grupo de circunferencia asignados a los números 1.
        var arrayBases = [];
        let r_of_p = 66;
        let p1 = 65.8 * 100 / r_of_p;
        let p2 = 61.5 * 100 / r_of_p;
        let p3 = 52 * 100 / r_of_p;
        let p4 = 38 * 100 / r_of_p;
        let p5 = 20 * 100 / r_of_p;
        let p6 = 0 * 100 / r_of_p;
        let p7 = -20 * 100 / r_of_p;
        let p8 = -38 * 100 / r_of_p;
        let p9 = -52 * 100 / r_of_p;
        let p10 = -61.5 * 100 / r_of_p;
        let p11 = -65.8 * 100 / r_of_p;
        let p12 = 64.4 * 100 / r_of_p;
        let p13 = 57.5 * 100 / r_of_p;
        let p14 = 44.5 * 100 / r_of_p;
        let p15 = 29.3 * 100 / r_of_p;
        let p16 = 10 * 100 / r_of_p;
        let p17 = -9 * 100 / r_of_p;
        let p18 = -28.3 * 100 / r_of_p;
        let p19 = -44 * 100 / r_of_p;
        let p20 = -57 * 100 / r_of_p;
        let p21 = -64.3 * 100 / r_of_p;

        let percentages = [ p11, p10, p9, p8, p7, p6, p5, p4, p3, p2, p1, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21 ];
        let radios = [66, 100, 132, 166, 200, 232, 266, 300, 332, 366];
        let radioCounter = 1;

        // Obtener y crear todos puntos de cada numero de la imagen utilizando la localización en base a calculo de la Y de una
        // circunferencia de un circulo

        radios.forEach((radio) => {
            let counter = 1;
            percentages.forEach((p) => {
                let sustract = counter > 11 ? true: false;
                arrayBases.push({
                    question: counter,
                    result: radioCounter,
                    item: createPoint(center.x, center.y, radio, p, centerStrock, sustract)
                });
                counter++;
            });
            radioCounter++;
        });

        function getQuestionData (questions, question, result) {
            let qs = questions.filter((item) => item.question === question);
            let result1 = qs.filter((item) => item.result === result);

            return result1[0];
        }

        /*
            #### FIN DE CÓDIGO CRITICO
            La parte que continua es como utilizar la función getQuestionData para escribir las líneas
            en base a las respuesta.

            Todo este código que sigue es un ejemplo que muestra respuestas falsas en la imagen.
            Parametros de la función:

                - arrayBases la dejan igual, es la base de datos completa de todos los puntos de la imagen
                - 1 representa la primera pregunta, que es "Interes Interpersonal" dentro del grupo
                    GESTION DE RELACIONES Y EL EUIPO
                - 5 es la respuesta de 1 a 10 ya calculada de las preguntas que se realizan en la prueba
        */

        let q1 = getQuestionData(arrayBases, 1, 5);
        let q2 = getQuestionData(arrayBases, 2, 2);
        let q3 = getQuestionData(arrayBases, 3, 4);
        let q4 = getQuestionData(arrayBases, 4, 7);
        let q5 = getQuestionData(arrayBases, 5, 1);
        let q6 = getQuestionData(arrayBases, 6, 3);
        let q7 = getQuestionData(arrayBases, 7, 9);
        let q8 = getQuestionData(arrayBases, 8, 6);
        let q9 = getQuestionData(arrayBases, 9, 6);
        let q10 = getQuestionData(arrayBases, 10, 7);
        let q11 = getQuestionData(arrayBases, 11, 8);
        let q12 = getQuestionData(arrayBases, 12, 7);
        let q13 = getQuestionData(arrayBases, 13, 6);
        let q14 = getQuestionData(arrayBases, 14, 9);
        let q15 = getQuestionData(arrayBases, 15, 4);
        let q16 = getQuestionData(arrayBases, 16, 7);
        let q17 = getQuestionData(arrayBases, 17, 8);
        let q18 = getQuestionData(arrayBases, 18, 5);
        let q19 = getQuestionData(arrayBases, 19, 7);
        let q20 = getQuestionData(arrayBases, 20, 8);
        let q21 = getQuestionData(arrayBases, 21, 5);

        ctx.strokeStyle = 'darkgrey'
        ctx.lineWidth = 3;

        ctx.moveTo(q1.item.x, q1.item.y);
        ctx.lineTo(q2.item.x, q2.item.y);

        ctx.moveTo(q2.item.x, q2.item.y);
        ctx.lineTo(q3.item.x, q3.item.y);

        ctx.moveTo(q3.item.x, q3.item.y);
        ctx.lineTo(q4.item.x, q4.item.y);

        ctx.moveTo(q4.item.x, q4.item.y);
        ctx.lineTo(q5.item.x, q5.item.y);

        ctx.moveTo(q5.item.x, q5.item.y);
        ctx.lineTo(q6.item.x, q6.item.y);

        ctx.moveTo(q6.item.x, q6.item.y);
        ctx.lineTo(q7.item.x, q7.item.y);

        ctx.moveTo(q7.item.x, q7.item.y);
        ctx.lineTo(q8.item.x, q8.item.y);

        ctx.moveTo(q8.item.x, q8.item.y);
        ctx.lineTo(q9.item.x, q9.item.y);

        ctx.moveTo(q9.item.x, q9.item.y);
        ctx.lineTo(q10.item.x, q10.item.y);

        ctx.moveTo(q10.item.x, q10.item.y);
        ctx.lineTo(q11.item.x, q11.item.y);

        ctx.moveTo(q11.item.x, q11.item.y);
        ctx.lineTo(q12.item.x, q12.item.y);

        ctx.moveTo(q12.item.x, q12.item.y);
        ctx.lineTo(q13.item.x, q13.item.y);

        ctx.moveTo(q13.item.x, q13.item.y);
        ctx.lineTo(q14.item.x, q14.item.y);

        ctx.moveTo(q14.item.x, q14.item.y);
        ctx.lineTo(q15.item.x, q15.item.y);

        ctx.moveTo(q15.item.x, q15.item.y);
        ctx.lineTo(q16.item.x, q16.item.y);

        ctx.moveTo(q16.item.x, q16.item.y);
        ctx.lineTo(q17.item.x, q17.item.y);

        ctx.moveTo(q17.item.x, q17.item.y);
        ctx.lineTo(q18.item.x, q18.item.y);

        ctx.moveTo(q18.item.x, q18.item.y);
        ctx.lineTo(q19.item.x, q19.item.y);

        ctx.moveTo(q19.item.x, q19.item.y);
        ctx.lineTo(q20.item.x, q20.item.y);

        ctx.moveTo(q20.item.x, q20.item.y);
        ctx.lineTo(q21.item.x, q21.item.y);

        ctx.moveTo(q21.item.x, q21.item.y);
        ctx.lineTo(q1.item.x, q1.item.y);

        ctx.stroke();

        /*
        var X = (1060 / 2) - 1;
        var Y = (1060 / 2) - 1;

        var r1 = 66;
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 1.5;
        ctx.arc(X, Y, r1, 0, 2 * Math.PI);
        ctx.stroke();
        */

        res({
            img: canvas.toDataURL()
        });
    });
});
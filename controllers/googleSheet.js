const { google } = require("googleapis")


const googleSheet = async (req, res) => {

    // Recibimos información del formulario
    const { title, estado, formador } = req.body;






    // Nos autenticaremos con  las credenciales de google
    const auth = new google.auth.GoogleAuth({
        // Credenciales de nuestras aplicaciones
        keyFile: 'credentials.json',
        // Direción de las hojas de google
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    // Objeto de tipo cliente al que le pasaremos nuestras solicitudes
    //devolverá un objeto de tipo cliente
    const client = await auth.getClient();

    // Creamos una instancia de las hojas de Google Sheets API
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    // Obtener metadatos de spreadsheats opcional
    const spreadsheetId = '1phQ2VhUyRAsoslKA1EDiqr-hqehQDPjA_HoIcny00qM';

    const metaData = await googleSheets.spreadsheets.get({
        // recibe: credenciales y id de la hoja de google
        // el id de la hoja lo sacamos de la url de el documento de drive
        //https://docs.google.com/spreadsheets/d/1phQ2VhUyRAsoslKA1EDiqr-hqehQDPjA_HoIcny00qM/edit#gid=0
        // id: 1phQ2VhUyRAsoslKA1EDiqr-hqehQDPjA_HoIcny00qM

        auth,
        spreadsheetId
    });// metadata.data contiene la metadata de la hoja de cálculo


    // recuperar la data para ello, leeremos las filas
    // Obtendremos un objeto de arreglos correspondientes a cada fila de la tabla
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        // El rango debe de escribirse exáctamente como está 
        // nombrada la pestaña de la hoja de calculo
        range: 'Hoja1!A:C' // Podemos manejar el rango  poniendo signo de admiración+rango de columnas
    });//getRows.data.values --> es un arreglo con la información, en donde la posición 0 corresponde a nuestros títulos


    // Escribir filas en una hoja de cálculo

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'Hoja1!A:C',
        valueInputOption: 'RAW',
        resource: {
            values: [ //  Arreglo de datos
                /*["TNode", "Pendiente", "formador 5"],
                ["TNode2", "Pendiente", "formador 6"]*/
                [title, estado, formador]
            ]
        }

    });


    res.send("successfully submitted! Thank you");

}

const view = (req, res) => {
    res.render('index');
}

module.exports = {
    googleSheet, view
}
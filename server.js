var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var path = require('path');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'motel',
    port: 3306
});

connection.connect(function (error) {
    if (error) {
        console.error('Error de conexion');
        throw error;
    } else {
        console.log('Conexion correcta.');
    }
});
app.use(bodyParser.json());

var recursos = [
    {
        id: 1,
        nombre: 'carlos'
    },
    {
        id: 2,
        nombre: 'Gaus'
    }
];

app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static('public'));

app.get('/', function (request, response, next) {

    response.render('index', { titulo: 'Rolo y Gisela' });
});
app.get('/gaus', function (request, response, next) {

    var consulta = connection.query('select nombre ,id from persona', function (error, result) {
        if (error) {
            throw error;
        } else {
            response.render('gaus', { recursos: result });

        }
    });
});


app.post('/gaus', function (request, response, next) {

    console.log(request.body);

    var consulta = connection.query('replace into persona values(?,?)', [request.body.id, request.body.nombre], function (error, result) {
        if (error) {
            throw error;
        } else {
            response.redirect('/gaus');
        }

    });
});

app.listen(3000);
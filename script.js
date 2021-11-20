const express = require("express");
const app = express();
//const { PORT = 3000 } = process.env;
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000);

app.use(cors({
    origin: '*'
}));

var mysql = require('mysql');

var pool  = mysql.createConnection({
    host     : 'database-1.c5yqxryjszwu.us-west-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'stefano00',
    database : 'cursos'
});


pool.connect();

app.post("/curso", async (req, res) => {
    const curso = (req.body);
    pool.query(`INSERT INTO cursos values (0, '${ curso.nombre }', ${curso.nivelTecnico}, '${curso.fechaInicio}', ${curso.duracion})`, function (error, results, fields) {
        if (error) throw error;
        console.log();
        res.send(results);  
      });
});
app.get("/cursos", (req, res) => {
    try {
        pool.query(`SELECT * FROM cursos`, function (error, results, fields) {
            console.log("results ", results);
            if (error) {
                console.log("error ", error);
                throw error};
                res.send(results);
        });
       
        
    } catch (e) {
        console.log(e);
        return e;
    }
   
});
app.put("/curso", async (req, res) => {
    console.log("PUT", req.body);
    const curso = (req.body);
     pool.query(
        `UPDATE cursos SET nombre = '${curso.nombre}', nivel = ${curso.nivelTecnico}, fecha = '${curso.fechaInicio}', duracion = ${curso.duracion} WHERE id = ${curso.id}`
    , function (error, results, fields) {
        if (error) {
            console.log("error ", error);
            throw error
        };
        res.send(results);
        
    });
});


app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = pool.query(`DELETE FROM cursos WHERE id =
    '${id}'`, function(error, results){
        results > 0
            ? res.send(`El actor de id ${id} fue elimado con éxito`)
            : res.send("No existe un actor registrado con ese id");

    });
        return result.rowCount;
    } catch (e) {
        return e;
    }
});

console.log("ANDANDO en puerto 3000");
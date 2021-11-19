// const { Pool } = require("pg");
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     password: "stefano00",
//     database: "postgres",
//     port: 5433,
// });

var mysql = require('mysql');

var pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'stefano00',
    database: 'cursos'
});


pool.connect();

async function nuevoCurso(curso) {
    pool.query(`INSERT INTO cursos values (0, '${curso.nombre}', ${curso.nivelTecnico}, '${curso.fechaInicio}', ${curso.duracion})`, function (error, results, fields) {
        if (error) throw error;
        return results

    });

}

function getCursos() {
    try {
        const result = pool.query(`SELECT * FROM cursos`, function (error, results, fields) {
            console.log("results ", results);
            if (error) {
                console.log("error ", error);
                throw error
            };
            return results
        });


    } catch (e) {
        console.log(e);
        return e;
    }
}


async function editCurso(curso) {
    try {
        console.log("curso ", curso);
        const respuesta = curso;
        const res = pool.query(
            `UPDATE cursos SET nombre = '${curso.nombre}', nivel = ${curso.nivelTecnico}, fecha = '${curso.fechaInicio}', duracion = ${curso.duracion} WHERE id = ${curso.id}`
        , function (error, results, fields) {
            if (error) {
                console.log("error ", error);
                throw error
            };
            res.send(results);
            
        });
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function deleteCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id =
    '${id}'`);
        return result.rowCount;
    } catch (e) {
        return e;
    }
}

module.exports = {
    nuevoCurso,
    getCursos,
    editCurso,
    deleteCurso
};

// Invocar los paquetes express y mysql

const json  = require('express');
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var app = express();
// crear conexion con mysql
//app.use(json.json()); 

app.use(express.json());
app.use(cors()); 



var conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'articulosbd'
});


// probar conexion

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("conexion exitosa!!");
    }
});

// Referencia al constructor de Express



// Mostrar Todos los artículos
app.get('/api/articulos',(req,res)=>{
    conexion.query('SELECT * FROM articulos ORDER BY id ASC', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

// Mostrar un artículo

app.get('/api/articulos/:id', (req,res)=>{
    conexion.query('SELECT * FROM articulos WHERE id= ?', [req.params.id], (error,fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    });

});

// Crear articulo

app.post('/api/articulos/', (req, res)=>{
    let data={ descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock };
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, (error, results)=>{
        if(error){
            throw error;
        }else{
            // var ejm = Object.assign(data, {id: results.id });
            Object.assign(data, {id: results.id });
            // res.send(data);
            res.send(results);
            //console.log(ejm);
        }
    });
});

// Modificar articulos

app.put('/api/articulos/:id', (req,res)=>{
    let id= req.params.id;
    let descripcion= req.body.descripcion;
    let precio= req.body.precio;
    let stock= req.body.stock;
    let sql="UPDATE articulos SET descripcion= ?, precio= ?, stock= ? WHERE id= ?";
    conexion.query(sql,[descripcion,precio,stock,id], function(error, results){
        if(error){
            throw error
        }else{
            res.send(results);
        }
    });
});

// Eliminar Articulos

app.delete('/api/articulos/:id', (req,res)=>{
    let id = req.params.id;
    conexion.query("DELETE FROM articulos WHERE id =?", id, (error, results)=>{
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
});

// Ruta principal
app.get('/',function(req,res){
    res.send("Ruta INICIO");
});

// Crear variables de Entorno
const puerto = process.env.PUERTO || 3000; // con este codigo se evalua si el puerto no tiene nada se ejecuta en el 3000
// const puerto=10000;

// listen('puerto', funcion que devuelva mensaje al conectar con servidor)
app.listen(puerto,function(){
    console.log("Servidor OK en puerto:"+puerto);
});

// setear variable puerto para hacer la prueba
// set PUERTO=7000
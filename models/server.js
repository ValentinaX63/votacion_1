const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;


        this.userPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //conectar a BD
        this.conectarDB();
        
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicaciones
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'))

    }
    routes(){
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));
          
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor Corriendo en el puerto', this.port);
        });
    }

}



module.exports = Server;
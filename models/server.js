const express = require('express')
const cors = require('cors')
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user'

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicaciones
        this.routes();
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
        
        this.app.use('/api/user', require('../routes/user'));
          
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor Corriendo en el puerto', process.env.PORT);
        });
    }

}



module.exports = Server;
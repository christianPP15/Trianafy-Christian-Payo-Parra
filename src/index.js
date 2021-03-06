import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from "cors";
import express from 'express';
import mongoose from "mongoose";
import morgan from "morgan";
import morganBody from "morgan-body";
import routes from './routes';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
morganBody(app);
app.use('/list',routes.ListaReproduccion);
app.use('/songs',routes.Cancion);
app.use('/auth', routes.auth);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
      console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
    } else {
      console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
      app.listen(process.env.PORT, () =>
        console.log(
          `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
        )
      );
    }
  
  });
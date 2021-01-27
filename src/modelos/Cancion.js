import mongoose from "mongoose";
import { ListaReproduccion } from "./ListaReproduccion";
const { Schema } = mongoose;

const cancionSchema = new Schema(
  {
    titulo: {
      type: String,
      required: "Es necesario indicar el título de la canción",
    },
    nombre_artista: {
      type: String,
      required: "Es necesario especificar el nombre del artista o grupo",
      maxlength: [
        100,
        "El nombre proporcionado para el artista es demasiado largo",
      ],
    },
    album: String,
    anio: {
      type: Number,
      required:"Debe anotar el año dónde fue publicada",
      min:[1930, "El año debe ser mayor a 1930"],
      max:[2030,"El año debe ser menor a 2030"]
    },
  },
  {
    versionKey: false,
  }
);
const Cancion = mongoose.model("Cancion", cancionSchema);

const CancionRepository = {
  async findAll() {
    const result = await Cancion.find({}).exec();
    return result;
  },
  async create(newSong) {
    const theSong = new Cancion({
      titulo: newSong.titulo,
      nombre_artista: newSong.nombre_artista,
      album: newSong.album!=undefined ? newSong.album : "",
      anio: newSong.anio != undefined ? newSong.anio : 0,
    });
    return await theSong.save();
  },
  async findById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const result = await Cancion.findById(id).exec();
      return result != null ? result : undefined;
    } else {
      return undefined;
    }
  },
  async deleteSong(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      let listas=await ListaReproduccion.find({canciones:{$in:[id]}}).exec();
      for(let i=0;i<listas.length;i++){
        for(let j=0;j<listas[i].canciones.length;j++){
          if(listas[i].canciones[j]==id){
            listas[i].canciones.splice(j,1);
            await listas[i].save();
          }
        }
      }
      return await Cancion.findByIdAndRemove(id).exec();
    } else {
      return undefined;
    }
  },
  async editSong(id, modifySong) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const cancionEditada = await Cancion.findById(id).exec();
      if (cancionEditada != null) {
        return await Object.assign(cancionEditada, modifySong).save();
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  },
};
export { Cancion, CancionRepository };

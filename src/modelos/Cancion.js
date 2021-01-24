import mongoose from "mongoose";
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
      min:[0, "El año debe ser mayor al año 0"],
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
      const result = await Cancion.findById(id);
      return result != null ? result : undefined;
    } else {
      return undefined;
    }
  },
  async deleteSong(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await Cancion.findByIdAndRemove(id).exec();
    } else {
      return undefined;
    }
  },
  async editSong(id, modifySong) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const cancionEditada = await Cancion.findById(id);
      if (cancionEditada != null) {
        if(modifySong.titulo) cancionEditada.titulo=modifySong.titulo;
        if(modifySong.nombre_artista) cancionEditada.nombre_artista=modifySong.nombre_artista;
        if(modifySong.album) cancionEditada.album=modifySong.album;
        if(modifySong.anio) cancionEditada.anio=modifySong.anio;
        //Esta parte del código no me gusta hacerla así pero el Object.assign no me funcionaba los objetos solo se quedaba con el nuevo
        return await cancionEditada.save();
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  },
};
export { Cancion, CancionRepository };

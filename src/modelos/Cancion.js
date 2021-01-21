import mongoose from 'mongoose';
const { Schema } = mongoose;

const cancionSchema = new Schema({
    titulo: {
        type:String,
        required:"Es necesario indicar el título de la canción"
    },
    nombre_artista: {
        type:String,
        required:"Es necesario especificar el nombre del artista o grupo",
        maxlength:[100,"El nombre proporcionado para el artista es demasiado largo"]
    },
    album: {
        type:String,
        required:"Es necesario especificar el album al que pertene"
    },
    anio: {
        type:Number,
        required:"Es necesario especificar el año en el que fue publicado"
    }
}, {
    versionKey: false
});
const Cancion = mongoose.model('Cancion', cancionSchema);

const CancionRepository = {
    async findAll() {
        const result = await Cancion.find({}).exec();
        return result;
    },
    async create(newSong) {
        const theSong = new Cancion({
            titulo: newSong.titulo,
            nombre_artista: newSong.nombre_artista,
            album: newSong.album,
            anio: newSong.anio
        });
        try{
            const result = await theSong.save();
            return result;
        }catch(err){
            return err;
        }
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
                return await Object.assign(cancionEditada, modifySong).save();
            } else {
                return undefined;
            }
        } else {
            return undefined
        }

    }
}
export {
    Cancion,
    CancionRepository
}

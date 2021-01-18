import mongoose from 'mongoose';
const { Schema } = mongoose;

const cancionSchema = new Schema({
    titulo: String,
    nombre_artista: String,
    album: String,
    anio: Number
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
        const result = await theSong.save();
        return result;
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

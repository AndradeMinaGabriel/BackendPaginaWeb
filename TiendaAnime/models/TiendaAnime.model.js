import mongoose from 'mongoose';

const TiendaAnimeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        enum: ['Ropa', 'Accesorio'],
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const TiendaAnime = mongoose.model('TiendaAnime', TiendaAnimeSchema);

export default TiendaAnime;

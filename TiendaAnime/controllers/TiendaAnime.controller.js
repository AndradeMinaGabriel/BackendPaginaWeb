import TiendaAnime from '../models/TiendaAnime.model.js';
import mongoose from 'mongoose';

// Obtener todos los productos
export const getAllTiendaAnime = async (req, res) => {
    try {
        const productos = await TiendaAnime.find({}, { __v: 0 });
        if(productos.length === 0) return res.status(404).json({ msg: 'No hay productos' });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener productos', error });
    }
};

// Obtener producto por ID
export const getTiendaAnimeById = async (req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'ID no válido' });
        const producto = await TiendaAnime.findById(id);
        if(!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener producto', error });
    }
};

// Crear producto
export const postTiendaAnime = async (req, res) => {
    try {
        const producto = new TiendaAnime(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ msg: 'Error al crear producto', error });
    }
};

// Actualizar producto
export const putTiendaAnime = async (req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'ID no válido' });
        const producto = await TiendaAnime.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar producto', error });
    }
};

// Eliminar producto
export const deleteTiendaAnime = async (req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'ID no válido' });
        const producto = await TiendaAnime.findByIdAndDelete(id);
        if(!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
        res.status(200).json({ msg: 'Producto eliminado', producto });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar producto', error });
    }
};

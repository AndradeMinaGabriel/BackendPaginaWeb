import { Router } from "express";
import{
    getAllEjemplos,
    getEjemploByid,
    postejemplo,
    putEjemplo,
    deleteEjemplo
} from '../controllers/ejemplo.contoller.js'
const ejemplo = Router();

ejemplo.get('/', getAllEjemplos);

ejemplo.get('/:id', getEjemploByid);

ejemplo.put('/', putEjemplo);

ejemplo.post('/', postejemplo);

ejemplo.delete('/:id', deleteEjemplo);

export default ejemplo;
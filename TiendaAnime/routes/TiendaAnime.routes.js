import { Router } from 'express';
import {
    getAllTiendaAnime,
    getTiendaAnimeById,
    postTiendaAnime,
    putTiendaAnime,
    deleteTiendaAnime
} from '../controllers/TiendaAnime.controller.js';

const router = Router();

router.get('/', getAllTiendaAnime);
router.get('/:id', getTiendaAnimeById);
router.post('/', postTiendaAnime);
router.put('/:id', putTiendaAnime);
router.delete('/:id', deleteTiendaAnime);

export default router;

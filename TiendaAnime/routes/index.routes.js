import { Router } from 'express';
import TiendaAnimeRoutes from './TiendaAnime.routes.js';

const router = Router();

router.use('/TiendaAnime', TiendaAnimeRoutes);

export default router;

import { Router } from 'express';
import { searchVideo, downloadAudio } from './controllers/';

const router = Router();

router.get("/download", downloadAudio);
router.get("/search/:query", searchVideo);

export default router;

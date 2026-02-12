import { Router } from 'express';
import { AIController } from './ai.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();
const aiController = new AIController();

router.use(authenticate);

router.post('/suggest-roles', aiController.suggestRoles);
router.post('/tailor-resume', aiController.tailorResume);
// router.post('/cover-letter', aiController.generateCoverLetter);

export default router;

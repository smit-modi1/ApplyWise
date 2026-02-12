import { Router } from 'express';
import multer from 'multer';
import { ResumesController } from './resumes.controller';
import { authenticate } from '../../middleware/auth';
import { config } from '../../config/env';

const router = Router();
const resumesController = new ResumesController();

// Configure Multer for memory storage (we'll save to disk in service)
// or we can use memory storage to buffer the file for parsing first
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: config.storage.maxFileSize,
    },
    fileFilter: (_req, file, cb) => {
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'application/msword'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOCX files are allowed'));
        }
    },
});

router.use(authenticate);

router.post('/upload', upload.single('resume'), resumesController.upload);
router.get('/', resumesController.getMyResumes);
router.get('/:id', resumesController.getResume);
router.delete('/:id', resumesController.deleteResume);

export default router;

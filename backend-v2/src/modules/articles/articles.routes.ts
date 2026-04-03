import { Router } from 'express';
import { ArticlesController } from './articles.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();
const articlesController = new ArticlesController();

// Public routes
router.get('/', articlesController.getArticles);
router.get('/:slug', articlesController.getArticleBySlug);

// Admin routes (assuming user authorization happens down the line)
router.use(authenticate);
router.post('/', articlesController.createArticle);
router.put('/:id', articlesController.updateArticle);
router.delete('/:id', articlesController.deleteArticle);

export default router;

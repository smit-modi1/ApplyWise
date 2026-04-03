import { Request, Response, NextFunction } from 'express';
import prisma from '../../config/database';
import { AppError } from '../../middleware/errorHandler';

export class ArticlesController {
    
    async getArticles(req: Request, res: Response, next: NextFunction) {
        try {
            const articles = await prisma.article.findMany({
                where: { published: true },
                orderBy: { createdAt: 'desc' },
                include: { author: { select: { firstName: true, lastName: true } } }
            });
            res.json({ status: 'success', data: { articles } });
        } catch (error) {
            next(error);
        }
    }

    async getArticleBySlug(req: Request, res: Response, next: NextFunction) {
        try {
            const article = await prisma.article.findUnique({
                where: { slug: req.params.slug },
                include: { author: { select: { firstName: true, lastName: true } } }
            });
            if (!article) throw new AppError(404, 'Article not found');
            res.json({ status: 'success', data: { article } });
        } catch (error) {
            next(error);
        }
    }

    async createArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.userId;
            const { title, content, published } = req.body;
            if (!title || !content) throw new AppError(400, 'Title and content are required');
            
            // Simple slug generation
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();

            const article = await prisma.article.create({
                data: { title, slug, content, published: published || false, authorId: userId }
            });
            res.status(201).json({ status: 'success', data: { article } });
        } catch (error) {
            next(error);
        }
    }

    async updateArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, content, published } = req.body;
            let slug;
            if (title) {
                slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();
            }
            const article = await prisma.article.update({
                where: { id: req.params.id },
                data: { ...(title && { title, slug }), ...(content && { content }), ...(published !== undefined && { published }) }
            });
            res.json({ status: 'success', data: { article } });
        } catch (error) {
            next(error);
        }
    }

    async deleteArticle(req: Request, res: Response, next: NextFunction) {
        try {
            await prisma.article.delete({ where: { id: req.params.id } });
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

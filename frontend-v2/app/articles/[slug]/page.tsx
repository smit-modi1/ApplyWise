import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import api from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from 'next';

type ArticleParams = {
  params: {
    slug: string;
  };
};

// Next.js dynamic metadata for SEO
export async function generateMetadata({ params }: ArticleParams): Promise<Metadata> {
  try {
    const res = await api.get(`/articles/${params.slug}`);
    const article = res.data.data.article;
    return {
      title: `${article.title} | ApplyWise Blog`,
      description: article.content.substring(0, 150) + '...',
      keywords: ['sponsorship', 'UK visa sponsorship', 'Tier 2', 'jobs'],
    };
  } catch (e) {
    return { title: 'Article Not Found' };
  }
}

export default async function ArticleDetail({ params }: ArticleParams) {
  let article = null;
  try {
    const res = await api.get(`/articles/${params.slug}`);
    article = res.data.data.article;
  } catch (error) {
    notFound();
  }

  if (!article) return notFound();

  return (
    <main className="flex min-h-screen flex-col relative text-white bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-3xl relative z-10 flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>
        <div className="flex items-center text-gray-400 space-x-4 mb-12 border-b border-white/10 pb-6">
          <span>By {article.author?.firstName || 'ApplyWise'} {article.author?.lastName || ''}</span>
          <span>•</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-6">
          {/* Extremely simple formatter mapping newlines to paragraphs mapping */}
          {article.content.split('\n').map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}

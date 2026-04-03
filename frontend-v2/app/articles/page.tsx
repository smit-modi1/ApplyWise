import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import api from "@/lib/api";

type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  author: { firstName: string; lastName: string };
};

// Force dynamic fetch or SSR
export const dynamic = 'force-dynamic';

async function getArticles() {
  try {
    const res = await api.get('/articles');
    return res.data.data.articles as Article[];
  } catch (error) {
    console.error("Failed to fetch articles", error);
    return [];
  }
}

export default async function ArticlesIndex() {
  const articles = await getArticles();

  return (
    <main className="flex min-h-screen flex-col relative text-white bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-5xl relative z-10 flex-grow">
        <h1 className="text-4xl font-bold mb-4">Job Search & Sponsorship Blog</h1>
        <p className="text-gray-400 text-lg mb-12">Actionable advice to land your dream role and secure UK Visa Sponsorship.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.length === 0 ? (
            <p className="text-gray-500">No articles published yet.</p>
          ) : (
            articles.map((article) => (
              <Link href={`/articles/${article.slug}`} key={article.id} className="group flex flex-col justify-between block p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                <div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{article.title}</h2>
                  <p className="text-gray-400 line-clamp-3 mb-4">{article.content}</p>
                </div>
                <div className="text-sm text-gray-500 flex justify-between items-center mt-4">
                  <span>By {article.author?.firstName || 'Admin'}</span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

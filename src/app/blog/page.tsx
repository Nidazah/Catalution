"use client";

import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  image: string;
  author: string;
  authorAvatar: string | null;
  date: string;
  comments: number;
  category: string;
  tags: string[];
  sortOrder: number;
  active: boolean;
  published: boolean;
};

type CategoryFilter = "All" | string;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/blog", { cache: "no-store" });

        if (!res.ok) {
          throw new Error("Failed to load blog posts");
        }

        const data = (await res.json()) as BlogPost[];
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load blog posts.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(posts.map((post) => post.category))],
    [posts],
  );

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") {
      return posts;
    }

    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  const featuredPost = filteredPosts[0] ?? null;
  const recentPosts = filteredPosts.slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Blog" />

      <section className="container mx-auto px-6 py-20">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-gray-500">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="mx-auto mb-10 flex max-w-7xl flex-wrap gap-2 px-6 lg:px-16">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category as CategoryFilter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-[#481d96] text-white"
                      : "bg-white text-gray-600 hover:bg-[#f1edff]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="space-y-10 lg:col-span-2">
                {featuredPost ? (
                  <>
                    <h2 className="mb-6 text-2xl font-bold text-navy">Featured Post</h2>

                    <Link href={`/blog/${featuredPost.id}`} className="group block">
                      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
                        <div className="relative aspect-[16/9] w-full">
                          <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1200px) 100vw, 66vw"
                          />
                        </div>
                        <div className="p-8">
                          <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <User className="h-4 w-4" /> {featuredPost.author}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" /> {featuredPost.date}
                            </span>
                          </div>
                          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-accent">
                            {featuredPost.category}
                          </span>
                          <h3 className="mb-4 text-2xl font-bold text-navy transition-colors group-hover:text-accent md:text-3xl">
                            {featuredPost.title}
                          </h3>
                          <p className="mb-6 leading-relaxed text-gray-600">
                            {featuredPost.excerpt}
                          </p>
                          <div className="flex items-center text-sm font-semibold text-accent transition-transform group-hover:translate-x-1">
                            Read More <ArrowRight className="ml-1.5 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-gray-500">No blog posts found.</p>
                  </div>
                )}

                {filteredPosts.length > 1 && (
                  <div className="grid grid-cols-1 gap-6 border-t border-gray-100 pt-4 md:grid-cols-2">
                    {filteredPosts.slice(1).map((post) => (
                      <div key={post.id} className="group block">
                        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                          <div className="relative h-48 w-full">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                          <div className="flex flex-grow flex-col p-5">
                            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-accent">
                              {post.category}
                            </span>
                            <h4 className="mb-2 line-clamp-2 text-lg font-bold text-navy transition-colors group-hover:text-accent">
                              {post.title}
                            </h4>

                            <div className="mt-auto pt-2">
                              <Link
                                href={`/blog/${post.id}`}
                                className="btn btn-ghost h-auto p-0 text-sm font-bold"
                              >
                                Read more
                              </Link>
                            </div>

                            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" /> {post.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {post.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <aside className="space-y-10">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="mb-4 font-bold text-navy">Categories</h3>
                  <ul className="space-y-2 text-sm">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          type="button"
                          onClick={() => setActiveCategory(category as CategoryFilter)}
                          className="flex w-full items-center justify-between py-2 text-left text-gray-600 transition-colors hover:text-accent"
                        >
                          <span>{category}</span>
                          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                            {category === "All"
                              ? posts.length
                              : posts.filter((post) => post.category === category).length}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="mb-4 font-bold text-navy">Recent Posts</h3>
                  <div className="space-y-5">
                    {recentPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`} className="group flex items-center gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <h4 className="line-clamp-2 text-sm font-semibold text-navy transition-colors group-hover:text-accent">
                            {post.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" /> {post.author}
                            </span>
                            <span>•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-800 bg-navy p-8 text-center">
                  <h4 className="mb-2 text-xl font-bold text-white">Need Expert Advice?</h4>
                  <p className="mb-6 text-sm text-orange-100/70">
                    Let&apos;s discuss your business goals over a coffee.
                  </p>

                  <Link href="/contact" className="btn btn-primary w-full justify-center">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
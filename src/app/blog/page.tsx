"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const response = await fetch("/api/blog", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load blog posts");
        }

        const data = (await response.json()) as BlogPost[];

        if (!cancelled) {
          setPosts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load blog posts:", error);

        if (!cancelled) {
          setPosts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#F9FAFB] pb-24">
      <PageHero title="Blog" />

      <section className="container mx-auto max-w-7xl px-6 py-20">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-gray-500">
              Loading blog posts...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-gray-500">
              No blog posts available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const date = new Date(post.date);
              const day = date.getDate().toString().padStart(2, "0");
              const month = date
                .toLocaleString("default", {
                  month: "short",
                })
                .toUpperCase();

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group block overflow-hidden border border-gray-300 bg-white transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    <div className="absolute right-0 top-0 flex min-w-[56px] flex-col items-center justify-center bg-[#374151]/90 p-2.5 text-white backdrop-blur-sm">
                      <span className="text-[20px] font-bold leading-none">
                        {day}
                      </span>
                      <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wide">
                        {month}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
                        {post.category}
                      </span>

                      <span className="text-[12px] text-gray-500">
                        {post.comments} Comments
                      </span>
                    </div>

                    <h2 className="mb-3 line-clamp-2 text-[22px] font-bold leading-tight text-navy transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>

                    <p className="mb-6 line-clamp-3 text-[15px] leading-relaxed text-[#4B5563]">
                      {post.excerpt}
                    </p>

                    <span className="btn btn-ghost h-auto p-0 text-sm font-bold">
                      Read more
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
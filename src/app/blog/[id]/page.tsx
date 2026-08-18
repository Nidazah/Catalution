"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";

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

export default function BlogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const postRes = await fetch(`/api/blog/${id}`, { cache: "no-store" });

        // A missing post is not an error condition — it's a genuine 404.
        if (postRes.status === 404) {
          if (!cancelled) setNotFound(true);
          return;
        }

        if (!postRes.ok) {
          throw new Error("Unable to load this blog post.");
        }

        const postData = (await postRes.json()) as BlogPost;
        if (cancelled) return;
        setPost(postData);

        const allPostsRes = await fetch("/api/blog", { cache: "no-store" });
        if (allPostsRes.ok && !cancelled) {
          const allPosts = (await allPostsRes.json()) as BlogPost[];
          setPosts(allPosts);
        }
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Route genuinely missing posts to the site's branded 404 page instead of
  // rendering an inline "not found" message on the blog detail route.
  useEffect(() => {
    if (notFound) {
      router.replace("/404");
    }
  }, [notFound, router]);

  const relatedPosts = useMemo(() => {
    if (!post) {
      return [];
    }

    const sameCategory = posts.filter(
      (item) => item.id !== post.id && item.category === post.category,
    );

    const otherPosts = posts.filter(
      (item) => item.id !== post.id && item.category !== post.category,
    );

    return [...sameCategory, ...otherPosts].slice(0, 3);
  }, [post, posts]);

  // While loading, or while the redirect to /404 is in flight, show a
  // lightweight loading state rather than flashing an inline error.
  if (loading || notFound || !post) {
    return (
      <main className="blog-detail min-h-screen bg-white">
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-gray-500">Loading blog post...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-detail min-h-screen bg-white">
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-16">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#d5c9ff]">
            {post.category}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/75">
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                {post.author.slice(0, 1)}
              </span>
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> {post.comments} comments
            </span>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-6 py-16 lg:px-16">
        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-navy prose-a:text-[#481d96]">
          {post.content ? (
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#f1edff] px-3 py-1 text-xs font-medium text-[#481d96]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-navy">Related posts</h2>
            <Link href="/blog" className="text-sm font-semibold text-[#481d96]">
              View all posts
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
                <Link href={`/blog/${item.id}`} className="block">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-accent">
                      {item.category}
                    </p>
                    <h3 className="mb-3 text-lg font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

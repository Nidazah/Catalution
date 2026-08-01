import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/app/data/blog";
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Tag,
  CheckCircle,
  MessageCircle,
  LayoutGrid,
  Reply,
} from "lucide-react";

import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import PageHero from "@/components/PageHero";

// -----------------------------------------------------------------------------
// Sample comments data — replace with real comments from your CMS / DB
// -----------------------------------------------------------------------------
interface CommentItem {
  id: number;
  name: string;
  date: string;
  avatar: string;
  text: string;
  replies?: CommentItem[];
}

const comments: CommentItem[] = [
  {
    id: 1,
    name: "Jami Simth",
    date: "February 03, 2024",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&q=80",
    text: "Our mission is to empower businesses to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight. Our mission is to empower businesses of every size.",
    replies: [
      {
        id: 2,
        name: "Marden Smith",
        date: "March 12, 2024",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&q=80",
        text: "Our mission is to empower businesses to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight. Our mission is to empower businesses of every size.",
      },
    ],
  },
  {
    id: 3,
    name: "Mahin Deen",
    date: "June 22, 2024",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80",
    text: "Our mission is to empower businesses to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight. Our mission is to empower businesses of every size.",
  },
];

function countComments(items: CommentItem[]): number {
  return items.reduce((total, item) => total + 1 + (item.replies?.length ?? 0), 0);
}

function CommentCard({ comment }: { comment: CommentItem }) {
  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex gap-4">
      <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
        <Image 
          src={comment.avatar} 
          alt={comment.name} 
          fill 
          sizes="48px"
          className="object-cover" 
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h5 className="font-bold text-[#0B1426] text-sm">{comment.name}</h5>
            <p className="text-xs text-gray-400 mt-0.5">{comment.date}</p>
          </div>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors shrink-0">
            <Reply className="h-3.5 w-3.5" /> Reply
          </button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mt-3">{comment.text}</p>
      </div>
    </div>
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const totalComments = countComments(comments);

  return (
    <main className="min-h-screen bg-white pt-20">

      {/* --- Shared Page Hero (consistent across all pages) --- */}
      <PageHero title="Blog details" />

      {/* --- ARTICLE TITLE & META (plain, white background) --- */}
      <section className="container mx-auto px-6 pt-16 md:pt-20">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1426] mb-6 tracking-tight">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-10">
            <span className="flex items-center gap-2">
              {post.authorAvatar ? (
                <span className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image
                    src={post.authorAvatar}
                    alt={post.author}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </span>
              ) : (
                <User className="h-4 w-4" />
              )}
              by {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {post.date}
            </span>
            {post.comments !== undefined && (
              <span className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {String(post.comments).padStart(2, "0")} Comments
              </span>
            )}
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 border border-blue-200 rounded-full bg-blue-50 px-3 py-1">
              {post.category}
            </span>
          </div>
        </div>
      </section>

      {/* --- FULL-WIDTH FEATURED IMAGE (below title, no overlay) --- */}
      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* --- BLOG CONTENT BODY --- */}
      <section className="container mx-auto px-6 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto">
          {/* 1. Introduction Paragraph */}
          <p className="text-gray-600 leading-relaxed mb-6">
            In today&apos;s rapidly evolving business landscape, staying ahead
            of the curve isn&apos;t just a competitive advantage—it&apos;s a
            necessity. At Solvior, we&apos;ve spent the last decade helping
            enterprises navigate complex challenges, and we&apos;ve noticed a
            recurring theme among the most successful organizations. They
            don&apos;t just react to change; they anticipate it. In this
            comprehensive guide, we break down the proven strategies that
            drive sustainable growth and foster a culture of continuous
            innovation.
          </p>

          {/* 2. Large Intro Blockquote with attribution */}
          <blockquote className="mb-10 border-l-4 border-blue-600 pl-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic font-medium">
              &ldquo;{post.excerpt}&rdquo;
            </p>
            <cite className="mt-3 block text-sm font-semibold not-italic text-gray-400">
              — {post.author}
            </cite>
          </blockquote>

          {/* 3. Key Lessons / Key Takeaways List */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-10 border border-gray-100">
            <h4 className="font-bold text-[#0B1426] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <CheckCircle className="h-5 w-5 text-blue-600" /> Key Lessons of
              Business
            </h4>
            <ul className="space-y-3 text-gray-600 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                Embracing digital transformation requires a fundamental shift
                in organizational mindset, not just adopting new software.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                Data-driven decision-making drastically reduces risk and
                uncovers hidden opportunities for revenue growth.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                Leadership alignment is the single most critical factor in
                the successful execution of long-term strategic planning.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                Meet our team and learn how a client-first process turns
                strategy into measurable outcomes.
              </li>
            </ul>
          </div>

          {/* 4. Rich Text Paragraphs */}
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum. Sed ut
              perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque
              ipsa quae ab illo inventore veritatis et quasi architecto
              beatae vitae dicta sunt explicabo.
            </p>
          </div>

          {/* 5. Inline Image Section */}
          <div className="my-12">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                alt="Inline content image"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Behind the scenes of our strategic planning workshop.
            </p>
          </div>

          {/* 6. More Paragraphs */}
          <div className="space-y-6 text-gray-600 leading-relaxed mb-8">
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
              odit aut fugit, sed quia consequuntur magni dolores eos qui
              ratione voluptatem sequi nesciunt. Neque porro quisquam est,
              qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit.
            </p>
            <p>
              Sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
              autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur.
            </p>
          </div>

          {/* 8. Tags & Share Row */}
          <div className="pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" /> {tag}
                </span>
              ))}
            </div>

            {/* Share icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">
                Share:
              </span>
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                className="h-9 w-9 rounded-full bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 flex items-center justify-center transition-colors"
              >
                <FaFacebookF className="h-4 w-4" />
              </Link>
              <Link
                href="https://x.com/"
                target="_blank"
                className="h-9 w-9 rounded-full bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 flex items-center justify-center transition-colors"
              >
                <FaXTwitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                className="h-9 w-9 rounded-full bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 flex items-center justify-center transition-colors"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 9. Post Navigation Bar (grid / next) */}
          <div className="mt-8 flex items-center justify-between border border-gray-100 rounded-2xl px-6 py-5">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.id}`}
                className="group flex items-center gap-3 text-sm font-semibold text-[#0B1426] hover:text-blue-600 transition-colors"
              >
                <span className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <ArrowLeft className="h-4 w-4 text-blue-600" />
                </span>
                <span className="hidden sm:inline">Previous</span>
              </Link>
            ) : (
              <span className="h-10 w-10" />
            )}

            <Link
              href="/blog"
              className="h-10 w-10 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
              aria-label="All posts"
            >
              <LayoutGrid className="h-5 w-5" />
            </Link>

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.id}`}
                className="group flex items-center gap-3 text-sm font-semibold text-[#0B1426] hover:text-blue-600 transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                </span>
              </Link>
            ) : (
              <span className="h-10 w-10" />
            )}
          </div>

          {/* 10. Comments List */}
          <div className="mt-16 pt-12 border-t border-gray-100">
            <h3 className="text-2xl font-bold text-[#0B1426] mb-6">
              Comments ({totalComments})
            </h3>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <CommentCard comment={comment} />
                  {comment.replies?.map((reply) => (
                    <div
                      key={reply.id}
                      className="ml-10 md:ml-16 border-l-2 border-gray-100 pl-4 md:pl-6"
                    >
                      <CommentCard comment={reply} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 11. Leave a Reply Form */}
          <div className="mt-16 pt-12 border-t border-gray-100">
            <h3 className="text-2xl font-bold text-[#0B1426] mb-6">
              Leave a reply
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="w-full px-5 py-3.5 rounded-lg bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none text-sm text-gray-700 placeholder:text-gray-400 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="w-full px-5 py-3.5 rounded-lg bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none text-sm text-gray-700 placeholder:text-gray-400 transition-colors"
                />
              </div>
              <input
                type="url"
                name="website"
                placeholder="Your website"
                className="w-full px-5 py-3.5 rounded-lg bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none text-sm text-gray-700 placeholder:text-gray-400 transition-colors"
              />
              <textarea
                name="comment"
                placeholder="Enter your comments"
                rows={6}
                className="w-full px-5 py-3.5 rounded-lg bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none text-sm text-gray-700 placeholder:text-gray-400 transition-colors resize-none"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-[#0B1426] hover:bg-black text-white font-semibold pl-2 pr-6 py-2 rounded-full transition-colors text-sm"
              >
                <span className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
                Leave comment
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
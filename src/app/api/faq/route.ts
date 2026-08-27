import { NextResponse } from "next/server";
import { prisma, withDbRetry } from "@/lib/prisma";

type FaqItem = {
  title: string;
  description: string;
  image?: string;
  meta?: string;
  link?: string;
};

// GET /api/faq — public. Reads the same ContentSection row (sectionKey: "FAQ")
// that /admin/faq manages, and reshapes items from { title, description }
// to { question, answer } for the public FAQ page and ServiceFAQ component.
export async function GET() {
  try {
    const section = await withDbRetry(() =>
      prisma.contentSection.findFirst({
        where: { sectionKey: "FAQ", published: true },
      }),
    );

    const items = (section?.items as FaqItem[] | null) ?? [];
    const faqs = items.map((item) => ({
      question: item.title,
      answer: item.description,
    }));

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("GET /api/faq error:", error);
    return NextResponse.json(
      { error: "Could not load FAQs", faqs: [] },
      { status: 500 },
    );
  }
}
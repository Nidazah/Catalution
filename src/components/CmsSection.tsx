"use client";

export default function CmsSection({
  sectionKey,
  children,
}: {
  sectionKey: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="cms-section"
      data-cms-section={sectionKey}
      data-cms-style-key={sectionKey}
    >
      {children}
    </div>
  );
}

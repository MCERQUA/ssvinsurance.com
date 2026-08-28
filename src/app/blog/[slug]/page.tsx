import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { getAllPosts, getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${SITE.name} Blog`,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date },
  };
}

function renderMarkdown(content: string): React.ReactNode[] {
  const paragraphs = content.split(/\n\n+/);
  const nodes: React.ReactNode[] = [];
  let key = 0;

  function inlineRender(text: string): string {
    return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  for (const block of paragraphs) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("## ")) {
      nodes.push(
        <h2 key={key++} className="font-heading text-2xl text-bark font-bold mt-10 mb-4 border-l-4 border-forest-green pl-4">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      nodes.push(
        <h3 key={key++} className="font-heading text-xl text-bark font-bold mt-8 mb-3">{trimmed.slice(4)}</h3>
      );
    } else if (trimmed.split("\n").every((l) => l.trimStart().startsWith("- "))) {
      const items = trimmed.split("\n").map((l) => l.replace(/^\s*-\s+/, ""));
      nodes.push(
        <ul key={key++} className="list-disc ml-6 space-y-2 my-5">
          {items.map((item, i) => (
            <li key={i} className="font-body text-base text-muted leading-relaxed"
              dangerouslySetInnerHTML={{ __html: inlineRender(item) }} />
          ))}
        </ul>
      );
    } else {
      nodes.push(
        <p key={key++} className="font-body text-base text-muted leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: inlineRender(trimmed.replace(/\n/g, " ")) }} />
      );
    }
  }
  return nodes;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${SITE.url}/blog/${post.slug}/#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
        url: `${SITE.url}/blog/${post.slug}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${post.slug}` },
        ...(post.image ? { image: `${SITE.url}${post.image}` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${SITE.url}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-12">
          <div className="container-xl">
            <FadeIn>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-body mb-6 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Blog
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-body text-xs font-bold text-ember-orange bg-ember-orange/20 px-3 py-1 rounded-full">{post.category}</span>
                <span className="font-body text-xs text-white/60 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                <span className="font-body text-xs text-white/60 flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.date)}</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight mb-4 max-w-3xl">{post.title}</h1>
              <p className="font-body text-white/70 text-lg max-w-2xl">{post.description}</p>
            </FadeIn>
          </div>
        </section>

        {post.image && (
          <div className="relative h-64 sm:h-80 bg-forest-green/10 overflow-hidden">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
          </div>
        )}

        <section className="bg-warm-white py-16">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <article className="lg:col-span-2">
                <FadeIn>
                  <div>{renderMarkdown(post.content)}</div>
                </FadeIn>
                <FadeIn>
                  <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
                    <Link href="/blog" className="inline-flex items-center gap-1.5 text-muted hover:text-forest-green text-sm font-body font-bold group">
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> All articles
                    </Link>
                  </div>
                </FadeIn>
              </article>

              <aside className="space-y-6">
                <FadeIn direction="left">
                  <div className="bg-forest-green rounded-2xl p-7 sticky top-24">
                    <h3 className="font-heading text-xl text-white font-bold mb-3">Get a Quote Today</h3>
                    <p className="font-body text-white/70 text-sm mb-5">Same-day ssv business insurance quotes. Apply online.</p>
                    <Link href="/quote" className="block w-full bg-ember-orange text-white text-center px-5 py-3 rounded-lg font-body font-bold text-sm hover:bg-ember-orange-dark transition-colors mb-3">
                      Get a Free Quote
                    </Link>
                  </div>
                </FadeIn>

                {related.length > 0 && (
                  <FadeIn direction="left" delay={0.1}>
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h3 className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-4">More Articles</h3>
                      <div className="space-y-4">
                        {related.map((r) => (
                          <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                            <div className="flex gap-3 items-start">
                              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-forest-green-50 overflow-hidden relative">
                                <Image src={r.image || "/images/blog-default.jpg"} alt={r.title} fill className="object-cover group-hover:scale-110 transition-transform" sizes="56px" />
                              </div>
                              <div>
                                <p className="font-body text-sm text-bark font-bold leading-snug group-hover:text-forest-green transition-colors line-clamp-2">{r.title}</p>
                                <p className="font-body text-xs text-muted mt-1">{r.readTime}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link href="/blog" className="mt-4 inline-flex items-center gap-1 text-forest-green font-body font-bold text-sm hover:gap-2 transition-all">
                        All articles <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </FadeIn>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

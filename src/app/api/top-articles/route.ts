import { NextResponse } from 'next/server';

const topArticles = [
  {
    id: 1,
    title: "Product-Market Fit: A Complete Guide",
    url: "https://www.lennysnewsletter.com/p/how-to-know-if-youve-got-productmarket",
    description: "Comprehensive guide to finding and measuring product-market fit from Lenny Rachitsky.",
    author: "Lenny Rachitsky",
    source: "Lenny's Newsletter",
    readTime: "12 min read",
    tags: ["Product-Market Fit", "Strategy", "Growth"]
  },
  {
    id: 2,
    title: "How to Say No as a Product Manager",
    url: "https://www.kennorton.com/essays/pm-no.html",
    description: "The art of prioritization and saying no to feature requests as a PM.",
    author: "Ken Norton",
    source: "Ken Norton Blog",
    readTime: "8 min read",
    tags: ["Leadership", "Prioritization", "Decision Making"]
  },
  {
    id: 3,
    title: "Building Products at Scale: Lessons from Stripe",
    url: "https://stripe.com/blog/scaling-product-development",
    description: "How Stripe scales product development while maintaining quality and velocity.",
    author: "Stripe Team",
    source: "Stripe Blog",
    readTime: "15 min read",
    tags: ["Scaling", "Process", "Team Management"]
  },
  {
    id: 4,
    title: "The Ultimate Guide to OKRs for Product Teams",
    url: "https://www.whatmatters.com/articles/okrs-product-teams",
    description: "How to implement OKRs effectively in product management and align teams.",
    author: "What Matters",
    source: "What Matters",
    readTime: "10 min read",
    tags: ["OKRs", "Planning", "Goal Setting"]
  },
  {
    id: 5,
    title: "Data-Driven Product Management",
    url: "https://amplitude.com/blog/data-driven-product-management",
    description: "How to make product decisions based on data insights rather than opinions.",
    author: "Amplitude Team",
    source: "Amplitude Blog",
    readTime: "9 min read",
    tags: ["Data", "Analytics", "Decision Making"]
  },
  {
    id: 6,
    title: "Product Discovery Techniques That Work",
    url: "https://svpg.com/product-discovery/",
    description: "Best practices for product discovery and validation from SVPG.",
    author: "Marty Cagan",
    source: "SVPG",
    readTime: "11 min read",
    tags: ["Discovery", "Validation", "Customer Research"]
  },
  {
    id: 7,
    title: "The Art of Product Positioning",
    url: "https://a16z.com/obviously-awesome-product-positioning/",
    description: "How to position your product to win in competitive markets.",
    author: "April Dunford",
    source: "a16z",
    readTime: "13 min read",
    tags: ["Positioning", "Marketing", "Go-to-Market"]
  },
  {
    id: 8,
    title: "Building Customer Empathy as a PM",
    url: "https://amplitude.com/blog/customer-empathy-product-management",
    description: "Techniques for developing deep customer understanding and translating insights into decisions.",
    author: "Amplitude Team",
    source: "Amplitude Blog",
    readTime: "7 min read",
    tags: ["Customer Empathy", "User Research", "Customer Development"]
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      articles: topArticles,
      count: topArticles.length
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
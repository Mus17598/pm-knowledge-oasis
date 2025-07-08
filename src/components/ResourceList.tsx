import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useResourceModal } from './ResourceModalContext';
import ReactDOM from 'react-dom';

const staticResources = {
  videos: [
    {
      "title": "Product School",
      "url": "https://www.youtube.com/channel/UC6hlQ0x6kPbAGjYkoz53cvA",
      "platform": "YouTube",
      "description": "Webinars, expert interviews, and PM career tips from the global leader in PM training.",
      "tag": "Foundational Skills"
    },
    {
      "title": "Dan Olsen",
      "url": "https://www.youtube.com/user/danolsen",
      "platform": "YouTube",
      "description": "Author of The Lean Product Playbook sharing frameworks and interviews with PM luminaries.",
      "tag": "Foundational Skills"
    },
    {
      "title": "Exponent",
      "url": "https://www.youtube.com/c/Exponent",
      "platform": "YouTube",
      "description": "PM interview prep, mock interviews, case studies, and career advice.",
      "tag": "Career & Interview Prep"
    },
    {
      "title": "Product Gym",
      "url": "https://www.youtube.com/c/ProductGym",
      "platform": "YouTube",
      "description": "Career acceleration, networking advice, and FAANG interview coaching.",
      "tag": "Career & Interview Prep"
    },
    {
      "title": "The Product Folks",
      "url": "https://www.youtube.com/c/TheProductFolks",
      "platform": "YouTube",
      "description": "Community-driven PM tips, expert AMAs, and skill workshops.",
      "tag": "Community & Real-World Insights"
    },
    {
      "title": "Shravan Tickoo (SWAG WALA PM)",
      "url": "https://www.youtube.com/c/SwagWalaPM",
      "platform": "YouTube",
      "description": "In-depth PM frameworks, case studies, and interview prep for aspiring PMs.",
      "tag": "Community & Real-World Insights"
    },
    {
      "title": "Women In Product",
      "url": "https://www.youtube.com/c/WomenInProduct",
      "platform": "YouTube",
      "description": "Keynotes and panels from women product leaders promoting representation and equity.",
      "tag": "Diversity & Leadership"
    },
    {
      "title": "Aarushi Sharma",
      "url": "https://www.youtube.com/c/AarushiSharma",
      "platform": "YouTube",
      "description": "PM insights from the MENA region—transition stories, stress management, and career growth.",
      "tag": "Diversity & Leadership"
    },
    {
      "title": "Mind the Product",
      "url": "https://www.youtube.com/c/MindTheProduct",
      "platform": "YouTube",
      "description": "Talks, workshops, and conference sessions from one of the world's biggest PM communities.",
      "tag": "Foundational Skills"
    },
    {
      "title": "Productized",
      "url": "https://www.youtube.com/c/ProductizedConf",
      "platform": "YouTube",
      "description": "Conference talks & masterclasses on product strategy and escaping the 'build trap'.",
      "tag": "Foundational Skills"
    },
    {
      "title": "PM Diego Granados",
      "url": "https://www.youtube.com/c/DiegoGranadosPM",
      "platform": "YouTube",
      "description": "Advice for breaking into PM, day-in-the-life, and real-world career guidance.",
      "tag": "Career & Interview Prep"
    },
    {
      "title": "Liam Bolling",
      "url": "https://www.youtube.com/c/LiamBolling",
      "platform": "YouTube",
      "description": "PM career advice and resume/interview tactics, from a Google PM.",
      "tag": "Career & Interview Prep"
    },
    {
      "title": "Alisa Works",
      "url": "https://www.youtube.com/c/AlisaWorks",
      "platform": "YouTube",
      "description": "Tips on surviving your first months in PM, productivity, and growth advice.",
      "tag": "Career & Interview Prep"
    },
    {
      "title": "Colors of Chloe",
      "url": "https://www.youtube.com/c/ColorsofChloe",
      "platform": "YouTube",
      "description": "Career path insights from a former tech PM—with storytelling and real AV experience.",
      "tag": "Diversity & Leadership"
    },
    {
      "title": "Product Collective",
      "url": "https://www.youtube.com/c/ProductCollective",
      "platform": "YouTube",
      "description": "Talks from Product Conferences and leadership insights from top PMs.",
      "tag": "Community & Real-World Insights"
    }
  ],
  courses: [
    {
      "title": "Introduction to Product Management by Cognitir",
      "url": "https://careerfoundry.com/en/blog/product-management/introduction-to-product-management/",
      "platform": "CareerFoundry (online)",
      "description": "A beginner-friendly 12‑hour overview covering PM fundamentals like MVPs, user interviews, wireframing.",
      "tag": "Beginner"
    },
    {
      "title": "Free Product Management Course by Great Learning Academy",
      "url": "https://www.greatlearning.in/academy/learn-for-free/courses/product-management-basics",
      "platform": "Great Learning",
      "description": "Self-paced introduction to product lifecycle, strategy, and PM role (~2–3 h).",
      "tag": "Beginner"
    },
    {
      "title": "Product Management First Steps",
      "url": "https://www.linkedin.com/learning/product-management-first-steps",
      "platform": "LinkedIn Learning",
      "description": "Short course (~2 h) teaching PM day‑to‑day, lifecycle and key skills.",
      "tag": "Beginner"
    },
    {
      "title": "Become a Product Manager | Learn the Skills & Get the Job",
      "url": "https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-a-job/",
      "platform": "Udemy",
      "description": "Comprehensive beginner-to-intermediate course (13+ h) covering PM tools, user research, and job prep.",
      "tag": "Intermediate"
    },
    {
      "title": "Product Management A–Z",
      "url": "https://www.udemy.com/course/product-management-a-z/",
      "platform": "Udemy",
      "description": "4.5 h course focused on product planning, user stories, roadmaps, and interview prep.",
      "tag": "Intermediate"
    },
    {
      "title": "Digital Product Management Specialization",
      "url": "https://www.coursera.org/specializations/digital-product-management-uvic",
      "platform": "Coursera (Univ. of Virginia)",
      "description": "Series of courses from strategy to launch using Agile, roadmapping, metrics.",
      "tag": "Intermediate"
    },
    {
      "title": "Advanced Product Management: Vision, Strategy & Metrics",
      "url": "https://www.udemy.com/course/advanced-product-management-vision-strategy-metrics/",
      "platform": "Udemy",
      "description": "Advanced course on product vision, strategy implementation, and data-driven decision making.",
      "tag": "Advanced"
    },
    {
      "title": "Advanced Product Management Program (Stanford Online)",
      "url": "https://online.stanford.edu/programs/advanced-product-management-program",
      "platform": "Stanford Online",
      "description": "Advanced-level online program covering full lifecycle, strategy, and execution.",
      "tag": "Advanced"
    },
    {
      "title": "Mastering Product Management Program",
      "url": "https://www.reforge.com/courses/mastering-product-management/details",
      "platform": "Reforge",
      "description": "Advanced cohort-based program focusing on strategy, metrics, and roadmap execution.",
      "tag": "Advanced"
    },
    {
      "title": "Advanced Product Management Training",
      "url": "https://www.productfaculty.com/",
      "platform": "Product Faculty / Maven",
      "description": "5‑week hands-on cohort training for senior PMs led by former execs at top tech companies.",
      "tag": "Advanced"
    }
  ],
  people: [
    {
      "title": "Melissa Perri",
      "url": "https://www.linkedin.com/in/melissaperri",
      "platform": "LinkedIn",
      "description": "Product strategy expert, CEO Advisor, author of *Escaping the Build Trap*."
    },
    {
      "title": "Teresa Torres",
      "url": "https://www.linkedin.com/in/teresatorres",
      "platform": "LinkedIn",
      "description": "Product discovery coach and author of *Continuous Discovery Habits*, very active with frequent posts."
    },
    {
      "title": "Lenny Rachitsky",
      "url": "https://www.linkedin.com/in/lennyrachitsky",
      "platform": "LinkedIn",
      "description": "Host of top PM newsletter and prolific poster on growth, career, AI, and product strategy."
    },
    {
      "title": "Shreyas Doshi",
      "url": "https://www.linkedin.com/in/shreyasdoshi",
      "platform": "LinkedIn",
      "description": "Former PM at Stripe/YouTube/Twitter, shares deep operational PM insights and frameworks."
    },
    {
      "title": "Aakash Gupta",
      "url": "https://www.linkedin.com/in/aakashgupta",
      "platform": "LinkedIn",
      "description": "Product growth expert, posts insights and analysis about product trends and tactics."
    },
    {
      "title": "Diego Granados",
      "url": "https://www.linkedin.com/in/diegogranados",
      "platform": "LinkedIn",
      "description": "PM coach and advisor, shares career advice, frameworks, and AMAs."
    },
    {
      "title": "Paweł Huryn",
      "url": "https://www.linkedin.com/in/pawel-huryn",
      "platform": "LinkedIn",
      "description": "Founder of The Product Compass newsletter, posts AI & PM insights regularly."
    },
    {
      "title": "Dr. Nancy Li",
      "url": "https://www.linkedin.com/in/nancyli",
      "platform": "LinkedIn",
      "description": "AI-focused PM coach, director-level, creates video and text content for PM careers."
    },
    {
      "title": "Shyvee Shi",
      "url": "https://www.linkedin.com/in/shyveeshi",
      "platform": "LinkedIn",
      "description": "PM instructor at LinkedIn Learning, posts career and transformation insights."
    },
    {
      "title": "Chloe Shih",
      "url": "https://www.linkedin.com/in/chloeshih",
      "platform": "LinkedIn",
      "description": "Product leader posting career reflections and industry trends."
    },
    {
      "title": "Jim Semick",
      "url": "https://www.linkedin.com/in/jimsemick",
      "platform": "LinkedIn",
      "description": "Co-founder of ProductPlan, shares strategic product guidance and roadmap practices."
    },
    {
      "title": "Andrew Bowker",
      "url": "https://www.linkedin.com/in/andrewbowker",
      "platform": "LinkedIn",
      "description": "Senior PM at IBM, shares content on building side‑products, career tips, and PM skills."
    },
    {
      "title": "Aalok Shah",
      "url": "https://www.linkedin.com/in/aalokshah",
      "platform": "LinkedIn",
      "description": "Product leader tweeting and posting about product-market fit and startup PM lessons."
    },
    {
      "title": "Carlos Gonzalez de Villaumbrosia",
      "url": "https://www.linkedin.com/in/cgvillaumbrosia",
      "platform": "LinkedIn",
      "description": "Founder of Product School and ProductCon, shares industry insights and community events."
    },
    {
      "title": "Sachin Rekhi",
      "url": "https://www.linkedin.com/in/sachinrekhi",
      "platform": "LinkedIn",
      "description": "Serial product entrepreneur; writes clean, practical PM advice across platforms."
    },
    {
      "title": "Marty Cagan",
      "url": "https://www.linkedin.com/in/martycagan",
      "platform": "LinkedIn",
      "description": "Founder of SVPG and author of *Inspired*, frequently shares leadership-level PM insights."
    },
    {
      "title": "Roman Pichler",
      "url": "https://www.linkedin.com/in/romanpichler",
      "platform": "LinkedIn",
      "description": "Agile and Lean specialist, writes about product ownership and discovery frameworks."
    },
    {
      "title": "Tim Herbig",
      "url": "https://www.linkedin.com/in/timherbig",
      "platform": "LinkedIn",
      "description": "Product strategist; shares frameworks on PM mindset, research, and career growth."
    },
    {
      "title": "Rich Mironov",
      "url": "https://www.linkedin.com/in/richmironov",
      "platform": "LinkedIn",
      "description": "Experienced PM coach, talks about enterprise PM challenges and leadership."
    },
    {
      "title": "Jason Fried",
      "url": "https://www.linkedin.com/in/jasonfried",
      "platform": "LinkedIn",
      "description": "Basecamp co-founder; although broader scope, his product wisdom and minimalist philosophy shine through PM discussions."
    }
  ]
};

const sections = [
  { id: "articles", label: "Articles" },
  { id: "videos", label: "Videos" },
  { id: "courses", label: "Courses" },
  { id: "people", label: "People to Follow" },
];

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-orange-600 hover:text-orange-800 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-xl font-bold mb-4 text-orange-700">{title}</h3>
        <div className="max-h-[60vh] overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export function ResourceList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState("articles");
  const [modalSection, setModalSection] = useState(null);
  const { setModalOpen, modalOpen } = useResourceModal();

  console.log('modalOpen in ChatBot:', modalOpen);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/top-articles")
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load articles.");
        setLoading(false);
      });
  }, []);

  // Update context when modalSection changes
  useEffect(() => {
    setModalOpen(!!modalSection);
  }, [modalSection, setModalOpen]);

  // Helper to get section data
  const getSectionData = (sectionId) => {
    if (sectionId === "articles") return articles;
    if (sectionId === "videos") return staticResources.videos;
    if (sectionId === "courses") return staticResources.courses;
    if (sectionId === "people") return staticResources.people;
    return [];
  };

  // Helper to render cards
  const renderCards = (data) => (
    <div className="flex flex-col gap-4">
      {data.map((resource, index) => (
        <Card
          key={index}
          style={modalOpen ? { filter: 'blur(4px)', opacity: 0.5, transform: 'scale(0.9)' } : {}}
          className="w-full transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-lg"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
              <Badge variant="secondary" className="ml-2">
                {resource.platform || resource.tag}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {openSection === "people" ? "View Profile →" : "View Resource →"}
            </a>
            {resource.views && (
              <div className="text-xs text-gray-500 mt-2">
                Views: {resource.views} &nbsp;|&nbsp; Engagement: {resource.engagement}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Section content logic
  const sectionData = getSectionData(openSection);
  const showViewMore = sectionData.length > 3;
  const visibleData = sectionData.slice(0, 3);

  return (
    <div className="w-full max-w-2xl mx-auto mt-4"> {/* Reduced max width and top margin */}
      {/* Horizontal Expand Bars */}
      <div className="flex flex-row justify-between gap-2 mb-2">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setOpenSection(section.id)}
            className={`flex-1 px-4 py-3 rounded-t-lg font-semibold text-lg transition-colors duration-150 border-b-4 focus:outline-none
              ${openSection === section.id
                ? "bg-orange-50 border-orange-500 text-orange-700"
                : "bg-white border-transparent text-gray-700 hover:bg-orange-100"}
            `}
            aria-expanded={openSection === section.id}
            aria-controls={`section-content-${section.id}`}
          >
            {section.label}
          </button>
        ))}
      </div>
      {/* Section Content */}
      <div className="bg-white rounded-b-xl shadow border border-orange-100 p-4 min-h-[200px]"> {/* Reduced padding */}
        {openSection === "articles" && (
          <div id="section-content-articles">
            <h3 className="text-2xl font-semibold mb-4 text-black">Articles</h3>
            {loading && <div className="text-gray-500">Loading articles...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && articles.length === 0 && (
              <div className="text-gray-500">No articles found.</div>
            )}
            {renderCards(visibleData)}
            {showViewMore && (
              <button
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                onClick={() => setModalSection("articles")}
              >
                View More
              </button>
            )}
          </div>
        )}
        {openSection === "videos" && (
          <div id="section-content-videos">
            <h3 className="text-2xl font-semibold mb-4 text-black">Videos</h3>
            {renderCards(visibleData)}
            {showViewMore && (
              <button
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                onClick={() => setModalSection("videos")}
              >
                View More
              </button>
            )}
          </div>
        )}
        {openSection === "courses" && (
          <div id="section-content-courses">
            <h3 className="text-2xl font-semibold mb-4 text-black">Courses</h3>
            {renderCards(visibleData)}
            {showViewMore && (
              <button
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                onClick={() => setModalSection("courses")}
              >
                View More
              </button>
            )}
          </div>
        )}
        {openSection === "people" && (
          <div id="section-content-people">
            <h3 className="text-2xl font-semibold mb-4 text-black">People to Follow</h3>
            {renderCards(visibleData)}
            {showViewMore && (
              <button
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                onClick={() => setModalSection("people")}
              >
                View More
              </button>
            )}
          </div>
        )}
      </div>
      {/* Modal for View More */}
      <Modal
        open={!!modalSection}
        onClose={() => setModalSection(null)}
        title={sections.find(s => s.id === modalSection)?.label || ""}
      >
        {renderCards(getSectionData(modalSection || openSection))}
      </Modal>
    </div>
  );
} 
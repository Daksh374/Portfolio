/**
 * Every detail below is taken from the actual repositories
 * (README, package.json / requirements.txt and source tree).
 */
export const projects = [
  {
    id: 'travelease',
    number: '01',
    name: 'TravelEase',
    identity: 'Travel + AI',
    tagline: 'AI-powered travel booking, end to end.',
    year: '2026',
    role: 'Full-stack (MERN)',
    summary:
      'A full-stack MERN travel booking platform where users search flights, hotels and buses, filter and compare results, complete a checkout, manage their bookings from a dashboard — and generate a day-wise AI itinerary for the trip they just booked.',
    description:
      'TravelEase covers the whole booking journey in one product: JWT-authenticated accounts with protected routes, three separate travel inventories served from MongoDB, detail pages per option, a checkout step, and a dashboard to review or cancel bookings. On top of that sits an AI trip planner that turns a destination, budget and duration into a structured day-by-day itinerary.',
    features: [
      {
        title: 'Flights, hotels & buses in one search',
        body: 'Three inventories with filtering by price, rating and type, rendered dynamically from the Express API.',
      },
      {
        title: 'Booking lifecycle & dashboard',
        body: 'Book any travel option, review confirmations, and cancel from a personal dashboard backed by a Booking model.',
      },
      {
        title: 'AI trip planner',
        body: 'Destination, days, budget, interests and travel style go to Groq LLaMA 3, which returns a structured day-wise itinerary with highlights, food and activities.',
      },
      {
        title: 'Auth & hardened API',
        body: 'JWT auth with bcrypt hashing and protected routes, behind helmet, CORS, rate limiting and centralised error handling.',
      },
      {
        title: 'Checkout flow',
        body: 'A dedicated checkout and payment controller wired up with Razorpay, ending in a booking confirmation page.',
      },
      {
        title: 'AI chatbot assistant',
        body: 'An in-app chatbot component sitting alongside the search and planner experience.',
      },
    ],
    stack: [
      { group: 'Frontend', items: ['React 19', 'Vite', 'Tailwind CSS 4', 'Redux Toolkit', 'React Router 7', 'Framer Motion', 'Headless UI', 'Axios', 'date-fns', 'react-hot-toast'] },
      { group: 'Backend', items: ['Node.js', 'Express 5', 'JWT', 'bcryptjs', 'Helmet', 'express-rate-limit', 'Morgan'] },
      { group: 'Database', items: ['MongoDB', 'Mongoose', 'Seed script'] },
      { group: 'AI & Payments', items: ['Groq SDK — LLaMA 3', 'Razorpay'] },
    ],
    architecture: [
      'client/ — React + Vite app with Redux slices for auth, search and bookings',
      'server/ — Express API split into controllers, routes, models and middleware',
      'Models: User, Flight, Hotel, Bus, Booking',
      'Controllers: auth, flights, hotels, buses, bookings, payments, ai',
      'Middleware: JWT auth guard + centralised error handler',
    ],
    links: {
      github: 'https://github.com/Daksh374/TravelEase',
      demo: null,
    },
    tags: ['MERN', 'AI Itinerary', 'Booking', 'Groq'],
    theme: {
      from: '#3A6EA5',
      to: '#5B8CBF',
      glowA: 'rgba(58,110,165,0.16)',
      glowB: 'rgba(91,140,191,0.10)',
      text: '#2E5680',
      tint: 'rgba(58,110,165,0.08)',
    },
  },
  {
    id: 'joblio',
    number: '02',
    name: 'JobLio',
    identity: 'Jobs + recruitment',
    tagline: 'A two-sided job portal for seekers and recruiters.',
    year: '2026',
    role: 'Full-stack (MERN)',
    summary:
      'A full-stack MERN job portal with two distinct experiences in one app: job seekers browse, search and apply with a managed profile and resume, while recruiters create companies, post roles and work through the applicants for each listing.',
    description:
      'JobLio models the hiring loop on both sides. Seekers search listings by title, location and keywords, apply in one click, and track every application they have made. Recruiters get a protected admin area to register a company, publish jobs, and review applicant tables per role — all sharing one Express + MongoDB backend with cookie-based JWT sessions.',
    features: [
      {
        title: 'Job discovery & filtering',
        body: 'Browse and search by title, location or keyword, narrow results with a filter card, and explore roles through a category carousel.',
      },
      {
        title: 'One-click applications',
        body: 'Apply to listings and track status through an applied-jobs table driven by a dedicated application model and controller.',
      },
      {
        title: 'Recruiter workspace',
        body: 'Protected admin routes to create and set up a company, post jobs, manage postings and open the applicant list for any role.',
      },
      {
        title: 'Profile & resume management',
        body: 'Editable profile dialog with resume upload handled by Multer and stored on Cloudinary via a data-URI pipeline.',
      },
      {
        title: 'Auth with persisted sessions',
        body: 'bcrypt-hashed credentials, JWT in an HTTP-only cookie, and Redux Toolkit state kept across reloads with redux-persist.',
      },
      {
        title: 'Component system & theming',
        body: 'Radix-based UI primitives, Embla carousels, Sonner toasts and a light/dark mode toggle across the whole portal.',
      },
    ],
    stack: [
      { group: 'Frontend', items: ['React 18', 'Vite', 'Tailwind CSS 3', 'Redux Toolkit', 'redux-persist', 'React Router 6', 'Radix UI', 'Framer Motion', 'Embla Carousel', 'Sonner', 'Axios'] },
      { group: 'Backend', items: ['Node.js', 'Express 5', 'JWT', 'bcryptjs', 'cookie-parser', 'Multer', 'CORS'] },
      { group: 'Database', items: ['MongoDB', 'Mongoose'] },
      { group: 'Infra', items: ['Cloudinary', 'datauri', 'Vercel'] },
    ],
    architecture: [
      'frontend/ — React app with Redux slices for auth, jobs, companies and applications',
      'backend/ — Express API with user, job, company and application controllers',
      'Models: User, Job, Company, Application',
      'isAuthenticated middleware guards seeker and recruiter routes',
      'Custom hooks fetch jobs, companies and applications per view',
    ],
    links: {
      github: 'https://github.com/Daksh374/JobLio',
      demo: 'https://job-lio.vercel.app/',
    },
    tags: ['MERN', 'Two-sided', 'Cloudinary', 'Live'],
    theme: {
      from: '#E45B32',
      to: '#C94A27',
      glowA: 'rgba(228,91,50,0.16)',
      glowB: 'rgba(201,74,39,0.10)',
      text: '#A93E20',
      tint: 'rgba(228,91,50,0.08)',
    },
  },
  {
    id: 'propfind',
    number: '03',
    name: 'PropFind',
    identity: 'AI / RAG + real estate',
    tagline: 'A RAG + agentic AI real-estate assistant for Delhi NCR.',
    year: '2026',
    role: 'AI engineering + full-stack',
    summary:
      'An AI real-estate assistant for Delhi NCR built on a retrieval-augmented generation pipeline and a LangGraph agent. It answers questions over real property datasets, estimates fair prices, compares listings, and can schedule a visit or message an owner — with a human confirmation step before it acts.',
    description:
      'PropFind ingests Delhi NCR property CSVs into SQLite, turns them into natural-language chunks, and embeds them into ChromaDB. Queries run a SQL pre-filter before vector search, then stream a grounded answer from Groq LLaMA 3.3 over SSE. A LangGraph agent layers seven tools on top of that retrieval core, two of which require explicit user confirmation before they change anything.',
    features: [
      {
        title: 'RAG pipeline over real datasets',
        body: 'CSV → SQLite loader, natural-language chunker for properties and localities, and a ChromaDB embedder using all-MiniLM-L6-v2.',
      },
      {
        title: 'SQL pre-filter, then vector search',
        body: 'The retriever narrows candidates with structured filters before semantic search, so answers stay grounded in the right subset.',
      },
      {
        title: 'Seven-tool LangGraph agent',
        body: 'Property search, full details, fair-price estimation, comparison, visit scheduling, owner inquiries and report generation as a state machine.',
      },
      {
        title: 'Human-in-the-loop confirmation',
        body: 'Scheduling a visit or sending an owner inquiry surfaces a confirmation card the user must approve before the action commits.',
      },
      {
        title: 'Streaming chat interface',
        body: 'A three-panel React UI with SSE streaming messages, filter sidebar, property cards and a visits/inquiry status tab.',
      },
      {
        title: 'Comparison & PDF reports',
        body: 'Side-by-side comparison with market rating, exported as a downloadable ReportLab PDF comparison report.',
      },
    ],
    stack: [
      { group: 'AI / LLM', items: ['Groq llama-3.3-70b-versatile', 'LangGraph', 'langchain-core', 'langchain-groq', 'sentence-transformers'] },
      { group: 'Retrieval', items: ['ChromaDB (persistent)', 'all-MiniLM-L6-v2 embeddings', 'Custom chunker', 'RAG pipeline'] },
      { group: 'Backend', items: ['Python', 'FastAPI', 'SSE (sse-starlette)', 'SQLAlchemy', 'SQLite', 'Pydantic', 'Pandas', 'ReportLab'] },
      { group: 'Frontend', items: ['React 19', 'Vite', 'Tailwind CSS 3', 'Axios', 'lucide-react'] },
    ],
    architecture: [
      'ingest/ — loader (CSV → SQLite), chunker (NL chunks), embedder (ChromaDB upsert + query)',
      'rag/ — retriever (SQL pre-filter → vector search), generator (streaming Groq), pipeline orchestrator',
      'agent/ — 7 tools, LangGraph state machine, preference memory, system prompts',
      'routers/ — /chat (SSE) + /chat/confirm, /properties, agent actions, PDF reports',
      '9 SQLAlchemy tables over Delhi NCR properties, owners, amenities, past sales, tenants, visits and agent logs',
      'scripts/ — one-shot ingestion and a 20-query RAG verification test',
    ],
    links: {
      github: 'https://github.com/Daksh374/PROPFIND_RAG',
      demo: null,
    },
    tags: ['RAG', 'LangGraph Agent', 'FastAPI', 'ChromaDB'],
    theme: {
      from: '#C2871F',
      to: '#A96F14',
      glowA: 'rgba(194,135,31,0.16)',
      glowB: 'rgba(169,111,20,0.10)',
      text: '#8A5A10',
      tint: 'rgba(194,135,31,0.09)',
    },
  },
  {
    id: 'expense-tracker',
    number: '04',
    name: 'Expense Tracker',
    identity: 'Finance + analytics',
    tagline: 'Income, expenses and where the money actually goes.',
    year: '2025',
    role: 'Frontend',
    summary:
      'A React finance tracker for logging income and expenses against categories, then reading them back as a dashboard: rolling 30-day totals, a running balance, and a category breakdown chart — with per-user data persisted locally.',
    description:
      'The app keeps a single source of truth in local storage behind a custom hook, scoped per signed-in user. The tracker page handles adding, editing and deleting transactions with search and type/category filters, while the dashboard derives income, expenses and total balance and renders a Recharts breakdown of spending by category.',
    features: [
      {
        title: 'Add, edit & delete transactions',
        body: 'A single transaction form handles both income and expense entries, with edit-in-place through the transaction list.',
      },
      {
        title: 'Category-based tracking',
        body: 'Entries are filed under Food, Housing, Transport, Health, Shopping, Salary, Freelance or Other.',
      },
      {
        title: 'Dashboard analytics',
        body: 'Stat cards compute rolling 30-day income and expenses plus an all-time running balance with useMemo.',
      },
      {
        title: 'Category breakdown chart',
        body: 'A Recharts pie chart visualises spending distribution and adapts to the active light or dark theme.',
      },
      {
        title: 'Search & filters',
        body: 'Free-text search by description combined with type (income/expense) and category filters.',
      },
      {
        title: 'Per-user persistence & theming',
        body: 'A useLocalStorage hook namespaces transactions per user, with a session-backed login and a persisted dark mode.',
      },
    ],
    stack: [
      { group: 'Frontend', items: ['React 19', 'Vite', 'Tailwind CSS 4', 'JavaScript (ES6+)'] },
      { group: 'Data viz', items: ['Recharts', 'lucide-react'] },
      { group: 'State & storage', items: ['React hooks', 'useMemo derivations', 'localStorage', 'sessionStorage'] },
      { group: 'Deploy', items: ['Vercel'] },
    ],
    architecture: [
      'pages/ — AuthPage, TrackerPage, DashboardPage switched from App state',
      'components/ — TransactionForm, TransactionList, TransactionItem, FilterControls, StatCard, Header',
      'charts/ExpensePieChart — theme-aware Recharts breakdown',
      'hooks/useLocalStorage — persistence keyed per user',
    ],
    links: {
      github: 'https://github.com/Daksh374/Expense_Tracker',
      demo: 'https://expense-tracker-ten-eta-29.vercel.app',
    },
    tags: ['React', 'Recharts', 'Analytics', 'Live'],
    theme: {
      from: '#5C7A4A',
      to: '#47603A',
      glowA: 'rgba(92,122,74,0.16)',
      glowB: 'rgba(71,96,58,0.10)',
      text: '#3D5432',
      tint: 'rgba(92,122,74,0.09)',
    },
  },
];

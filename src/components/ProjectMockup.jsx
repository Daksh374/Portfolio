import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  Plane,
  Search,
  Sparkles,
  Star,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';

const EASE = [0.19, 1, 0.22, 1];
const inView = { once: true, amount: 0.35 };

/* ------------------------------------------------------------------- frame */

function Frame({ label, theme, children, tone = 'browser' }) {
  return (
    <div className="relative h-full w-full">
      {/* ambient glow behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[36px] blur-2xl"
        style={{
          background: `radial-gradient(60% 60% at 30% 20%, ${theme.glowA}, transparent 70%), radial-gradient(55% 55% at 80% 85%, ${theme.glowB}, transparent 70%)`,
        }}
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_28px_70px_-32px_rgba(17,24,39,0.16)]">
        {/* top chrome */}
        <div className="flex shrink-0 items-center gap-2 border-b border-line bg-cream/70 px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
          </span>
          <div className="ml-1.5 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-paper/60 px-2.5 py-1">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: theme.from }}
            />
            <span className="truncate font-mono text-[9.5px] tracking-tight text-graphite/65">
              {label}
            </span>
          </div>
          {tone === 'browser' && (
            <span className="hidden shrink-0 font-mono text-[9px] text-graphite/50 sm:inline">
              live preview
            </span>
          )}
        </div>

        {/* body */}
        <div className="relative min-h-0 flex-1 overflow-hidden p-3.5 sm:p-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(160deg, ${theme.tint}, transparent 55%)`,
            }}
          />
          <div className="relative flex h-full flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- primitives */

const Tab = ({ children, active, theme }) => (
  <span
    className="rounded-md px-2.5 py-1 font-mono text-[9.5px] tracking-tight transition-colors"
    style={
      active
        ? { background: theme.tint, color: theme.text, boxShadow: `inset 0 0 0 1px ${theme.glowA}` }
        : { color: 'rgba(17,24,39,0.45)' }
    }
  >
    {children}
  </span>
);

const Field = ({ label, value }) => (
  <div className="min-w-0 flex-1 rounded-lg border border-line bg-cream/70 px-2.5 py-1.5">
    <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/60">{label}</div>
    <div className="truncate text-[11px] font-medium text-graphite/90">{value}</div>
  </div>
);

const Row = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={inView}
    transition={{ duration: 0.6, ease: EASE, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------- TravelEase */

function TravelEaseMock({ theme }) {
  const flights = [
    { code: 'AI 806', route: 'DEL → GOI', time: '06:15 — 08:45', price: '₹4,820', rating: '4.6' },
    { code: '6E 512', route: 'DEL → GOI', time: '09:40 — 12:05', price: '₹5,140', rating: '4.4' },
  ];
  const days = ['Beaches & Fort Aguada', 'Old Goa churches + café trail', 'Dudhsagar day trip'];

  return (
    <Frame label="travelease — search flights, hotels & buses" theme={theme}>
      {/* search header */}
      <Row className="flex items-center gap-1.5">
        <Tab active theme={theme}>Flights</Tab>
        <Tab theme={theme}>Hotels</Tab>
        <Tab theme={theme}>Buses</Tab>
        <span className="ml-auto flex items-center gap-1 rounded-md border border-line px-2 py-1 font-mono text-[9px] text-graphite/65">
          <Search className="h-2.5 w-2.5" /> filters
        </span>
      </Row>

      <Row delay={0.06} className="mt-2.5 flex items-center gap-2">
        <Field label="From" value="Delhi (DEL)" />
        <ArrowRight className="h-3 w-3 shrink-0 text-graphite/60" />
        <Field label="To" value="Goa (GOI)" />
        <Field label="Depart" value="18 Oct" />
      </Row>

      <div className="mt-3 grid min-h-0 flex-1 gap-2.5 sm:grid-cols-[1.15fr_0.85fr]">
        {/* results */}
        <div className="space-y-2">
          {flights.map((flight, i) => (
            <Row key={flight.code} delay={0.14 + i * 0.09}>
              <div className="group/card rounded-xl border border-line bg-cream/70 p-2.5 transition-all duration-500 hover:border-line-strong hover:bg-cream-deep">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="grid h-6 w-6 place-items-center rounded-md"
                      style={{ background: theme.tint, color: theme.text }}
                    >
                      <Plane className="h-3 w-3" />
                    </span>
                    <span className="font-mono text-[9.5px] text-graphite/60">{flight.code}</span>
                  </span>
                  <span className="text-[12px] font-semibold" style={{ color: theme.text }}>
                    {flight.price}
                  </span>
                </div>
                <div className="mt-2 text-[11px] font-medium text-graphite/90">{flight.time}</div>
                <div className="mt-1 flex items-center justify-between font-mono text-[9px] text-graphite/65">
                  <span>{flight.route} · non-stop</span>
                  <span className="inline-flex items-center gap-0.5">
                    <Star className="h-2.5 w-2.5" style={{ color: theme.from }} /> {flight.rating}
                  </span>
                </div>
                <div className="mt-2 h-px w-full overflow-hidden bg-cream-deep">
                  <motion.span
                    className="block h-full w-1/3"
                    style={{ background: `linear-gradient(90deg, ${theme.from}, transparent)` }}
                    animate={{ x: ['-100%', '300%'] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', delay: i * 0.6 }}
                  />
                </div>
              </div>
            </Row>
          ))}

          <Row delay={0.34}>
            <div className="flex items-center justify-between rounded-xl border border-dashed border-line px-2.5 py-2 font-mono text-[9px] text-graphite/60">
              <span>bookings · dashboard</span>
              <span style={{ color: theme.text }}>2 upcoming</span>
            </div>
          </Row>
        </div>

        {/* AI planner */}
        <Row delay={0.24} className="min-h-0">
          <div
            className="flex h-full flex-col rounded-xl border p-2.5"
            style={{ borderColor: theme.glowA, background: theme.tint }}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" style={{ color: theme.text }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: theme.text }}>
                AI trip planner
              </span>
            </div>
            <div className="mt-2 space-y-1.5">
              {days.map((day, i) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.42 + i * 0.12 }}
                  className="rounded-lg border border-line bg-paper/50 px-2 py-1.5"
                >
                  <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/65">
                    Day {i + 1}
                  </div>
                  <div className="mt-0.5 text-[10px] leading-snug text-graphite/80">{day}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-auto pt-2 font-mono text-[8.5px] text-graphite/60">
              groq · llama 3 · day-wise itinerary
            </div>
          </div>
        </Row>
      </div>
    </Frame>
  );
}

/* ----------------------------------------------------------------- JobLio */

function JobLioMock({ theme }) {
  const jobs = [
    { role: 'Frontend Engineer', company: 'Nimbus Labs', place: 'Gurgaon', type: 'Full-time', pay: '12 LPA' },
    { role: 'Backend Developer', company: 'Corevault', place: 'Remote', type: 'Full-time', pay: '15 LPA' },
  ];
  const applicants = [
    { name: 'A. Sharma', status: 'Shortlisted', tone: 'good' },
    { name: 'R. Mehta', status: 'Pending', tone: 'idle' },
    { name: 'K. Iyer', status: 'Rejected', tone: 'bad' },
  ];

  return (
    <Frame label="job-lio.vercel.app — jobs & recruiter dashboard" theme={theme}>
      <Row className="flex items-center gap-1.5">
        <Tab active theme={theme}>Jobs</Tab>
        <Tab theme={theme}>Browse</Tab>
        <Tab theme={theme}>Applied</Tab>
        <span className="ml-auto flex items-center gap-1.5 rounded-md border border-line bg-cream/70 px-2 py-1">
          <Search className="h-2.5 w-2.5 text-graphite/60" />
          <span className="font-mono text-[9px] text-graphite/65">react developer</span>
        </span>
      </Row>

      <div className="mt-3 grid min-h-0 flex-1 gap-2.5 sm:grid-cols-[1fr_0.9fr]">
        {/* seeker side */}
        <div className="space-y-2">
          {jobs.map((job, i) => (
            <Row key={job.role} delay={0.1 + i * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-line bg-cream/70 p-2.5 transition-colors duration-500 hover:border-line-strong"
              >
                <div className="flex items-start gap-2">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-lg font-display text-[10px] font-semibold"
                    style={{ background: theme.tint, color: theme.text }}
                  >
                    {job.company[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11.5px] font-semibold text-graphite/90">{job.role}</div>
                    <div className="font-mono text-[9px] text-graphite/65">
                      {job.company} · {job.place}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[8.5px] text-graphite/65">
                    {job.type}
                  </span>
                  <span className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[8.5px] text-graphite/65">
                    {job.pay}
                  </span>
                  <span
                    className="ml-auto rounded-full px-2 py-0.5 font-mono text-[8.5px] font-semibold"
                    style={{ background: theme.from, color: '#ffffff' }}
                  >
                    Apply
                  </span>
                </div>
              </motion.div>
            </Row>
          ))}

          <Row delay={0.32}>
            <div className="flex items-center gap-1.5 overflow-hidden">
              {['Engineering', 'Data', 'Design', 'Product'].map((cat) => (
                <span
                  key={cat}
                  className="shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[8.5px] text-graphite/65"
                >
                  {cat}
                </span>
              ))}
            </div>
          </Row>
        </div>

        {/* recruiter side */}
        <Row delay={0.22} className="min-h-0">
          <div
            className="flex h-full flex-col rounded-xl border p-2.5"
            style={{ borderColor: theme.glowA, background: theme.tint }}
          >
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3 w-3" style={{ color: theme.text }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: theme.text }}>
                Recruiter · applicants
              </span>
            </div>

            <div className="mt-2 space-y-1">
              {applicants.map((applicant, i) => (
                <motion.div
                  key={applicant.name}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.36 + i * 0.1 }}
                  className="flex items-center justify-between rounded-lg border border-line bg-paper/50 px-2 py-1.5"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-line" />
                    <span className="font-mono text-[9.5px] text-graphite/70">{applicant.name}</span>
                  </span>
                  <span
                    className="rounded-full px-1.5 py-0.5 font-mono text-[8px]"
                    style={{
                      background:
                        applicant.tone === 'good'
                          ? 'rgba(63,122,79,0.12)'
                          : applicant.tone === 'bad'
                            ? 'rgba(180,71,58,0.12)'
                            : 'rgba(17,24,39,0.06)',
                      color:
                        applicant.tone === 'good'
                          ? '#3F7A4F'
                          : applicant.tone === 'bad'
                            ? '#B4473A'
                            : 'rgba(17,24,39,0.5)',
                    }}
                  >
                    {applicant.status}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-1 pt-2">
              <div className="flex items-center justify-between font-mono text-[8.5px] text-graphite/60">
                <span>post job</span>
                <span>company setup</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-cream-deep">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${theme.from}, ${theme.to})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '72%' }}
                  viewport={inView}
                  transition={{ duration: 1.3, ease: EASE, delay: 0.7 }}
                />
              </div>
            </div>
          </div>
        </Row>
      </div>
    </Frame>
  );
}

/* --------------------------------------------------------------- PropFind */

function PropFindMock({ theme }) {
  return (
    <Frame label="propfind — AI real estate assistant · Delhi NCR" theme={theme}>
      <div className="grid min-h-0 flex-1 gap-2.5 sm:grid-cols-[0.72fr_1.28fr]">
        {/* filters + property */}
        <div className="flex min-h-0 flex-col gap-2">
          <Row>
            <div className="rounded-xl border border-line bg-cream/70 p-2.5">
              <div className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-graphite/60">
                Filters
              </div>
              <div className="mt-1.5 space-y-1.5">
                {[
                  ['City', 'Gurgaon'],
                  ['Type', '3 BHK'],
                  ['Budget', '≤ ₹1.2 Cr'],
                ].map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between font-mono text-[9px]">
                    <span className="text-graphite/65">{key}</span>
                    <span style={{ color: theme.text }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Row>

          <Row delay={0.12} className="min-h-0">
            <div className="rounded-xl border border-line bg-cream/70 p-2.5">
              <div className="h-12 rounded-lg" style={{ background: `linear-gradient(135deg, ${theme.glowA}, ${theme.glowB})` }} />
              <div className="mt-2 text-[11px] font-semibold text-graphite/90">Sector 57, Gurgaon</div>
              <div className="font-mono text-[9px] text-graphite/65">3 BHK · 1,640 sq ft</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11.5px] font-semibold" style={{ color: theme.text }}>
                  ₹1.14 Cr
                </span>
                <span
                  className="rounded-full px-1.5 py-0.5 font-mono text-[8px]"
                  style={{ background: 'rgba(63,122,79,0.12)', color: '#3F7A4F' }}
                >
                  fair price
                </span>
              </div>
            </div>
          </Row>
        </div>

        {/* chat */}
        <div className="flex min-h-0 flex-col gap-2">
          <Row>
            <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm border border-line bg-cream-deep px-2.5 py-1.5 text-[10.5px] leading-snug text-graphite/85">
              Find me a 3BHK in Gurgaon under ₹1.2 Cr and check if it's fairly priced.
            </div>
          </Row>

          <Row delay={0.14}>
            <div className="flex items-center gap-1.5">
              {['search_properties', 'estimate_fair_price'].map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={inView}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.12 }}
                  className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[8px]"
                  style={{ background: theme.tint, color: theme.text, boxShadow: `inset 0 0 0 1px ${theme.glowA}` }}
                >
                  <Check className="h-2 w-2" /> {tool}
                </motion.span>
              ))}
            </div>
          </Row>

          <Row delay={0.26}>
            <div
              className="max-w-[92%] rounded-xl rounded-bl-sm border p-2.5"
              style={{ borderColor: theme.glowA, background: theme.tint }}
            >
              <div className="flex items-center gap-1.5">
                <Bot className="h-3 w-3" style={{ color: theme.text }} />
                <span className="font-mono text-[8.5px] uppercase tracking-[0.14em]" style={{ color: theme.text }}>
                  RAG answer · streaming
                </span>
              </div>
              <div className="mt-1.5 space-y-1">
                {['88%', '96%', '72%'].map((width, i) => (
                  <motion.div
                    key={width}
                    className="h-[5px] rounded-full bg-line"
                    initial={{ width: 0 }}
                    whileInView={{ width }}
                    viewport={inView}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.4 + i * 0.16 }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-1 w-1 rounded-full"
                    style={{ background: theme.text }}
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.18 }}
                  />
                ))}
                <span className="ml-1 font-mono text-[8px] text-graphite/60">
                  grounded in 9 tables · chromadb
                </span>
              </div>
            </div>
          </Row>

          {/* human-in-the-loop confirmation */}
          <Row delay={0.44} className="mt-auto">
            <div className="rounded-xl border border-line bg-paper/70 p-2.5">
              <div className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-graphite/65">
                Confirmation required
              </div>
              <div className="mt-1 text-[10.5px] leading-snug text-graphite/85">
                Schedule a visit for Sector 57, Gurgaon on 21 Oct, 11:00 AM?
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <motion.span
                  animate={{ opacity: [1, 0.72, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-md px-2 py-0.5 font-mono text-[8.5px] font-semibold"
                  style={{ background: theme.from, color: '#ffffff' }}
                >
                  Confirm
                </motion.span>
                <span className="rounded-md border border-line px-2 py-0.5 font-mono text-[8.5px] text-graphite/65">
                  Cancel
                </span>
                <span className="ml-auto font-mono text-[8px] text-graphite/60">langgraph · 7 tools</span>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------- Expense Tracker */

function ExpenseMock({ theme }) {
  const slices = [
    { label: 'Housing', value: 34, color: theme.from },
    { label: 'Food', value: 26, color: '#C2871F' },
    { label: 'Transport', value: 20, color: '#3A6EA5' },
    { label: 'Shopping', value: 20, color: '#E45B32' },
  ];
  const transactions = [
    { name: 'Freelance payout', cat: 'Freelance', amount: '+₹24,000', up: true },
    { name: 'Rent — October', cat: 'Housing', amount: '−₹18,500', up: false },
    { name: 'Groceries', cat: 'Food', amount: '−₹3,240', up: false },
  ];

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;

  return (
    <Frame label="expense tracker — dashboard & analytics" theme={theme}>
      {/* stat cards */}
      <Row className="grid grid-cols-3 gap-2">
        {[
          { label: 'Income', value: '₹64,200', Icon: TrendingUp, tone: '#3F7A4F' },
          { label: 'Expenses', value: '₹38,940', Icon: TrendingDown, tone: '#B4473A' },
          { label: 'Balance', value: '₹25,260', Icon: Wallet, tone: theme.text },
        ].map(({ label, value, Icon, tone }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
            className="rounded-xl border border-line bg-cream/70 p-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/60">
                {label}
              </span>
              <Icon className="h-3 w-3" style={{ color: tone }} />
            </div>
            <div className="mt-1.5 text-[12.5px] font-semibold text-graphite/90">{value}</div>
            <div className="font-mono text-[8px] text-graphite/60">last 30 days</div>
          </motion.div>
        ))}
      </Row>

      <div className="mt-2.5 grid min-h-0 flex-1 gap-2.5 sm:grid-cols-[0.85fr_1.15fr]">
        {/* donut */}
        <Row delay={0.16}>
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-line bg-cream/70 p-2.5">
            <svg viewBox="0 0 100 100" className="h-[92px] w-[92px] -rotate-90">
              <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(17,24,39,0.08)" strokeWidth="11" />
              {slices.map((slice) => {
                const length = (slice.value / 100) * circumference;
                const dash = `${length} ${circumference - length}`;
                const offset = -offsetAcc;
                offsetAcc += length;
                return (
                  <motion.circle
                    key={slice.label}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={slice.color}
                    strokeWidth="11"
                    strokeLinecap="butt"
                    strokeDasharray={dash}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={inView}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                  />
                );
              })}
            </svg>
            <div className="mt-2 grid w-full grid-cols-2 gap-x-2 gap-y-1">
              {slices.map((slice) => (
                <span key={slice.label} className="flex items-center gap-1 font-mono text-[8px] text-graphite/65">
                  <span className="h-1.5 w-1.5 rounded-sm" style={{ background: slice.color }} />
                  {slice.label}
                </span>
              ))}
            </div>
          </div>
        </Row>

        {/* transactions */}
        <div className="flex min-h-0 flex-col gap-1.5">
          <Row delay={0.2} className="flex items-center gap-1.5">
            <span className="flex flex-1 items-center gap-1.5 rounded-md border border-line bg-cream/70 px-2 py-1">
              <Search className="h-2.5 w-2.5 text-graphite/60" />
              <span className="font-mono text-[8.5px] text-graphite/65">search description…</span>
            </span>
            <span className="rounded-md border border-line px-1.5 py-1 font-mono text-[8.5px] text-graphite/65">
              all types
            </span>
          </Row>

          {transactions.map((transaction, i) => (
            <Row key={transaction.name} delay={0.26 + i * 0.09}>
              <div className="flex items-center justify-between rounded-xl border border-line bg-cream/70 px-2.5 py-2 transition-colors duration-500 hover:border-line-strong">
                <div className="min-w-0">
                  <div className="truncate text-[10.5px] font-medium text-graphite/90">
                    {transaction.name}
                  </div>
                  <span className="font-mono text-[8px] text-graphite/60">{transaction.cat}</span>
                </div>
                <span
                  className="shrink-0 font-mono text-[10px] font-semibold"
                  style={{ color: transaction.up ? '#3F7A4F' : '#B4473A' }}
                >
                  {transaction.amount}
                </span>
              </div>
            </Row>
          ))}

          <Row delay={0.56} className="mt-auto">
            <div className="flex items-center justify-between font-mono text-[8px] text-graphite/60">
              <span>recharts breakdown</span>
              <span>localStorage · per user</span>
            </div>
          </Row>
        </div>
      </div>
    </Frame>
  );
}

/* --------------------------------------------------------------- registry */

const MOCKS = {
  travelease: TravelEaseMock,
  joblio: JobLioMock,
  propfind: PropFindMock,
  'expense-tracker': ExpenseMock,
};

export default function ProjectMockup({ project }) {
  const Mock = MOCKS[project.id];
  if (!Mock) return null;
  return <Mock theme={project.theme} />;
}

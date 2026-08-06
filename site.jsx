// Personal site app
const { useEffect, useRef, useState } = React;
const RESUME_URL = "assets/Vatsal_Jha_Resume.pdf";
const PORTRAIT_URL = "assets/portrait.jpg";

// ───────────────────────────── data ─────────────────────────────
const WORK = [
  {
    yr: "Jan 2026 — present",
    org: "Testaing",
    role: "ML Intern · Audio deepfake detection",
    desc: "Built ECAPA-TDNN (SE-Res2Net1D + ASP + EBM loss), an ISPL mixture-of-experts (SAFE '25 reproduction), and the AAMOE ensemble: raw, spectral, and WavLM experts with a learned gating head. Hindi fine-tune at 1.97% EER; multilingual benchmarks at 0.94–0.96 AUC. Also shipped the meeting side: a Playwright/Xvfb Meet bot with WhisperX + Pyannote, K8s/KEDA-autoscaled, plus a Chrome extension for real-time detection in Meet and YouTube.",
    tag: "Audio · K8s",
  },
  {
    yr: "May — Jul 2025",
    org: "Samsung Research, Bangalore",
    role: "SWE Intern · MAGPIE / Server Platform",
    desc: "Async multi-agent root-cause analysis for distributed systems on Google ADK. Built MCP servers for Prometheus, Kubernetes, Jaeger, OpenSearch, Milvus, plus a 90+ incident dataset via ChaosMesh.",
    tag: "PPO offered",
  },
  {
    yr: "Oct 2024 — May 2025",
    org: "Samsung PRISM R&D",
    role: "Research Intern · led team of 3",
    desc: "Edge-deployable multilingual LLM agents. Asynchronous SLM-orchestrator framework with synthetic datasets for cross-lingual benchmarking. Awarded an Excellent Worklet; paper (HOMA) accepted at ICCCNT '25.",
    tag: "Paper · Edinburgh collab",
  },
  {
    yr: "Dec 2022 — present",
    org: "King Saud University × VIT",
    role: "ML Research Intern · Royal Academy of Engineering",
    desc: "Originally: ML for EV state-of-charge prediction on Indian roads (99.71% accuracy, J. Energy Storage). Now: RL for EV charging-station placement, evaluated in SUMO across Ann Arbor, Mumbai, São Paulo.",
    tag: "Published",
  },
  {
    yr: "Jun — Aug 2024",
    org: "CEEW, Delhi",
    role: "Data Science Intern",
    desc: "BERTopic over 92k qualification documents → 350 interpretable topics for job-matching. ML-based bias correction on AQI chemical forecasts (MAPE 43% → 27%, presented at IICAQM '24). Solar-investment dashboard with IRR / payback / LCOE modelling.",
    tag: "",
  },
  {
    yr: "Mar 2024 — present",
    org: "NTNU Norway × BITS Pilani",
    role: "AI Research Intern · Remote",
    desc: "End-to-end handwritten OCR with FOTS, Swin, and a custom ResPhOSCNet head. Sliding-window inference pipeline. 6% CER on IAM Dataset.",
    tag: "Vision",
  },
  {
    yr: "Dec 2023 — Feb 2024",
    org: "Wingway Autonomy",
    role: "Robotics SWE Intern · Remote",
    desc: "Tuned robot control parameters and prototyped controllers and path-planning for autonomous navigation.",
    tag: "Robotics",
  },
];

// Freelance / client work — rendered separately, after the internships ribbon.
const FREELANCE = [
  {
    yr: "Feb 2026 — May 2026",
    org: "CtrlAltHeal",
    role: "Freelance Platform Engineer · Health-tech",
    desc: "Five-surface health-tech platform: dietitian and client web, dietitian and client mobile (Expo / React Native), and dual backends. Node / Express / Prisma (40 models, 17 API groups) alongside C# ASP.NET / EF Core (4 controller families, 22 tables). Client auth, diet-plan tooling, PCOS and disease templates, DOCX·XLSX·CSV importers, OTP-backed provider workflows.",
    tag: "Full-stack",
  },
  {
    yr: "Dec 2025 — Apr 2026",
    org: "EminenceSphere",
    role: "Freelance Systems Engineer · Recruitment ops automation",
    desc: "Production recruitment-automation platform for a staffing client. WhatsApp-first candidate intake, TypeScript state machine, Supabase plus Google Sheets sync, Next.js operator dashboard, Drive document handling, payment / agreement hooks, Railway deploy. 20+ candidate stages across paid, non-paid, and training flows.",
    tag: "Client work",
  },
];

const ACHIEVEMENTS = [
  { yr:"2025", t:"Best Paper Award", v:"ICDSINC '25 · IEEE · CA-AMFA",          n:"first-author, Raipur" },
  { yr:"2024", t:"National Topper", v:"Responsible & Safe AI · IITM × IIITH",  n:"11,876 participants" },
  { yr:"2024", t:"National Topper", v:"AI for Investment · IIT Kanpur",        n:"10,749 participants" },
  { yr:"2023", t:"National Topper", v:"Reinforcement Learning · IIT Madras",   n:"6,455 participants"  },
  { yr:"2023", t:"National Winner", v:"ISRO SIF Hackathon · Indian International Science Festival, Delhi", n:"Narad" },
  { yr:"2024", t:"Top 3 in Nation", v:"Karnataka State Police Hackathon, Bangalore", n:"" },
  { yr:"2024", t:"Winner", v:"Samsung PRISM Hackathon", n:"" },
  { yr:"2024", t:"Raman Research Award", v:"VIT · ₹10,000 cash prize for published research", n:"" },
];

const PROJECTS = [
  {
    name: "HERO",
    blurb: "EV charging-station placement, end-to-end. Geospatial ML predicts grid-cell demand from OpenStreetMap features; a multi-armed-bandit RL controller does the micro-placement, validated in SUMO. Case studies in Ann Arbor, Mumbai, São Paulo.",
    meta: "Python · SUMO · Bandits · OSM",
    href: "",
    featured: true,
  },
  {
    name: "HOMA",
    blurb: "Multilingual multi-agent orchestration for home automation. An SLM acts as orchestrator; specialised device agents execute concurrent and sequential commands across 11+ languages, including low-resource Indian ones. Evaluated across Gemma, Qwen, Phi-4.",
    meta: "Samsung × VIT × Edinburgh · ICCCNT '25",
    href: "https://github.com/IISF-SIF/HOMA",
  },
  {
    name: "Sahay",
    blurb: "Voice-first journaling for student mental wellbeing. ADK multi-agent backend (general wellness + study stress) with an iterative safety-refinement loop, Gemini Live voice agent, hybrid RAG, neumorphic React frontend.",
    meta: "Google GenAI Hackathon · R2 shortlist",
    href: "https://github.com/StraightOuttaVellore-Google",
  },
  {
    name: "Narad",
    blurb: "Conversational voice assistant for 22 Indian languages, grounded in ISRO/NRSC Bhuvan data. AI4Bharat ASR, quantised LLMs on a single P100, FAISS-backed RAG, contextual-bandit personalisation. Sub-40ms in superfast mode.",
    meta: "ISRO IISF-SIF · 1st prize",
    href: "https://github.com/IISF-SIF/Narad",
  },
  {
    name: "Aegis",
    blurb: "Healthcare drug-delivery system co-developed with MIT / Harvard / CERN collaborators. Federated learning across hospital silos, an MCP-based multi-agent application, and RL for personalised therapy schedules.",
    meta: "Collab · case study by request",
    href: "https://drive.google.com/file/d/14HZ9wP38wdEHXqqt3IqToIfvGME3d3W0/view?usp=sharing",
  },
  {
    name: "Drunken Botanist",
    blurb: "A full-stack field guide and working notebook for cocktails and botanicals. 426 CocktailDB drinks, 70 curated plants, inventory-aware recipe recommendations across 1,127 recipes, account-backed notes, and an owner-only library.",
    meta: "Next.js 16 · React 19 · Supabase · Vercel",
    href: "https://drunken-botanist.vercel.app",
  },
  {
    name: "CA-AMFA",
    blurb: "Context-aware adaptive multi-factor authentication for IoT. Contextual bandits select among PIN, OTP, and face based on time, behaviour, and network signals. Cut false-acceptance rates by 44.75%; running on a Raspberry Pi 3B. Best Paper Award at ICDSINC '25.",
    meta: "Bandits · IoT · ICDSINC '25 (IEEE) · Best Paper",
    href: "https://github.com/Vatsal-Jha256/CA-AMFA-Context-Aware-Adaptive-Multi-Factor-Authentication-for-IoT-Based-Household-Security-Systems",
  },
  {
    name: "BANDITS-IDS",
    blurb: "Online adaptive intrusion-detection on NSL-KDD. CTGAN-augmented training, hybrid stacking ensemble, drift detection with ADWIN / EDDM, and reweight / retrain adaptation when concept-drift fires.",
    meta: "CTGAN · Drift · Ensembles",
    href: "https://github.com/Vatsal-Jha256/BANDITS-IDS-A-Modular-Contextual-Bandit-Framework-for-Network-Intrusion-Detection-Systems",
  },
  {
    name: "Karnataka Traffic RL",
    blurb: "Traffic-signal optimisation for the Karnataka State Police, in SUMO. RL controller cut average waiting time by ~50% over fixed-time baselines. Top 3 finalist out of 380 teams; invited to demo at Microsoft Research Bangalore.",
    meta: "SUMO · RL · KSP Hackathon",
    href: "https://github.com/Vatsal-Jha256/sumo-rl",
  },
  {
    name: "NMPC for RoboCup SSL",
    blurb: "Nonlinear MPC for smooth, obstacle-aware trajectory planning in the Small-Size League, written as an alternative to bang-bang controllers. ~5% velocity uplift over the baseline. With Team Prometheus.",
    meta: "MATLAB · MPC · Robotics",
    href: "https://github.com/TeamPrometheusVITV/nmpc-robocup-ssl",
  },
];

const PUBS = [
  {
    yr: "2024",
    title: "Machine-learning framework using on-road real-time data for battery SoC level prediction in electric two-wheelers",
    venue: "Journal of Energy Storage · vol. 97 · IF 8.9",
    href: "https://doi.org/10.1016/j.est.2024.112884",
    role: "co-author",
  },
  {
    yr: "2025",
    title: "HOMA: A Multilingual Multi-Agent Orchestration System",
    venue: "ICCCNT '25 · IIT Indore · accepted",
    href: "https://github.com/IISF-SIF/HOMA",
    role: "co-author",
  },
  {
    yr: "2024",
    title: "Machine-learning-based bias correction for AQI chemical forecast models",
    venue: "IICAQM '24 · IIT Madras · presented",
    href: "",
    role: "presented",
  },
  {
    yr: "2025",
    title: "CA-AMFA: Context-Aware Adaptive Multi-Factor Authentication for IoT-Based Household Security Systems",
    venue: "ICDSINC '25 · IEEE · Raipur, pp. 64–69 · Best Paper Award",
    href: "https://doi.org/10.1109/ICDSINC66221.2025.11448177",
    role: "first author · best paper",
  },
  {
    yr: "2026",
    title: "Nonlinear Model Predictive Control for Dynamic Obstacle Avoidance in RoboCup SSL",
    venue: "HINT · Manipal Institute of Technology · accepted",
    href: "https://github.com/TeamPrometheusVITV/nmpc-robocup-ssl",
    role: "co-author",
  },
  {
    yr: "WIP",
    title: "RL for portable EV charging-station placement (HERO)",
    venue: "Manuscript in preparation",
    href: "",
    role: "first author",
  },
];

const LEADERSHIP = [
  {
    role: "Founder & Team Lead",
    org: "Team Prometheus, VIT Vellore",
    when: "May 2024 — present",
    desc: "Founded VIT's first RoboCup Small-Size League team, 30+ members across software, electronics, and hardware. Secured $200,000+ in funding for academic and research initiatives. Building toward our competition debut: trajectory planning (NMPC), reinforcement-learning passing, custom electronics and chassis.",
    note: "It's a young team, no competitions yet. The work is the work.",
    href: "https://www.teamprometheus.in/",
  },
  {
    role: "Chairperson",
    org: "Youth Red Cross, VIT",
    when: "Jan 2025 — Jan 2026",
    desc: "780+ blood donations facilitated; community events with 3,000+ participants.",
    note: "",
    href: "",
  },
  {
    role: "Vice-Chairperson",
    org: "Youth Red Cross, VIT",
    when: "Jan 2024 — Jan 2025",
    desc: "Strategy and event operations for the chapter year prior.",
    note: "",
    href: "",
  },
];

const BELIEFS = [
  "Joy is a working condition, not a reward.",
  "The world is more interesting than the discourse about it.",
  "Pick problems you would be glad to fail at.",
  "Cynicism is mostly bad data.",
  "Variety of effort beats balance.",
];

const LOG = {
  reading: [
    { t: "The Order of Time",   a: "Carlo Rovelli", n: "Currently. Audiobook; Cumberbatch's narration elevates it. So trippy." },
    { t: "Project Hail Mary",   a: "Andy Weir", n: "Loved it. Made me want to dive deeper into microbiology and get into physics again." },
    { t: "1984",                a: "Orwell", n: "Scary and poignant. The ending is so twisted but relevant." },
  ],
  listening: [
    { t: "Corinne Bailey Rae", a: "deep dive · all eras", n: "Joyous. Deserves her flowers." },
    { t: "Andrew Bird",        a: "deep dive · current obsession", n: "A proper bard. Whistles like a bird ought to." },
  ],
  watching: [
    { t: "Michael",              a: "2025", n: "More concert than film. Still super fun." },
    { t: "The Devil Wears Prada 2", a: "2025", n: "Loved it. Fashion-friend conversations went on for hours." },
    { t: "Project Hail Mary",    a: "film, 2025", n: "Gosling should be in everything. Ortiz as Rocky deserves an Oscar." },
  ],
  playing: [
    { t: "Hades II",             a: "Supergiant", n: "Supergiant cannot miss. Melinoë and her witchcraft are a great twist." },
    { t: "Expedition 33",        a: "JRPG, 2025", n: "Cried. Laughed. Got stuck on a boss. 10/10. Now to finish Persona." },
    { t: "Spider-Man Remastered",a: "Insomniac", n: "Peter Parker's heart and grit. Favourite superhero, always." },
    { t: "Stardew Valley",       a: "Concerned Ape", n: "Cozy. Best paired with an audiobook." },
  ],
};

const NOTES = [
  { yr: "soon", title: "Notes on multi-agent RCA — what actually breaks", sub: "Drafted from the Samsung internship." },
  { yr: "soon", title: "Why bandits keep showing up in my work",          sub: "Five projects, same family of algorithms. An attempt to say why." },
  { yr: "soon", title: "Reading list, with footnotes",                     sub: "Books I keep returning to, and the ones I argue with." },
];

// ───────────────────────────── travel diary ─────────────────────────────
// Replace the `draft: true` entries with real ones as you go.
// Schema: { when, place, note, keep, pin, draft }
//   when  — short date, e.g. "Nov 2024"
//   place — city + country/region, e.g. "Kyoto, JP"
//   note  — one or two dry lines; ".keep" inside <note> for a pinned takeaway
//   keep  — optional single line: "what I keep thinking about"
//   pin   — short tag rendered next to the place, e.g. "rain"
//   draft — true = hollow pin + muted styling (placeholder you can fill later)
const TRAVEL = [
  {
    when:  "Apr 2026",
    place: "Sakleshpur, IN",
    pin:   "road trip",
    note:  "Not much to do here except chill. Great weather, great views of the Western Ghats from the fort. Good road trip from Bangalore.",
    keep:  "",
  },
  {
    when:  "Apr 2026",
    place: "Gandikota, IN",
    pin:   "solo",
    note:  "Did this one solo. Pretty much the only non-local traveller when I went; apparently winters get busier. One auto serves the whole village, so getting back to Jammalamadugu (the closest bus point) is rough at night. The canyon and the temple ruins are fantastic. Stayed at the resort. Asked about camping and got told leopards; later found out it was the heat. Though leopards have been seen recently.",
    keep:  "camp it next time.",
  },
  {
    when:  "Feb 2026",
    place: "Chandigarh, IN",
    pin:   "architecture",
    note:  "Gorgeous. If you love art and architecture, great place to visit. One of the cleanest cities ever. Great museums. Lovely walk in the Rock Garden.",
    keep:  "",
  },
  {
    when:  "Feb 2026",
    place: "Amritsar, IN",
    pin:   "mixed",
    note:  "Spiritual, historic. The culture exudes from the city; you feel it the moment you enter. Did half solo, made friends in the other half. Langar is amazing.",
    keep:  "",
  },
  {
    when:  "Feb 2026",
    place: "Jaipur, IN",
    pin:   "solo",
    note:  "Listening to the city's history while actually walking through it is the move. You can get a workout in just travelling between the forts and tunnels. Fun solo too.",
    keep:  "",
  },
  {
    when:  "Dec 2025",
    place: "Goa, IN",
    pin:   "with friends",
    note:  "Very fun with a big group of friends. Pretty, well-maintained beaches. Need to go south next.",
    keep:  "",
  },
];

// ───────────────────────────── helpers ─────────────────────────────
function useReveal(){
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) el.classList.add('in');
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ───────────────────────────── hero variants ─────────────────────────────
function Hero({variant}){
  if(variant === 'terminal') return <HeroTerminal/>;
  if(variant === 'playful')  return <HeroPlayful/>;
  return <HeroEditorial/>;
}

function HeroEditorial(){
  return (
    <section className="section hero" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="top-meta">
          <div className="label">Vatsal Jha · Portfolio · MMXXVI</div>
          <div className="label">Vellore · Bangalore</div>
        </div>

        <figure className="portrait reveal" aria-label="Portrait of Vatsal">
          <img src={PORTRAIT_URL} alt="Vatsal Jha" />
          <figcaption className="cap">— v.j., '24</figcaption>
        </figure>

        <h1 className="reveal">
          Vatsal <span className="it">Jha.</span>
        </h1>

        <div className="sub">
          <div className="lead reveal">
            Final-year CS undergrad at VIT. I work on applied AI for real-world systems — using whatever a problem needs (bandits, RL, multi-agent orchestration, LLMs) to solve things I've long believed were solvable, and trying to do it responsibly. Founder of Team Prometheus; Chairperson of Youth Red Cross VIT.
          </div>
          <div className="right reveal">
            <div><span className="k">Now</span> &nbsp; Samsung Research (PPO offered)</div>
            <div><span className="k">Working on</span> &nbsp; RL for EV station placement</div>
            <div><span className="k">Looking for</span> &nbsp; R&amp;D · systems · ML eng roles</div>
            <div><span className="k">Mail</span> &nbsp; <a className="link" href="mailto:vatsaljha17@gmail.com">vatsaljha17@gmail.com</a></div>
            <div><span className="k">Resume</span> &nbsp; <a className="link" href={RESUME_URL} target="_blank" rel="noopener">PDF</a> &nbsp;·&nbsp; <span className="k">Code</span> &nbsp; <a className="link" href="https://github.com/Vatsal-Jha256" target="_blank" rel="noopener">GitHub</a> &nbsp;·&nbsp; <span className="k">Scholar</span> &nbsp; <a className="link" href="https://scholar.google.com/citations?user=o9ErjT4AAAAJ" target="_blank" rel="noopener">↗</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroTerminal(){
  const lines = [
    { t: "$ whoami", typed: true },
    { t: "vatsal-jha — final-year cs @ vit" },
    { t: "" },
    { t: "$ ls ~/work", typed: true },
    { t: "samsung-research/   samsung-prism/   ksu-vit-ev/   ceew/   ntnu-bits-ocr/   wingway/" },
    { t: "" },
    { t: "$ cat ~/.looking_for", typed: true },
    { t: "r&d   ·   systems   ·   ml eng" },
    { t: "" },
    { t: "$ contact --short", typed: true },
    { t: "vatsaljha17@gmail.com   ·   github/Vatsal-Jha256" },
    { t: "" },
    { t: "$ █", typed: true },
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if(shown >= lines.length) return;
    const dly = lines[shown].t === "" ? 80 : (lines[shown].typed ? 220 : 60);
    const id = setTimeout(() => setShown(s => s+1), dly);
    return () => clearTimeout(id);
  }, [shown]);

  return (
    <section className="section hero hero-term" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="top-meta">
          <div className="label">Vatsal Jha · ~/portfolio · MMXXVI</div>
          <div className="label">tty1 · {new Date().toLocaleDateString('en-GB')}</div>
        </div>

        <div className="term">
          <div className="term-chrome">
            <span className="td" style={{background:'#e0584d'}}></span>
            <span className="td" style={{background:'#e0b94d'}}></span>
            <span className="td" style={{background:'#5dc466'}}></span>
            <span className="term-title">vatsal@research:~</span>
          </div>
          <div className="term-body">
            {lines.slice(0, shown).map((l, i) => (
              <div key={i} className={"term-line " + (l.typed ? "prompt" : "out")}>
                {l.t || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPlayful(){
  return (
    <section className="section hero hero-play" data-screen-label="01 Hero">
      <div className="wrap">
        <div className="top-meta">
          <div className="label">A self-portrait, in fragments</div>
          <div className="label">scroll, or press <kbd className="kbd">V</kbd> <kbd className="kbd">J</kbd></div>
        </div>

        <div className="play-grid">
          <div className="play-cell name reveal">
            <div className="label" style={{marginBottom:14}}>Subject</div>
            <div className="play-name">Vatsal<br/><span className="it">Jha</span></div>
            <div className="play-tag">final-year CS, VIT · agentic systems · RL · applied ML</div>
          </div>

          <div className="play-cell role reveal">
            <div className="label">Currently</div>
            <ul className="play-roles">
              <li>SWE @ <b>Samsung Research</b></li>
              <li>Founder · <b>Team Prometheus</b></li>
              <li>Chair · Youth Red Cross VIT</li>
              <li>Looking for R&amp;D / ML eng roles</li>
            </ul>
          </div>

          <div className="play-cell card reveal" data-card>
            <div className="label" style={{color:'var(--paper)', opacity:.6}}>Pick a card</div>
            <div className="play-card-face">
              <div className="suit">♣</div>
              <div className="rank">J</div>
              <div className="suit-r">♣</div>
            </div>
            <div className="play-card-back">
              <div className="card-back-pattern"></div>
            </div>
          </div>

          <div className="play-cell quote reveal">
            <div className="play-q">
              Joy is a <span className="acc it">working condition</span>, not a reward.
            </div>
            <div className="label" style={{marginTop:14}}>pinned</div>
          </div>

          <div className="play-cell links reveal">
            <a className="link" href="mailto:vatsaljha17@gmail.com">→ email</a>
            <a className="link" href="https://github.com/Vatsal-Jha256" target="_blank" rel="noopener">→ github</a>
            <a className="link" href={RESUME_URL} target="_blank" rel="noopener">→ resume</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────── sections ─────────────────────────────
function Now(){
  const cells = [
    { label: "Building",    title: "Multi-agent RCA",            meta: "Samsung · ADK + MCP"        },
    { label: "Researching", title: "RL for EV placement",        meta: "KSU × VIT · SUMO"           },
    { label: "Reading",     title: "The Order of Time",          meta: "Rovelli · Audible, Cumberbatch" },
    { label: "Listening",   title: "Andrew Bird",                meta: "deep dive · current obsession" },
  ];
  return (
    <section className="section" data-screen-label="02 Currently">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 01</span>
          <span className="label">Currently</span>
        </div>
        <div className="now-grid reveal">
          {cells.map((c, i) => (
            <div className="now-cell" key={i}>
              <div className="label"><span className="dot"></span> {c.label}</div>
              <div className="title">{c.title}</div>
              <div className="meta">{c.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work(){
  return (
    <section className="section" id="work" data-screen-label="03 Work">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 02</span>
          <span className="label">Work &amp; Research</span>
        </div>

        <div className="work-list reveal">
          {WORK.map((w, i) => (
            <div className="work-row" key={i}>
              <div className="yr">{w.yr}</div>
              <div className="role">
                {w.org}
                <em>{w.role}</em>
              </div>
              <div className="desc">{w.desc}</div>
              <div className="tag">{w.tag}</div>
            </div>
          ))}
        </div>

        {/* Achievements and credentials ribbon — compact so experience stays primary. */}
        <div className="ribbon reveal">
          <div className="ribbon-label">Selected awards &amp; credentials</div>
          <div className="ribbon-list">
            {ACHIEVEMENTS.map((a, i) => (
              <div className="ribbon-item" key={i}>
                <div className="ri-yr">{a.yr}</div>
                <div>
                  <div className="ri-t">{a.t} <span className="ri-acc">— {a.v}</span></div>
                  {a.n && <div className="ri-n">{a.n}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected freelance / client work — quieter rows under the internships ribbon */}
        <div className="ribbon reveal" style={{marginTop:48}}>
          <div className="ribbon-label">Selected freelance · client work</div>
          <div className="work-list" style={{marginTop:4}}>
            {FREELANCE.map((w, i) => (
              <div className="work-row" key={i}>
                <div className="yr">{w.yr}</div>
                <div className="role">
                  {w.org}
                  <em>{w.role}</em>
                </div>
                <div className="desc">{w.desc}</div>
                <div className="tag">{w.tag}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{marginTop:36, color:'var(--muted)', fontSize:13, fontFamily:'var(--mono)', letterSpacing:'.04em'}}>
          Full résumé · <a className="link" href={RESUME_URL} target="_blank" rel="noopener">PDF</a>
        </div>
      </div>
    </section>
  );
}

function Projects(){
  return (
    <section className="section" id="projects" data-screen-label="04 Projects">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 03</span>
          <span className="label">Projects</span>
        </div>
        <div className="projects reveal">
          {PROJECTS.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noopener" className={"project " + (p.featured ? "featured" : "")}>
              <div className="ph">
                <h3>{p.name}.</h3>
                <span className="num">{String(i+1).padStart(2,'0')}</span>
              </div>
              <p className="blurb">{p.blurb}</p>
              <div className="meta-line">{p.meta} &nbsp;·&nbsp; <span className="arrow">↗</span></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pubs(){
  return (
    <section className="section" id="pubs" data-screen-label="05 Publications">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 04</span>
          <span className="label">Publications</span>
        </div>
        <div className="pub-list reveal">
          {PUBS.map((p, i) => (
            <div className="pub-row" key={i}>
              <div className="yr">{p.yr}</div>
              <div className="title">
                {p.href
                  ? <a className="link" href={p.href} target="_blank" rel="noopener">{p.title}</a>
                  : p.title}
              </div>
              <div className="venue">{p.venue}</div>
              <div className="role">{p.role}</div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{marginTop:24, color:'var(--muted)', fontSize:13, fontFamily:'var(--mono)', letterSpacing:'.04em'}}>
          Google Scholar · <a className="link" href="https://scholar.google.com/citations?user=o9ErjT4AAAAJ" target="_blank" rel="noopener">profile</a>
        </div>
      </div>
    </section>
  );
}

function Leadership(){
  return (
    <section className="section" id="leadership" data-screen-label="06 Leadership">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 05</span>
          <span className="label">Leadership &amp; Service</span>
        </div>

        <div className="lead-list reveal">
          {LEADERSHIP.map((l, i) => (
            <div className="lead-row" key={i}>
              <div className="when">{l.when}</div>
              <div className="body">
                <div className="role">
                  {l.role} <span className="org">· {l.org}</span>
                </div>
                <p className="desc">{l.desc}</p>
                {l.note && <div className="note">{l.note}</div>}
                {l.href && (
                  <a className="link" href={l.href} target="_blank" rel="noopener" style={{fontFamily:'var(--mono)', fontSize:12, letterSpacing:'.04em', marginTop:8, display:'inline-block'}}>
                    {l.href.replace(/^https?:\/\//,'').replace(/\/$/,'')} ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beliefs(){
  return (
    <section className="section" id="beliefs" data-screen-label="07 Beliefs">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 06</span>
          <span className="label">Things I believe about work</span>
        </div>

        <ol className="beliefs reveal">
          {BELIEFS.map((b, i) => (
            <li key={i}>
              <span className="b-n">{String(i+1).padStart(2,'0')}</span>
              <span className="b-t">{b}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Log(){
  const cols = [
    { key:'reading',   title:'Reading'   },
    { key:'listening', title:'Listening' },
    { key:'watching',  title:'Watching'  },
    { key:'playing',   title:'Playing'   },
  ];
  return (
    <section className="section" id="log" data-screen-label="08 Log">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 07</span>
          <span className="label">A short log. Books, music, films, games.</span>
        </div>
        <div className="reveal" style={{maxWidth:'56ch', marginBottom:36, color:'var(--ink-2)', fontFamily:'var(--serif)', fontSize:'clamp(18px, 1.6vw, 22px)', fontStyle:'italic', lineHeight:1.4}}>
          Things I keep thinking about. Not everything I consume.
        </div>

        <div className="log-grid reveal">
          {cols.map(c => (
            <div className="log-col" key={c.key}>
              <div className="log-h">{c.title}</div>
              <ul>
                {LOG[c.key].map((it, i) => (
                  <li key={i}>
                    <div className="log-t">{it.t}</div>
                    <div className="log-a">{it.a}</div>
                    {it.n && <div className="log-n">{it.n}</div>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Travel(){
  return (
    <section className="section" id="travel" data-screen-label="09 Travel">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 08</span>
          <span className="label">Travel diary, a running list</span>
        </div>

        <div className="travel-intro reveal">
          Places I keep thinking about. Short notes on what stuck. Added to as I remember.
        </div>

        <div className="travel-wrap">
          <ol className="travel-list reveal">
            {TRAVEL.map((tr, i) => (
              <li className={"travel-row" + (tr.draft ? " draft" : "")} key={i}>
                <div className="when">{tr.when}</div>
                <div className="body">
                  <div className="place">
                    {tr.place}
                    {tr.pin && <span className="pin">· {tr.pin}</span>}
                  </div>
                  {tr.note && (
                    <div className="note">
                      {tr.note}
                      {tr.keep && <span className="keep">— keeps coming back: {tr.keep}</span>}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <aside className="travel-tally reveal">
            <span className="label">Tally</span>
            <dl>
              <dt>Countries</dt><dd><span className="acc">1</span></dd>
              <dt>Cities logged</dt><dd><span className="acc">6</span></dd>
              <dt>Solo trips</dt><dd>3</dd>
              <dt>With friends</dt><dd>2</dd>
              <dt>Furthest north</dt><dd>Amritsar</dd>
              <dt>Most remote</dt><dd>Gandikota</dd>
            </dl>
            <div className="foot">
              No tracker, no map. Just what I remember well enough to write down. Logged since Dec 2025.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Notes(){
  return (
    <section className="section" id="notes" data-screen-label="10 Notes">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 09</span>
          <span className="label">Notes, drafts in progress</span>
        </div>

        <div className="notes-list reveal">
          {NOTES.map((n, i) => (
            <div className="note-row" key={i}>
              <div className="yr">{n.yr}</div>
              <div>
                <div className="t">{n.title}</div>
                <div className="s">{n.sub}</div>
              </div>
              <div className="tag">draft</div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{marginTop:24, color:'var(--muted)', fontSize:13, fontFamily:'var(--mono)', letterSpacing:'.04em', maxWidth:'56ch'}}>
          Trying to write more than I read. Losing fight. &nbsp;·&nbsp; <a className="link" href="blog/">all writing ↗</a>
        </div>
      </div>
    </section>
  );
}

function Contact(){
  return (
    <section className="section" id="contact" data-screen-label="11 Contact">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="num">§ 10</span>
          <span className="label">Contact</span>
        </div>
        <div className="contact">
          <h2 className="reveal">
            Say <em className="it">hello.</em>
          </h2>
          <div className="channels reveal">
            <a href="mailto:vatsaljha17@gmail.com"><span>Email · vatsaljha17@gmail.com</span><span className="arrow">→</span></a>
            <a href="https://github.com/Vatsal-Jha256" target="_blank" rel="noopener"><span>GitHub · @Vatsal-Jha256</span><span className="arrow">↗</span></a>
            <a href="https://linkedin.com/in/vatsal-jha-6a669724b" target="_blank" rel="noopener"><span>LinkedIn · vatsal-jha</span><span className="arrow">↗</span></a>
            <a href="https://scholar.google.com/citations?user=o9ErjT4AAAAJ" target="_blank" rel="noopener"><span>Google Scholar</span><span className="arrow">↗</span></a>
            <a href={RESUME_URL} target="_blank" rel="noopener"><span>Resume · PDF</span><span className="arrow">↓</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer>
      <div className="sisy">
        “One must imagine Sisyphus happy.”
        <small>— Camus</small>
      </div>
      <div className="col">
        <b>Colophon</b>
        <div>Set in Instrument Serif, Geist, JetBrains Mono.</div>
        <div>Hand-built. No analytics.</div>
      </div>
      <div className="col" style={{textAlign:'right'}}>
        <b>© 2026 · Vatsal Jha</b>
        <div>Last touched · {new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}</div>
      </div>
    </footer>
  );
}

function App(){
  useReveal();
  return (
    <>
      <Hero variant="editorial" />
      <Now />
      <Work />
      <Projects />
      <Pubs />
      <Leadership />
      <Beliefs />
      <Log />
      <Travel />
      <Notes />
      <Contact />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

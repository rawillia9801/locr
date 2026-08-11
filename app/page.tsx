import Link from "next/link";

const IconLogo = ({ small = false }: { small?: boolean }) => (
  <span className={small ? "brand-icon brand-icon-small" : "brand-icon"} aria-hidden="true">
    <svg viewBox="0 0 64 64" role="img">
      <path d="M18 49V20c0-7 5-12 12-12 6 0 11 4 12 10-8-2-13 2-13 8 0 6 5 10 11 10h7c7 0 12 5 12 11 0 7-5 12-12 12H30c-7 0-12-4-12-10Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M29 26c4-6 12-8 19-4" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  </span>
);

const Check = () => <span className="check">✓</span>;

const sampleLogos = [
  { name: "Happy Tails", sub: "FAMILY KENNELS", icon: "dog", className: "gold" },
  { name: "Blue Ridge", sub: "DOG CO.", icon: "mountain", className: "blue" },
  { name: "Whisker & Co.", sub: "PET BOUTIQUE", icon: "pets", className: "rose" },
  { name: "Greenfield", sub: "LANDSCAPES", icon: "leaf", className: "green" },
  { name: "BrightPath", sub: "WOODWORKS", icon: "sun", className: "navy" },
  { name: "Cedar & Stone", sub: "LANDSCAPING", icon: "tree", className: "earth" },
];

function MiniLogo({ icon }: { icon: string }) {
  if (icon === "dog") return <div className="mini-mark">◯</div>;
  if (icon === "mountain") return <div className="mini-mark">⌃</div>;
  if (icon === "pets") return <div className="mini-mark">♡</div>;
  if (icon === "leaf") return <div className="mini-mark">♧</div>;
  if (icon === "sun") return <div className="mini-mark">☀</div>;
  return <div className="mini-mark">♠</div>;
}

function ConceptMark({ type }: { type: "paws" | "evergreen" | "northridge" | "loyal" }) {
  const content = {
    paws: { icon: "◯", name: "PAWSITIVE", sub: "KENNELS" },
    evergreen: { icon: "⌃", name: "Evergreen", sub: "P U P S" },
    northridge: { icon: "♟", name: "NORTHRIDGE", sub: "D O G S" },
    loyal: { icon: "♡", name: "LOYAL HEARTS", sub: "KENNELS" },
  }[type];
  return (
    <div className={`concept-mark concept-${type}`}>
      <div className="concept-icon">{content.icon}</div>
      <strong>{content.name}</strong>
      <small>{content.sub}</small>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <Link href="#top" className="brand" aria-label="LogoCreator.Site home">
            <IconLogo />
            <span>LogoCreator<span>.Site</span></span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link href="#features">Features</Link>
            <Link href="#samples">Samples</Link>
            <Link href="#packages">Packages</Link>
            <Link href="/login">Login</Link>
          </nav>
          <div className="header-actions">
            <Link className="btn btn-outline compact" href="/login">Log In</Link>
            <Link className="btn btn-primary compact" href="/create"><span>✦</span> Create a Logo</Link>
          </div>
        </div>
      </header>

      <div className="ecosystem-bar">
        <span className="network-icon">⌘</span>
        <span>Part of the ecosystem with <b>MyDogPortal.Site</b>, <b>DogBreederWeb.Site</b>, <b>DogBreederDocs.Online</b>, and <b>HostMyWeb.Co</b>.</span>
      </div>

      <section className="hero" id="top">
        <div className="hero-decoration dots" />
        <div className="hero-decoration swoop" />
        <div className="hero-copy">
          <div className="eyebrow">AI-GUIDED BRAND CREATION</div>
          <h1>Create a professional logo with guided AI assistance.</h1>
          <p>Chat through your vision, generate unique concepts, refine styles, and download ready-to-use branding assets for your business—all in one simple workspace.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-large" href="/create"><span>✦</span> Create My Logo — Free</Link>
            <Link className="btn btn-outline btn-large" href="#packages">See Packages</Link>
          </div>
          <p className="hero-microcopy">No payment required to start creating.</p>
        </div>

        <div className="studio-preview" aria-label="AI Brand Assistant preview">
          <div className="studio-rail">
            <span>⌂</span><span>◌</span><span className="active">▢</span><span>✣</span><span>◉</span><span>T</span><span>♡</span>
          </div>
          <div className="assistant-panel">
            <div className="panel-title"><span className="assistant-orb">✦</span> AI Brand Assistant</div>
            <div className="chat-stack">
              <div className="chat-row bot"><span className="chat-avatar">✦</span><div><div className="bubble">Tell us about your business</div><small>10:15 AM</small></div></div>
              <div className="chat-row user"><div><div className="bubble">I run a premium dog breeding business focused on healthy, happy families.</div><small>10:16 AM ✓✓</small></div></div>
              <div className="chat-row bot"><span className="chat-avatar">✦</span><div><div className="bubble">Choose your style: minimal, elegant, playful, bold</div><small>10:16 AM</small></div></div>
              <div className="chat-row user"><div><div className="bubble">Elegant and minimal</div><small>10:17 AM ✓✓</small></div></div>
              <div className="chat-row bot"><span className="chat-avatar">✦</span><div><div className="bubble">Show more refined concepts</div><small>10:19 AM</small></div></div>
              <div className="typing"><i /><i /><i /></div>
            </div>
          </div>
          <div className="concept-panel">
            <div className="panel-title">Logo Concepts</div>
            <div className="concept-grid">
              <ConceptMark type="paws" />
              <ConceptMark type="evergreen" />
              <ConceptMark type="northridge" />
              <ConceptMark type="loyal" />
            </div>
          </div>
          <div className="design-panel">
            <div className="panel-title">Color Palette</div>
            <div className="swatches"><i /><i /><i /><i /><i /></div>
            <div className="panel-title spacing-top">Font Pairings</div>
            <div className="font-card serif">Playfair Display<span>Montserrat</span></div>
            <div className="font-card sans">Poppins<span>Lato</span></div>
            <div className="font-card classic">Cormorant Garamond<span>Montserrat</span></div>
            <div className="panel-title spacing-top">Export Your Logo</div>
            <div className="export-row"><span className="png">PNG</span><span className="svg">SVG</span><span className="pdf">PDF</span></div>
          </div>
        </div>
      </section>

      <section className="feature-strip" id="features">
        <div className="feature-pill"><span className="feature-icon">∞</span><div><strong>Unlimited concept generation</strong><small>Create and refine without limits.</small></div></div>
        <div className="feature-pill"><span className="feature-icon">◇</span><div><strong>Commercial-use ready</strong><small>Use your logo anywhere, worry-free.</small></div></div>
        <div className="feature-pill"><span className="feature-icon">✣</span><div><strong>Vector + transparent files</strong><small>High-quality files for any need.</small></div></div>
        <div className="feature-pill"><span className="feature-icon">☁</span><div><strong>Saved projects with login</strong><small>Access and manage anytime.</small></div></div>
      </section>

      <section className="commerce-section" id="packages">
        <div className="free-message">
          <span className="free-kicker">FREE TO CREATE</span>
          <h2>Design until it feels right.</h2>
          <p>Explore ideas and refine your logo at no charge. Choose a package only when you’re ready to take your brand with you.</p>
          <svg className="arrow-doodle" viewBox="0 0 170 78" aria-hidden="true">
            <path d="M9 16c49-19 105-8 112 23 5 20-18 22-22 7-3-12 19-11 44 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M133 43l12 12-16 2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="pricing-grid">
          <article className="price-card">
            <h3>Quick Start</h3>
            <div className="price">$29</div><div className="one-time">one-time</div>
            <ul>
              <li><Check /> High-resolution PNG</li>
              <li><Check /> Transparent PNG</li>
              <li><Check /> Commercial-use rights</li>
              <li><Check /> Final logo download</li>
            </ul>
            <Link href="/create?package=quick-start" className="btn btn-outline full">Choose Quick Start</Link>
          </article>
          <article className="price-card popular">
            <div className="popular-ribbon">MOST POPULAR</div>
            <h3>Brand Pro</h3>
            <div className="price">$59</div><div className="one-time">one-time</div>
            <ul>
              <li><Check /> PNG + SVG + PDF</li>
              <li><Check /> Transparent background</li>
              <li><Check /> Multiple logo layouts</li>
              <li><Check /> Color variations</li>
              <li><Check /> Favicon package</li>
              <li><Check /> Continued editing</li>
            </ul>
            <Link href="/create?package=brand-pro" className="btn btn-primary full">Choose Brand Pro</Link>
          </article>
          <article className="price-card">
            <h3>Brand Suite</h3>
            <div className="price">$99</div><div className="one-time">one-time</div>
            <ul>
              <li><Check /> Everything in Brand Pro</li>
              <li><Check /> Mini brand kit</li>
              <li><Check /> Social profile assets</li>
              <li><Check /> Business card design</li>
              <li><Check /> Typography + color guide</li>
              <li><Check /> Website-ready branding</li>
            </ul>
            <Link href="/create?package=brand-suite" className="btn btn-outline full">Choose Brand Suite</Link>
          </article>
        </div>

        <div className="login-card">
          <h3>Already started a project?</h3>
          <p>Sign in to access your saved designs.</p>
          <label>Email<input type="email" placeholder="you@example.com" /></label>
          <label>Password<input type="password" placeholder="Enter your password" /></label>
          <Link href="/login" className="forgot">Forgot password?</Link>
          <Link href="/login" className="btn btn-primary full">Sign In</Link>
          <span className="or-text">Don’t have an account?</span>
          <Link href="/login?mode=signup" className="btn btn-outline full">Create Account</Link>
        </div>
      </section>

      <section className="samples" id="samples">
        <div className="section-heading-row"><div><span className="section-kicker">INSPIRATION</span><h2>Sample Logo Concepts</h2></div><p>From pet brands to local businesses, the same guided workspace adapts to the story you want your brand to tell.</p></div>
        <div className="sample-grid">
          {sampleLogos.map((logo) => (
            <div className={`sample-card ${logo.className}`} key={logo.name}>
              <MiniLogo icon={logo.icon} />
              <strong>{logo.name}</strong><small>{logo.sub}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="ecosystem-section">
        <div className="ecosystem-intro"><span className="section-kicker">CONNECTED WHEN YOU WANT IT</span><h2>Part of a connected ecosystem built for breeders and businesses.</h2></div>
        <div className="ecosystem-flow">
          <a href="https://mydogportal.site" className="ecosystem-card"><span className="eco-icon paw">●</span><div><small>Use your new logo on</small><strong>MyDogPortal.Site</strong><p>Create your breeder portal with your new branding.</p></div></a>
          <span className="connector" />
          <a href="https://dogbreederweb.site" className="ecosystem-card"><span className="eco-icon web">▣</span><div><small>Launch a site on</small><strong>DogBreederWeb.Site</strong><p>Build a beautiful website that represents your brand.</p></div></a>
          <span className="connector" />
          <a href="https://dogbreederdocs.online" className="ecosystem-card"><span className="eco-icon docs">▤</span><div><small>Add branding to</small><strong>DogBreederDocs.Online</strong><p>Create professional documents with consistent branding.</p></div></a>
          <span className="connector" />
          <a href="https://hostmyweb.co" className="ecosystem-card"><span className="eco-icon cloud">☁</span><div><small>Host and launch with</small><strong>HostMyWeb.Co</strong><p>Fast, secure hosting to launch your brand online.</p></div></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><div className="brand"><IconLogo small /><span>LogoCreator<span>.Site</span></span></div><small>© 2026 LogoCreator.Site. All rights reserved.</small></div>
        <nav><Link href="#features">Features</Link><Link href="#samples">Samples</Link><Link href="#packages">Packages</Link><Link href="/login">Login</Link><Link href="/privacy">Privacy</Link></nav>
        <div className="socials"><span>f</span><span>◎</span><span>✉</span></div>
      </footer>
    </main>
  );
}

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="nav invitation-nav">
        <Link className="brand" href="/" aria-label="The Sovereign Circle home"><span className="brand-mark">♛</span> THE SOVEREIGN CIRCLE <span>™</span></Link>
        <nav aria-label="Main navigation"><a href="#philosophy">OUR PHILOSOPHY</a><a href="#membership">MEMBERSHIP</a><Link href="/dashboard">MEMBER PORTAL</Link></nav>
      </header>
      <main>
        <section className="hero invitation-hero">
          <div className="invitation-frame">
            <div className="eyebrow">A PRIVATE INTERNATIONAL MEMBERSHIP SOCIETY</div>
            <div className="crest" aria-hidden="true">♛</div>
            <p className="invitation-overline">THE INVITATION</p>
            <h1>Some Doors Are Not<br/><em>Open to Everyone.</em></h1>
            <p className="invitation-statement">Exceptional People. Intentional Connections. Absolute Discretion.</p>
            <div className="gold-rule" aria-hidden="true"/>
            <p className="intro">For those who have built extraordinary lives and seek something equally meaningful beyond accomplishment: a more considered path toward genuine connection.</p>
            <a className="button" href="#founding">DISCOVER THE FOUNDING INVITATION <span aria-hidden="true">↗</span></a>
            <p className="micro">PRIVATE APPLICATION · INDIVIDUAL REVIEW · MEMBERSHIP BY APPROVAL</p>
          </div>
        </section>
        <section id="philosophy" className="invitation-section invitation-intro">
          <div className="eyebrow">BEYOND ORDINARY CONNECTIONS</div>
          <h2>A higher standard of <em>connection.</em></h2>
          <p>The Sovereign Circle is being created for accomplished individuals who value character as much as achievement, intention over chance, and privacy as a fundamental courtesy.</p>
          <p>Not a public dating marketplace. A selective society designed around thoughtful consideration, mutual respect, and meaningful introductions.</p>
        </section>
        <section className="invitation-pillars" aria-label="Our principles">
          <article><span>01 / INTENTION</span><h3>Purpose Over Popularity</h3><p>For people who approach the next chapter of their personal lives with the same clarity they bring to their ambitions.</p></article>
          <article><span>02 / DISCERNMENT</span><h3>Admission by Review</h3><p>Membership is designed to be selective, with applications considered individually rather than accepted automatically.</p></article>
          <article><span>03 / DISCRETION</span><h3>Privacy by Design</h3><p>A considered experience where member information and introductions are handled with care and mutual consent.</p></article>
        </section>
        <section id="membership" className="invitation-section invitation-membership">
          <div className="eyebrow">A SOCIETY FOR EXCEPTIONAL INDIVIDUALS</div>
          <h2>Two paths. <em>One standard.</em></h2>
          <p>We welcome accomplished women and gentlemen who value authenticity, maturity, and a serious approach to meaningful partnership. Both pathways are selective, and membership is paid following approval.</p>
          <div className="membership-paths"><article><span>FOR WOMEN</span><h3>The Distinguished Woman</h3><p>For women whose independence, accomplishments, and values deserve a more intentional introduction experience.</p><a href="/apply/women">PREVIEW PRIVATE APPLICATION →</a></article><article><span>FOR GENTLEMEN</span><h3>The Distinguished Gentleman</h3><p>For men who value substance, character, and the possibility of building a meaningful future with an exceptional partner.</p><a href="/apply/gentlemen">PREVIEW PRIVATE APPLICATION →</a></article></div>
        </section>
        <section className="invitation-section invitation-process">
          <div className="eyebrow">THE MEMBERSHIP JOURNEY</div><h2>Membership is <em>by approval.</em></h2>
          <div className="process-steps"><div><b>01</b><h3>Express Interest</h3><p>Discover the founding invitation and the membership philosophy.</p></div><div><b>02</b><h3>Apply Privately</h3><p>Complete a confidential application when admissions open.</p></div><div><b>03</b><h3>Individual Review</h3><p>Applications are considered against our membership standards.</p></div><div><b>04</b><h3>Accept Membership</h3><p>Approved applicants may review the membership offer, fees, and terms before deciding to join.</p></div></div>
        </section>
        <section id="founding" className="invitation-section founding-invitation">
          <div className="eyebrow">THE FOUNDING MEMBERSHIP INVITATION</div><div className="crest" aria-hidden="true">♛</div>
          <h2>Your next chapter deserves <em>intention.</em></h2>
          <p>A limited founding membership program is in preparation. Applications and paid memberships are not yet open. The invitation begins with a commitment to thoughtful standards—not a promise of dates, introductions, or relationship outcomes.</p>
          <p className="founding-status">FOUNDING ADMISSIONS · COMING SOON</p>
          <p className="tagline">A Course Correction of Life™</p>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} The Sovereign Circle™. All rights reserved. The Sovereign Circle is in pre-launch development. Membership, screening, and payment services are not yet available.</footer>
    </>
  );
}

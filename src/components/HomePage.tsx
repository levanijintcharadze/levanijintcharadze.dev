const experiences = [
  {
    title: 'C# / .NET Developer',
    company: 'TBC Bank',
    period: 'Mar 2020 — Present',
    description:
      'Developing backend services for banking platforms, including APIs and integrations.',
  },
  {
    title: 'Editor',
    company: '.NET Developers',
    period: 'May 2020 — Present',
    description:
      'Creating educational .NET content, tutorials, and community-focused articles.',
  },
  {
    title: 'Web Developer',
    company: 'DilaPlus Travel Company',
    period: 'Jan 2017 — Mar 2017',
    description:
      'Worked on front-end development and the presentation of the company’s WordPress website.',
  },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/levanjintcharadze/' },
  { label: 'GitHub', href: 'https://github.com/levanijintcharadze' },
  { label: 'X', href: 'https://x.com/levani_lj' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/levanjintcharadze.dev' },
  { label: 'Instagram', href: 'https://www.instagram.com/levanjintcharadzedev/' },
  { label: 'Threads', href: 'https://www.threads.com/@levanjintcharadzedev' },
  { label: 'Facebook', href: 'https://www.facebook.com/levanjintcharadzedev/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@levanjintcharadze0' },
  { label: 'YouTube', href: 'https://www.youtube.com/@levanjintcharadze' },
]

export function HomePage() {
  return (
    <main className="site-shell">
      <section className="introduction" aria-labelledby="intro-title">
        <img className="portrait" src="/profile.jpg" alt="Levan Jintcharadze" />
        <div className="intro-copy">
          <p className="eyebrow">Software Engineer</p>
          <h1 id="intro-title">Levan Jintcharadze</h1>
          <p className="intro-description">
            I’m Levan, a software engineer based in Tbilisi, Georgia. I work on
            .NET banking platforms at TBC Bank and share news and practical
            resources with the .NET developer community.
          </p>
          <div className="intro-actions">
            <a className="primary-link" href="mailto:levanijincharadze@outlook.com">
              Get in touch
            </a>
            <a
              className="text-link"
              href="https://drive.google.com/uc?export=download&id=1s-CmEKAVsTHsD5E7F1N0HM7e0qc35zGU"
              target="_blank"
              rel="noopener noreferrer"
            >
              View résumé
            </a>
          </div>
          <div className="intro-socials" aria-label="Professional profiles">
            {socialLinks.slice(0, 2).map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        <ul className="entry-list">
          {experiences.map((experience) => (
            <li className="entry" key={`${experience.company}-${experience.title}`}>
              <div className="entry-heading">
                <h3>{experience.title}</h3>
                <p className="entry-meta">
                  {experience.company} <span aria-hidden="true">·</span> {experience.period}
                </p>
              </div>
              <p className="entry-description">{experience.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="content-section" aria-labelledby="community-title">
        <h2 id="community-title">Community &amp; writing</h2>
        <ul className="entry-list">
          <li className="entry">
            <div className="entry-heading">
              <h3>dotnetdevs.io</h3>
              <p className="entry-description">
                My .NET developer community and content platform.
              </p>
            </div>
            <a className="text-link descriptive-link" href="https://www.dotnetdevs.io/" target="_blank" rel="noopener noreferrer">
              Visit dotnetdevs.io
            </a>
          </li>
          <li className="entry">
            <div className="entry-heading">
              <h3>The .NET Insider</h3>
              <p className="entry-description">
                My newsletter covering developments and useful resources across the .NET ecosystem.
              </p>
            </div>
            <a className="text-link descriptive-link" href="https://dotnet.news" target="_blank" rel="noopener noreferrer">
              Read The .NET Insider
            </a>
          </li>
        </ul>
      </section>

      <section className="content-section contact-section" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Get in touch</h2>
        <p>
          Get in touch if you’d like to talk about software engineering, .NET, or
          working together.
        </p>
        <a className="text-link email-link" href="mailto:levanijincharadze@outlook.com">
          levanijincharadze@outlook.com
        </a>
        <nav className="social-list" aria-label="Social links">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </section>

      <footer className="site-footer">
        © {new Date().getFullYear()} Levan Jintcharadze
      </footer>
    </main>
  )
}

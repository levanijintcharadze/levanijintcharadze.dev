import { useState } from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCode,
  faEnvelope,
  faFileArrowDown,
  faGlobe,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faBluesky,
  faGithub,
  faInstagram,
  faLinkedin,
  faThreads,
  faTiktok,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { ThemeToggle } from './ThemeToggle'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

type LinkItem = {
  href?: string
  label: string
  description: string
  icon: IconDefinition
  external?: boolean
  ariaLabel?: string
  hoverClassName?: string
}

const featuredLinks: LinkItem[] = [
  {
    href: 'https://drive.google.com/uc?export=download&id=1s-CmEKAVsTHsD5E7F1N0HM7e0qc35zGU',
    label: 'Download Resume',
    description: 'Experience, architecture work, and shipped products.',
    icon: faFileArrowDown,
    external: true,
  },
  {
    href: 'https://github.com/levanijintcharadze',
    label: 'GitHub',
    description: 'Projects, experiments, and open-source contributions.',
    icon: faGithub,
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/levanjintcharadze/',
    label: 'LinkedIn',
    description: 'Career highlights, recommendations, and updates.',
    icon: faLinkedin,
    external: true,
  },
  {
    href: 'mailto:levanijincharadze@outlook.com',
    label: 'Email Me',
    description: 'Reach out directly for opportunities or collaborations.',
    icon: faEnvelope,
  },
]

const linkedinLinks = [
  {
    href: 'https://www.dotnetdevs.io/',
    label: 'DotNetDevs',
    description: 'Community platform I maintain for .NET developers.',
    logoSrc: 'https://github.com/user-attachments/assets/f1f8b6dc-bc5d-40d0-8be9-2ee4bbff76e0',
  },
  {
    href: 'https://dotnet.news',
    label: 'dotnet.news',
    description: 'The .NET Insider newsletter with curated ecosystem updates.',
    logoSrc: 'https://github.com/user-attachments/assets/9c65f7b1-f5f5-48b1-aae4-726f88db3817',
  },
]

const socialLinks: LinkItem[] = [
  {
    href: 'https://x.com/levani_lj',
    label: 'X',
    description: 'Thoughts and updates',
    icon: faXTwitter,
    external: true,
    ariaLabel: 'X (opens in a new tab)',
    hoverClassName: 'hover:bg-[#111111]/10 hover:border-[#111111]/50 hover:text-[#111111]',
  },
  {
    href: 'https://bsky.app/profile/levanjintcharadze.dev',
    label: 'Bluesky',
    description: 'Open conversations',
    icon: faBluesky,
    external: true,
    ariaLabel: 'Bluesky (opens in a new tab)',
    hoverClassName: 'hover:bg-[#1185FE]/10 hover:border-[#1185FE]/50 hover:text-[#1185FE]',
  },
  {
    href: 'https://www.instagram.com/levanjintcharadzedev/',
    label: 'Instagram',
    description: 'Visual snapshots',
    icon: faInstagram,
    external: true,
    ariaLabel: 'Instagram (opens in a new tab)',
    hoverClassName: 'hover:bg-[#E4405F]/10 hover:border-[#E4405F]/50 hover:text-[#E4405F]',
  },
  {
    href: 'https://www.threads.com/@levanjintcharadzedev',
    label: 'Threads',
    description: 'Short-form posts',
    icon: faThreads,
    external: true,
    ariaLabel: 'Threads (opens in a new tab)',
    hoverClassName: 'hover:bg-[#101010]/10 hover:border-[#101010]/50 hover:text-[#101010]',
  },
  {
    href: 'https://www.facebook.com/levanjintcharadzedev/',
    label: 'Facebook',
    description: 'Community and updates',
    icon: faFacebook,
    external: true,
    ariaLabel: 'Facebook (opens in a new tab)',
    hoverClassName: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50 hover:text-[#1877F2]',
  },
  {
    href: 'https://www.tiktok.com/@levanjintcharadze0',
    label: 'TikTok',
    description: 'Short videos and snippets',
    icon: faTiktok,
    external: true,
    ariaLabel: 'TikTok (opens in a new tab)',
    hoverClassName: 'hover:bg-[#EE1D52]/10 hover:border-[#EE1D52]/50 hover:text-[#EE1D52]',
  },
  {
    href: 'https://www.youtube.com/@levanjintcharadze',
    label: 'YouTube',
    description: 'Long-form content',
    icon: faYoutube,
    external: true,
    ariaLabel: 'YouTube (opens in a new tab)',
    hoverClassName: 'hover:bg-[#FF0000]/10 hover:border-[#FF0000]/50 hover:text-[#FF0000]',
  },
]

const experiences = [
  {
    value: 'tbc-bank',
    title: 'C# / .NET Developer',
    company: 'TBC Bank',
    period: 'Mar 2020 — Present',
    location: 'Tbilisi',
    description:
      'Leading backend development for core banking services with a focus on scalable APIs, resilient integrations, and high-throughput systems.',
    technologies: ['C#', '.NET', 'ASP.NET Web API', 'Azure DevOps', 'SQL Server', 'Redis', 'RabbitMQ', 'Microservices'],
    logoSrc: '/tbc_bank_logo.jpg',
  },
  {
    value: 'dotnet-developers',
    title: 'Editor',
    company: '.NET Developers',
    period: 'May 2020 — Present',
    location: 'Remote',
    description:
      'Creating educational .NET content, tutorials, and community-focused articles that help developers stay sharp and informed.',
    technologies: ['Editorial', '.NET Community', 'Technical Writing'],
    logoSrc: '/dotnetdevs_logo.jpg',
  },
  {
    value: 'dilaplus',
    title: 'Web Developer',
    company: 'DilaPlus Travel Company',
    period: 'Jan 2017 — Mar 2017',
    location: 'Tbilisi',
    description:
      'Handled front-end development and overall website presentation, delivering a polished WordPress-based experience.',
    technologies: ['HTML', 'CSS', 'WordPress'],
    logoSrc: '/dila_plus_logo.jpg',
  },
]

const getCompanyInitials = (company: string) =>
  company
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

export function HomePage() {
  const [showProfileImage, setShowProfileImage] = useState(true)
  const [hiddenExperienceLogos, setHiddenExperienceLogos] = useState<Record<string, boolean>>({})

  return (
    <div className="liquid-shell min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="liquid-orb liquid-orb-1" />
        <div className="liquid-orb liquid-orb-2" />
        <div className="liquid-orb liquid-orb-3" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-2xl flex-col">
        <header className="mb-6 flex items-center justify-between rounded-full border border-white/25 bg-white/12 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div>
            <p className="text-sm font-medium text-foreground">levanjintcharadze.dev</p>
            <p className="text-xs text-muted-foreground">Portfolio / Link hub</p>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex flex-1 flex-col items-center justify-center">
          <section className="liquid-panel w-full rounded-[2rem] p-5 sm:p-8">
            <div className="flex flex-col items-center text-center">
              {showProfileImage ? (
                <img
                  src="/profile.jpg"
                  alt="Levan Jintcharadze"
                  className="mb-5 h-24 w-24 rounded-full border border-white/40 object-cover shadow-2xl shadow-primary/15 sm:h-28 sm:w-28"
                  onError={() => setShowProfileImage(false)}
                />
              ) : (
                <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/45 text-3xl font-semibold text-foreground shadow-2xl shadow-primary/15 dark:bg-white/10 sm:h-28 sm:w-28">
                  LJ
                </div>
              )}
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/30 px-4 py-1 text-xs font-medium text-foreground/80 backdrop-blur-lg dark:border-white/10 dark:bg-white/10">
                <FontAwesomeIcon icon={faCode} className="text-primary" />
                Clean builds. Cloud-native systems. Human-centered products.
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Levan Jintcharadze
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                Software Engineer crafting reliable .NET platforms, cloud architecture, and polished digital experiences.
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-foreground/80">
                <span className="rounded-full border border-white/25 bg-white/25 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.08]">
                  .NET & C#
                </span>
                <span className="rounded-full border border-white/25 bg-white/25 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.08]">
                  Azure & AWS
                </span>
                <span className="rounded-full border border-white/25 bg-white/25 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.08]">
                  Microservices
                </span>
              </div>

              <div className="mt-6 grid w-full gap-3">
                {featuredLinks.flatMap((link) => {
                  const items = [
                    <div key={link.label} className="grid gap-2">
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}
                        className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/25 bg-white/40 px-4 py-4 text-left shadow-lg shadow-black/5 backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] sm:px-5"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/60 text-lg text-primary shadow-sm dark:bg-white/10">
                            <FontAwesomeIcon icon={link.icon} />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">{link.label}</p>
                            <p className="truncate text-sm text-muted-foreground">{link.description}</p>
                          </div>
                        </div>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="shrink-0 text-sm text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                        />
                      </a>
                    </div>,
                  ]

                  if (link.label === 'LinkedIn') {
                    items.push(
                      ...linkedinLinks.map((subLink) => (
                        <div key={subLink.label} className="grid gap-2 pl-3 sm:pl-6">
                          <a
                            href={subLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${subLink.label} (opens in a new tab)`}
                            className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/25 bg-white/34 px-4 py-4 text-left shadow-lg shadow-black/5 backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] sm:px-5"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[50%] border border-white/20 bg-[#1b0a4b] shadow-sm dark:border-white/10">
                                <img
                                  src={subLink.logoSrc}
                                  alt={`${subLink.label} logo`}
                                  className="h-full w-full rounded-[50%] object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate font-medium text-foreground">{subLink.label}</p>
                                <p className="truncate text-sm text-muted-foreground">{subLink.description}</p>
                              </div>
                            </div>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="shrink-0 text-sm text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                            />
                          </a>
                        </div>
                      ))
                    )
                  }

                  return items
                })}
              </div>

              <div className="mt-5 grid w-full gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/20 bg-white/28 p-4 text-left backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <FontAwesomeIcon icon={faGlobe} />
                    Currently
                  </div>
                  <p className="text-sm leading-6 text-foreground/85">
                    Open to senior engineering, platform, and consulting opportunities.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/20 bg-white/28 p-4 text-left backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <FontAwesomeIcon icon={faLocationDot} />
                    Based in
                  </div>
                  <p className="text-sm leading-6 text-foreground/85">Tbilisi, Georgia · working globally</p>
                </div>
              </div>

              <div className="mt-5 w-full rounded-[1.5rem] border border-white/20 bg-white/28 p-4 text-left backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
                <div className="mb-3">
                  <p className="font-medium text-foreground">Work experience</p>
                  <p className="text-sm text-muted-foreground">A quick overview of roles and impact.</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {experiences.map((experience) => (
                    <AccordionItem
                      key={experience.value}
                      value={experience.value}
                      className="border-white/20 last:border-b-0 dark:border-white/10"
                    >
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex min-w-0 items-center gap-3 text-left">
                          {hiddenExperienceLogos[experience.value] ? (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/45 text-xs font-semibold text-foreground shadow-sm dark:border-white/10 dark:bg-white/10">
                              {getCompanyInitials(experience.company)}
                            </div>
                          ) : (
                            <img
                              src={experience.logoSrc}
                              alt={`${experience.company} logo`}
                              className="h-11 w-11 shrink-0 rounded-2xl border border-white/30 object-cover shadow-sm dark:border-white/10"
                              onError={() =>
                                setHiddenExperienceLogos((current) => ({
                                  ...current,
                                  [experience.value]: true,
                                }))
                              }
                            />
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">{experience.title}</p>
                            <p className="truncate text-sm text-muted-foreground">
                              {experience.company} · {experience.period}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-1">
                        <p className="text-sm text-muted-foreground">{experience.location}</p>
                        <p className="text-sm leading-6 text-foreground/85">{experience.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-full border border-white/20 bg-white/35 px-3 py-1 text-xs text-foreground/80 dark:border-white/10 dark:bg-white/[0.08]"
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="mt-5 w-full rounded-[1.5rem] border border-white/20 bg-white/28 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
                <div className="mb-3 text-left">
                  <p className="font-medium text-foreground">Socials</p>
                  <p className="text-sm text-muted-foreground">A few more places to find me.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="outline"
                      size="icon"
                      className={`glass glass-hover size-11 rounded-2xl transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${link.hoverClassName ?? ''}`}
                      asChild
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.ariaLabel ?? `${link.label} (opens in a new tab)`}
                        title={link.label}
                      >
                        <FontAwesomeIcon icon={link.icon} className="h-5 w-5" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="pt-6 text-center text-xs text-muted-foreground">
          Designed as a minimal glassmorphic link hub.
        </footer>
      </div>

    </div>
  )
}

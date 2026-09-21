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
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import {
  faBluesky,
  faGithub,
  faInstagram,
  faLinkedin,
  faThreads,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { ThemeToggle } from './ThemeToggle'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

type LinkItem = {
  href?: string
  label: string
  description: string
  icon: IconDefinition
  external?: boolean
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

const socialLinks: LinkItem[] = [
  {
    href: 'https://x.com/levani_lj',
    label: 'X',
    description: 'Thoughts and updates',
    icon: faXTwitter,
    external: true,
  },
  {
    href: 'https://bsky.app/profile/levanjintcharadze.dev',
    label: 'Bluesky',
    description: 'Open conversations',
    icon: faBluesky,
    external: true,
  },
  {
    href: 'https://www.instagram.com/levanjintcharadzedev/',
    label: 'Instagram',
    description: 'Visual snapshots',
    icon: faInstagram,
    external: true,
  },
  {
    href: 'https://www.threads.com/@levanjintcharadzedev',
    label: 'Threads',
    description: 'Short-form posts',
    icon: faThreads,
    external: true,
  },
]

export function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showProfileImage, setShowProfileImage] = useState(true)

  const contactEmail = 'levanijincharadze@outlook.com'

  const openMailtoFallback = (name: string, email: string, message: string) => {
    const subject = `Portfolio Contact from ${name || 'Website Visitor'}`
    const body = [`Name: ${name}`, `Email: ${email}`, '', 'Message:', message].join('\n')
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleEmailSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    const website = String(data.get('website') || '')

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, website }),
      })

      const result =
        response.status === 204 || !response.headers.get('content-type')?.includes('json')
          ? {}
          : await response.json().catch(() => ({} as { error?: string }))

      if (response.ok) {
        toast.success('Message sent successfully!', {
          description: 'Thank you for reaching out. I’ll get back to you soon.',
        })
        form.reset()
        setIsDialogOpen(false)
      } else {
        openMailtoFallback(name, email, message)
        toast.info('Opening your email app', {
          description: result.error || 'Direct sending is unavailable right now, so a prefilled draft was created.',
        })
      }
    } catch {
      openMailtoFallback(name, email, message)
      toast.info('Opening your email app', {
        description: 'Direct sending is unavailable right now, so a prefilled draft was created.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
                {featuredLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}
                    className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/25 bg-white/40 px-4 py-4 text-left shadow-lg shadow-black/5 backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/55 dark:border-white/10 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/60 text-lg text-primary shadow-sm dark:bg-white/10">
                        <FontAwesomeIcon icon={link.icon} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{link.label}</p>
                        <p className="truncate text-sm text-muted-foreground">{link.description}</p>
                        {link.external && <span className="sr-only">Opens in a new tab</span>}
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="shrink-0 text-sm text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                    />
                  </a>
                ))}
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

              <div className="mt-5 w-full rounded-[1.5rem] border border-white/20 bg-white/28 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <p className="font-medium text-foreground">Socials</p>
                    <p className="text-sm text-muted-foreground">A few more places to find me.</p>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="rounded-full px-4">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send me a message</DialogTitle>
                        <DialogDescription>
                          Share a quick note and I’ll reply as soon as possible.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4 text-left" onSubmit={handleEmailSubmit}>
                        <div className="hidden" aria-hidden="true">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" name="name" placeholder="Your name" required disabled={isSubmitting} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" placeholder="you@example.com" required disabled={isSubmitting} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea id="message" name="message" placeholder="How can I help?" required disabled={isSubmitting} />
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send message'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.label} (opens in a new tab)`}
                      className="rounded-[1.25rem] border border-white/20 bg-white/35 px-3 py-3 text-left transition duration-300 hover:-translate-y-0.5 hover:bg-white/50 dark:border-white/10 dark:bg-white/[0.08] dark:hover:bg-white/[0.12]"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/65 text-primary shadow-sm dark:bg-white/10">
                        <FontAwesomeIcon icon={link.icon} />
                      </div>
                      <p className="font-medium text-foreground">{link.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{link.description}</p>
                      <span className="sr-only">Opens in a new tab</span>
                    </a>
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

      <Toaster />
    </div>
  )
}

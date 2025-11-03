import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { GlassCard } from './GlassCard'

export function Hero() {
  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleEmailSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    const to = (import.meta as any).env?.VITE_CONTACT_EMAIL || ''
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Visitor'}`)
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)
    const href = `mailto:${to}?subject=${subject}&body=${body}`
    window.location.href = href
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 pb-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <GlassCard className="float mb-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold gradient-text">
                Levan Jintcharadze
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground">
                Software Engineer
              </h2>
              <p className="text-lg max-w-2xl mx-auto text-foreground/80">
                Building scalable cloud-native solutions with C# and .NET. 
                Specialized in microservices architecture, Azure & AWS deployments, 
                and high-performance distributed systems.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="glass-hover transition-colors">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 h-4 w-4 transition-colors" />
                    Get In Touch
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send me a message</DialogTitle>
                    <DialogDescription>
                      Fill in the form and your email client will open a draft.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4 text-left" onSubmit={handleEmailSubmit}>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Your name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" placeholder="How can I help?" required />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit" className="transition-colors">Send</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button 
                variant="outline" 
                className="glass glass-hover transition-colors hover:text-foreground"
                asChild
              >
                <a href="https://github.com/levanijintcharadze" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4 transition-colors" />
                  GitHub
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="glass glass-hover transition-colors hover:text-foreground"
                asChild
              >
                <a href="https://www.linkedin.com/in/levanjintcharadze" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} className="mr-2 h-4 w-4 transition-colors" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </GlassCard>
        
        <div className="mt-8">
          <Button
            variant="ghost"
            onClick={scrollToSkills}
            className="glass glass-hover animate-bounce transition-colors hover:text-foreground">
            <FontAwesomeIcon icon={faChevronDown} className="h-6 w-6 transition-colors" />
          </Button>
        </div>
      </div>
    </section>
  )
}
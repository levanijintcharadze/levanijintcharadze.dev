import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faXTwitter, faFacebook, faInstagram, faTiktok, faYoutube, faThreads } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { GlassCard } from './GlassCard'
import { useState } from 'react'
import { toast } from 'sonner'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEmailSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Message sent successfully!', {
          description: 'Thank you for reaching out. I\'ll get back to you soon.',
        })
        form.reset()
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to send message', {
          description: result.error || 'Please try again later or contact me directly.',
        })
      }
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('Failed to send message', {
        description: 'Please try again later or contact me directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Let's Connect</h2>
          <p className="text-lg text-muted-foreground">
            Open to new opportunities and interesting projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard hover>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Get In Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-primary" />
                  <a 
                    href="mailto:levanijincharadze@outlook.com" 
                    className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    levanijincharadze@outlook.com
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faMapPin} className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Tbilisi, Georgia</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Connect with me</h4>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="glass glass-hover transition-all hover:scale-110 hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                    asChild
                  >
                    <a href="https://github.com/levanijintcharadze" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="glass glass-hover transition-all hover:scale-110 hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/levanjintcharadze/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="glass glass-hover transition-all hover:scale-110 hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                    asChild
                  >
                    <a href="https://x.com/levani_lj" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                      <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="glass glass-hover transition-all hover:scale-110 hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                    asChild
                  >
                    <a href="https://www.facebook.com/levanjintcharadzedev/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="glass glass-hover transition-all hover:scale-110 hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                    asChild
                  >
                    <a href="https://www.instagram.com/levanjintcharadzedev/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="glass glass-hover transition-all hover:scale-110 hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                    asChild
                  >
                    <a href="https://www.tiktok.com/@levanjintcharadze0" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                      <FontAwesomeIcon icon={faTiktok} className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="glass glass-hover transition-all hover:scale-110 hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                    asChild
                  >
                    <a href="https://www.youtube.com/@levanjintcharadze" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="glass glass-hover transition-all hover:scale-110 hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                    asChild
                  >
                    <a href="https://www.threads.com/@levanjintcharadzedev" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                      <FontAwesomeIcon icon={faThreads} className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">What I'm Looking For</h3>
              
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0" />
                  <span>Senior engineering roles in cloud-native environments</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0" />
                  <span>Technical leadership and architecture opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0" />
                  <span>Collaborative teams building scalable solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0" />
                  <span>Consulting and contract opportunities</span>
                </li>
              </ul>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full transition-colors">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 h-4 w-4 transition-colors" />
                    Send Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send me a message</DialogTitle>
                    <DialogDescription>
                      Fill in the form below and I'll get back to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4 text-left" onSubmit={handleEmailSubmit}>
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
                      <Button type="submit" className="transition-colors" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
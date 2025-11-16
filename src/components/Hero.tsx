import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faEnvelope, faDownload } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { GlassCard } from './GlassCard'
import { useState } from 'react'
import { toast } from 'sonner'

export function Hero() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
  }

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
    <section className="min-h-screen flex items-center justify-center relative px-4 pb-24">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
  <GlassCard className="float mt-10 mb-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <img 
                  src="/profile.jpg" 
                  alt="Levan Jintcharadze" 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                />
              </div>
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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <Button 
                variant="outline" 
                className="glass glass-hover transition-colors hover:text-foreground"
                asChild
              >
                <a href="https://drive.google.com/uc?export=download&id=1s-CmEKAVsTHsD5E7F1N0HM7e0qc35zGU" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4 transition-colors" />
                  Resume
                </a>
              </Button>
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
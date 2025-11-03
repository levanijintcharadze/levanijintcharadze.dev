import { Navigation } from './Navigation'
import { Hero } from './Hero'
import { Skills } from '../components/Skills'
import { Experience } from '../components/Experience'
import { Contact } from './Contact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCoffee } from '@fortawesome/free-solid-svg-icons'

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <div id="hero">
          <Hero />
        </div>
        <Skills />
        <Experience />
        <Contact />
      </main>
      
      <footer className="py-8 text-center text-muted-foreground border-t border-border/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
            <span>&copy; 2025 Levan Jintcharadze.</span>
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <FontAwesomeIcon icon={faCode} className="w-4 h-4 text-accent" /> 
              <span>and</span>
              <FontAwesomeIcon icon={faCoffee} className="w-4 h-4 text-accent" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { GlassCard } from './GlassCard'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <GlassCard className="float">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-8xl md:text-9xl font-bold gradient-text">
                404
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Page Not Found
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button 
                variant="default" 
                className="glass-hover transition-colors"
                onClick={() => navigate('/')}
              >
                <FontAwesomeIcon icon={faHome} className="mr-2 h-4 w-4 transition-colors" />
                Go Home
              </Button>
              <Button 
                variant="outline" 
                className="glass glass-hover transition-colors hover:text-foreground"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faSearch} className="mr-2 h-4 w-4 transition-colors" />
                Go Back
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

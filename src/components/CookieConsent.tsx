import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookie } from '@fortawesome/free-solid-svg-icons'

type ConsentValue = 'granted' | 'denied'
type ConsentSettings = {
  ad_storage: ConsentValue
  ad_user_data: ConsentValue
  ad_personalization: ConsentValue
  analytics_storage: ConsentValue
}

declare global {
  interface Window {
    gtag?: (command: 'consent', action: 'update', settings: ConsentSettings) => void
  }
}

function updateConsent(settings: ConsentSettings) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', settings)
  }
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent')
    
    if (consent === 'accepted') {
      // User previously accepted - update consent immediately
      updateConsent({
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      })
    } else if (consent === 'declined') {
      // User previously declined - ensure it stays denied
      updateConsent({
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      })
    } else {
      // No consent given yet - show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
    
    // Update consent mode - grant all permissions
    updateConsent({
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    })
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
    
    // Update consent mode - keep everything denied
    updateConsent({
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied'
    })
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="text-primary mt-1">
                <FontAwesomeIcon icon={faCookie} className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  We value your privacy
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and provide personalized content. 
                  By clicking "Accept", you consent to our use of cookies for analytics and performance tracking.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={handleDecline}
                className="flex-1 md:flex-initial glass glass-hover transition-colors hover:text-foreground"
              >
                Decline
              </Button>
              <Button
                variant="default"
                onClick={handleAccept}
                className="flex-1 md:flex-initial glass-hover transition-colors"
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

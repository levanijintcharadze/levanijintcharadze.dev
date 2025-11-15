import { GlassCard } from './GlassCard'
import { Badge } from '@/components/ui/badge'

export function Experience() {
  const experiences = [
    {
      title: 'C# / .NET Developer',
      company: 'TBC Bank',
      period: 'Mar 2020 - Present',
      location: 'Tbilisi',
      description: 'Lead development of backend systems focused on ASP.NET Web API and high-throughput services powering core banking features.',
      technologies: ['C#', '.NET', 'ASP.NET Web API', 'Azure DevOps', 'SQL Server', "Redis", "RabbitMQ", 'Microservices']
    },
    {
      title: 'Editor',
      company: '.NET Developers',
      period: 'May 2020 - Present',
      location: 'Remote',
      description: 'As a passionate content creator for .NET Developers, I curate and craft informative articles, tutorials, and insights to keep the .NET community informed and engaged.',
      technologies: ['Editorial']
    },
    {
      title: 'Web Developer',
      company: 'DilaPlus travel company',
      period: 'Jan 2017 - Mar 2017',
      location: 'Tbilisi',
      description: 'I was responsible for Front End development and website\'s overall appearance, working with WordPress.',
      technologies: ['HTML', 'WordPress']
    }
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Professional Experience</h2>
          <p className="text-lg text-muted-foreground">
            Building enterprise-grade software solutions in banking industry
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            // map company names to public logo files (lowercase keys)
            const logoMap: Record<string, string> = {
              'tbc bank': '/tbc_bank_logo.jpg',
              '.net developers': '/dotnetdevs_logo.jpg',
              'dilaplus travel company': '/dila_plus_logo.jpg',
              'dilaplus': '/dila_plus_logo.jpg'
            }

            const logoSrc = logoMap[exp.company.toLowerCase()] || null

            return (
              <GlassCard key={index} hover>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-4">
                      {logoSrc && (
                        <img src={logoSrc} alt={`${exp.company} logo`} className="w-14 h-14 rounded-full object-cover border border-border shadow-sm" />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <h4 className="text-sm font-medium text-primary">
                          {exp.company}
                        </h4>
                      </div>
                    </div>

                    <span className="text-sm text-muted-foreground font-mono">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-foreground/80 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge 
                        key={tech}
                        variant="outline" 
                        className="glass text-xs px-2 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
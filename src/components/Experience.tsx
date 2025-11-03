import { GlassCard } from './GlassCard'
import { Badge } from '@/components/ui/badge'

export function Experience() {
  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      description: 'Lead development of cloud-native microservices architecture serving 2M+ users. Designed and implemented scalable APIs using .NET Core and Azure services.',
      technologies: ['C#', '.NET Core', 'Azure', 'Microservices', 'Redis', 'Docker']
    },
    {
      title: 'Software Engineer',
      company: 'CloudFirst Inc',
      period: '2020 - 2022',
      description: 'Built high-performance distributed systems and RESTful APIs. Migrated legacy monolith to microservices architecture, reducing deployment time by 80%.',
      technologies: ['.NET Framework', 'AWS', 'PostgreSQL', 'RabbitMQ', 'Kubernetes']
    },
    {
      title: 'Junior Software Developer',
      company: 'StartupTech',
      period: '2018 - 2020',
      description: 'Developed full-stack web applications and automated deployment pipelines. Collaborated on agile teams to deliver features for SaaS platform.',
      technologies: ['C#', 'ASP.NET', 'SQL Server', 'Azure DevOps', 'Entity Framework']
    }
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Professional Experience</h2>
          <p className="text-lg text-muted-foreground">
            Building enterprise-grade software solutions across various industries
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <GlassCard key={index} hover>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <span className="text-sm text-muted-foreground font-mono">
                    {exp.period}
                  </span>
                </div>
                
                <h4 className="text-lg font-medium text-primary">
                  {exp.company}
                </h4>
                
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
          ))}
        </div>
      </div>
    </section>
  )
}
import { Badge } from '@/components/ui/badge'
import { GlassCard } from './GlassCard'

export function Skills() {
  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      skills: ['C#', '.NET Core', '.NET Framework', 'ASP.NET Core', 'Entity Framework', 'LINQ']
    },
    {
      title: 'Cloud Platforms',
      skills: ['Microsoft Azure', 'Azure Functions', 'Azure DevOps', 'Github']
    },
    {
      title: 'Architecture & Design',
      skills: ['Microservices', 'REST APIs', 'Domain-Driven Design', 'CQRS']
    },
    {
      title: 'Data & Caching',
      skills: ['SQL Server', 'Redis', 'RabbitMQ']
    },
    {
      title: 'DevOps & Tools',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Git']
    }
  ]

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Technical Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proficient in modern backend technologies with a focus on scalable cloud solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <GlassCard key={category.title} hover className="h-full">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill}
                      variant="secondary" 
                      className="glass font-mono text-xs px-3 py-1 hover:bg-accent/20 transition-colors"
                    >
                      {skill}
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
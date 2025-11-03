# Software Engineer Portfolio Website

A minimal, elegant portfolio website showcasing a Software Engineer's expertise in modern backend technologies with a focus on cloud-native solutions.

**Experience Qualities**:
1. **Professional** - Clean, sophisticated design that reflects technical expertise and attention to detail
2. **Modern** - Contemporary glassmorphic aesthetic with smooth animations that feels cutting-edge
3. **Focused** - Streamlined content presentation that highlights key skills without overwhelming visitors

**Complexity Level**: Content Showcase (information-focused)
- Primarily displays static content about the engineer's skills, experience, and projects with minimal interactivity beyond navigation and theme switching

## Essential Features

### Hero Section
- **Functionality**: Display engineer's name, title, and key value proposition
- **Purpose**: Create strong first impression and immediately communicate expertise level
- **Trigger**: Page load
- **Progression**: Page loads → Hero animates in → Call-to-action visible → User can scroll or navigate
- **Success criteria**: Visitors understand the engineer's focus area within 3 seconds

### Skills Showcase
- **Functionality**: Visual display of technical stack with categorization
- **Purpose**: Demonstrate specific expertise in requested technologies (C#, .NET, Azure, AWS, etc.)
- **Trigger**: Scroll to skills section or direct navigation
- **Progression**: Section enters viewport → Skills animate in with staggered timing → Hover effects reveal additional details
- **Success criteria**: All mentioned technologies are clearly visible and categorized logically

### Experience Timeline
- **Functionality**: Chronological display of professional experience
- **Purpose**: Establish credibility and career progression
- **Trigger**: Scroll to experience section
- **Progression**: Timeline enters view → Items animate in sequentially → Expandable details on interaction
- **Success criteria**: Career progression is clear and each role's impact is summarized

### Contact Section
- **Functionality**: Professional contact information and links
- **Purpose**: Enable potential employers/clients to reach out
- **Trigger**: Scroll to bottom or click contact navigation
- **Progression**: Contact section loads → Social links and email visible → Hover animations provide feedback
- **Success criteria**: Multiple contact methods are available and functional

### Dark Mode Toggle
- **Functionality**: Switch between light and dark themes
- **Purpose**: Provide viewing preference and showcase technical implementation
- **Trigger**: Click theme toggle button
- **Progression**: Button clicked → Theme transitions smoothly → Preference persisted → All glassmorphic elements adapt
- **Success criteria**: Seamless theme switching with no layout shifts or broken states

## Edge Case Handling

- **Mobile Layout**: Responsive design with touch-friendly navigation and optimized glassmorphic effects
- **Slow Connections**: Progressive loading with skeleton states for smooth perceived performance
- **No JavaScript**: Graceful degradation with CSS-only fallbacks for critical content
- **Screen Readers**: Proper semantic HTML and ARIA labels for accessibility
- **Print Styles**: Clean, professional print layout for PDF generation

## Design Direction

The design should feel sophisticated and technical while remaining approachable - think Apple's design language meets Microsoft's technical documentation aesthetic, with glassmorphic elements that suggest transparency and depth without being distracting from the content.

## Color Selection

Complementary (opposite colors) - Using a cool blue primary with warm accent touches to create professional contrast while maintaining visual interest.

- **Primary Color**: Deep Blue (oklch(0.45 0.15 240)) - Communicates trust, professionalism, and technical depth
- **Secondary Colors**: Slate grays (oklch(0.25 0.02 240) to oklch(0.85 0.02 240)) - Supporting neutral tones for content hierarchy
- **Accent Color**: Warm Orange (oklch(0.7 0.15 60)) - Attention-grabbing highlight for CTAs and interactive elements
- **Foreground/Background Pairings**:
  - Background Light (oklch(0.98 0.005 240)): Dark text (oklch(0.15 0.02 240)) - Ratio 14.2:1 ✓
  - Background Dark (oklch(0.12 0.02 240)): Light text (oklch(0.95 0.005 240)) - Ratio 15.8:1 ✓
  - Primary (oklch(0.45 0.15 240)): White text (oklch(1 0 0)) - Ratio 8.4:1 ✓
  - Accent (oklch(0.7 0.15 60)): Dark text (oklch(0.15 0.02 240)) - Ratio 6.2:1 ✓

## Font Selection

Typography should convey technical precision while remaining highly readable - using a modern sans-serif system font stack that performs well across all devices and suggests contemporary software development practices.

- **Typographic Hierarchy**:
  - H1 (Name/Title): Inter Bold/48px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/32px/normal spacing
  - H3 (Subsections): Inter Medium/24px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height (1.6)
  - Code/Tech Stack: JetBrains Mono/14px/monospace for technical terms

## Animations

Animations should feel purposeful and enhance the glassmorphic theme through subtle depth and layering effects that guide attention without being performative or distracting.

- **Purposeful Meaning**: Motion reinforces the "glass" metaphor through gentle floating, depth transitions, and light refraction effects
- **Hierarchy of Movement**: Hero elements get primary animation focus, followed by section reveals, then micro-interactions on hover states

## Component Selection

- **Components**: 
  - Card (customized with glassmorphic backdrop-blur and transparency)
  - Button (modified with glass effects and smooth hover transitions)
  - Badge (for tech stack items with subtle glow effects)
  - Separator (styled as frosted glass dividers)
  - Switch (for dark mode toggle with glassmorphic thumb)

- **Customizations**: 
  - Glassmorphic container component with backdrop-blur-md and subtle borders
  - Floating animation wrapper for depth effects
  - Gradient text component for hero elements

- **States**: 
  - Buttons: glass effect intensifies on hover, slight scale and glow on active
  - Cards: subtle lift effect on hover with increased backdrop blur
  - Links: underline animations with accent color transitions

- **Icon Selection**: Phosphor icons for their clean, technical aesthetic that complements the modern design
- **Spacing**: Consistent 8px base unit with generous whitespace using Tailwind's spacing scale (p-8, p-12, p-16)
- **Mobile**: Single column layout with larger touch targets, reduced glassmorphic complexity for performance, progressive enhancement of effects
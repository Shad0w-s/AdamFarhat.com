import SectionContainer from '@/components/common/SectionContainer'

export const metadata = {
  title: 'Contact | Adam Farhat',
  description: 'Get in touch with Adam Farhat for collaborations or just to say hello.',
}

export default function ContactPage() {
  return (
    <SectionContainer>
      <div className="max-w-3xl mx-auto mb-16 md:mb-24 text-center">
        <h1 className="text-display-sm font-display font-bold mb-8">Let's work together</h1>
        <p className="text-lg md:text-xl text-foreground/60 leading-relaxed mb-8">
          Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you as soon as possible.
        </p>
        <a
          href="mailto:hello@adamfarhat.com"
          className="inline-block px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </SectionContainer>
  )
}


import SectionContainer from '@/components/common/SectionContainer'
import AboutTwoColumn from '@/components/about/AboutTwoColumn'

const bio = {
  title: 'About Me',
  body: (
    <>
      <p className="mb-4">
        I'm a student founder passionate about building products that solve real
        problems. I believe in the power of simple, intuitive design and thoughtful
        engineering.
      </p>
      <p className="mb-4">
        When I'm not coding or building, you can find me reading about business history,
        exploring new technologies, or experimenting in the kitchen.
      </p>
    </>
  ),
  image: '/images/about/BitAdamWavingBackground.png',
}

const highlights = [
  {
    category: 'Experience',
    items: [
      'Founder & Builder',
      'Full-stack Developer',
      'Product Designer',
    ],
  },
  {
    category: 'Education',
    items: [
      'Student',
      'Self-taught Developer',
    ],
  },
  {
    category: 'Interests',
    items: [
      'Product Development',
      'AI & Machine Learning',
      'Business History',
      'Cooking',
    ],
  },
]

export default function AboutPage() {
  return (
    <SectionContainer>
      <AboutTwoColumn
        image={bio.image}
        title={bio.title}
        body={bio.body}
      />

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Highlights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((section) => (
            <div key={section.category}>
              <h3 className="text-xl font-semibold mb-4">{section.category}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-foreground/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <p className="text-foreground/70 mb-4">
          Feel free to reach out if you'd like to collaborate or just say hello.
        </p>
        <a
          href="mailto:hello@adamfarhat.com"
          className="inline-block px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Get in touch
        </a>
      </section>
    </SectionContainer>
  )
}


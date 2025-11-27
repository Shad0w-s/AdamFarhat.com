import Link from 'next/link'
import Image from 'next/image'
import SectionContainer from '../common/SectionContainer'

interface AboutPreviewProps {
  bio: string
}

export default function AboutPreview({ bio }: AboutPreviewProps) {
  return (
    <SectionContainer>
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-mono text-foreground/60">.about</span>
            <div className="flex-1 h-px bg-foreground/10"></div>
          </div>
          <p className="text-lg md:text-xl leading-relaxed text-foreground mb-8">
            {bio}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-md hover:border-foreground/40 hover:bg-foreground/5 transition-all group"
          >
            <span>about me</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M7 7h10v10"
              />
            </svg>
          </Link>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative w-full aspect-[3/4] md:aspect-[2/3] lg:aspect-[3/5]">
            <Image
              src="/images/about/BitAdamWorking.png"
              alt="Adam Farhat"
              fill
              className="object-contain transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}


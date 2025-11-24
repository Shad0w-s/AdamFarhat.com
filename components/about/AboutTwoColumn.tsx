import Image from 'next/image'

interface AboutTwoColumnProps {
  image: string
  title: string
  body: React.ReactNode
}

export default function AboutTwoColumn({
  image,
  title,
  body,
}: AboutTwoColumnProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
      <div className="order-2 md:order-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          {body}
        </div>
      </div>
      <div className="order-1 md:order-2 relative">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden md:translate-x-8 md:translate-y-8">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}


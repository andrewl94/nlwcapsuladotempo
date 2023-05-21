import Link from 'next/link'
import logo from '../assets/nlw-spacetime-logo.svg'
import Image from 'next/image'
export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={logo} alt="Logo" />
      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Your time capsule
        </h1>
        <p className="text-lg leading-relaxed">
          Collect moments of your journey and share with everyone you want!
        </p>
        <Link
          className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
          href="/memories/new"
        >
          Create memory
        </Link>
      </div>
    </div>
  )
}

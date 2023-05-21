import { getUser } from '@/lib/auth'
import Image from 'next/image'

export function Profile() {
  const { name, avatarUrl } = getUser()
  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt="Avatar"
        className="h-10 w-10 rounded-full"
      ></Image>
      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a href="" className="block text-red-400 hover:text-red-200">
          Log Out
        </a>
      </p>
    </div>
  )
}

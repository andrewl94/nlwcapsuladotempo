export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w=[360px] text-center leading-relaxed">
        You dont have any saved memory,{' '}
        <a className="underline hover:text-gray-50" href="">
          start creating now!
        </a>
      </p>
    </div>
  )
}

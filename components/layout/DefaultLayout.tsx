import { ReactNode } from 'react'

type Props = { children: ReactNode }

export default function DefaultLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4">{children}</main>
      <footer className="bg-gray-200 text-center p-4">
        © 2025 My App
      </footer>
    </div>
  )
}

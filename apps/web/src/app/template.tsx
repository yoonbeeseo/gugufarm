import { PropsWithChildren } from "react"

export default function RootTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <header>header</header>
      <main>{children}</main>
      <nav>footer nav</nav>
    </>
  )
}

import { BlitzLayout, Head } from "blitz"
import { ReactNode } from "react"
import Header from "../components/header/Header"

type PlainLayoutProps = {
  title?: string
  description?: string
  children?: ReactNode
}

const PlainLayout: BlitzLayout<PlainLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Effluent"}</title>
      </Head>

      <Header />
      {children}
    </>
  )
}

export default PlainLayout

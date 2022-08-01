import { BlitzLayout } from "blitz"
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
      <title>{title || "Effluent"}</title>
      <Header />

      {children}
    </>
  )
}

export default PlainLayout

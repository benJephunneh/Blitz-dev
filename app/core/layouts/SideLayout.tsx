import { BlitzLayout, Head } from "blitz"
import { ReactNode } from "react"
import Sidebar from "../components/sidebar/Sidebar"

type PlainLayoutProps = {
  title?: string
  description?: string
  children?: ReactNode
}

const SideLayout: BlitzLayout<PlainLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Sidebar />

      {children}
    </>
  )
}

export default SideLayout

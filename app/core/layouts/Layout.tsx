import { Head, BlitzLayout } from "blitz"
import { ReactNode } from "react"

export interface LayoutProps {
  title?: string
  children?: ReactNode
}

const Layout: BlitzLayout<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "ABST"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="relative overflow-hiddinflex justify-center text-white text-sm font-semibold py-2 px-4 sm:px-6 lg:px-8 bg-center bg-no-repeat"
        style={{
          backgroundColor: "#2250F4",
        }}
      >
        Apalachee Septic.
      </div>

      {children}
    </>
  )
}

export default Layout

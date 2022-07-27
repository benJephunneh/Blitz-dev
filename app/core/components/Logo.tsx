import { Image } from "blitz"
import abstLogo from "../../../public/abst logo.png"
import blitzLogo from "public/logo.png"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Suspense } from "react"

// const Logo = (props) => {
//   return <Image src={abstIcon} alt="" {...props} />
// }

const Logo = (props) => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <div className="logo">
        <Image src={abstLogo} alt="ABST logo" {...props} />
      </div>
    )
  } else {
    return (
      <div className="logo">
        <Image src={blitzLogo} alt="Blitz logo" {...props} />
      </div>
    )
  }
}

export default Logo

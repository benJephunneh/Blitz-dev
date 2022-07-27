import { Image } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import abstLogo from "public/abst logo.png"
import blitzLogo from "public/logo.png"

const Logo = ({ className = "" }) => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <div className={className}>
        <Image src={abstLogo} alt="ABST logo" />
      </div>
    )
  } else {
    return (
      <div className={className}>
        <Image src={blitzLogo} alt="Blitz.js logo" />
      </div>
    )
  }
}

export default Logo

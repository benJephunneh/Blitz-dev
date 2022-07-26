import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa"

const SocialIcons = ({ className, variant }) => {
  const outerClasses = variant === "bright" ? "bg-purple-light dark:bg-white" : "bg-white"
  const innerClasses =
    variant === "bright"
      ? "text-white dark:text-purple-mid"
      : "text-purple-primary dark:text-purple-dark"

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <a
        href="https://www.instagram.com/apalacheeseptic"
        target="_blank"
        rel="noopener noreferrer"
        className={"rounded-full w-7 h-7 flex items-center justify-center " + outerClasses}
      >
        <FaInstagram className={" " + innerClasses} size="1rem" />
      </a>
      <a
        href="https://www.facebook.com/apalacheeseptic"
        target="_blank"
        rel="noopener noreferrer"
        className={"rounded-full w-7 h-7 flex items-center justify-center " + outerClasses}
      >
        <FaFacebook className={" " + innerClasses} size="1rem" />
      </a>
      <a
        href="http://pinterest.com/apalacheeseptic"
        target="_blank"
        rel="noopener noreferrer"
        className={"rounded-full w-7 h-7 flex items-center justify-center " + outerClasses}
      >
        <FaPinterest className={" " + innerClasses} size="1rem" />
      </a>
    </div>
  )
}

export default SocialIcons

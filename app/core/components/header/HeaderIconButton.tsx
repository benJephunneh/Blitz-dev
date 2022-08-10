import { IconButton, Tooltip } from "@chakra-ui/react"
import { FC, ReactElement } from "react"

const HeaderIconButton: FC<{ label: string; onClick: () => void; icon: ReactElement }> = ({
  label,
  onClick,
  icon,
}) => {
  return (
    <Tooltip label={label}>
      <IconButton size="sm" variant="ghost" aria-label={label} onClick={onClick} icon={icon} />
    </Tooltip>
  )
}

export default HeaderIconButton

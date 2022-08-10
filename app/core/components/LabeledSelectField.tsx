import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useForm } from "react-hook-form"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Select } from "@chakra-ui/react"

export interface LabeledSelectFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  children: JSX.Element[]
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ label, outerProps, labelProps, name, children, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useForm()

    const error = Array.isArray(errors) ? errors.join(", ") : errors[name]!.message || errors[name]

    return (
      <FormControl {...outerProps}>
        {label && <FormLabel {...labelProps}>{label}</FormLabel>}
        <Select value={name} disabled={isSubmitting} {...register(name)} {...props}>
          {children}
        </Select>
      </FormControl>
    )
  }
)

export default LabeledSelectField

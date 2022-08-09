import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef, ReactNode } from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { FormErrorMessage, Select } from "@chakra-ui/react"

export interface LabeledSelectFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  children: JSX.Element[]
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ label, outerProps, labelProps, name, children, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    // Modified from hikerherd's select-field.tsx:
    const error = Array.isArray(errors) ? errors.join(", ") : errors || errors[name]

    return (
      <FormControl {...outerProps}>
        {label && <FormLabel {...labelProps}>{label}</FormLabel>}
        <Select value={name} disabled={isSubmitting} {...register(name)} {...props}>
          {children}
        </Select>

        <FormErrorMessage>asdf{/*error*/}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledSelectField

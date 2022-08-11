import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { FormErrorMessage, Select } from "@chakra-ui/react"

export interface LabeledSelectFieldProps extends PropsWithoutRef<typeof Select> {
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
    } = useFormContext()

    const error = Array.isArray(errors) ? errors.join(", ") : errors || errors[name]

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>
          {label}
          <Select disabled={isSubmitting} {...register(name)} {...props}>
            {children}
          </Select>
        </FormLabel>

        {/* <FormErrorMessage>{error}</FormErrorMessage> */}
      </FormControl>
    )
  }
)

export default LabeledSelectField

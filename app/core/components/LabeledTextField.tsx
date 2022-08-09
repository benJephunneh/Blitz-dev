import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { Input } from "@chakra-ui/input"
import { FormControl, FormLabel } from "@chakra-ui/form-control"

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string
  /** Field label. */
  label?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    // Modified from hikerherd's text-field.tsx:
    const error = Array.isArray(errors) ? errors.join(", ") : errors || errors[name]

    return (
      <FormControl {...outerProps}>
        {label && <FormLabel {...labelProps}>{label}</FormLabel>}
        <Input disabled={isSubmitting} {...register(name)} {...props} />
        {errors.name && <span>Field is required</span>}
      </FormControl>
    )
  }
)

export default LabeledTextField

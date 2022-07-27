import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useForm } from "react-hook-form"

import { Input } from "@chakra-ui/input"
import { FormControl, FormLabel } from "@chakra-ui/form-control"

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
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
    } = useForm()

    // const error = Array.isArray(errors[name])
    //   ? errors[name].join(", ")
    //   : errors[name]!.message || errors[name]

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>
          {label}
          <Input disabled={isSubmitting} {...register(name)} {...props} />
          {errors.name && <span>Field is required</span>}
        </FormLabel>
      </FormControl>
    )
  }
)

export default LabeledTextField

import { Checkbox, FormControl, FormLabel } from "@chakra-ui/react"
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

export interface FormCheckboxProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  name: string
  label: string
  required?: boolean
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ name, label, required, outerProps, labelProps, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    const error = Array.isArray(errors) ? errors.join(", ") : errors!.message || errors[name]
    if (required === undefined) {
      required = true
    }

    return (
      <FormControl {...outerProps}>
        {label && <FormLabel {...labelProps}>{label}</FormLabel>}
        <Checkbox
          defaultChecked
          disabled={isSubmitting}
          {...register(name, { required })}
          {...props}
        />
      </FormControl>
    )
  }
)

export default FormCheckbox

import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useForm } from "react-hook-form"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Select } from "@chakra-ui/react"

export interface LabeledSelectFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
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
          <Select disabled={isSubmitting} {...register(name)} {...props} />
          {errors.name && <span>Field is required</span>}
        </FormLabel>
      </FormControl>
    )
  }
)

export default LabeledSelectField

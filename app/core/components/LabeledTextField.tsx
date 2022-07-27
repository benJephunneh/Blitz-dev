import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useForm } from "react-hook-form"
<<<<<<< HEAD
=======
import { useFormContext } from "react-hook-form"
>>>>>>> 2ea7813 (Initialize chakra)
=======
>>>>>>> 41e6de2 (Init chakra-ui recipe)

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
<<<<<<< HEAD
=======
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]
>>>>>>> 2ea7813 (Initialize chakra)
=======
>>>>>>> 41e6de2 (Init chakra-ui recipe)

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>
          {label}
          <Input disabled={isSubmitting} {...register(name)} {...props} />
          {errors.name && <span>Field is required</span>}
        </FormLabel>
<<<<<<< HEAD
=======
        </FormLabel>
        {error && (
          <div role="alert" style={{ color: "red" }}>
            {error}
          </div>
        )}
>>>>>>> 2ea7813 (Initialize chakra)
=======
>>>>>>> 41e6de2 (Init chakra-ui recipe)
      </FormControl>
    )
  }
)

export default LabeledTextField

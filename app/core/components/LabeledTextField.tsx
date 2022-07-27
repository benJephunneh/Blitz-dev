import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
<<<<<<< HEAD
import { useForm } from "react-hook-form"
=======
import { useFormContext } from "react-hook-form"
>>>>>>> 2ea781347c4590e1f45c6ee1ac8baef075b9d7aa

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
<<<<<<< HEAD
    } = useForm()

    // const error = Array.isArray(errors[name])
    //   ? errors[name].join(", ")
    //   : errors[name]!.message || errors[name]
=======
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]
>>>>>>> 2ea781347c4590e1f45c6ee1ac8baef075b9d7aa

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>
          {label}
          <Input disabled={isSubmitting} {...register(name)} {...props} />
<<<<<<< HEAD
          {errors.name && <span>Field is required</span>}
        </FormLabel>
=======
        </FormLabel>
        {error && (
          <div role="alert" style={{ color: "red" }}>
            {error}
          </div>
        )}
>>>>>>> 2ea781347c4590e1f45c6ee1ac8baef075b9d7aa
      </FormControl>
    )
  }
)

export default LabeledTextField

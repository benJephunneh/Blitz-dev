import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"

export function CustomerForm2<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="firstname" placeholder="First name" />
      <LabeledTextField name="lastname" placeholder="Last name" />
    </Form>
  )
}

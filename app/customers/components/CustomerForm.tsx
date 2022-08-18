import { Flex, Text } from "@chakra-ui/react"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { useEffect, useRef } from "react"
import { useForm } from "react-final-form"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function CustomerForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="firstname" label="First name" placeholder="First name" />
      <LabeledTextField name="lastname" label="Last name" placeholder="Last name" />
    </Form>
  )
}

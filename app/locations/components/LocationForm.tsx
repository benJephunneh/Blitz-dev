import { Form, FormProps } from "app/core/components/Form"
import FormCheckbox from "app/core/components/FormCheckbox"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function LocationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="number" label="House number" placeholder="House number" />
      <LabeledTextField name="street" label="Street" placeholder="Street" />
      <LabeledTextField name="city" label="City" placeholder="City" />
      <LabeledTextField name="state" label="State" placeholder="State" value="FL" />
      <LabeledTextField name="zipcode" label="Zip" placeholder="Zip" />
      <LabeledTextField name="block" label="Block" placeholder="Block" required="false" />
      <LabeledTextField name="lot" label="Lot" placeholder="Lot" required="false" />
      <LabeledTextField name="parcel" label="Parcel ID" placeholder="Parcel Id" required="false" />
      <FormCheckbox name="primary" label="Primary address" defaultChecked />
    </Form>
  )
}

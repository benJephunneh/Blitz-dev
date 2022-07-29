import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import resetPassword from "app/auth/mutations/changePassword"
import BoxLayout from "app/core/layouts/BoxLayout"
import { Stack, useToast } from "@chakra-ui/react"
import ChangePasswordForm from "../components/ChangePasswordForm"

const ChangePasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const toast = useToast()

  return (
    <Stack spacing={8}>
        <ChangePasswordForm
          onSuccess={(_email) => {
            const next = query.next ?
            toast({
              title: "Password successfully changed.",
              description: "New password is 1 2 3 4 5",
              status: "success",
            })
          }}
        />
    </Stack>
  )
}

ChangePasswordPage.redirectAuthenticatedTo = "/"
ChangePasswordPage.getLayout = (page) => <BoxLayout title="Reset your password" description="">{page}</BoxLayout>

export default ChangePasswordPage

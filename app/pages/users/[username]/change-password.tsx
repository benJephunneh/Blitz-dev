import { BlitzPage, GetServerSideProps, NotFoundError, Routes, useParam, useRouter } from "blitz"
import BoxLayout from "app/core/layouts/BoxLayout"
import { Stack, useToast } from "@chakra-ui/react"
import ChangePasswordForm from "app/users/components/ChangePasswordForm"
import PrefetchQueryClient from "app/core/helpers/PrefetchQueryClient"
import profileQuery from "app/users/queries/getUserProfile"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const ChangePasswordPage: BlitzPage = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const username = useParam("username", "string")
  const toast = useToast()

  return (
    <Stack spacing={8}>
      <ChangePasswordForm
        onSuccess={(_password) => {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = new PrefetchQueryClient(ctx)

  try {
    const username = ctx.params?.username as string
    await client.prefetchQuery(profileQuery, { username })
  } catch (error) {
    if (error instanceof NotFoundError) {
      return { notFound: true }
    } else {
      throw error
    }
  }

  return {
    props: {
      dehydratedState: client.dehydrate(),
    },
  }
}

export default ChangePasswordPage

// ChangePasswordPage.redirectAuthenticatedTo = Routes.ProfilePage({ user.username })
ChangePasswordPage.getLayout = (page) => (
  <BoxLayout title="Change password" description="">
    {page}
  </BoxLayout>
)

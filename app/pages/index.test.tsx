import { render } from "test/utils"

import Home from "./index"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

jest.mock("app/core/hooks/useCurrentUser")
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>

test.skip("renders blitz documentation link", () => {
  // This is an example of how to ensure a specific item is in the document
  // But it's disabled by default (by test.skip) so the test doesn't fail
  // when you remove the the default content from the page

  // This is an example on how to mock api hooks when testing
  mockUseCurrentUser.mockReturnValue({
    id: 1,
<<<<<<< HEAD
    username: "User",
=======
    name: "User",
>>>>>>> 2ea781347c4590e1f45c6ee1ac8baef075b9d7aa
    email: "user@email.com",
    role: "user",
  })

  const { getByText } = render(<Home />)
  const linkElement = getByText(/Documentation/i)
  expect(linkElement).toBeInTheDocument()
})

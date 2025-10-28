// frontend/api/endpoints/signin.ts
import { apiRequest } from "../http"

export async function signIn(username: string, password: string) {
  return apiRequest("/accounts/signin/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
}

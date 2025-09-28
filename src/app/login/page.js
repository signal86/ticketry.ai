import { auth0 } from "@/lib/auth0";

export const metadata = {
  title: 'Login',
  description: 'Secure login page using Auth0',
};

import LoginButton from './loginClient';
import LoggedIn from './loggedIn';
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // return <LoginClient />;
  const session = await auth0.getSession();
  if (!session) {
    return (
      <LoginButton />
    )
  }

  redirect("/")
  // return (
  //   <LoggedIn user={session.user.name}/>
  // )
}

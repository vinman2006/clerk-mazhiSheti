import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1C44] bg-gradient-to-b from-[#0B1736] via-[#0E204E] to-[#0A1530] p-4">
      <SignIn fallbackRedirectUrl="/auth/select" />
    </div>
  );
}

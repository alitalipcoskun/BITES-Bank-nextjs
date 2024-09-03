import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <LoginForm></LoginForm>
    </main>
  );
}

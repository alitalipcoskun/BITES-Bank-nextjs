import LoginForm from "@/components/Form/LoginForm";
import PageContainer from "@/components/PageComponents/PageContainer";
import SignUpForm from "@/components/Form/SignUpForm";
import Navbar from "@/components/NavbarFiles/Navbar";



export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <PageContainer>Merhaba ana sayfa!!</PageContainer>
    </>
  );
}

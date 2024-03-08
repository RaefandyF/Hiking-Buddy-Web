import BodyNavigation from "@/components/BodyNavigation";
import Footer from "@/components/Footer";
import HeaderComponent from "@/components/Header";
import HeaderNavigation from "@/components/HeaderNavigation";


export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <HeaderNavigation />
      <BodyNavigation />
      <Footer />
    </div>
  );
}

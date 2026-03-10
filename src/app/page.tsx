import AboutCompany from "@/components/ui/home/AboutCompany";
import CustomerSay from "@/components/ui/home/CustomerSay";
import Faq from "@/components/ui/home/Faq";
import HomePageCuricle from "@/components/ui/home/HomePageCuricle";
import Landing from "@/components/ui/home/Landing";
import OurService from "@/components/ui/home/OurService";



export default function Home() {
  return (
    <>
      {/* Landing */}

      <Landing /> 

      {/* circle company */}

      <HomePageCuricle />

      {/* about company */}

      <AboutCompany />

      {/* our service */}

      <OurService />

      {/* faq */}

      <Faq />

      {/* custormer say */}

      <CustomerSay />
    </>
  );
}

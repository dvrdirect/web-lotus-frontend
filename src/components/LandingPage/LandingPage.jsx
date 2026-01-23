import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Landing/Navbar/Navbar";
import MainContent from "../Landing/MainContent/MainContent";
import ContactSection from "../Landing/ContactSection/ContactSection";
import Footer from "../Landing/Footer/Footer";
import SocialSidebar from "../Landing/SocialSidebar/SocialSidebar";
import SocialFloatingBar from "../Landing/SocialFloatingBar/SocialFloatingBar";
import ExploreSection from "../Landing/ExploreSection/ExploreSection";
import ExploreSlideshow from "../Landing/ExploreSlideshow/ExploreSlideshow";
import HeroSection from "../Landing/HeroSection/HeroSection";
import LocationSection from "../Landing/LocationSection/LocationSection";
import ProductsSection from "../Landing/ProductsSection/ProductsSection";
import VisualManifestoSection from "../Landing/VisualManifestoSection/VisualManifestoSection";
import WhoWeAreSection from "../Landing/WhoWeAreSection/WhoWeAreSection";
import DiscountsSection from "../Landing/DiscountsSection/DiscountsSection";
import DiscountModal from "../Modals/DiscountModal";
import AdminAppointments from "../../sections/AdminAppointments/AdminAppointments";

function LandingPage() {
  const location = useLocation();
  const shouldOpenLogin = Boolean(location.state && location.state.forceAuth);
  const { userData } = useAuth();

  return (
    <>
      <HeroSection />
      <Navbar initialShowLogin={shouldOpenLogin} />
      <SocialFloatingBar />
      <SocialSidebar />
      <ProductsSection />
      <DiscountsSection />
      {userData?.email === "dvrdirect@gmail.com" && (
        <AdminAppointments user={userData} />
      )}
      <LocationSection />
      <ContactSection />
      <Footer />
      <DiscountModal />
    </>
  );
}

export default LandingPage;

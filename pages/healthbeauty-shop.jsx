import { Box, Stack } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import { Footer3 } from "components/footer";
import Newsletter from "components/Newsletter";
import ShopLayout2 from "components/layouts/ShopLayout2";
import SidenavContainer from "components/SidenavContainer";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import HealthBeautySidenav from "components/page-sidenav/HealthBeautySideNav";
import Section1 from "pages-sections/health-beauty/Section1";
import Section2 from "pages-sections/health-beauty/Section2";
import Section3 from "pages-sections/health-beauty/Section3";
import Section4 from "pages-sections/health-beauty/Section4";
import Section5 from "pages-sections/health-beauty/Section5";
import api from "utils/__api__/healthbeauty-shop";
// ===============================================

const HealthAndBeauty = props => {
  return <ShopLayout2>
      <SEO title="Health & beauty shop template" />
      {/* TOP HERO CAROUSEL AREA */}
      <Box id="healthBeautySection1">
        <Section1 carouselData={props.mainCarouselData} />
      </Box>

      <SidenavContainer navFixedComponentID="healthBeautySection1" SideNav={() => <HealthBeautySidenav navList={props.navigationList} />}>
        <Stack spacing={6}>
          {/* BANNER AREA */}
          <Section2 />

          {/* TOP NEW PRODUCTS AREA */}
          <Section3 products={props.topNewProducts} />

          {/* ALL PRODUCTS AREA */}
          <Section4 products={props.allProducts} />

          {/* SERVICE LIST AREA */}
          <Section5 services={props.serviceList} />

          {/* FOOTER AREA */}
          <Footer3 id="footer" sx={{
          borderRadius: "8px",
          backgroundColor: "primary.800"
        }} />
        </Stack>
      </SidenavContainer>

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-4.png" />

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar2>
        <HealthBeautySidenav navList={props.navigationList} />
      </MobileNavigationBar2>
    </ShopLayout2>;
};
export const getStaticProps = async () => {
  const serviceList = await api.getServices();
  const allProducts = await api.getProducts();
  const navigationList = await api.getNavigation();
  const topNewProducts = await api.getTopNewProducts();
  const mainCarouselData = await api.getMainCarousel();
  return {
    props: {
      serviceList,
      allProducts,
      topNewProducts,
      navigationList,
      mainCarouselData
    }
  };
};
export default HealthAndBeauty;
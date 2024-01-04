import { Container } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import ShopLayout1 from "components/layouts/ShopLayout1";
import { MobileNavigationBar } from "components/mobile-navigation";
import Section1 from "pages-sections/grocery3/Section1";
import Section2 from "pages-sections/grocery3/Section2";
import Section3 from "pages-sections/grocery3/Section3";
import Section4 from "pages-sections/grocery3/Section4";
import api from "utils/__api__/grocery3-shop";
// ======================================================

const Grocery3 = props => {
  return <ShopLayout1 showNavbar={false}>
      <SEO title="Grocery store template v3" />
      {/* TOP HERO CAROUSEL AREA */}
      <Section1 mainCarouselData={props.mainCarouselData} />

      <Container sx={{
      mb: 6
    }}>
        {/* DISCOUNT OFFERS AREA */}
        <Section2 offers={props.offerCards} />

        {/* TOP SALES PRODUCTS AREA */}
        <Section3 products={props.topSailedProducts} />

        {/* OUR ALL PRODUCTS AREA */}
        <Section4 products={props.allProducts} />
      </Container>

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-2.png" />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />
    </ShopLayout1>;
};
export const getStaticProps = async () => {
  const offerCards = await api.getOfferCards();
  const allProducts = await api.getAllProducts();
  const mainCarouselData = await api.getMainCarousel();
  const topSailedProducts = await api.getTopSailedProducts();
  return {
    props: {
      allProducts,
      offerCards,
      topSailedProducts,
      mainCarouselData
    }
  };
};
export default Grocery3;
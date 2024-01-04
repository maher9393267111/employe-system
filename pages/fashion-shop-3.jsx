import { Box } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Section1 from "pages-sections/fashion-shop-3/Section1";
import Section2 from "pages-sections/fashion-shop-3/Section2";
import Section3 from "pages-sections/fashion-shop-3/Section3";
import Section4 from "pages-sections/fashion-shop-3/Section4";
import Section5 from "pages-sections/fashion-shop-3/Section5";
import Section6 from "pages-sections/fashion-shop-3/Section6";
import Section7 from "pages-sections/fashion-shop-3/Section7";
import Section8 from "pages-sections/fashion-shop-3/Section8";
import api from "utils/__api__/fashion-shop-3";

// =======================================================

// =======================================================

const FashionShop3 = props => {
  return <ShopLayout1 showTopbar={false}>
      <SEO title="Fashion shop template v3" />
      <Box bgcolor="white" pb={8}>
        {/* HERO SECTION CAROUSEL AREA */}
        <Section1 carouselData={props.mainCarouselData} />

        {/* MEN AND WOMEN CATEGORY BANNER */}
        <Section2 />

        {/* BEST SELLING PRODUCTS */}
        <Section3 products={props.products} />

        {/* TOP CATEGORIES */}
        <Section4 />

        {/* OFFER BANNER */}
        <Section5 />

        {/* FEATURED PRODUCTS AREA */}
        <Section6 products={props.featureProducts} />

        {/* SERVICE LIST AREA */}
        <Section7 services={props.services} />

        {/* INSTAGRAM PHOTOS */}
        <Section8 blogs={props.blogs} />
      </Box>

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </ShopLayout1>;
};
export const getStaticProps = async () => {
  const blogs = await api.getBlogs();
  const products = await api.getProducts();
  const services = await api.getServices();
  const featureProducts = await api.getFeatureProducts();
  const mainCarouselData = await api.getMainCarouselData();
  return {
    props: {
      blogs,
      products,
      featureProducts,
      mainCarouselData,
      services
    }
  };
};
export default FashionShop3;
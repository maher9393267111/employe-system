import { Box, useTheme } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import Offers from "pages-sections/market-2/Offers";
import Section1 from "pages-sections/market-2/Section1";
import Section2 from "pages-sections/market-2/Section2";
import Section3 from "pages-sections/market-2/Section3";
import Section4 from "pages-sections/market-2/Section4";
import Section5 from "pages-sections/market-2/Section5";
import Section6 from "pages-sections/market-2/Section6";
import Section7 from "pages-sections/market-2/Section7";
import Section8 from "pages-sections/market-2/Section8";
import Section9 from "pages-sections/market-2/Section9";
import ShopLayout1 from "components/layouts/ShopLayout1";
import api from "utils/__api__/market-2";

// =======================================================

// =======================================================

const Market = props => {
  const theme = useTheme();
  return <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO title="Market v2" />
      <Box bgcolor="#F6F6F6">
        {/* HERO SLIDER AND GRID */}
        <Section1 carouselData={props.mainCarouselData} />

        {/* SERVICE CARDS */}
        <Section2 serviceList={props.serviceList} />

        {/* CATEGORIES AND ANIMATED OFFER BANNER */}
        <Section3 categories={props.categories} />

        {/* DEALS OF THE DAY AND OFFER BANNERS */}
        <Section4 products={props.products} />

        {/* TOP OFFER BANNERS */}
        <Offers />

        {/* PRODUCT ROW WITH ELECTRONICS CATEGORY LIST */}
        <Section5 data={props.electronicsProducts} />

        {/* OFFER BANNER */}
        <Section6 />

        {/* PRODUCT ROW WITH MEN'S FASHION CATEFORY LIST */}
        <Section5 data={props.menFashionProducts} />

        {/* OFFER BANNER */}
        <Section7 />

        {/* PRODUCT ROW WITH WOMEN'S FASHION CATEFORY LIST */}
        <Section5 data={props.womenFashionProducts} />

        {/*  FEATURED BRANDS */}
        <Section8 brands={props.brands} />

        {/* SELECTED PRODUCTS */}
        <Section9 />
      </Box>

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </ShopLayout1>;
};
export const getStaticProps = async () => {
  const brands = await api.getBrands();
  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const categories = await api.getCategories();
  const mainCarouselData = await api.getMainCarouselData();
  const menFashionProducts = await api.getMenFashionProducts();
  const electronicsProducts = await api.getElectronicsProducts();
  const womenFashionProducts = await api.getWomenFashionProducts();
  return {
    props: {
      brands,
      products,
      categories,
      serviceList,
      mainCarouselData,
      menFashionProducts,
      electronicsProducts,
      womenFashionProducts
    }
  };
};
export default Market;
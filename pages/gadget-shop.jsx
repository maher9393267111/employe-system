import SEO from "components/SEO";
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Section1 from "pages-sections/gadget-shop/Section1";
import Section2 from "pages-sections/gadget-shop/Section2";
import Section3 from "pages-sections/gadget-shop/Section3";
import Section4 from "pages-sections/gadget-shop/Section4";
import Section6 from "pages-sections/gadget-shop/Section6";
import Section7 from "pages-sections/gadget-shop/Section7";
import api from "utils/__api__/gadget-shop";

// ============================================================

// ============================================================

const GadgetShop = props => {
  return <ShopLayout1>
      <SEO title="Gadget shop template" />
      {/* MAIN PRODUCT CAROUSEL AND TOP PICK PRODUCTS AREA */}
      <Section1 mainCarousel={props.mainCarouselData} topPickList={props.topPickList} />

      {/* FEATURED CATEGORIES AREA */}
      <Section2 featuredCategories={props.featuredCategories} />

      {/* DISCOUNT BANNER AREA */}
      <Section3 bannerData={props.twoBanner} />

      {/* MOST VIEWED PRODUCTS AREA */}
      <Section4 mostViewedList={props.mostViewedList} />

      {/* MAKEUP AND SUNGLASSS PRODUCT */}
      <Section3 bannerData={props.newArrivalsData} />

      {/* YOUTUBE BANNER AREA */}
      <Section6 />

      {/* OUR BLOG AREA */}
      <Section7 blogLists={props.blogLists} />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </ShopLayout1>;
};
export const getStaticProps = async () => {
  const twoBanner = await api.getTwoBanner();
  const blogLists = await api.getBlogLists();
  const topPickList = await api.getTopPicksList();
  const newArrivalsData = await api.getNewArrival();
  const mostViewedList = await api.getMostViewedList();
  const mainCarouselData = await api.getMainCarousel();
  const featuredCategories = await api.getFeaturedCategories();
  return {
    props: {
      blogLists,
      twoBanner,
      topPickList,
      mostViewedList,
      newArrivalsData,
      mainCarouselData,
      featuredCategories
    }
  };
};
export default GadgetShop;
import { Fragment, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import { Footer2 } from "components/footer";
import Newsletter from "components/Newsletter";
import ShopLayout2 from "components/layouts/ShopLayout2";
import SidenavContainer from "components/SidenavContainer";
import SideNavbar from "components/page-sidenav/SideNavbar";
import Section1 from "pages-sections/grocery1/Section1";
import Section2 from "pages-sections/grocery1/Section2";
import AllProducts from "pages-sections/grocery1/AllProducts";
import DiscountSection from "pages-sections/grocery1/DiscountSection";
import ProductCarousel from "pages-sections/grocery1/ProductCarousel";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import api from "utils/__api__/grocery1-shop";

// =====================================================

// =====================================================

const Grocery1 = props => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  // FETCH PRODUCTS BASED ON THE SELECTED CATEGORY
  useEffect(() => {
    axios.get("/api/grocery-1/category-based-products", {
      params: {
        category: selectedCategory
      }
    }).then(({
      data
    }) => setFilterProducts(data));
  }, [selectedCategory]);

  // HANDLE CHANGE CATEGORY
  const handleSelectCategory = category => setSelectedCategory(category);

  // SIDE NAVBAR COMPONENT
  const SideNav = useCallback(() => <SideNavbar navList={props.grocery1NavList} handleSelect={handleSelectCategory} />, [props.grocery1NavList]);
  return <ShopLayout2 showNavbar={false} showTopbar={false}>
      <SEO title="Grocery store template v1" />
      {/* TOP HERO AREA */}
      <Section1 />

      {/* SERVICE AREA */}
      <Section2 id="grocery1Services" services={props.serviceList} />

      {/* SIDEBAR WITH OTHER CONTENTS */}
      <SidenavContainer navFixedComponentID="grocery1Services" SideNav={SideNav}>
        <Stack spacing={6} mt={2}>
          {selectedCategory ?
        // FILTERED PRODUCT LIST
        <AllProducts products={filterProducts} title={selectedCategory} /> : <Fragment>
              {/* POPULAR PRODUCTS AREA */}
              <ProductCarousel title="Popular Products" products={props.popularProducts} />

              {/* TRENDING PRODUCTS AREA */}
              <ProductCarousel title="Trending Products" products={props.trendingProducts} />

              {/* ALL PRODUCTS AREA */}
              <AllProducts products={props.products} />
            </Fragment>}

          {/* DISCOUNT BANNER AREA */}
          <DiscountSection />

          {/* FOOTER AREA */}
          <Footer2 />
        </Stack>
      </SidenavContainer>

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-2.png" />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* MOBILE NAVIGATION WITH SIDE NAVABAR */}
      <MobileNavigationBar2>
        <SideNavbar navList={props.grocery1NavList} />
      </MobileNavigationBar2>
    </ShopLayout2>;
};
export const getStaticProps = async () => {
  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const popularProducts = await api.getPopularProducts();
  const trendingProducts = await api.getTrendingProducts();
  const grocery1NavList = await api.getGrocery1Navigation();
  return {
    props: {
      products,
      serviceList,
      grocery1NavList,
      popularProducts,
      trendingProducts
    }
  };
};
export default Grocery1;
import { useEffect, useRef, useState } from "react";
import { Box, Container, styled } from "@mui/material";
import { layoutConstant } from "utils/constants";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SideNavbar from "components/page-sidenav/SideNavbar";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import Section1 from "pages-sections/giftshop/Section1";
import Section2 from "pages-sections/giftshop/Section2";
import Section3 from "pages-sections/giftshop/Section3";
import Section4 from "pages-sections/giftshop/Section4";
import Section5 from "pages-sections/giftshop/Section5";
import Section6 from "pages-sections/giftshop/Section6";
import Section7 from "pages-sections/giftshop/Section7";
import api from "utils/__api__/gift-shop";

// styled component
const StyledContainer = styled(Container)(({
  theme
}) => ({
  display: "flex",
  ".sidenav": {
    top: 0,
    bottom: 0,
    position: "relative",
    transition: "all 350ms ease-in-out",
    width: layoutConstant.grocerySidenavWidth,
    minWidth: layoutConstant.grocerySidenavWidth,
    "& .MuiPaper-root": {
      borderRadius: 0
    },
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  ".pageContent": {
    left: "unset",
    position: "relative",
    marginLeft: "1.75rem",
    width: `calc(100% - 2.5rem - ${layoutConstant.grocerySidenavWidth}px)`,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      "& .MuiGrid-item": {
        paddingLeft: 0
      },
      "& .categories": {
        marginLeft: "-1.75rem"
      }
    }
  }
}));

// ========================================================

// ========================================================

const GiftShop = props => {
  const pageContentRef = useRef();
  const [sidebarHeight, setSidebarHeight] = useState(0);
  useEffect(() => setSidebarHeight(pageContentRef.current.offsetHeight), []);
  return <ShopLayout1 showTopbar={false}>
      <SEO title="Gift shop template" />

      {/* TOP HERO AREA */}
      <Section1 carouselData={props.carouselData} />

      <StyledContainer sx={{
      mb: 6
    }}>
        {/* SIDE NAV BAR */}
        <Box className="sidenav">
          <SideNavbar lineStyle="dash" sidebarStyle="style2" navList={props.categoryNavigation} sidebarHeight={sidebarHeight || "85vh"} />
        </Box>

        <Box className="pageContent" ref={pageContentRef}>
          {/* SERVICE LIST AREA */}
          <Section2 serviceList={props.serviceList} />

          {/* OFFER BANNER AREA */}
          <Section3 />

          {/* TOP CATEGORY AREA */}
          <Box my={6} className="categories">
            <Section4 categoryList={props.topCategories} />
          </Box>
        </Box>
      </StyledContainer>

      {/* POPULAR PRODUCT AREA */}
      <Section5 products={props.popularProducts} />

      {/* TOP SALES PRODUCTS AREA */}
      <Section6 products={props.topSailedProducts} />

      {/* ALL PRODUCTS AREA */}
      <Section7 products={props.allProducts} />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-5.png" />

      {/* MOBILE NAVIGATION WITH SIDE NAVABAR */}
      <MobileNavigationBar2>
        <SideNavbar navList={props.categoryNavigation} lineStyle="dash" sidebarStyle="style2" />
      </MobileNavigationBar2>
    </ShopLayout1>;
};
export const getStaticProps = async () => {
  const allProducts = await api.getAllProducts();
  const serviceList = await api.getServiceList();
  const topCategories = await api.getTopCategories();
  const carouselData = await api.getMainCarouselData();
  const popularProducts = await api.getPopularProducts();
  const topSailedProducts = await api.getTopSailedProducts();
  const categoryNavigation = await api.getCategoryNavigation();
  return {
    props: {
      allProducts,
      serviceList,
      carouselData,
      topCategories,
      popularProducts,
      topSailedProducts,
      categoryNavigation
    }
  };
};
export default GiftShop;
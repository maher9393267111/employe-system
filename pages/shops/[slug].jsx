import { useRouter } from "next/router";
import { Container, Grid, IconButton, useMediaQuery } from "@mui/material";
import FilterList from "@mui/icons-material/FilterList";
import Sidenav from "components/Sidenav";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ShopIntroCard from "components/shop/ShopIntroCard";
import ProductCardList from "components/products/ProductCard1List";
import ProductFilterCard from "components/products/ProductFilterCard";
import api from "utils/__api__/shop";

// ============================================================

// ============================================================

const ShopDetails = ({
  shop
}) => {
  const router = useRouter();
  const isDownMd = useMediaQuery(theme => theme.breakpoints.down("md"));

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const ICON_BUTTON = <IconButton sx={{
    float: "right"
  }}>
      <FilterList fontSize="small" />
    </IconButton>;
  return <ShopLayout1>
      <Container sx={{
      mt: 4,
      mb: 6
    }}>
        {/* SHOP INTRODUCTION AREA */}
        <ShopIntroCard name={shop.name} phone={shop.phone} address={shop.address} coverPicture={shop.coverPicture} profilePicture={shop.profilePicture} />

        <Grid container spacing={3}>
          {/* SIDEBAR AREA */}
          <Grid item md={3} xs={12} sx={{
          display: {
            md: "block",
            xs: "none"
          }
        }}>
            <ProductFilterCard />
          </Grid>

          <Grid item md={9} xs={12}>
            {/* SMALL DEVICE SIDEBAR AREA */}
            {isDownMd && <Sidenav position="left" handle={ICON_BUTTON}>
                <ProductFilterCard />
              </Sidenav>}

            {/* PRODUCT LIST AREA */}
            <ProductCardList products={shop.products.slice(0, 9)} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>;
};
export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async ({
  params
}) => {
  const shop = await api.getProductsBySlug(String(params.slug));
  return {
    props: {
      shop
    }
  };
};
export default ShopDetails;
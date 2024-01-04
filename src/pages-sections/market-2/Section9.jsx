import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import { H2, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard20 from "components/product-cards/ProductCard20";
import { carouselStyled } from "components/carousel/styles";
const Section9 = () => {
  const width = useWindowSize();
  const [selected, setSelected] = useState("new");
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/market-2/products", {
      params: {
        type: selected
      }
    }).then(({
      data
    }) => setProducts(data));
  }, [selected]);
  useEffect(() => {
    if (width < 426) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 1024) setVisibleSlides(3);else if (width < 1200) setVisibleSlides(4);else setVisibleSlides(5);
  }, [width]);
  const handleSelected = item => () => setSelected(item);
  const activeColor = item => item === selected ? "error" : "dark";
  return <Container sx={{
    pb: 8
  }}>
      <FlexBetween gap={2} flexWrap="wrap" mb={3}>
        {/* SECTION TITLE */}
        <Box>
          <H2 fontSize={20}>Selected Products</H2>
          <Paragraph>
            All our new arrivals in a exclusive brand selection
          </Paragraph>
        </Box>

        {/* FILTERED BUTTON LIST */}
        <FlexBox flexWrap="wrap" gap={1} sx={{
        "& button": {
          flexGrow: 1
        }
      }}>
          <Button variant="outlined" color={activeColor("new")} onClick={handleSelected("new")}>
            New Arrivals
          </Button>

          <Button variant="outlined" color={activeColor("best")} onClick={handleSelected("best")}>
            Best Seller
          </Button>

          <Button variant="outlined" color={activeColor("popular")} onClick={handleSelected("popular")}>
            Most Popular
          </Button>

          <Button variant="outlined" color={activeColor("view")} onClick={handleSelected("view")}>
            View All
          </Button>
        </FlexBox>
      </FlexBetween>

      {/* PRODUCT CAROUSEL */}
      <Carousel visibleSlides={visibleSlides} totalSlides={products.length} sx={{
      ...carouselStyled,
      "& .carousel__inner-slide": {
        pb: 0.5
      }
    }}>
        {products.map(product => <ProductCard20 product={product} key={product.id} />)}
      </Carousel>
    </Container>;
};
export default Section9;
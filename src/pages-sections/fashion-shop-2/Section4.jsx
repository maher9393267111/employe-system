import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { H2 } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import ProductCard18 from "components/product-cards/ProductCard18";
import { carouselStyled } from "components/carousel/styles";
// ======================================================================

const Section4 = ({
  products
}) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);
  useEffect(() => {
    if (width < 426) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 1024) setVisibleSlides(3);else setVisibleSlides(4);
  }, [width]);
  return <Container sx={{
    mt: 8
  }}>
      <H2 textAlign="center" mb={4}>
        Best Selling Product
      </H2>

      <Carousel totalSlides={products.length} visibleSlides={visibleSlides} sx={carouselStyled}>
        {products.map(product => <ProductCard18 key={product.id} product={product} />)}
      </Carousel>
    </Container>;
};
export default Section4;
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import ProductCard3 from "components/product-cards/ProductCard3";
import useWindowSize from "hooks/useWindowSize";
// ===============================================================

const CarouselSection = ({
  productList
}) => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 1100) setVisibleSlides(3);else setVisibleSlides(4);
  }, [width]);

  // common arrow button style for slider
  const arrowButtonStyle = {
    backgroundColor: "white",
    color: "#2B3445",
    top: "35%"
  };
  return <Box mt={-0.5} mb={-0.5}>
      <Carousel infinite={true} visibleSlides={visibleSlides} totalSlides={productList.length} leftButtonStyle={arrowButtonStyle} rightButtonStyle={arrowButtonStyle}>
        {productList.map((item, ind) => <ProductCard3 key={ind} slug={item.slug} title={item.title} price={item.price} off={item.discount} rating={item.rating} imgUrl={item.thumbnail} hideFavoriteIcon />)}
      </Carousel>
    </Box>;
};
export default CarouselSection;
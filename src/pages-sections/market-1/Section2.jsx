import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Light from "components/icons/Light";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import ProductCard1 from "components/product-cards/ProductCard1";
import CategorySectionCreator from "components/CategorySectionCreator";

// =============================================================

// =============================================================

const Section2 = ({
  flashDeals
}) => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 950) setVisibleSlides(3);else setVisibleSlides(4);
  }, [width]);
  return <CategorySectionCreator icon={<Light color="primary" />} title="Flash Deals" seeMoreLink="#">
      <Carousel totalSlides={flashDeals.length} visibleSlides={visibleSlides} infinite={true}>
        {flashDeals.map(item => <Box py={0.5} key={item.id}>
            <ProductCard1 id={item.id} slug={item.slug} title={item.title} price={item.price} rating={item.rating} imgUrl={item.thumbnail} discount={item.discount} />
          </Box>)}
      </Carousel>
    </CategorySectionCreator>;
};
export default Section2;
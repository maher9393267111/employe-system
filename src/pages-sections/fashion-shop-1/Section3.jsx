import { useEffect, useState } from "react";
import Carousel from "components/carousel/Carousel";
import ProductCard3 from "components/product-cards/ProductCard3";
import CategorySectionCreator from "components/CategorySectionCreator";
import useWindowSize from "hooks/useWindowSize";
import { arrowButtonStyle } from "./style";
// ==========================================================

const Section3 = ({
  newArrivals
}) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(6);
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 950) setVisibleSlides(4);else setVisibleSlides(6);
  }, [width]);
  return <CategorySectionCreator title="New Arrivals" seeMoreLink="#">
      <Carousel infinite={true} visibleSlides={visibleSlides} totalSlides={newArrivals.length} leftButtonStyle={arrowButtonStyle} rightButtonStyle={arrowButtonStyle}>
        {newArrivals.map((item, ind) => <ProductCard3 hideReview hideFavoriteIcon key={item.id} slug={item.slug} title={item.title} price={item.price} off={item.discount} rating={item.rating} imgUrl={item.thumbnail} />)}
      </Carousel>
    </CategorySectionCreator>;
};
export default Section3;
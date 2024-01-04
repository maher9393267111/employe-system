import Link from "next/link";
import { useEffect, useState } from "react";
import BazaarCard from "components/BazaarCard";
import useWindowSize from "hooks/useWindowSize";
import CategoryIcon from "components/icons/Category";
import Carousel from "components/carousel/Carousel";
import ProductCard6 from "components/product-cards/ProductCard6";
import CategorySectionCreator from "components/CategorySectionCreator";
// =====================================================

const Section3 = ({
  categoryList
}) => {
  const [visibleSlides, setVisibleSlides] = useState(3);
  const width = useWindowSize();
  useEffect(() => {
    if (width < 650) setVisibleSlides(1);else if (width < 950) setVisibleSlides(2);else setVisibleSlides(3);
  }, [width]);
  return <CategorySectionCreator seeMoreLink="#" title="Top Categories" icon={<CategoryIcon color="primary" />}>
      <Carousel totalSlides={5} visibleSlides={visibleSlides}>
        {categoryList.map(item => <Link href={`/product/search/${item.slug}`} key={item.id} passHref>
            <a>
              <BazaarCard sx={{
            p: 2
          }} elevation={0}>
                <ProductCard6 title={item.name} subtitle={item.description} imgUrl={item.image} />
              </BazaarCard>
            </a>
          </Link>)}
      </Carousel>
    </CategorySectionCreator>;
};
export default Section3;
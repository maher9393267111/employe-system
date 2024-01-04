import Link from "next/link";
import HoverBox from "components/HoverBox";
import { H4 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { currency } from "lib";

// ==========================================================

// ==========================================================

const ProductCard2 = props => {
  const {
    thumbnail,
    title,
    price,
    slug
  } = props;
  return <Link href={`/product/${slug}`}>
      <a>
        <HoverBox borderRadius="8px" mb={1}>
          <LazyImage width={0} height={0} alt={title} src={thumbnail} layout="responsive" />
        </HoverBox>

        <H4 fontSize={14} mb={0.5}>
          {title}
        </H4>

        <H4 fontSize={14} color="primary.main">
          {currency(price)}
        </H4>
      </a>
    </Link>;
};
export default ProductCard2;
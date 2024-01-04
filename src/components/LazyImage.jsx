import NextImage from "next/image";
import { styled, bgcolor, compose, spacing, borderRadius } from "@mui/system";
const LazyImage = styled(({
  borderRadius,
  ...rest
}) => <NextImage {...rest} />)(compose(spacing, borderRadius, bgcolor));
export default LazyImage;
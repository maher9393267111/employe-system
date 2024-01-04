import { Fragment } from "react";
import { Visibility } from "@mui/icons-material";
import { Box, Card, IconButton, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
import { H3 } from "components/Typography";
import Link from "next/link";

// styled components
const Wrapper = styled(Box)(({
  theme
}) => ({
  cursor: "pointer",
  position: "relative",
  borderRadius: "0.5rem",
  marginTop: "1rem",
  backgroundColor: theme.palette.grey[200],
  border: `1px solid ${theme.palette.grey[300]}`,
  "& .overlay": {
    transition: "0.3s ease-in-out"
  },
  "&:hover": {
    ".overlay": {
      opacity: 1
    }
  }
}));
const StatusChip = styled(Box)(({
  theme
}) => ({
  position: "absolute",
  top: "10px",
  zIndex: 11,
  right: "8px",
  width: 44,
  height: 44,
  color: "#fff",
  fontSize: "13px",
  fontWeight: 700,
  background: theme.palette.dark.main,
  padding: "11px 7px",
  borderRadius: 36,
  boxShadow: theme.shadows[2]
}));
const StyledFlex = styled(FlexBox)({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0, 0.54)"
});

// =========================================================

// =========================================================

const PageCard = props => {
  const {
    title,
    imgUrl,
    previewUrl,
    disabled,
    status
  } = props;
  return <Fragment>
      <Wrapper mb={3} p="6% 6% 0px" overflow="hidden">
        <Card elevation={3} sx={{
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
      }}>
          <LazyImage alt="cover" width={470} height={397} src={imgUrl} objectFit="cover" layout="responsive" objectPosition="top center" />
        </Card>

        {status && <StatusChip>{status}</StatusChip>}

        {!disabled && <Link href={previewUrl} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <StyledFlex className="overlay">
                <IconButton sx={{
              bgcolor: "white",
              "&:hover": {
                bgcolor: "white"
              }
            }}>
                  <Visibility fontSize="small" />
                </IconButton>
              </StyledFlex>
            </a>
          </Link>}
      </Wrapper>

      <H3 textAlign="center" lineHeight="1" fontSize="14px">
        {title}
      </H3>
    </Fragment>;
};
export default PageCard;
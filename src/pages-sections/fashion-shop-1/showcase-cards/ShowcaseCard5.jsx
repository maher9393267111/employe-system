import { alpha, Grid, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import { H1, Paragraph, Span } from "components/Typography";
import { currency } from "lib";

// styled component
const StyledGrid = styled(Grid)(({
  theme
}) => ({
  height: "100%",
  borderRadius: 4,
  alignItems: "center",
  boxShadow: theme.shadows[4],
  transition: "all 250ms ease-in-out",
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  border: `1px solid ${theme.palette.grey[200]}`,
  "&:hover": {
    boxShadow: theme.shadows[3],
    borderColor: "transparent"
  },
  [theme.breakpoints.down("sm")]: {
    "& .grid-1": {
      order: 2
    },
    "& .grid-2": {
      order: 1
    }
  }
}));
const ShowcaseCard5 = () => {
  return <StyledGrid container>
      <Grid item sm={7} xs={12} p="2rem" className="grid-1">
        <Paragraph color="grey.600" mb={1}>
          SPECIAL OFFER
        </Paragraph>

        <H1 lineHeight={1.3}>
          <Span color="primary.600" lineHeight={1.3}>
            {currency(100)} Off
          </Span>{" "}
          Over {currency(1200)}
        </H1>

        <Paragraph color="grey.600" mt={1}>
          Handcrafted from genuine Italian. One inner compartment
        </Paragraph>
      </Grid>

      <Grid item sm={5} xs={12} className="grid-2">
        <BazaarImage alt="apple-watch-1" sx={{
        mx: "auto",
        maxHeight: "200px"
      }} src="/assets/images/products/paper-bag.png" />
      </Grid>
    </StyledGrid>;
};
export default ShowcaseCard5;
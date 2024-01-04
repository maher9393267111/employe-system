import { Grid, styled } from "@mui/material";
import { NavLink2 } from "components/nav-link";
import BazaarImage from "components/BazaarImage";
import { H1, Paragraph, Span } from "components/Typography";

// styled component
const StyledGrid = styled(Grid)(({
  theme
}) => ({
  borderRadius: 4,
  alignItems: "center",
  boxShadow: theme.shadows[4],
  transition: "all 250ms ease-in-out",
  backgroundColor: "#fff",
  border: `1px solid ${theme.palette.grey[200]}`,
  "&:hover": {
    boxShadow: theme.shadows[3],
    borderColor: "transparent"
  },
  [theme.breakpoints.down("sm")]: {
    "&": {
      padding: "2rem",
      flexDirection: "column-reverse"
    },
    "& .content": {
      padding: 0,
      marginTop: 10
    }
  }
}));
const ShowcaseCard2 = () => {
  return <StyledGrid container>
      <Grid item sm={7} xs={12} p="30px" className="content">
        <Paragraph mb={1}>JACKETS</Paragraph>
        <H1 lineHeight={1.3}>
          <Span lineHeight={1.3}>Minimalist</Span> Genuine <br /> Cotton Jacket
        </H1>

        <Paragraph mt={1} mb={2}>
          Handcrafted from genuine Italian leather. One inner compartment with
          black satin lining
        </Paragraph>

        <NavLink2 url="/shops/scarlett-beauty" title="SHOP NOW" borderColor="grey.100" />
      </Grid>

      <Grid item sm={5} xs={12}>
        <BazaarImage alt="apple-watch-1" src="/assets/images/products/jacket.png" sx={{
        mx: "auto",
        maxWidth: "100%",
        maxHeight: "225px"
      }} />
      </Grid>
    </StyledGrid>;
};
export default ShowcaseCard2;
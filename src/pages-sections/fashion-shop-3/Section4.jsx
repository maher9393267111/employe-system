import Image from "next/image";
import { Box, Container, Grid, Stack, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H2, H3 } from "components/Typography";
import WhiteButton from "components/WhiteButton";

// custom styled components
const ContentBox = styled(Box)({
  top: 30,
  left: 0,
  right: 0,
  textAlign: "center",
  position: "absolute"
});
const Category2Wrapper = styled(Box)({
  width: "100%",
  height: "50%",
  position: "relative"
});
const Category2ButtonWrapper = styled(Box)({
  left: 0,
  right: 0,
  bottom: 30,
  textAlign: "center",
  position: "absolute"
});
const Section4 = () => {
  return <Container sx={{
    mt: 8
  }}>
      <H2 textAlign="center" mb={4}>
        Top Categories
      </H2>

      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Box sx={{
          width: "100%",
          height: "100%",
          position: "relative"
        }}>
            <Image width={580} height={580} alt="category" layout="responsive" src="/assets/images/categories/1.jpg" />

            <ContentBox>
              <H2 fontSize={24}>PADDED CLOTHES</H2>
              <H3 fontSize={22} fontWeight={400}>
                Collection
              </H3>
            </ContentBox>

            <FlexBox gap={2} justifyContent="center" sx={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0
          }}>
              <WhiteButton size="large">Women&#39;s</WhiteButton>

              <WhiteButton size="large">Men&#39;s</WhiteButton>
            </FlexBox>
          </Box>
        </Grid>

        <Grid item md={6} xs={12}>
          <Stack spacing={3}>
            <SingleCategory url="#" buttonText="Women's T-Shirt" img="/assets/images/categories/2.jpg" />

            <SingleCategory url="#" buttonText="Men's T-Shirt" img="/assets/images/categories/3.jpg" />
          </Stack>
        </Grid>
      </Grid>
    </Container>;
};

// ============================================================================

// ============================================================================

const SingleCategory = props => {
  const {
    img,
    url,
    buttonText
  } = props;
  return <Category2Wrapper>
      <Image width={580} height={280} alt="category" layout="responsive" src={img} />

      <Category2ButtonWrapper>
        <WhiteButton size="large">{buttonText}</WhiteButton>
      </Category2ButtonWrapper>
    </Category2Wrapper>;
};
export default Section4;
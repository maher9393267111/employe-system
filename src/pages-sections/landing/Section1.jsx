import { Box, Button, Container } from "@mui/material";
import { Link as Scroll } from "react-scroll";
import DoneIcon from "@mui/icons-material/Done";
import LazyImage from "components/LazyImage";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H1, Paragraph, Span } from "components/Typography";
import Header from "./Header";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
const Section1 = () => {
  return <Box>
      <Header />

      <Container id="section-1" sx={{
      mt: 12,
      position: "relative"
    }}>
        <Box maxWidth="830px" mx="auto" mb={12} textAlign="center">
          <H1 fontSize="40px" mb={3} fontWeight="900">
            <Span>Build your online store with</Span>
            <Box color="primary.main" lineHeight={1.2}>
              Bazaar
            </Box>
          </H1>

          <Paragraph fontSize="18px" fontWeight={500} maxWidth="540px" mx="auto" mb={3}>
            SEO friendly Next.js Ecommerce Template. Helps you to build
            performant online store faster.
          </Paragraph>

          <FlexRowCenter sx={{
          mb: 5,
          flexDirection: {
            md: "row",
            xs: "column"
          }
        }}>
            <FlexBox my={1} mr={2} alignItems="center" fontWeight={500} color="grey.900">
              <DoneIcon color="success" fontSize="small" sx={{
              mr: 0.6
            }} />
              SSR
            </FlexBox>

            <FlexBox my={1} mr={2} alignItems="center" fontWeight={500} color="grey.900">
              <DoneIcon color="success" fontSize="small" sx={{
              mr: 0.6
            }} />
              Rest API
            </FlexBox>

            <FlexBox my={1} alignItems="center" fontWeight={500} color="grey.900">
              <DoneIcon color="success" fontSize="small" sx={{
              mr: 0.6
            }} />
              Multi vendor Support
            </FlexBox>
          </FlexRowCenter>

          <FlexBox justifyContent="center" mb={3}>
            <Scroll to="get" duration={400} offset={-72 - 16} smooth={true}>
              <Button variant="outlined" color="primary" size="large" sx={{
              m: "0.5rem"
            }}>
                What&apos;s inside
              </Button>
            </Scroll>

            <Scroll to="demos" duration={400} offset={-72 - 16} smooth={true}>
              <Button variant="contained" color="primary" size="large" sx={{
              m: "0.5rem"
            }}>
                View Demos
              </Button>
            </Scroll>
          </FlexBox>

          <FlexBox justifyContent="center" alignItems="center">
            <Span sx={{
            textDecoration: "underline",
            color: "text.secondary"
          }}>
              <a href="https://support.ui-lib.com/bazaar-backend/" target="_blank" rel="noreferrer">
                I need server integration
              </a>
            </Span>
            <Tooltip placement="right" title={<Paragraph>
                  Bazaar has REST API integrated on the frontend. Click this
                  link if you want server side help from us.
                </Paragraph>}>
              <HelpIcon sx={{
              ml: 0.5,
              color: "grey.500",
              fontSize: "18px",
              "&:hover": {
                color: "grey.800"
              }
            }} />
            </Tooltip>
          </FlexBox>
        </Box>

        <LazyImage alt="cover" width={5417} height={1179} layout="responsive" src="/assets/images/landing/page-group-2.png" />
      </Container>
    </Box>;
};
export default Section1;
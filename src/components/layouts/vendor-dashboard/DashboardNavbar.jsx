import { useRouter } from "next/router";
import  Link from "next/link";
import { Search } from "@mui/icons-material";
import { Box, Button, styled, useMediaQuery  } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import Globe from "components/icons/Globe";
import Toggle from "components/icons/Toggle";
import AccountPopover from "./popovers/AccountPopover";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import NotificationsPopover from "./popovers/NoficationPopover";
import { useState } from "react";

import TouchRipple from "@mui/material/ButtonBase";
import { TranslateTwoTone } from "@mui/icons-material";

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(({
  theme
}) => ({
  zIndex: 11,
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backgroundColor: "#ffffff",
  boxShadow: theme.shadows[2],
  color: theme.palette.text.primary
}));
const StyledToolBar = styled(Toolbar)({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto"
  }
});
const ToggleWrapper = styled(FlexRowCenter)(({
  theme
}) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  cursor: "pointer",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[100]
}));
const CustomButton = styled(Button)(({
  theme
}) => ({
  minHeight: 40,
  flexShrink: 0,
  marginLeft: 16,
  padding: "0 20px",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down("xs")]: {
    display: "none"
  }
}));
const StyledInputBase = styled(InputBase)(({
  theme
}) => ({
  width: 200,
  padding: "5px 10px",
  borderRadius: "8px",
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

// ===================================================================

// ===================================================================

const DashboardNavbar = ({
  handleDrawerToggle
}) => {
  // const router = useRouter();
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));


  // const { locale, asPath } = useRouter();


  const languageList = [{
    title: "EN",
    value: "en"
  },

  {
    title: "SE",
    value: "se"
  }

];


const router = useRouter();
  const {
    pathname,
    asPath,
    query,
    
  } = router;
  const [expand, setExpand] = useState(false);
  const [language, setLanguage] = useState(router.locale);
  const handleLanguageClick = lang => () => {
    setLanguage(lang);

router.locale = language

    // router.push({
    //   pathname,
    //   query
    // }, asPath, {
    //   locale: lang
    // });



  };









  return <DashboardNavbarRoot position="sticky">
      <Container maxWidth="xl">
        <StyledToolBar disableGutters>
          {downLg && <ToggleWrapper onClick={handleDrawerToggle}>
              <Toggle />
            </ToggleWrapper>}


            <Link passHref href={asPath} locale={router.locale === 'en' ? 'es' : 'en'} scroll={false}>
        <button
          aria-label='LangSwitcher'
          className='p-2  cursor-pointer rounded-lg '
        >
          <TranslateTwoTone className=' w-12  text-black h-12'/>
          {/* <TranslateTwoTone className='h-5 w-5' /> */}
        </button>
      </Link>





{/* <BazaarMenu handler={<TouchRipple className="handler marginRight">
                <Span className="menuTitle">
                  {language === "en" ? "EN" : "ES"}
                </Span>
                <ExpandMore fontSize="inherit" />
              </TouchRipple>}>
            {languageList.map(item => <MenuItem key={item.title} className="menuItem" onClick={handleLanguageClick(item.value)}>
             

            <Link passHref href={asPath} locale={router.locale === 'en' ? 'es' : 'en'} scroll={false}>


                <Span className="menuTitle">{item.title}
                
                {language}
                
                </Span>

</Link>




              </MenuItem>)}
          </BazaarMenu> */}







          <Box flexGrow={1} />

          <FlexBox alignItems="center" gap={2}>
            <StyledInputBase placeholder="Search anything..." startAdornment={<Search sx={{
            color: "grey.500",
            mr: 1
          }} />} />

            <NotificationsPopover />
            <AccountPopover />
          </FlexBox>
        </StyledToolBar>
      </Container>
    </DashboardNavbarRoot>;
};
export default DashboardNavbar;
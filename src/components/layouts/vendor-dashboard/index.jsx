import { Box, styled } from "@mui/material";
import { Fragment, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useDispatch , useSelector } from 'react-redux'
// styled components
const BodyWrapper = styled(Box)(({
  theme,
  compact
}) => ({
  transition: "margin-left 0.3s",
  marginLeft: compact ? "86px" : "280px",
  [theme.breakpoints.down("lg")]: {
    marginLeft: 0
  }
}));
const InnerWrapper = styled(Box)(({
  theme
}) => ({
  transition: "all 0.3s",
  [theme.breakpoints.up("lg")]: {
    maxWidth: 1200,
    margin: "auto"
  },
  [theme.breakpoints.down(1550)]: {
    paddingLeft: "2rem",
    paddingRight: "2rem"
  }
}));

// ======================================================

// ======================================================

const VendorDashboardLayout = ({
  children
}) => {
  const [sidebarCompact, setSidebarCompact] = useState(0);
  const [showMobileSideBar, setShowMobileSideBar] = useState(0);


  const router =useRouter()
  const dispatch = useDispatch();


  const user = useSelector(
    (state) => state.auth.login.currentUser
  );
  
  useEffect(() => {
   // const user = JSON.parse(JSON.parse(window.localStorage.getItem('persist:root'))?.auth)?.login?.currentUser;
    if (user === null) {
        router.push('/login');
    //    toast.success('redirect to login')
    }
  }, [router ,user]);
  
  
  





  // handle sidebar toggle for desktop device
  const handleCompactToggle = () => setSidebarCompact(state => state ? 0 : 1);
  // handle sidebar toggle in mobile device
  const handleMobileDrawerToggle = () => setShowMobileSideBar(state => state ? 0 : 1);
  return <Fragment>

{user &&
<div>

      <DashboardSidebar sidebarCompact={sidebarCompact} showMobileSideBar={showMobileSideBar} setSidebarCompact={handleCompactToggle} setShowMobileSideBar={handleMobileDrawerToggle} />

      <BodyWrapper compact={sidebarCompact ? 1 : 0}>
        <DashboardNavbar handleDrawerToggle={handleMobileDrawerToggle} />
        <InnerWrapper>{children}</InnerWrapper>
      </BodyWrapper>

</div>
}


    </Fragment>;
};
export default VendorDashboardLayout;
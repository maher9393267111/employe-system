  useEffect(() => {
    console.log("UNDER SOCKEEEEEEEEEEEEEEEEEEEEEEEET");
    socket.on("fetch", (data) => {
      console.log("data Socket 📌✏✒🖋🖊🖌🖍", data);
    });

    if (userRole[0] === "admin") {
      socket.on("createcustomer", (data) => {
        toast.info("new Customer CREATED");
        dispatch(
          FetchCustomers(custpage, size, searchstatus, sortBy, sortDirection)
        );
        dispatch(FetchNotifications());
      });

      // search notification only show form admin
      socket.on("search_customer", (data) => {
        toast.info("some agent search for customer");
        
    if (userRole[0] === "admin") {
        dispatch(FetchCustomers(custpage, size, searchstatus, sortBy, sortDirection));
         }

         else if  (userRole[0] === "staff") {
          dispatch(FetchAgentCustomers(custpage, size, sortBy, sortDirection));

         }



        dispatch(FetchNotifications());
      });
    }

    socket.on("status", (data) => {
      console.log(
        "DATAAAAAAA SOCKETIO STATUS CHANGED 🖥️ 📱🖥️ 📱",data
      );

      console.log(
        `status ${data?.receiver} ,,,,, ${userData?.id}`
      );

      if (data?.receiver === userData?.id) {
        console.log("reciever", data.receiver, "currentUser", userData?.id);
        console.log("Customer Status changed📌📌📌📌📌📌📌📌📌📌", data);
        toast.info("customer status changed");
         dispatch(FetchNotifications()).then(()=>{
          window.location.reload();
        })
        
     


 

      

      }
    });
  }, []);






  // if (userRole[0] === "staff") {
    //       console.log("refetch agent📌📌📌 customers")
    //       dispatch(FetchAgentCustomers(custpage, size, sortBy, sortDirection));
    //       dispatch(FetchNotifications());
    //     } else if (userRole[0] === "admin") {
    //       console.log("refetch ADDDDDMMMINNNN📌📌📌 customers")
    //       FetchCustomers(custpage, size, searchstatus, sortBy, sortDirection);
    //     }



      


        // if (data?.notificationData?.myRole[0] === "staff") {
        //   console.log("refetch agent📌📌📌 customers")
        //   dispatch(FetchAgentCustomers(custpage, size, sortBy, sortDirection));
        //   dispatch(FetchNotifications());
        // } else if (data?.notificationData?.myRole[0] === "admin") {
        //   console.log("refetch ADDDDDMMMINNNN📌📌📌 customers")
        //   FetchCustomers(custpage, size, searchstatus, sortBy, sortDirection);
        // }


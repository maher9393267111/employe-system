import duotone from "components/icons/duotone";
export const navigations = [{
  type: "label",
  label: "Admin"
}, {
  name: "Dashboard",
  icon: duotone.Dashboard,
  path: "/"
}, 



, {
  name: "Agents",
  icon: duotone.Accounts,
  children: [
    
   { name: "Agent List",
    path: "/admin/agent"
  }, 
  
  {
    name: "Create Agent",
    path: "/admin/agent/create"
  }]
}, 



, {
  name: "Customers",
  icon: duotone.Accounts,
  children: [{
    name: "Customer List",
    path: "/admin/customer"
  }, {
    name: "Create Customer",
    path: "/admin/customer/create"
  }]
}, 



];








// agentNavigatio

export const agentNavigations = [
  
  {


  type: "label",
  label: "Agent"
}

, 
// {
//   name: "Dashboard",
//   icon: duotone.Dashboard,
//   path: "/"
// }, 




, {
  name: "Customers",
  icon: duotone.Accounts,
  children: [{
    name: "Customer List",
    path: "/admin/customer"
  }, {
    name: "Create Customer",
    path: "/admin/customer/create"
  }]
}, 




]
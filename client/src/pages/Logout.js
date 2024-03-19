import React from "react";

const LogoutPage = () => {  
    sessionStorage.removeItem("auth_token");
    window.location.replace("/");  
};

export default LogoutPage;
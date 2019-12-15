import  React from "react";
import withRouter from "umi/withRouter";
import TabBar from "../components/tabBar";
import { observer } from "mobx-react";
import router from "umi/router";
import { user } from "../models_/index";

const BaseLayout = observer(props => {
  const pathname = props.location.pathname;
  if (!user.info.token && pathname != "/login") {
    router.replace("/login");
    return null;
  }

  return (
    <>
      {props.children}
      {(pathname == "/" || pathname == "/setting") && <TabBar />}
    </>
  );
});

export default withRouter(BaseLayout);

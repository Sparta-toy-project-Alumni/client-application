import "./App.css";
import React, { Suspense, lazy } from "react";
import GlobalStyle from "./GlobalStyle";

import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";

import Spinner from "./Spinner";
import { Grid } from "../elements";

// 사용자 token 여부
import { token } from "./OAuth";
import logger from "./Console";
import Tour from "../components/Tour";

// 코드 분할
const Main = lazy(() => import("../pages/Main"));
const LoginRedirect = lazy(() => import("../pages/LoginRedirect"));
// const Tutorial = lazy(() => import("../pages/Tutorial"));
const MainPage = lazy(() => import("../pages/MainPage"));
const Upload = lazy(() => import("../pages/Upload"));
const DetailPage = lazy(() => import("../pages/DetailPage"));
const Search = lazy(() => import("../pages/Search"));
const MyPage = lazy(() => import("../pages/MyPage"));
const RoadAddress = lazy(() => import("../pages/RoadAddress"));
const ChatRoomList = lazy(() => import("../pages/ChatRoomList"));
const Chat = lazy(() => import("../pages/Chat"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ProfileEdit = lazy(() => import("../pages/ProfileEdit"));
const Settings = lazy(() => import("../pages/Settings"));
const MyPost = lazy(() => import("../pages/MyPost"));
const MyReview = lazy(() => import("../pages/MyReview"));
const MyProfile = lazy(() => import("../pages/MyProfile"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const AllowChat = lazy(() => import("../pages/AllowChat"));
const ReviewWrite = lazy(() => import("../pages/ReviewWrite"));

function App() {
  const dispatch = useDispatch();

  const path = document.location.href.split("/")[3];

  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.user.is_loading);

  // token 정보 있을때 user redux에 저장
  React.useEffect(() => {
    if (token) {
      dispatch(userAction.loginCheck(`/${path}`));
      logger("app.js user 정보", user_info);
    }
    logger("is_loading", is_loading);
    logger("path", path);
  }, []);

  if (is_loading) {
    return (
      <React.Fragment>
        <Spinner />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <GlobalStyle />
        <Suspense fallback={<Spinner />}>
          <Tour/>
          <Grid shape="topGrid">
            <Switch>
              {/* <Route path="/" exact component={Tutorial} /> */}
              <Route path="/" exact component={MainPage} />
              <Route path="/home" exact component={Main} />
              <Route path="/post/:id" exact component={DetailPage} />
              <Route path="/address" exact component={RoadAddress} />
              <Route
                path="/user/kakao/callback"
                exact
                component={LoginRedirect}
              />
              <Route path="/upload" exact component={Upload} />
              <Route path="/upload/:id" exact component={Upload} />
              <Route path="/search" exact component={Search} />
              <Route path="/mypage" exact component={MyPage} />
              <Route path="/mypost" exact component={MyPost} />
              <Route path="/myprofile" exact component={MyProfile} />
              <Route path="/userprofile/:id" exact component={UserProfile} />
              <Route path="/profile" exact component={ProfileEdit} />
              <Route path="/myreview" exact component={MyReview} />
              <Route path="/settings" exact component={Settings} />
              <Route path="/chatlist" exact component={ChatRoomList} />
              <Route path="/chatting" exact component={Chat} />
              <Route path="/allowchat" exact component={AllowChat} />
              <Route path="/write" exact component={ReviewWrite} />
              <Route component={NotFound} />
            </Switch>
          </Grid>
        </Suspense>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;

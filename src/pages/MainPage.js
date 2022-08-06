import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text, Button, Image } from "../elements";
import { Post, Footer, Header, MainBanner, PcSide } from "../components";
import theme from "../styles/theme";
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import logger from "../shared/Console";
import { actionCreators as mainActions } from "../redux/modules/main";
import { useDispatch } from "react-redux";

const MainPage = (props) => {
  //   const { getPostAX } = mainActions;
  const dispatch = useDispatch();
  const { color, btn_border, fontSize } = theme;
  const media = useMediaQuery("(min-width: 950px)");
  const backdrop = CSS.supports("backdrop-filter: blur(4px)");

  const category = ["공지사항", "자유게시판", "스터디모집"];

  const [active, setActive] = useState({
    notice: false,
    freeboard: false,
    study: false,
  });

  useEffect(() => {
    dispatch(mainActions.getPostAX(1, 1));
  }, []);

  return (
    <React.Fragment>
      <Grid
        minHeight="100vh"
        margin="0 auto"
        padding={media ? "0" : "0 0 5.2rem 0"}
      >
        <Grid shape="container">
          <Header {...props} shape="홈">
            {/* {user?.user_address} */}
          </Header>
          {/* <Footer {...props}></Footer> */}
          <Grid
            maxWidth="34.9rem"
            height="4.5rem"
            margin={media ? "0 0 0 2rem" : "0 0 0 2.8rem"}
            flex
            flex_direction="row"
            align_items="center"
            padding="2rem 0 1.6rem 0"
          >
            {category.map((btnName, idx) => {
              if (btnName !== "") {
                return (
                  <Button
                    key={btnName}
                    width="6rem"
                    height="3rem"
                    margin="0 1rem 0 1rem"
                    radius="10px"
                    color="#ffffff"
                    border={`1px solid lightgray`}
                    filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.25))"
                    _onClick={(e) => {
                      console.log(e.target.textContent);
                      console.log(e.target.textContent);
                      if (e.target.textContent === "공지사항") {
                        setActive({
                          ...{ freeboard: false, study: false },
                          notice: !active.notice,
                        });
                      } else if (e.target.textContent === "자유게시판") {
                        setActive({
                          ...{ notice: false, study: false },
                          freeboard: !active.freeboard,
                        });
                      } else if (e.target.textContent === "스터디모집") {
                        setActive({
                          ...{ notice: false, freeboard: false },
                          study: !active.study,
                        });
                      }
                    }}
                  >
                    <Text size="1rem" bold>
                      {btnName}
                    </Text>
                  </Button>
                );
              }
            })}
          </Grid>
        </Grid>
        <Grid width="36rem" margin="0 auto"></Grid>
      </Grid>
    </React.Fragment>
  );
};

const Hr = styled.hr`
  width: 36rem;
  height: 0.1rem;
  background-color: #f4f4f3;
  border: none;
  margin: 0;
`;

const LogoImg = styled.div`
  margin: 0 auto 1rem auto;
  background-image: url("${(props) => props.src}");
  width: 18.4rem;
  height: 16.7rem;
  background-size: cover;
  background-position: center;
`;

const FeedbackBtn = styled.div`
  width: 3.4rem;
  height: 3.6rem;
  max-width: 3.4rem;
  max-height: 3.6rem;
  border-radius: 1rem;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  margin: 0.3rem 0 0 0;
`;

export default MainPage;

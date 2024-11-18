"use client";

import { Carousel, Layout } from "antd";

const { Content, Header } = Layout;

export default function Page() {
  const contentStyleCarousel: React.CSSProperties = {
    height: "300px",
    // width: "100vw",
    // maxHeight: "100%",
    // maxWidth: "100%",
    color: "#fff",
    lineHeight: "300px",
    textAlign: "center",
    background: "#1677ff",
    margin: 0,
  };
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header></Header>
        <Content style={{ background: "#ff" }}>
          <Carousel autoplay arrows infinite={false}>
            <div>
              <h3 style={contentStyleCarousel}>2</h3>
            </div>
            <div>
              <h3 style={contentStyleCarousel}>2</h3>
            </div>
            <div>
              <h3 style={contentStyleCarousel}>3</h3>
            </div>
            <div>
              <h3 style={contentStyleCarousel}>4</h3>
            </div>
          </Carousel>
        </Content>
      </Layout>
    </>
  );
}

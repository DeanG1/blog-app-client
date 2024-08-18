import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { loadAllPosts } from "../services/post-service";
import { Row, Col } from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log("loading posts");
    console.log(currentPage);
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });

        console.log(data);
      })
      .catch((error) => {
        toast.error("Error in loading posts");
      });
  };

  const changePageInfinite = () => {
    console.log("page chagned");
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 12,
          }}
        >
          <h1>Blogs Count ( {postContent?.totalElements} )</h1>
          <InfiniteScroll
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {postContent.content.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;

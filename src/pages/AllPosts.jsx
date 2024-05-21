import React, { useEffect, useState } from "react";
import Auth from "../appwrite/Auth";
import { useSelector } from "react-redux";
import PasswordCard from "../components/pageComponents/PasswordCard";

function AllPosts() {
  const [allpost, setAllPost] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.status);
  const [uid, setUid] = useState("");

  const workerFunction = async () => {
    try {
      const data = await Auth.getCurrentUser();
      const userId = data?.$id || "";
      setUid(userId);
      return userId;
    } catch (error) {
      console.error("Error fetching current user:", error);
      setUid("");
      return null;
    }
  };

  const mountAllPost = async (userId) => {
    try {
      const posts = (await Auth.getPosts(userId)).documents;
      console.log("Fetched posts:", posts); // Debugging line
      setAllPost(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setAllPost([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        const userId = await workerFunction();
        if (userId) {
          mountAllPost(userId);
        }
      } else {
        setUid("");
        setAllPost([]);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  useEffect(() => {
    // Update the allpost whenever it changes
    async function updatePosts() {
      const posts = await Auth.getPosts(uid);
      setAllPost(posts);
    }
    updatePosts();
  }, [setAllPost, uid]);

  console.log("allpost state:", allpost); // Debugging line

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate().toString().padStart(2, "0");
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getSeconds().toString().padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="w-full p-2 h-full">
        <div className="overflow-x-hidden overflow-y-scroll p-4 h-[80vh] w-full">
          {isAuthenticated ? (
            Array.isArray(allpost) && allpost.length > 0 ? (
              allpost.map((post) => (
                <PasswordCard
                  key={post.$id}
                  siteName={post.SITE_NAME}
                  siteUrl={post.SITE}
                  sitePassword={post.SITE_PASSWORD}
                  createdAt={`Created At: ${formatDateTime(post.$createdAt)}`}
                  uid={post.UID}
                  sid={post.SID} // Pass onDelete callback
                  workerFunction={workerFunction} // Pass workerFunction
                  setAllPost={setAllPost}
                />
              ))
            ) : (
              <div>No posts available</div>
            )
          ) : (
            <div>Not Logged In, Nothing to show</div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllPosts;

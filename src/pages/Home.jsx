import React, { useState, useEffect } from "react";
import PasswordCard from "../components/pageComponents/PasswordCard";
import { InputComp, ButtonComp } from "../components";
import Auth from "../appwrite/Auth";
import { login } from "../store/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { Decryption, Encryption } from "../hashing/HashingIndex";
import EnvConfig from "../config/EnvConfig";

function Home() {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const [sName, setSname] = useState("");
  const [sUrl, setsUrl] = useState("");
  const [sPass, setsPass] = useState("");
  const [uid, setUid] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [showArray, setShowArray] = useState([]);
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = await Auth.getCurrentUser();
        setUid(currentUser?.$id || "");
        setCreatedAt(currentUser?.$createdAt || "");
        if (currentUser) {
          dispatch(login(currentUser)); // Dispatch login action if user is fetched
          const posts = await getAllPost(currentUser.$id);
          setShowArray(posts);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }
    fetchData();
  }, [dispatch]); // Add dispatch to dependencies array

  useEffect(() => {
    // Update the showArray whenever it changes
    async function updatePosts() {
      const posts = await getAllPost(uid);
      setShowArray(posts);
    }
    updatePosts();
  }, [showArray, uid]); // Add showArray and uid to dependencies array

  const handleSnameChange = (e) => {
    setSname(e.target.value);
  };
  const handleSurlChange = (e) => {
    setsUrl(e.target.value);
  };
  const handleSpassChange = (e) => {
    setsPass(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.alert("Login To Save Credentials!!");
      return;
    }

    // Validate inputs
    if (!sName || !sUrl || !sPass) {
      window.alert("Please fill in all fields.");
      return;
    }

    const encryptPassword = (password) => {
      const encry = new Encryption(EnvConfig.enc_dec_key);
      return encry.encrypt(password);
    };

    // Create post
    const data = {
      SITE_PASSWORD: encryptPassword(sPass),
      SITE_NAME: sName,
      UID: uid,
      DATE_TIME: createdAt,
      SITE: sUrl,
    };

    try {
      await Auth.createPost(data);
      console.log("test data", { ...data });
      const updatedArray = await getAllPost(uid);
      console.log("updated array ::", updatedArray);
      setShowArray(updatedArray);
    } catch (error) {
      console.log("Error saving post:", error);
    }

    // Clear form
    setSname("");
    setsUrl("");
    setsPass("");
  };

  const getAllPost = async (userId) => {
    try {
      const posts = await Auth.getPosts(userId);
      // console.log("Post Documents ::", posts.documents);
      return posts.documents.slice(-3); // Get last three posts
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  const handleDeletePassword = async (sid) => {
    try {
      await Auth.deletePost(sid);
      window.alert("Deleted Successfully");
      // Trigger a re-fetch of all posts
      const updatedArray = await getAllPost(uid);
      setShowArray(updatedArray);
    } catch (error) {
      console.error("Error deleting post:", error);
      window.alert("Something Went Wrong");
    }
  };

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

  const handleEncryptedPassword = (e) => {
    setEncryptedPassword(e.target.value);
  };

  const decryptPassword = () => {
    const decry = new Decryption(EnvConfig.enc_dec_key);
    const res = decry.decrypt(encryptedPassword);
    setEncryptedPassword("");
    setDecryptedPassword(res);
  };

  const handleCancel = () => {
    setEncryptedPassword("");
    setDecryptedPassword("");
  };

  const handleCopyDecryptedPassword = () => {
    navigator.clipboard.writeText(decryptedPassword);
    window.alert("Decrypted password copied to clipboard");
  };

  return (
    <section className="h-full w-full">
      <div className="mx-auto mb-2 mt-2">
        <h1 className="text-3xl font-bold text-center">Welcome To MyPass</h1>
      </div>
      <div className="w-full flex items-start justify-center">
        <div className="w-[40%] p-4 m-2 rounded bg-gray-200">
          <InputComp
            label="Site Name: "
            value={sName}
            onChange={handleSnameChange}
            placeholder="Enter your site name"
          />
          <InputComp
            label="Site Url: "
            value={sUrl}
            onChange={handleSurlChange}
            placeholder="Enter your site's URL"
          />
          <InputComp
            label="Site Password: "
            value={sPass}
            onChange={handleSpassChange}
            placeholder="Enter your site's Password"
          />
          <ButtonComp
            children="Save"
            onClick={handleSave}
            className="mt-2 bg-gray-400 text-pink-500 hover:text-pink-600 shadow-md hover:shadow-none font-bold text-xl"
          />
          <div>
            <InputComp
              label="Enter Encrypted Password:"
              value={encryptedPassword}
              onChange={handleEncryptedPassword}
              placeholder="Enter your encrypted password"
            />
            <ButtonComp
              children="Decrypt..."
              onClick={decryptPassword}
              className="mt-2 bg-gray-400 text-pink-500 hover:text-pink-600 shadow-md hover:shadow-none font-bold text-xl"
            />
            {decryptedPassword && (
              <div className="mt-2 p-2 border border-gray-300 rounded bg-white">
                <p>Decrypted Password:</p>
                <p className="font-bold">{decryptedPassword}</p>
                <ButtonComp
                  children="Copy"
                  onClick={handleCopyDecryptedPassword}
                  className="mt-2 bg-gray-400 text-pink-500 hover:text-pink-600 shadow-md hover:shadow-none font-bold text-xl"
                />
                <ButtonComp
                  children="Clear"
                  onClick={handleCancel}
                  className="mt-2 bg-gray-400 text-pink-500 hover:text-pink-600 shadow-md hover:shadow-none font-bold text-xl"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-[60%] p-4 m-2 flex flex-col items-center justify-center">
          <p>Recent Credentials...</p>
          <div className="w-full mx-auto flex-grow">
            {showArray.length === 0 ? (
              <div className="text-black text-xl font-bold text-center mx-auto flex items-center justify-center">
                <h2>No Password Saved</h2>
              </div>
            ) : null}
            {isAuthenticated &&
              showArray.map((item) => (
                <PasswordCard
                  key={item.$id}
                  siteName={item.SITE_NAME}
                  siteUrl={item.SITE}
                  sitePassword={item.SITE_PASSWORD}
                  createdAt={`Created At: ${formatDateTime(item.$createdAt)}`}
                  uid={item.$id}
                  sid={item.SID}
                  onDelete={() => handleDeletePassword(item.SID)}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

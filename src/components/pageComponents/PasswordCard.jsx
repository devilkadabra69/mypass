import React, { useState } from "react";
import { ButtonComp } from "../index";
import Auth from "../../appwrite/Auth";

function PasswordCard({
  siteName,
  siteUrl,
  sitePassword,
  createdAt,
  uid,
  sid,
  workerFunction, // Pass workerFunction as prop
  setAllPost,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(sitePassword);
    window.alert("Password Copied Now use Our Decryptor to decrypt it");
    // Optionally, provide feedback to the user that the password has been copied
    // For example: alert("Password copied to clipboard!");
  };

  const handleDeletePassword = async () => {
    try {
      await Auth.deletePost(sid);
      window.alert("Deleted Successfully");
      // Trigger a re-fetch of all posts
      const updatedPosts = await Auth.getPosts(uid);
      setAllPost(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
      window.alert("Something Went Wrong");
    }
  };

  const getPasswordDisplay = () => {
    const maxLength = 15; // Define the maximum length you want to display
    if (isPasswordVisible) {
      return sitePassword.length > maxLength
        ? `${sitePassword.slice(0, maxLength)}...`
        : sitePassword;
    }
    return "********"; // Hide the password if not visible
  };

  return (
    <div className="w-full rounded-md hover:shadow-md mx-auto px-2 mt-2 bg-gray-200 hover:bg-gray-300">
      <div className="flex flex-col justify-start w-full p-2">
        <h2 className="font-bold text-xl">{siteName}</h2>
        <h3 className="italic">
          <a href={siteUrl} className="no-underline">
            {siteUrl}
          </a>
        </h3>
        <div className="flex items-center justify-between">
          <h2 className="text-xl">{getPasswordDisplay()} </h2>
          <p className="text-sm text-gray-500">{createdAt}</p>
        </div>
        <span className="w-[35%] flex items-center justify-start space-x-4">
          <ButtonComp
            children={isPasswordVisible ? "HIDE" : "SHOW"}
            onClick={togglePasswordVisibility}
            className="bg-gray-400 text-pink-500 font-bold hover:text-pink-600 hover:bg-gray-600 hover:shadow"
          />
          <ButtonComp
            children="COPY"
            onClick={handleCopyPassword}
            className=" bg-gray-400 text-pink-500 font-bold hover:text-pink-600 hover:bg-gray-600 hover:shadow"
          />
          <ButtonComp
            children="DELETE"
            onClick={handleDeletePassword}
            className=" bg-gray-400 text-pink-500 font-bold hover:text-pink-600 hover:bg-gray-600 hover:shadow"
          />
        </span>
      </div>
    </div>
  );
}

export default PasswordCard;

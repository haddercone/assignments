import React, { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
const Card = ({ name, description, githubURL, linkedinURL, twitterURL }) => {
  const imageRef = useRef();
  const [profileURL, setProfileURL] = useState("")

  function handleDownloadImage() {
    htmlToImage
      .toPng(imageRef.current)
      .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);

        // Creating a temporary link element to trigger the download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "image.png";
        link.click();
        setImageUrl(dataUrl);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }

  async function getGitHubUserName(githubUserName) {
    const data = await fetch(`https://api.github.com/users/${githubUserName}`)
    const res = await data.json();
    const githubProfileURL = res?.avatar_url;
    setProfileURL(githubProfileURL)

  }

  useEffect(() => {
    const githubUserName = githubURL.split("/").at(-1);
    getGitHubUserName(githubUserName)
  }, [profileURL])

  return (
    <div>
      <div
        ref={imageRef}
        className="bg-white min-w-56 max-w-72 p-2 border-4 rounded"
      >
        <div className="flex justify-between items-center gap-2">
        {profileURL && <img className="w-12 h-12 rounded-full"src={profileURL} />}
        <div className="flex gap-2 ">
          <a href={githubURL} target="_blank">
            {githubURL &&
            <img className="w-5 h-5 self-start"src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
          }
          </a>
          <a href={linkedinURL} target="_blank">
            {linkedinURL && 
            <img className="w-5 h-5 self-baseline" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" />
          }
          </a>
          <a href={twitterURL} target="_blank">
            {twitterURL && 
            <img className="w-5 h-5 " src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" />
          }
          </a>
        </div>
        </div>
        <h1 className="mt-2 text-3xl">{name}</h1>
        <p className="mt-2 text-sm">{description}</p>
      </div>
      <button onClick={handleDownloadImage} className="text-white bg-gray-900 px-4 py-2 mt-2">Download</button>
    </div>
  );
};

export default Card;

import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
const Card = ({ name, description, githubURL, linkedinURL, twitterURL }) => {
  const imageRef = useRef();

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
  return (
    <div>
      <div
        ref={imageRef}
        className="w-56 border p-2 bg-gradient-to-t from-pink-300 to-blue-400 rounded"
      >
        <h1 className="text-4xl">{name}</h1>
        <p>{description}</p>
        <div className="flex gap-2 ">
          <a href={githubURL} target="_blank">
            {githubURL && "Github"}
          </a>
          <a href={linkedinURL} target="_blank">
            {linkedinURL && "LinkedIn"}
          </a>
          <a href={twitterURL} target="_blank">
            {twitterURL && "Twitter"}
          </a>
        </div>
      </div>
      <button onClick={handleDownloadImage} className="text-white bg-gray-900 px-4 py-2 mt-2">Download</button>
    </div>
  );
};

export default Card;

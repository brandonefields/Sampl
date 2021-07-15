import { useState, useEffect } from "react";

import { ColorExtractor } from "react-color-extractor";
import ColorSample from "./ColorSample";

export default function App({ palette, addPalette, changeTheme, toggleView }) {
  const [colors, setColors] = useState(palette.colors || []);
  const [imageUrl, setImageUrl] = useState(palette.imageUrl || "noUrl");

  const [hasExtractedColors, setHasExtractedColors] = useState(false);

  const renderColorSamples = () => {
    return colors.map((color, id) => {
      return <ColorSample color={color} key={id} />;
    });
  };

  const getColors = newColors => setColors(newColors);

  const handleExtractColors = event => {
    event.preventDefault();
    const newUrl = new FormData(event.target).get("imageUrl");
    setImageUrl(newUrl);
    setHasExtractedColors(true);
  };

  const handleSavePalette = event => {
    addPalette({ colors, imageUrl });
    toggleView();
  };

  useEffect(() => {
    changeTheme(null, colors);
  }, []);

  return (
    <div className="MainCard card">
      <a 
      className="colorExtractor-container" 
      href={imageUrl} 
      target="_blank"
      rel="noopener noreferrer">
        <ColorExtractor getColors={getColors}>
          <img
            className="colorExtractor-image"
            src={imageUrl}
            /*  style={{ width: 700, height: 500 }} */
            alt="Display of url"
          />
        </ColorExtractor>
      </a>
      <form onSubmit={handleExtractColors}>
        <input
          type="url"
          name="imageUrl"
          placeholder="Source image Url"
          required
        ></input>
        <input
          className="mainCard-button"
          type="submit"
          value="Extract Colors"
        ></input>
        {hasExtractedColors ? (
          <input
            className="mainCard-button"
            type="submit"
            onClick={handleSavePalette}
            value="Save palette"
          ></input>
        ) : null}
      </form>
      <div className="colors-container">{renderColorSamples()}</div>
      <button className="mainCard-button" onClick={() => toggleView()}>
        Go To Gallery
      </button>
    </div>
  );
}

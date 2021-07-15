import React, { useState, useEffect } from "react";

import MainCard from "./components/MainCard";

import "./App.css";
import GalleryContainer from "./containers/GalleryContainer";

const newPalette = {
  colors: ["#7f7f7f", "#bcbcbc", "#424242", "#888888", "#bcbcbc", "#444444"],
  imageUrl: "https://m.media-amazon.com/images/I/61dvguSUsaL._AC_SL1500_.jpg"
};

const palettesUrl = "http://localhost:3000/palettes/";

export default function App() {
  const [palettes, setPalettes] = useState([]);
  const [mainPalette, setMainPalette] = useState(null); 
  // const [theme, setTheme] = useState(null);

  
  

  const addPalette = palette => {
    console.log("setting palettes", palette);
    setMainPalette(palette);
    savePalettesToDB(palette);
  };

  const toggleView = (palette = null) => {
    palette === "newPalette"
      ? setMainPalette(newPalette)
      : setMainPalette(palette);
  };

  const getPalettesFromDB = () => {
    fetch(palettesUrl)
      .then(res => res.json())
      .then(palettes => setPalettes(palettes));
  };

  const savePalettesToDB = palette => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(palette)
    };
    fetch(palettesUrl, options)
      .then(res => res.json())
      .then(palette => setPalettes([...palettes, palette]));
  };

  const deletePaletteFromDB = id => {
    const options = {
      method: "DELETE"
    };
    fetch(palettesUrl + id, options);
  };

  const changeTheme = (event, colors) => {
    if (event) {
      event.stopPropagation();
    }
    // setTheme(colors);
    // colors.forEach((color, i) => {
    //   document.documentElement.style.setProperty(`--color${i + 1}`, color);
    // });
  };

  const removePalette = (event, id) => {
    event.stopPropagation();
    const newPalettes = palettes.filter(palette => {
      return palette.id !== id;
    });
    setPalettes(newPalettes);

    deletePaletteFromDB(id);
  };

  useEffect(() => {
    getPalettesFromDB();
  }, []);

  return (
    <div className="App">
      {mainPalette ? (
        <MainCard
          palette={mainPalette || newPalette}
          toggleView={toggleView}
          addPalette={addPalette}
          changeTheme={changeTheme}
        />
      ) : (
        <GalleryContainer
          palettes={palettes}
          toggleView={toggleView}
          removePalette={removePalette}
          changeTheme={changeTheme}
        />
      )}
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
}

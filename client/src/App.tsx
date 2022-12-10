import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./styles/theme";
import { SearchInputWidget } from "./pages/search/SearchInputWidget";
import { SongsPage } from "./pages/songs";
import { ArtistPage } from "./pages/artist";

import "./styles/global.scss";
import { SearchPage } from "./pages/search/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="p-5">
          <Routes>
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/artists/:id" element={<ArtistPage />} />
            <Route path="/" element={<SearchInputWidget />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

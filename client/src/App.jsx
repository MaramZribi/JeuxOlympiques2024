import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import Sites from './pages/Sites';
import SearchResult from './search/SearchResult';
import axios from "axios";
import SitePage from './pages/SitePage';
import SportAgenda from './pages/SportAgenda';
import Sports from './pages/Sports';
import RoutePlanner from './pages/RoutePlanner';
import OlymSites from './pages/OlymSites';
import ParamSites from './pages/ParamSites';
import About from './pages/About';
import TravelTimeCalculator from './pages/TravelTimeCalculator';
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/site/:id" element={<SitePage />} />
        <Route path="/agenda/:sport" element={<SportAgenda />} />
        <Route path="/route-planner" element={<RoutePlanner />} />
        <Route path="/olympic-sites" element={<OlymSites />} />
        <Route path="/paralympic-sites" element={<ParamSites />} />
        <Route path="/planning" element={<TravelTimeCalculator />} />
     

      </Route>
    </Routes>
  )
}

export default App

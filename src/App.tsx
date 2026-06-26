import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Heder } from "./components/heder";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePages";
import { ItemsPage } from "./pages/ItemsPage";

import { Calculator } from "./pages/tools/Assembly-calculator";
import { WeaponsPage } from "./pages/items/weapons";
import { ItemPage } from "./pages/item/ItemPage";
import { ArtifactsPage } from "./pages/items/Art";
import { ArmorPage } from "./pages/items/armor";
import { ContainersPage } from "./pages/items/Containers";
import { AttachmentsPage } from "./pages/items/AttachmentsPage";
import { DevicesPage } from "./pages/items/DevicesPage";
import { BackpacksPage } from "./pages/items/BackpacksPage";
import "./App.css";
import AnimatedDotsBackground from "./assets/background/AnimatedDotsBackground";

function App() {
  return (
    <>
    <AnimatedDotsBackground density={60} speed={0.4} dotRadius={1.2} />
      <Router>
        <div className="app">
          <Heder />

          <main className="container main-content-area">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/items" element={<ItemsPage />} />
              <Route path="/tools/build-calculator" element={<Calculator />} />
              <Route
                path="/item/:category/:item_name/raw"
                element={<ItemPage />}
              />
              <Route path="/items/weapons" element={<WeaponsPage />} />
              <Route path="/items/artifacts" element={<ArtifactsPage />} />
              <Route path="/items/armor" element={<ArmorPage />} />
              <Route path="/items/attachments" element={<AttachmentsPage />} />
              <Route path="/items/containers" element={<ContainersPage />} />
              <Route path="/items/devices" element={<DevicesPage />} />
              <Route path="/items/backpacks" element={<BackpacksPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;

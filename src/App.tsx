import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { CadBackground } from './components/CadBackground';
import { HomePage } from './pages/HomePage';
import { FeaturesPlaygroundPage } from './pages/FeaturesPlaygroundPage';
import { DrawingPackagePage } from './components/drawing-package/DrawingPackagePage';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Drawing Package variation — standalone, no shared shell */}
        <Route path="/drawing-package" element={<DrawingPackagePage />} />

        {/* Original site with shared shell */}
        <Route path="*" element={
          <>
            <CadBackground />
            <Navbar />
            <main className="relative z-10 w-full overflow-x-clip selection:bg-accent-primary/20 selection:text-accent-primary">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/second-page" element={<FeaturesPlaygroundPage />} />
              </Routes>
            </main>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;

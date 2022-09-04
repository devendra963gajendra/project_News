import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar.js'
import News from './Components/News.js'
import LoadingBar from 'react-top-loading-bar'
import React, { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [progress, setProgress] = useState(0)
  //let apikey = process.env.REACT_APP_NEWS_API
  let apikey = "02a0b90b287142aea65b465e6ada8f46"

  return (
    <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route element={<Navbar />} >
          {/* <Route element={<Navbar />} /> */}

          <Route path="/general" element={<News setProgress={setProgress} apikey={apikey} key="general" category="general" />} />

          <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" category="entertainment" />} />

          <Route path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" category="health" />} />

          <Route path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" category="science" />} />

          <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" category="sports" />} />

          <Route path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" category="technology" />} />

          <Route path="*" element={<News setProgress={setProgress} apikey={apikey} key="general" category="general" />} />

        </Route>
      </Routes>

    </BrowserRouter >

  );
}

export default App;

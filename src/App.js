import './style/App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Header } from './components/header/Header';
import { Music } from './components/music/Music';
import { Artist } from './components/artist/Artist';
import { Album } from './components/album/Album';
import { MusicContent } from './components/music/MusicContent';
import { Footer } from './components/footer/Footer';
import { AlbumContent } from './components/album/AlbumContent';
import { ArtistContent } from './components/artist/ArtistContent';
import { Playlist } from './components/playlist/Playlist';

const App = () => {
  return (
    <div className="App">
        <Router>
          <Header />
          <Routes>
              <Route path='/' element={<Music/>}/>
              <Route path='/musicContent/:id' element={<MusicContent/>}/>
              <Route path='/artist' element={<Artist/>}/>
              <Route path='/artistContent/:id' element={<ArtistContent/>}/>
              <Route path='/album' element={<Album/>}/>
              <Route path='/albumContent/:id' element={<AlbumContent/>} />
              <Route path='/playlist' element={<Playlist/>}/>
          </Routes>
          <Footer/>
        </Router>
    </div>
  );
}

export default App;

import './scss/main.scss';
import React from 'react';
import Loader from './components/Loader';
import ChatPage from './components/ChatPage';
import JoinRoomPage from './components/JoinRoomPage';
import io from "socket.io-client";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
const LazyHomePage = React.lazy(() => import('./components/HomePage'));
const LazyError404Page = React.lazy(() => import('./components/Page404'));
const LazyJoinRoomPage = React.lazy(() => import('./components/JoinRoomPage'))

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={
              <React.Suspense fallback = {<Loader/>}>
                <LazyHomePage/>
              </React.Suspense>
            }/>

            <Route path='*' element={
              <React.Suspense fallback = {<Loader/>}>
                <LazyError404Page/>
              </React.Suspense>
            }/>
            <Route path='/chat/:user/:room' element={<ChatPage socket={socket}/>}/>
            <Route path='/join-room' element={<JoinRoomPage/>}/>
        </Routes>
    </Router>
  );
}

export default App;

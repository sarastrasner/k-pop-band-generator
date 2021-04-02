import Cards from './components/cards/cards';
import Footer from './components/footer/footer';
import './app.scss';
import logo from './assets/logo.png';

function App() {
  return (
    <>
      <div className="content-container">
        <div id="logoBox">
          <img id="logo" src={logo} alt="logo"></img>
        </div>
        <Cards />
      </div>
      <Footer className="footer--pin" />
    </>
  );
}

export default App;

import Cards from './components/cards/cards';
import Footer from './components/footer/footer';
import './app.scss';
import logo from './assets/logo.png';

function App() {
  return (
    <>
      <div id="logoBox">
        <img id="logo" src={logo} alt="logo"></img>
      </div>
      <Cards />
      <Footer />
    </>
  );
}

export default App;

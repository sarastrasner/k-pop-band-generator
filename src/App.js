import Cards from './components/cards/cards';
import Footer from './components/footer/footer';
import './app.scss';
import logo from './assets/logo.png';
import { GraphQLClient, ClientContext } from 'graphql-hooks';

const client = new GraphQLClient({
  url: 'https://k-pop-api-v2.herokuapp.com/graphql',
});

function App() {
  return (
    <ClientContext.Provider value={client}>
      <div id="logoBox">
        <img id="logo" src={logo} alt="logo"></img>
      </div>
      <Cards />
      {/* <Footer /> */}
    </ClientContext.Provider>
  );
}

export default App;

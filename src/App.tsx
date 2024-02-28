import Todo from './containers/Todo/Todo';
import Appbar from './components/Appbar/Appbar';

const App = () => (
  <>
    <header>
      <Appbar/>
    </header>
    <main className="container-fluid">
      <Todo/>
    </main>
  </>
);

export default App;

import './App.scss';
import routes from './routes';
import RouterOutlet from './routes/RouterOutlet';


function App() {
  console.log(import.meta.env.MODE);
  return (
    <div className="App">
      <RouterOutlet routes={routes} />
    </div>
  )
}

export default App

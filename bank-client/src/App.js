import './App.css';
import EditUser from './components/EditUser'
import Users from './components/Users'

function App() {
  return (
    <div className="App">
      <div>
        <EditUser />
      </div>
      <div>
        <Users/>
      </div>

    </div>
  );
}

export default App;

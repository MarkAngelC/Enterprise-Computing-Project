import './App.css';

function App() {
  const groupNumber = process.env.REACT_APP_GROUP_NUMBER || '5';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Enterprise Computing Project</h1>
        <h2>Group Number: {groupNumber}</h2>
        <p>Team Members:</p>
        <ul>
          <li>Mark Castro</li>
          <li>Dondon Herrera</li>
          <li>Victor Leung</li>
          <li>Joy Francisco</li>
        </ul>
      </header>
    </div>
  );
}

export default App;

import { FluentProvider, teamsDarkTheme } from '@fluentui/react-components';
import './App.css';
import { Autoplay } from './Carousel';

function App() {
  return (
    <div className="App">
      <FluentProvider theme={teamsDarkTheme}>
        <Autoplay />
      </FluentProvider>
    </div>
  );
}

export default App;

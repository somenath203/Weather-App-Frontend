import Header from './components/Header';
import WeatherApp from './components/WeatherApp';

const App = () => {
  return (
    <div className='min-h-screen flex items-center justify-center flex-col gap-12 bg-slate-100'>
      <Header />
      <WeatherApp />
    </div>
  )
};

export default App;

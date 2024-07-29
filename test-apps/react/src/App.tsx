import { intl } from '../lib/services/intl/intl.service';

function App() {
  return (
    <>
      <h1>{intl('app.title')}</h1>
    </>
  );
}

export default App;

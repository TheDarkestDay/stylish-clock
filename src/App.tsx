import { ToastContainer } from 'react-toastify';

import { ClockScreen } from './clock-screen/ClockScreen';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <ClockScreen />
      <ToastContainer />
    </div>
  );
}

export default App;

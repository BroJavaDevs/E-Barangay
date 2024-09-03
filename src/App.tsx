import { IonApp, IonContent, IonButton, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

setupIonicReact();

function App() {

  return (
    <IonApp>
      <IonContent>
        <IonButton>Click Me!</IonButton>
      </IonContent>
    </IonApp>
  )
}

export default App

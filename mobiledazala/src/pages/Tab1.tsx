// Eugene Lay Chai Chun - 190507X
//Koh Fu Wei Andrew - 190406Y
//Ernest Wang Xin Yan - 192185H



import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonLabel } from '@ionic/react'; // TODO: fixme 
import './Tab1.css';

const Tab1: React.FC = () => {
  return (  
    <IonPage>
      <IonHeader>
        <IonTitle size="large">Welcome To Dazala !!</IonTitle>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome to Dazala  </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="center">
          <IonLabel>Welcome to Dazala !! </IonLabel>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

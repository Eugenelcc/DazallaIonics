// Eugene Lay Chai Chun - 190507X
//Koh Fu Wei Andrew - 190406Y
//Ernest Wang Xin Yan - 192185H




import React from 'react';
import { useState, useEffect, useReducer } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonLoading, IonList, IonTextarea, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { RouteComponentProps } from 'react-router';
import useLocalStorage from '../components/LocalStorage'
import { useIonViewDidEnter } from '@ionic/react';
interface CartPageProps extends RouteComponentProps<{
  id: string;
  name?: string
}> { }

interface CartItem {
  id: string
  name?: string
  description?: string
  price?: number
  qty: number
}


interface Dictionary<T> {
  [Key: string]: T;
}

type Cart = Dictionary<CartItem>




const addItem = async function (id: string, cart: Cart): Promise<Cart> { // TODO:fixme 
  if ((id != null) && (id.length > 0)) {
    if (cart[id] == null) {
      cart[id] = { id: id, qty: 1 };
    } else {
      cart[id].qty += 1
    }
  }
  return new Promise((resolve, reject) => {
    resolve(cart)
  })
}


function allItems(cart: Cart): CartItem[] {
  let res = new Array<CartItem>()
  for (const item of Object.keys(cart)) {
    res.push(cart[item]);
  }
  return res
}


const Tab3: React.FC<CartPageProps> = ({ match }) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [cart, setCart] = useLocalStorage<Cart>('cart', {});


    useIonViewDidEnter(() => {
    fetch(`https://localhost:5001/api/product/get/${match.params.id}`)
    
      addItem(match.params.id, cart)
      .then(setCart)
      .finally(() => setShowLoading(false))
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Cart</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Loading...'}
        />
        <IonList>
          {allItems(cart).map((item, index) => (
            <IonItem key={index}>
              <IonLabel>
                <p>Product ID :{item.id}</p>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <p>Item quantity:{item.qty}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
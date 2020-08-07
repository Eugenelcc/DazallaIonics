import React from 'react';
import { useState, useEffect } from "react"; 
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading, IonList, IonItem, IonLabel } from '@ionic/react';
import './Tab2.css';


interface Product { 
  id: string
  name: string
  description: string 
  price : number   
}



const Tab2: React.FC = () => {

  const [products, setProducts] = useState<Product []>([]);

  const [showLoading, setShowLoading] = useState<boolean>(true);

  const fetchProducts = async () => { 
    fetch("https://localhost:5001/api/product/all")
      .then(res => res.json())
      .then(setProducts)
      .finally(() => setShowLoading(false))
  }

  useEffect(() => { 
    fetchProducts()
  }, [products])

  const makeLink = (product: Product) => { 
    { return "/tab3/" + product.id }
  } 

  return ( 
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Loading...'}
        />
        <IonList>
          {products.map((item, index) => (
            <IonItem key={index} routerLink={makeLink(item)}>
              <IonLabel>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>${item.price}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
 
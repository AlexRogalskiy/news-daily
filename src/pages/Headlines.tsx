import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from '@ionic/react';
import NewsDataService from '../utility/dataService';
import './Headlines.css';
import { NewsItem } from '../news.interface';
import NewsContainer from '../components/NewsContainer';

const Headlines: React.FC = () => {
  const [topStories, setTopStories] = useState<NewsItem[]>([]);
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' });
  const month = new Date().toLocaleDateString('en-GB', { month: 'short' });
  const date = new Date().getDate();

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowLoading(true);

    NewsDataService.getHeadlines('country=in').then((res: any) => {
      if (res.status === 'ok') {
        const newsArticles = res.articles;
        setTopStories(newsArticles);
      } else {
        console.log('Error fetching top headlines');
        setTopStories([]);
      }
      setShowLoading(false);
    });
  }, []);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Top Stories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar className="date-header">
            <IonTitle className="date-title" size="small">
              {month} {date}, {today}
            </IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonTitle size="large">Top Stories</IonTitle>
          </IonToolbar>
        </IonHeader>
        <NewsContainer allNews={topStories} />
        <IonLoading isOpen={showLoading} message={'Please wait...'} />
      </IonContent>
    </IonPage>
  );
};

export default Headlines;

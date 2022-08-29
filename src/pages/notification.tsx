import { NotificationType, useNotificationSubscription } from "@/generated/graphql";
import { NextPage } from "next";
import { useEffect, useState } from "react";

type Notification = {
   notificationType?: NotificationType;
   userId?: number;
};

const Notification: NextPage = () => {
   const { data } = useNotificationSubscription();

   const [notifications, setNotifications] = useState<Notification[]>([]);

   useEffect(() => {
      if (data) {
         setNotifications(prev => [
            ...prev,
            {
               notificationType: data.notification?.notificationType,
               userId: data.notification?.user?.id,
            },
         ]);
      }
   }, [data]);

   return (
      <div>
         {notifications.map(notification => (
            <ul key={Math.random().toString()}>
               <li>
                  <h1>{notification.notificationType}</h1>
                  <p>{notification.userId}</p>
               </li>
            </ul>
         ))}
      </div>
   );
};

export default Notification;

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

export function useNotifications() {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });

    // const [hasPermission, setHasPermission] = useState(false);
    const [pushToken, setPushToken] = useState<Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();

    const notificationListener = useRef<Notifications.EventSubscription | null>(null);
    const responseListener = useRef<Notifications.EventSubscription | null>(null);

    // const checkPermissions = useCallback(async () => {
    //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //     setHasPermission(existingStatus === 'granted');
    // }, []);

    // const requestPermissions = useCallback(async () => {
    //     const { status } = await Notifications.requestPermissionsAsync();
    //     const isGranted = status === 'granted';
    //     setHasPermission(isGranted);

    //     if (!isGranted) {
    //         return null;
    //     }

    //     const tokenData = await Notifications.getExpoPushTokenAsync();
    //     setPushToken(tokenData.data);
    //     return tokenData.data;
    // }, []);

    // useEffect(() => {
    //     checkPermissions();
    // }, [checkPermissions]);

    async function registerForPushNotification() {
        let token;
        const {status: existingStatus} = await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if(existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if(finalStatus !== 'granted') {
            alert("Failed to get push token")
        }

        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas?.projectId,
        })

        if(Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync("default",{
                name:'default',
                importance:Notifications.AndroidImportance.MAX,
                vibrationPattern: [0,250,250,250],
                lightColor:'#FF231F7C'
            })
        }

        return token;
    }

    useEffect(()=>{
        registerForPushNotification().then((token)=>{
            setPushToken(token);
        })
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => setNotification(notification));
        responseListener.current = Notifications.addNotificationResponseReceivedListener(resp => console.log(resp));

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        }
    },[])

    return {
        pushToken,
        notification
    };
}

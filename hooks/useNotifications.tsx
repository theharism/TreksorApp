import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

export function useNotifications() {
    const [pushToken, setPushToken] = useState<Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();

    const notificationListener = useRef<Notifications.EventSubscription | null>(null);
    const responseListener = useRef<Notifications.EventSubscription | null>(null);

    useEffect(() => {
        // Set notification handler once
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldPlaySound: true,
                shouldSetBadge: true,
                shouldShowBanner: true,
                shouldShowList: true,
            }),
        });

        async function registerForPushNotification() {
            try {
                // Check existing permissions
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;

                // Request permissions if not granted
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }

                // If permission is still not granted, return null
                if (finalStatus !== 'granted') {
                    console.warn("Push notification permission not granted");
                    return null;
                }

                // Get the push token
                const token = await Notifications.getExpoPushTokenAsync({
                    projectId: Constants.expoConfig?.extra?.eas?.projectId,
                });

                // Set up Android notification channel
                if (Platform.OS === 'android') {
                    await Notifications.setNotificationChannelAsync("default", {
                        name: 'default',
                        importance: Notifications.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: '#FF231F7C'
                    });
                }

                return token;
            } catch (error) {
                console.error("Error registering for push notifications:", error);
                return null;
            }
        }

        // Register for push notifications
        registerForPushNotification()
            .then((token) => {
                if (token) {
                    console.log("Push token obtained:", token.data);
                    setPushToken(token);
                } else {
                    console.warn("Failed to get push token");
                }
            })
            .catch((error) => {
                console.error("Error getting push token:", error);
            });

        // Set up notification listeners
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((resp) => {
            console.log("Notification response:", resp);
        });

        // Cleanup
        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    return {
        pushToken,
        notification
    };
}

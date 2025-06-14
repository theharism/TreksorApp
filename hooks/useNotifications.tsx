import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';

export function useNotifications() {
    const [hasPermission, setHasPermission] = useState(false);
    const [pushToken, setPushToken] = useState<string | null>(null);

    const checkPermissions = useCallback(async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        setHasPermission(existingStatus === 'granted');
    }, []);

    const requestPermissions = useCallback(async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        const isGranted = status === 'granted';
        setHasPermission(isGranted);

        if (!isGranted) {
            alert('Failed to get push token for push notification!');
            return null;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync();
        setPushToken(tokenData.data);
        return tokenData.data;
    }, []);

    useEffect(() => {
        checkPermissions();
    }, [checkPermissions]);

    return {
        hasPermission,
        pushToken,
        requestPermissions,
    };
}

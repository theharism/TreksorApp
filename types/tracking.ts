export interface TrackingItem {
    id: string;
    label: string;
    value: string;
    record?: Record<string, boolean>
}

export interface TrackingCategory {
    id: string;
    title: string;
    percentage: number;
    items: TrackingItem[];
    custom: boolean
}

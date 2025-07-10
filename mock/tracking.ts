import { TrackingCategory } from "@/types/tracking";

export const trackingData: TrackingCategory[] = [
    {
        id: "1",
        title: "Body",
        percentage: 0,
        items: [
            // { id: "1-1", label: "Workouts", value: "" },
            { id: "1-2", label: "Articles Completed", value: "" },
        ],
        custom: false,
    },
    {
        id: "2",
        title: "Mental",
        percentage: 0,
        items: [
            // { id: "2-1", label: "Power Thought Read", value: "" },
            { id: "2-2", label: "Articles Completed", value: "" },
            // { id: "2-3", label: "General Entries", value: "" },
        ],
        custom: false,
    },
    {
        id: "3",
        title: "Spiritual",
        percentage: 0,
        items: [
            // { id: "3-1", label: "Meditations", value: "" },
            { id: "3-2", label: "Articles Read", value: "" },
        ],
        custom: false,
    },
];
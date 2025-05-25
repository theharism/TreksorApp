import { Workout } from "@/types/workout";

export const WorkoutsData: Workout[] = [
  {
    id: "backAndBiceps",
    title: "Day 1",
    description: "Back & Biceps",
    icon: require("@/assets/images/bicep.png"),
    percentage: 60,
    exercises: {
      Back: [
        {
          id: "pull-ups-or-lat-pulldown",
          title: "Pull-Ups or Lat PullDown",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
        {
          id: "barbell-bent-over-rows",
          title: "Barbell Bent-Over Rows",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
        {
          id: "seated-cable-row",
          title: "Seated Cable Row",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
        {
          id: "deadlifts",
          title: "Deadlifts",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
      ],
      Biceps: [
        {
          id: "barbell-bicep-curls",
          title: "Barbell Bicep Curls",
          description: "3 sets x 10-12 reps",
          completed: false,
        },
        {
          id: "hammer-curls",
          title: "Hammer Curls",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
        {
          id: "preacher-curl",
          title: "Preacher Curl",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
      ],
    },
  },
  {
    id: "2",
    title: "Day 2",
    description: "ABS & Legs",
    icon: require("@/assets/images/abs.png"),
    percentage: 60,
    exercises: {
      Back: [
        {
          id: "1",
          title: "Pull-Ups or Lat PullDown",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
      ],
      Biceps: [
        {
          id: "1",
          title: "Barbell Bicep Curls",
          description: "3 sets x 10-12 reps",
          completed: false,
        },
      ],
    },
  },
  {
    id: "3",
    title: "Day 3",
    description: "Chest & Triceps",
    icon: require("@/assets/images/tricep.png"),
    percentage: 60,
    exercises: {
      Back: [
        {
          id: "1",
          title: "Pull-Ups or Lat PullDown",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
      ],
      Biceps: [
        {
          id: "1",
          title: "Barbell Bicep Curls",
          description: "3 sets x 10-12 reps",
          completed: false,
        },
      ],
    },
  },
  {
    id: "4",
    title: "Day 4",
    description: "Rest Day",
    icon: require("@/assets/images/rest.png"),
    percentage: 60,
    exercises: {
      Back: [
        {
          id: "1",
          title: "Pull-Ups or Lat PullDown",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
      ],
      Biceps: [
        {
          id: "1",
          title: "Barbell Bicep Curls",
          description: "3 sets x 10-12 reps",
          completed: false,
        },
      ],
    },
  },
  {
    id: "5",
    title: "Day 5",
    description: "Free Sport",
    icon: require("@/assets/images/sport.png"),
    percentage: 60,
    exercises: {
      Back: [
        {
          id: "1",
          title: "Pull-Ups or Lat PullDown",
          description: "3 sets x 8-10 reps",
          completed: false,
        },
      ],
      Biceps: [
        {
          id: "1",
          title: "Barbell Bicep Curls",
          description: "3 sets x 10-12 reps",
          completed: false,
        },
      ],
    },
  },
];

export const workoutContent = {
  "backAndBiceps": {
    "id": "back-biceps-info",
    "title": "Back and Biceps",
    "videoUrl": "https://www.youtube.com/watch?v=qr1AvisQcV8",
    "stats": {
      "burn": "500 Kcal",
      "time": "20 Min"
    },
    "content": {
      "description": "<p>This workout targets your pulling muscles—primarily the back and biceps. Building these areas not only enhances upper body strength and posture but also improves pulling power and grip. Expect a mix of compound and isolation movements for maximum muscle engagement.</p>",
      "goals": {
        "title": "Goals:",
        "items": [
          "Strengthen upper back, lats, and traps",
          "Increase biceps size and definition",
          "Improve posture and pulling performance"
        ]
      }
    }
  },
  "chestAndTriceps": {
    "id": "chest-triceps-info",
    "title": "Chest and Triceps",
    "videoUrl": "/placeholder.svg?height=300&width=400&query=man doing bench press chest exercise",
    "stats": {
      "burn": "450 Kcal",
      "time": "25 Min"
    },
    "content": {
      "description": "<p>This workout focuses on your pushing muscles—primarily the chest and triceps. These exercises will help build upper body mass, improve pressing strength, and enhance overall upper body power. Perfect combination of compound and isolation movements.</p>",
      "goals": {
        "title": "Goals:",
        "items": [
          "Build chest mass and definition",
          "Strengthen triceps and shoulders",
          "Improve pressing power and stability"
        ]
      }
    }
  },
  "absAndLegs": {
    "id": "abs-legs-info",
    "title": "ABS and Legs",
    "videoUrl": "/placeholder.svg?height=300&width=400&query=person doing squats and core exercises",
    "stats": {
      "burn": "600 Kcal",
      "time": "30 Min"
    },
    "content": {
      "description": "<p>This comprehensive lower body and core workout targets your legs and abdominal muscles. Build functional strength, improve stability, and develop a strong foundation. Combines strength training with core stability for maximum results.</p>",
      "goals": {
        "title": "Goals:",
        "items": [
          "Strengthen legs and glutes",
          "Build core stability and definition",
          "Improve functional movement patterns"
        ]
      }
    }
  }
}


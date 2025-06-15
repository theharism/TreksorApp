import { Workout, WorkoutContent } from "@/types/workout";

export const WorkoutsData: Workout[] = [
  {
    id: "push",
    title: "PUSH",
    description: "Chest, Shoulders, Triceps",
    exercises: [
        {
          id: "barbell-wide-bench-press",
          title: "Barbell Wide Bench Press",
          description: "3-4 sets / 6-10 reps / heavy",
          tip: 'Drive from the elbows — feel the chest lead, not the hands.',
          completed: false,
        },
        {
          id: "cable-middle-fly",
          title: "Cable Middle Fly",
          description: "3-4 sets / 10-15 reps / moderate",
          tip: 'Keep the movement wide and constant — let the tension carve the muscle.',
          completed: false,
        },
        {
          id: "dumbbell-lateral-raises",
          title: "Dumbbell Lateral Raises",
          description: "3-4 sets / 12-15 reps / light to moderate",
          tip: 'Lead with the elbows, not the hands — let the delts do the work.',
          completed: false,
        },
        {
          id: "standing-dumbbell-shoulder-press",
          title: "Standing Dumbbell Shoulder Press",
          description: "3-4 sets / 6-10 reps / moderate to heavy",
          tip: 'Brace your core — stability amplifies strength.',
          completed: false,
        },
        {
          id: 'dumbbell-incline-triceps-extension',
          title: 'Dumbbell Incline Triceps Extension',
          description: '3-4 sets / 10-12 reps / moderate',
          tip: 'Keep your elbows steady — tension comes from precision.',
          completed: false,
        },
        {
          id: 'cable-triceps-pushdown-ez-bar-close-grip',
          title: 'Cable Triceps Pushdown (EZ Bar, Close Grip)',
          description: '3-4 sets / 10-15 reps / moderate',
          tip: 'Lock your elbows in — real strength doesn’t swing.',
          completed: false,
        }
      ],
  },
  {
    id: "pull",
    title: "PULL",
    description: "",
    exercises: [
      {
        id: 'cable-bar-lateral-pulldown',
        title: 'Cable Bar Lateral Pulldown',
        description: '3-4 sets / 8-12 reps / moderate to heavy',
        tip: 'Pull with your elbows — not your hands.',
        completed: false,
      },
      {
        id: 'cable-seated-supine-grip-row',
        title: 'Cable Seated Supine Grip Row',
        description: '3-4 sets / 10-12 reps / moderate',
        tip: 'Squeeze your shoulder blades — feel the back do the work.',
        completed: false,
      },
      {
        id: 'preacher-curl-ez-bar-wide-grip',
        title: 'Preacher Curl EZ Bar (Wide Grip)',
        description: '3-4 sets / 8-10 reps / heavy',
        tip: 'Let the stretch do half the work — don’t rush the return.',
        completed: false,
      },
      {
        id: 'dumbbell-hammer-curl',
        title: 'Dumbbell Hammer Curl',
        description: '3-4 sets / 10-12 reps / moderate',
        tip: 'Keep your grip neutral — let the brachialis do the work.',
        completed: false,
      },
      {
        id: 'captains-chair-leg-raise',
        title: 'Captain’s Chair Leg Raise',
        description: '3-4 sets / 12-15 reps / bodyweight',
        tip: 'Lift from the abs — not by swinging your legs.',
        completed: false,
      },
      {
        id: 'dumbbell-side-bend',
        title: 'Dumbbell Side Bend',
        description: '3-4 sets / 15-20 reps / light',
        tip: 'Keep your spine straight — bend, don’t twist.',
        completed: false,
      },
    ],
  },
  {
    id: "legs",
    title: "LEGS",
    description: "",
    exercises: [
      {
        id: 'seated-leg-curl-machine',
        title: 'Seated Leg Curl Machine',
        description: '3-4 sets / 10-12 reps / moderate',
        tip: 'Keep your back against the pad — and squeeze at the bottom.',
        completed: false,
      },
      {
        id: 'lying-leg-curl-machine',
        title: 'Lying Leg Curl Machine',
        description: '3-4 sets / 10-12 reps / moderate',
        tip: 'Don’t rush the negative — that’s where the growth happens',
        completed: false,
      },
      {
        id: 'dumbbell-rear-lunge-stretch',
        title: 'Dumbbell Rear Lunge Stretch',
        description: '3-4 sets / 8-10 reps / moderate',
        tip: 'Move slow — feel the stretch, not just the reps',
        completed: false,
      },
      {
        id: 'alternate-arm-leg-plank',
        title: 'Alternate Arm-Leg Plank',
        description: '3 sets / 30-45 sec hold / bodyweight',
        tip: 'Lock the movement — stillness is the real test.',
        completed: false,
      },
    ],
  },
];

export const workoutContent: WorkoutContent = {
  "barbell-wide-bench-press": {
    id: "barbell-wide-bench-press-info",
    title: "Barbell Wide Bench Press",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "500 Kcal",
      time: "20 Min"
    },
    content: {
      description: "<p>Maximizes outer chest activation and raw pressing strength. Builds width, density, and upper body presence. Engages shoulders and triceps with every rep.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Build chest size and pressing power",
          "Engage triceps and shoulders in compound lifts",
          "Enhance upper body mass and density"
        ]
      }
    }
  },
  "cable-middle-fly": {
    id: "cable-middle-fly-info",
    title: "Cable Middle Fly",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "300 Kcal",
      time: "15 Min"
    },
    content: {
      description: "<p>Targets the chest with sharp, focused tension. Sculpts shape, symmetry, and muscular control. Enhances definition without overloading the joints.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Isolate chest muscles with controlled movement",
          "Improve symmetry and definition",
          "Protect joints with low-impact resistance"
        ]
      }
    }
  },
  "dumbbell-lateral-raises": {
    id: "dumbbell-lateral-raises-info",
    title: "Dumbbell Lateral Raises",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "250 Kcal",
      time: "15 Min"
    },
    content: {
      description: "<p>Hits the side delts to build width and shoulder presence. Creates a 3D frame and sharp upper body lines. Lightweight, high focus — pure aesthetics.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Increase shoulder width and shape",
          "Improve upper body aesthetics",
          "Target side delts with precision"
        ]
      }
    }
  },
  "standing-dumbbell-shoulder-press": {
    id: "standing-dumbbell-shoulder-press-info",
    title: "Standing Dumbbell Shoulder Press",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "400 Kcal",
      time: "20 Min"
    },
    content: {
      description: "<p>Builds solid shoulder mass and overhead strength. Engages all three deltoid heads with core activation. Demands balance, power, and control.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Enhance shoulder mass and strength",
          "Activate core and stabilize overhead movements",
          "Build pressing endurance and control"
        ]
      }
    }
  },
  "dumbbell-incline-triceps-extension": {
    id: "dumbbell-incline-triceps-extension-info",
    title: "Dumbbell Incline Triceps Extension",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "300 Kcal",
      time: "15 Min"
    },
    content: {
      description: "<p>Targets the long head of the triceps with a deep stretch. Builds arm thickness and muscular control. Best done slow — full range, full tension.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Isolate and grow the triceps",
          "Improve elbow stability and range",
          "Build arm thickness and definition"
        ]
      }
    }
  },
  "cable-triceps-pushdown-ez-bar-close-grip": {
    id: "cable-triceps-pushdown-ez-bar-close-grip-info",
    title: "Cable Triceps Pushdown (EZ Bar, Close Grip)",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "280 Kcal",
      time: "15 Min"
    },
    content: {
      description: "<p>Targets all three triceps heads with clean, controlled reps. Improves shape, strength, and arm definition. Essential for volume and finishing power.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Develop full triceps musculature",
          "Improve pressing power and lockout",
          "Add volume to finish arm workouts"
        ]
      }
    }
  },
  "cable-bar-lateral-pulldown": {
    id: "cable-bar-lateral-pulldown-info",
    title: "Cable Bar Lateral Pulldown",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "420 Kcal",
      time: "20 Min"
    },
    content: {
      description: "<p>Targets the lats to build width and back dominance. Improves posture, pulling strength, and V-shape structure. Controlled movement, full stretch at the top.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Increase back width and size",
          "Enhance lat activation and posture",
          "Build pulling strength for compound lifts"
        ]
      }
    }
  },
  "cable-seated-supine-grip-row": {
    id: "cable-seated-supine-grip-row-info",
    title: "Cable Seated Supine Grip Row",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "380 Kcal",
      time: "18 Min"
    },
    content: {
      description: "<p>Builds mid-back thickness and pulling strength. The supine grip activates lats and biceps together. Great for posture, control, and back detail.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Thicken the mid-back area",
          "Improve biceps and lat synergy",
          "Enhance posture and pulling control"
        ]
      }
    }
  },
  "preacher-curl-ez-bar-wide-grip": {
    id: "preacher-curl-ez-bar-wide-grip-info",
    title: "Preacher Curl EZ Bar (Wide Grip)",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "320 Kcal",
      time: "15 Min"
    },
    content: {
      description: "<p>Isolates the biceps with strict form and deep tension. Wide grip hits the inner head for a fuller look. Ideal for control and clean hypertrophy.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Grow inner biceps peak and control",
          "Improve arm symmetry and size",
          "Build biceps with strict form"
        ]
      }
    }
  },
  "dumbbell-hammer-curl": {
    id: "dumbbell-hammer-curl-info",
    title: "Dumbbell Hammer Curl",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "300 Kcal",
      time: "15 Min"
    },
    content: {
      description: "<p>Builds arm density by targeting the brachialis and forearm. Enhances thickness and functional strength. A foundational move for real-world power.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Strengthen brachialis and forearms",
          "Add arm size and density",
          "Improve grip and real-life pulling strength"
        ]
      }
    }
  },
  "captains-chair-leg-raise": {
    id: "captains-chair-leg-raise-info",
    title: "Captain’s Chair Leg Raise",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "220 Kcal",
      time: "12 Min"
    },
    content: {
      description: "<p>Targets the lower abs with strict, vertical control. Builds core strength and hip flexor mobility. Great for carving the midsection and sharpening form.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Strengthen lower abs",
          "Improve core stability and control",
          "Sharpen midsection aesthetics"
        ]
      }
    }
  },
  "dumbbell-side-bend": {
    id: "dumbbell-side-bend-info",
    title: "Dumbbell Side Bend",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "200 Kcal",
      time: "10 Min"
    },
    content: {
      description: "<p>Targets the obliques for core symmetry and lateral strength. Improves waist control, posture, and trunk stability. Great for tightening the sides and finishing core work.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Strengthen obliques and waist",
          "Enhance trunk stability and rotation control",
          "Improve posture and lateral definition"
        ]
      }
    }
  },
  "seated-leg-curl-machine": {
    id: "seated-leg-curl-machine-info",
    title: "Seated Leg Curl Machine",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "350 Kcal",
      time: "18 Min"
    },
    content: {
      description: "<p>Targets the hamstrings with controlled tension. Improves leg strength, balance, and injury resistance. Builds depth and support behind the legs.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Strengthen hamstrings and reduce injury risk",
          "Improve leg balance and symmetry",
          "Build back-leg definition"
        ]
      }
    }
  },
  "lying-leg-curl-machine": {
    id: "lying-leg-curl-machine-info",
    title: "Lying Leg Curl Machine",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "350 Kcal",
      time: "18 Min"
    },
    content: {
      description: "<p>Isolates the hamstrings with a strong stretch-contraction combo. Builds muscle density and back-leg control. Essential for balance, power, and knee stability.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Isolate and grow hamstrings",
          "Enhance back-leg control and power",
          "Improve knee and hip stability"
        ]
      }
    }
  },
  "dumbbell-rear-lunge-stretch": {
    id: "dumbbell-rear-lunge-stretch-info",
    title: "Dumbbell Rear Lunge Stretch",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "400 Kcal",
      time: "20 Min"
    },
    content: {
      description: "<p>Activates glutes, hamstrings, and hip flexors in one move. Combines strength with mobility and balance. Improves lower-body control and postural alignment.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Build posterior chain strength",
          "Improve mobility and joint function",
          "Enhance balance and postural alignment"
        ]
      }
    }
  },
  "alternate-arm-leg-plank": {
    id: "alternate-arm-leg-plank-info",
    title: "Alternate Arm-Leg Plank",
    videoUrl: "https://www.youtube.com/watch?v=qr1AvisQcV8",
    stats: {
      burn: "220 Kcal",
      time: "12 Min"
    },
    content: {
      description: "<p>Challenges core, stability, and total-body control. Builds deep strength in abs, glutes, and lower back. Sharpens focus and balance under tension.</p>",
      goals: {
        title: "Goals:",
        items: [
          "Strengthen full core and lower back",
          "Improve coordination and control",
          "Build balance through static movement"
        ]
      }
    }
  }
};



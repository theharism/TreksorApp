export const Nutritions = {
  beverages: {
    route: "/body/nutrition/beverage-details",
    backgroundImage: require("@/assets/images/beverages-home.png"),
    headerTitle: "Nutrition Beverages",
    data: [
      {
        id: "elixir-noir",
        name: "ELIXIR NOIR",
        icon: require("@/assets/images/elixir-noir.png"),
        description:
          "A warming blend of spices and tea for wellness and energy",
        backgroundImage: require("@/assets/images/elixir-noir-home.png"),
        ingredients: [
          {
            id: "tea",
            name: "Green Tea or Black Tea",
            measurement: "(1 bag or 1 tsp leaves)",
            category: "base",
          },
          {
            id: "cinnamon",
            name: "Cinnamon",
            measurement: "(1 small stick or ¼ tsp powder)",
            category: "spice",
          },
          {
            id: "turmeric",
            name: "Turmeric",
            measurement: "(¼ tsp)",
            category: "spice",
          },
          {
            id: "ginger",
            name: "Ginger",
            measurement: "(1-2 slices or ½ tsp grated)",
            category: "spice",
          },
          {
            id: "lemon",
            name: "Lemon Juice",
            measurement: "(½ lemon)",
            category: "citrus",
          },
          {
            id: "honey",
            name: "Honey",
            measurement: "(1 tsp, optional)",
            category: "sweetener",
          },
        ],
      },
      {
        id: "electro-boost",
        name: "ELECTRO BOOST",
        icon: require("@/assets/images/electro-boost.png"),
        description:
          "A warming blend of spices and tea for wellness and energy",
        backgroundImage: require("@/assets/images/electro-boost-home.png"),
        ingredients: [
          {
            id: "tea",
            name: "Green Tea or Black Tea",
            measurement: "(1 bag or 1 tsp leaves)",
            category: "base",
          },
          {
            id: "cinnamon",
            name: "Cinnamon",
            measurement: "(1 small stick or ¼ tsp powder)",
            category: "spice",
          },
          {
            id: "turmeric",
            name: "Turmeric",
            measurement: "(¼ tsp)",
            category: "spice",
          },
          {
            id: "ginger",
            name: "Ginger",
            measurement: "(1-2 slices or ½ tsp grated)",
            category: "spice",
          },
          {
            id: "lemon",
            name: "Lemon Juice",
            measurement: "(½ lemon)",
            category: "citrus",
          },
          {
            id: "honey",
            name: "Honey",
            measurement: "(1 tsp, optional)",
            category: "sweetener",
          },
        ],
      },
      {
        id: "green-tonic",
        name: "GREEN TONIC",
        icon: require("@/assets/images/green-tonic.png"),
        description:
          "A warming blend of spices and tea for wellness and energy",
        backgroundImage: require("@/assets/images/green-tonic-home.png"),
        ingredients: [
          {
            id: "tea",
            name: "Green Tea or Black Tea",
            measurement: "(1 bag or 1 tsp leaves)",
            category: "base",
          },
          {
            id: "cinnamon",
            name: "Cinnamon",
            measurement: "(1 small stick or ¼ tsp powder)",
            category: "spice",
          },
          {
            id: "turmeric",
            name: "Turmeric",
            measurement: "(¼ tsp)",
            category: "spice",
          },
          {
            id: "ginger",
            name: "Ginger",
            measurement: "(1-2 slices or ½ tsp grated)",
            category: "spice",
          },
          {
            id: "lemon",
            name: "Lemon Juice",
            measurement: "(½ lemon)",
            category: "citrus",
          },
          {
            id: "honey",
            name: "Honey",
            measurement: "(1 tsp, optional)",
            category: "sweetener",
          },
        ],
      },
    ],
  },
  supplements: {
    backgroundImage: require("@/assets/images/supplements-home.png"),
    headerTitle: "Supplements",
    route: "/body/nutrition/supplement-details",
    data: [
      {
        id: "creatine",
        name: "Creatine",
        backgroundImage:require("@/assets/images/creatine-home.png"),
        description:
          "Creatine is a natural compound that boosts energy in muscles, improving performance in short, intense activities like lifting and sprinting. It helps with strength, muscle growth, and recovery. Creatine is commonly used by athletes and is safe when taken properly.",
        warning: "Note: Consult your Doctor before use Do Not Self-Diagnose",
      },
      {
        id: "omega-3",
        name: "Omega-3",
        backgroundImage:require("@/assets/images/omega-home.png"),
        description:"Omega-3 is a healthy fat essential for heart, brain, and joint health. It reduces inflammation, supports brain function, and helps lower the risk of heart disease. Common sources include fish (like salmon), flaxseeds, and walnuts.",
        warning: "Note: Consult your Doctor before use Do not self-diagnose or self-medicate",
      },
      {
        id: "b12",
        name: "B12",
        backgroundImage:require("@/assets/images/b12-home.png"),
        description:"Vitamin B12 is a vital nutrient that helps keep your nerves, blood cells, and DNA healthy. It also supports energy production and brain function. Found mainly in animal products, B12 deficiency can lead to fatigue, weakness, and nerve problems.",
        warning: "Note: Consult your Doctor before taking any supplement",
      },
    ],
  },
};

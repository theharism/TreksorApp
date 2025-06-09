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
        description: `A nightly ritual for the man who seeks balance from within. 

This blend supports inflammation reduction, calms the nervous system, improves digestion, and prepares the body for deep rest.

Drink it at night, in silence, as a clear sign that you're choosing to focus on yourself.`,
        backgroundImage: require("@/assets/images/elixir-noir-home.png"),
        quantity: "(1 cup)",
        ingredients: [
          {
            id: "turmeric",
            name: "Turmeric",
            measurement: "(1 tsp)",
          },
          {
            id: "black-pepper",
            name: "Black Pepper",
            measurement: "(A Pinch)",
          },
          {
            id: "ashwagandha",
            name: "Ashwagandha Powder",
            measurement: "(1 tsp)",
          },
          {
            id: "ginger",
            name: "Ginger (Fresh or Powder)",
            measurement: "(1 slices or 1 tsp)",
          },
          {
            id: "cinnamon",
            name: "Cinnamon (Stick or Ground)",
            measurement: "(1 tsp)",
          },
          {
            id: "bee-pollen",
            name: "Bee Pollen",
            measurement: "(1.5 tsp)",
          },
          {
            id: "lemon",
            name: "Fresh Lemon Juice",
            measurement: "(a squeeze)",
          },
          {
            id: "water",
            name: "Hot Water",
            measurement: "(To fill the cup)",
          },
        ],
        footNote: `This tea wasn't made to please your taste - it was made to restore you. Let your food be your medicine, and your medicine, your choice.`,
      },
      {
        id: "electro-boost",
        name: "ELECTRO BOOST",
        icon: require("@/assets/images/electro-boost.png"),
        description: `Sugary drinks are over.
Electro Boost is here to replace Gatorade, Powerade, and everything that looks like energy but leaves you dr
ained.
This natural formula hydrates, restores minerals, and keeps your internal system balanced.
Perfect after training or on high-demand days - physically or mentally.`,
        backgroundImage: require("@/assets/images/electro-boost-home.png"),
        quantity: "(500 ml - prepare in a blender)",
        ingredients: [
          {
            id: "watermelon",
            name: "Watermelon",
            measurement: "(1 cup)",
          },
          {
            id: "strawberries",
            name: "Strawberries (Optional)",
            measurement: "(2)",
          },
          {
            id: "black-pepper",
            name: "Black Pepper",
            measurement: "(A Pinch)",
          },
          {
            id: "sea-salt",
            name: "Sea Salt",
            measurement: "(¼ tsp)",
          },
          {
            id: "ginger",
            name: "Ginger",
            measurement: "(1 slice or ½ tsp)",
          },
          {
            id: "lemon",
            name: "Lemon Juice",
            measurement: "(½ lemon)",
          },
          {
            id: "ashwagandha",
            name: "Ashwagandha (Optional)",
            measurement: "(½ tsp)",
          },
        ],
        footNote: "",
      },
      {
        id: "green-tonic",
        name: "GREEN TONIC",
        icon: require("@/assets/images/green-tonic.png"),
        description: `Start the day charged, clean, and sharp.
Green Tonic is a morning ritual designed to activate digestion, alkalize your system, and wake up the mind w
ithout stimulants.
Best taken on an empty stomach, it sets the tone for a focused and grounded day.`,
        backgroundImage: require("@/assets/images/green-tonic-home.png"),
        quantity: "(500 ml - prepare in a blender)",
        ingredients: [
          {
            id: "celery",
            name: "Celery",
            measurement: "(2 stalks)",
          },
          {
            id: "cucumber",
            name: "Cucumber",
            measurement: "(½ cucumber)",
          },
          {
            id: "green-apple",
            name: "Green Apple",
            measurement: "(½ apple)",
          },
          {
            id: "lemon",
            name: "Lemon Juice",
            measurement: "(½ lemon)",
          },
          {
            id: "ginger",
            name: "Fresh ginger",
            measurement: "(1 slices or ½ tsp)",
          },
          {
            id: "water",
            name: "Water",
            measurement: "(250ml)",
          },
        ],
        footNote: `Hydration, detox support, liver activation, improved digestion, mental clarity.
No crashes. Just clean fuel.`,
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
        backgroundImage: require("@/assets/images/creatine-home.png"),
        description:
          "Creatine is a natural compound that boosts energy in muscles, improving performance in short, intense activities like lifting and sprinting. It helps with strength, muscle growth, and recovery. Creatine is commonly used by athletes and is safe when taken properly.",
        warning: "Note: Consult your Doctor before use Do Not Self-Diagnose",
      },
      {
        id: "omega-3",
        name: "Omega-3",
        backgroundImage: require("@/assets/images/omega-home.png"),
        description:
          "Omega-3 is a healthy fat essential for heart, brain, and joint health. It reduces inflammation, supports brain function, and helps lower the risk of heart disease. Common sources include fish (like salmon), flaxseeds, and walnuts.",
        warning:
          "Note: Consult your Doctor before use Do not self-diagnose or self-medicate",
      },
      {
        id: "b12",
        name: "B12",
        backgroundImage: require("@/assets/images/b12-home.png"),
        description:
          "Vitamin B12 is a vital nutrient that helps keep your nerves, blood cells, and DNA healthy. It also supports energy production and brain function. Found mainly in animal products, B12 deficiency can lead to fatigue, weakness, and nerve problems.",
        warning: "Note: Consult your Doctor before taking any supplement",
      },
    ],
  },
};

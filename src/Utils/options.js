const base_reels = [
  [1, 3, 3, 3, 3, 2, 7, 4, 4, 4, 4, 7, 7, 5, 5, 5, 5, 2, 2, 0, 6, 6, 6, 6, 3],

  [1, 7, 5, 7, 5, 5, 5, 2, 6, 2, 6, 6, 6, 6, 3, 0, 3, 3, 3, 7, 4, 7, 4, 4, 4],

  [1, 3, 3, 3, 3, 7, 7, 0, 4, 4, 4, 4, 7, 7, 5, 5, 5, 5, 2, 2, 6, 6, 6, 6, 3],
]

// const base_reels = [
//   [1, 3, 3],

//   [1, 3, 3],

//   [1, 3, 3],
// ]

const pids = {
  SEVENS: 0,
  SEVEN: 1,
  ORANGE: 2,
  BELL: 3,
  PLUM: 4,
  RASPBERRY: 5,
  BAR: 6,
  CHERRY: 7,
}

const coloredPids = {
  SEVENS: "7️⃣7️⃣7️⃣",
  SEVEN: "7️⃣",
  ORANGE: "🍊",
  BELL: "🔔",
  PLUM: "🍈",
  RASPBERRY: "🍇",
  BAR: "🥑",
  CHERRY: "🍒",
  LUCK: "🍀",
}

const gain = {
  SEVENS: 750,
  SEVEN: 200,
  ORANGE: 60,
  BELL: 40,
  PLUM: 40,
  RASPBERRY: 40,
  BAR: 40,
  CHERRY: 5,
}

export default {
  base_reels,
  pids,
  coloredPids,
  gain,
}

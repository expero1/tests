const scoring = [
  {
    name: "Достовірність",
    yes: [1, 2],
    no: [1, 10, 19, 31, 51, 69, 78, 92, 101, 116, 128, 138, 148],
  },

  {
    name: "Поведінкова регуляція",
    yes: [
      4, 6, 7, 8, 11, 12, 15, 16, 17, 18, 20, 21, 28, 29, 30, 36, 37, 39, 40,
      41, 47, 57, 60, 63, 65, 67, 68, 70, 73, 80, 82, 83, 84, 86, 89, 94, 95,
      96, 98, 102, 103, 108, 109, 110, 111, 112, 113, 115, 117, 118, 119, 120,
      122, 123, 124, 125, 127, 129, 131, 135, 136, 137, 139, 143, 146, 149, 153,
      154, 155, 156, 157, 158, 161, 162,
    ],
    no: [
      2, 3, 5, 23, 25, 32, 38, 44, 45, 52, 53, 54, 55, 58, 62, 66, 75, 87, 105,
      132, 134, 140,
    ],
  },
  {
    name: "Комунікативний потенціал",
    yes: [
      9, 24, 27, 43, 46, 61, 64, 81, 88, 90, 99, 104, 106, 114, 121, 126, 133,
      142, 151, 152,
    ],
    no: [26, 34, 35, 48, 49, 74, 85, 107, 130, 144, 147, 159],
  },
  {
    name: "Моральноетична нормативність",
    yes: [
      14, 22, 33, 42, 50, 56, 59, 71, 72, 77, 79, 91, 93, 141, 145, 150, 164,
      165,
    ],
    no: [13, 76, 97, 100, 160, 163],
  },
  {
    name: "Військовопрофесійна спрямованість",
    yes: [
      166, 167, 168, 169, 170, 172, 173, 174, 175, 176, 177, 179, 180, 181, 183,
      184, 185, 186, 187, 188, 190,
    ],
    no: [171, 178, 182, 189],
  },
  {
    name: "Схильність до девіантних форм поведінки",
    yes: [
      6, 9, 14, 15, 22, 36, 39, 42, 47, 50, 56, 59, 71, 72, 91, 93, 117, 127,
      141, 145, 151, 152, 164, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200,
    ],
    no: [13, 100, 163],
  },
  {
    name: "Суїцидальний ризик",
    yes: [
      4, 8, 10, 28, 29, 39, 41, 47, 70, 84, 115, 119, 124, 136, 137, 149, 154,
      155,
    ],
    no: [32, 105],
    description: "DESCRIPTION",
  },
];
const interpretation = {
  Достовірність: [
    {
      min: 0,
      max: 5,
      text: "Висока достовірність",
    },

    {
      min: 6,
      max: 9,
      text: "Достатня достовірність",
    },

    {
      min: 10,
      max: Infinity,
      text: "Результати недостовірні",
    },
  ],
  "Поведінкова регуляція": [
    {
      min: 0,
      max: 4,
      text: "10 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 5,
      max: 5,
      text: "9 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 6,
      max: 8,
      text: "8 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 9,
      max: 12,
      text: "7 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 13,
      max: 18,
      text: "6 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 19,
      max: 26,
      text: "5 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 27,
      max: 34,
      text: "4 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 35,
      max: 45,
      text: "3 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 46,
      max: 56,
      text: "2 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 57,
      max: Infinity,
      text: "1 Стен",
      description: "DESCRIPTION",
    },
  ],
  "Комунікативний потенціал": [
    {
      min: 0,
      max: 5,
      text: "10 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 6,
      max: 6,
      text: "9 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 7,
      max: 8,
      text: "8 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 9,
      max: 10,
      text: "7 Стен",
      description: "DESCRIPTION",
    },

    ,
    {
      min: 11,
      max: 12,
      text: "6 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 13,
      max: 14,
      text: "5 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 15,
      max: 17,
      text: "4 Стен",
      description: "DESCRIPTION",
    },

    ,
    {
      min: 18,
      max: 19,
      text: "3 Стен",
      description: "DESCRIPTION",
    },

    ,
    {
      min: 20,
      max: 22,
      text: "2 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 23,
      max: Infinity,
      text: "1 Стен",
      description: "DESCRIPTION",
    },
  ],
  "Моральноетична нормативність": [
    {
      min: 0,
      max: 3,
      text: "10 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 4,
      max: 4,
      text: "9 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 5,
      max: 6,
      text: "8 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 7,
      max: 7,
      text: "7 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 8,
      max: 9,
      text: "6 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 10,
      max: 11,
      text: "5 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 12,
      max: 13,
      text: "4 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 14,
      max: 15,
      text: "3 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 16,
      max: 16,
      text: "2 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 17,
      max: Infinity,
      text: "1 Стен",
      description: "DESCRIPTION",
    },
  ],
  "Військовопрофесійна спрямованість": [
    {
      min: 0,
      max: 0,
      text: "10 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 1,
      max: 1,
      text: "9 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 2,
      max: 3,
      text: "8 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 4,
      max: 4,
      text: "7 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 5,
      max: 7,
      text: "6 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 8,
      max: 10,
      text: "5 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 11,
      max: 13,
      text: "4 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 14,
      max: 15,
      text: "3 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 16,
      max: 17,
      text: "2 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 18,
      max: 25,
      text: "1 Стен",
      description: "DESCRIPTION",
    },
  ],
  "Схильність до девіантних форм поведінки": [
    {
      min: 0,
      max: 3,
      text: "10 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 4,
      max: 5,
      text: "9 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 6,
      max: 7,
      text: "8 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 8,
      max: 9,
      text: "7 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 10,
      max: 11,
      text: "6 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 12,
      max: 14,
      text: "5 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 15,
      max: 17,
      text: "4 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 18,
      max: 20,
      text: "3 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 21,
      max: 24,
      text: "2 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 25,
      max: Infinity,
      text: "1 Стен",
      description: "DESCRIPTION",
    },
  ],
  "Суїцидальний ризик": [
    {
      min: 0,
      max: 0,
      text: "9 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 1,
      max: 1,
      text: "8 Стен",
      description: "DESCRIPTION",
    },
    {
      min: 2,
      max: 2,
      text: "7 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 3,
      max: 3,
      text: "6 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 4,
      max: 4,
      text: "5 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 5,
      max: 6,
      text: "4 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 7,
      max: 9,
      text: "3 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 10,
      max: 14,
      text: "2 Стен",
      description: "DESCRIPTION",
    },

    {
      min: 15,
      max: Infinity,
      text: "1 Стен",
      description: "DESCRIPTION",
    },
  ],
};

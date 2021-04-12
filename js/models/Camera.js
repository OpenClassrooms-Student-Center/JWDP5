const cameras = [
  {
    "lenses": [
      "35mm 1.4",
      "50mm 1.6"
    ],
    "_id": "5be1ed3f1c9d44000030b061",
    "name": "Zurss 50S",
    "price": 49900,
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "vcam_1.jpg"
  },
  {
    "lenses": [
      "50mm 1.8",
      "60mm 2.8",
      "24-60mm 2.8/4.5"
    ],
    "_id": "5be1ef211c9d44000030b062",
    "name": "Hirsch 400DTS",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "price": 309900,
    "imageUrl": "vcam_2.jpg"
  },
  {
    "lenses": [
      "25mm 4.5"
    ],
    "_id": "5be9bc241c9d440000a730e7",
    "name": "Franck JS 105",
    "price": 209900,
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "vcam_3.jpg"
  },
  {
    "lenses": [
      "50mm 1.7",
      "35mm 1.4"
    ],
    "_id": "5be9c4471c9d440000a730e8",
    "name": "Kuros TTS",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "price": 159900,
    "imageUrl": "vcam_4.jpg"
  },
  {
    "lenses": [
      "50mm 1.4",
      "35mm 1.8",
      "28-200mm 2.8/4.5"
    ],
    "_id": "5be9c4c71c9d440000a730e9",
    "name": "Katatone",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "price": 59900,
    "imageUrl": "vcam_5.jpg"
  }
];

exports.find = () => {
  return new Promise((resolve, reject) => resolve(JSON.parse(JSON.stringify(cameras))));
}

exports.findById = (id) => {
  return new Promise((resolve, reject) =>
    resolve(JSON.parse(JSON.stringify(cameras)).find(camera =>
      camera._id == id)
    )
  );
}
// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  team: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      images: 
        {
          imageFront: {
            type: String,
            required: true,
          },
          imageBack: {
            type: String,
            required: true,
          },
          imageAnimatedFront: {
            type: String,
            required: true,
          },
          imageAnimatedBack: {
            type: String,
            required: true,
          },
        },
      types: {
        type: [String],
        required: true,
      },
      abilities: {
        type: [String],
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   team: [
//     {
//       id: {
//         type: Number,
//         required: true,
//       },
//       name: {
//         type: String,
//         required: true,
//       },
//       hp: {
//         type: Number,
//         required: true,
//       },
//       description: {
//         type: String,
//         required: true,
//       },
//       images: {
//         imageFront: {
//           type: String,
//           required: true,
//         },
//         imageBack: {
//           type: String,
//           required: true,
//         },
//         imageAnimatedFront: {
//           type: String,
//           required: true,
//         },
//         imageAnimatedBack: {
//           type: String,
//           required: true,
//         },
//       },
//       types: {
//         type: [String],
//         required: true,
//       },
//       abilities: [
//         {
//           name: {
//             type: String,
//             required: true,
//           },
//           description: {
//             type: String,
//             required: true,
//           },
//         },
//       ],
//     },
//   ],
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

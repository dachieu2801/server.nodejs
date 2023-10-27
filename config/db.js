const mongoose = require('mongoose');

  // const URI = 'mongodb+srv://ankhieu322:j5GERTe5oUWil3Jn@cluster0.5euclk4.mongodb.net/assign3?retryWrites=true&w=majority'

  async function main() {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECT_URI || 'mongodb://127.0.0.1:27017/assign3');
      console.log('success');

    } catch (err) {
      console.log('connect  failure');
    }
  }

module.exports = { main }


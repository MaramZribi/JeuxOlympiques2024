const { createClient } = require('redis');

// Connection URL as provided
const redisUrl = 'redis://default:g4FlkPtmb6XZJt6wpXRboIUv0lYlOkYI@redis-14201.c99.us-east-1-4.ec2.redns.redis-cloud.com:14201';

const redisClient = createClient({
  url: redisUrl
});

redisClient.on('error', (err) => {
  console.error('Redis error', err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis Cloud');
  } catch (err) {
    console.error('Error connecting to Redis Cloud:', err);
  }
})();

module.exports = redisClient;

var jackrabbit = require('jackrabbit');
var db = require('./db');

var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
var exchange = rabbit.default();

exchange
  .queue({ name: 'product.get' })
  .consume(onProductGet);

function onProductGet(data, reply) {
  console.log('got request for product:', data.id);
  reply( db[data.id] );
}

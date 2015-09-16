var jackrabbit = require('jackrabbit');
var throng = require('throng');
var db = require('./db');
var concurrency = process.env.WEB_CONCURRENCY || 1;

throng(start, { workers: concurrency, lifetime: Infinity });

function start() {
  var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
  var exchange = rabbit.default();

  exchange
    .queue({ name: 'product.get' })
    .consume(onProductGet);

  process.on('SIGTERM', process.exit);

  function onProductGet(data, reply) {
    console.log('got request for product:', data.id);
    reply( db[data.id] );
  }
}

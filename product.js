var jackrabbit = require('jackrabbit');
var db = {
  1: {
    name: "Stuhrling Prestige Men's Watch",
    price: 172.00,
    description: "Rose gold-layered watch featuring croco-grain leather strap and classic dial with date window and logoed second hand",
    image: "http://c.shld.net/rpx/i/s/pi/mp/21875/prod_4632076727?src=http%3A%2F%2Fimages.factoryadvantage.com%2Fcatalog%2Fproducts%2F111%2F1114223562%2Flarge.jpg&d=49c4756428420d1ee8442aeab3715d57557b084f&hei=245&wid=245&op_sharpen=1&qlt=85"
  },
  2: {
    name: "Canarm Rohe 1-Light Pendant",
    price: 50.62,
    description: "Style Rohe 1 Light Mini Pendant in chrome with clear glass shade. Chrome finish - Uses 1 50W GU10 bulb (Not included)",
    image: "http://media-cache-ak0.pinimg.com/736x/1d/25/a4/1d25a405e6aecce75e547708830afaee.jpg"
  },
  3: {
    name: "Kattee Vintage Soft Leather Tote Shoulder Bag",
    price: 99.99,
    description: "This product is made of top quality leather and has that wonderful new leather aroma.",
    image: "http://ecx.images-amazon.com/images/I/81hEfNUj-2L._UY395_.jpg"
  }
};

var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
var exchange = rabbit.default();

exchange
  .queue({ name: 'product.get' })
  .consume(onProductGet);

function onProductGet(data, reply) {
  console.log('got request for product:', data.id);
  reply( db[data.id] );
}

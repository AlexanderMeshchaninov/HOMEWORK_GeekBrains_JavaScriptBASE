function ProductItem(name, price, quantity) {
    
    this.goodsName = name,
    this.goodsPrice = +price,
    this.goodsQuantity = +quantity
}

function Orders(clienName) {

    this.goodsName = "",
    this.goodsPrice = 0,
    this.goodsQuantity = 0,
    this.busketArray = new Array();
    this.clientName = clienName;
    
    this.makeOrder = function(name, price, quantity)
    {
        this.goodsName = name;
        this.goodsPrice = +price;
        this.goodsQuantity = +quantity;

        var newOrder = new ProductItem(this.goodsName, this.goodsPrice, this.goodsQuantity);

        this.busketArray.push(newOrder);
    }

    this.countBusketPrice = function ()
    {
        console.log(`\n[${this.clientName}]\nВаш заказ: \n`);
    
        var totalPrice = 0;
    
        for(var item of this.busketArray)
        {
            var sum = item.goodsPrice * item.goodsQuantity;
    
            totalPrice += sum;
    
            console.log(`\n-${item.goodsName}, количество : ${item.goodsQuantity}X`);
        }
    
        console.log(`\nОбщая стоимость : ${totalPrice} рублей.`);
    }
}

var orderPeter = new Orders("Peter");
orderPeter.makeOrder("Пироженое", 69, 2);
orderPeter.makeOrder("Маффин", 79, 1);
orderPeter.makeOrder("Американо", 149, 2);
orderPeter.makeOrder("Чисбургер", 299, 2);
orderPeter.makeOrder("Coca-cola", 99, 1);

orderPeter.countBusketPrice();

var orderTom = new Orders("Tom");
orderTom.makeOrder("Маффин", 79, 1);
orderTom.makeOrder("Бургер", 149, 1);
orderTom.makeOrder("Капучино", 99, 2);
orderTom.makeOrder("BonAqua", 49, 1);

orderTom.countBusketPrice();

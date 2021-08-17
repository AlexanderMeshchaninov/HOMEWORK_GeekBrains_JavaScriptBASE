//Хоть мы пока не изучали конструкторы, но решил попробовать.
function Goods(name, price, quantity)
{
    this.goodsName = name;
    this.goodsPrice = +price;
    this.goodsQuantity = +quantity;
}

let cake = new Goods("Пироженое", 69, 2);
let muffin = new Goods("Маффин", 79, 1);
let coffeeAmericano = new Goods("Американо", 149, 2);
let cheeseBurger = new Goods("Чисбургер", 299, 2);
let soda = new Goods("Coca-cola", 99, 1);

var busketArray = [cake, muffin, coffeeAmericano, cheeseBurger, soda];

CountBusketPrice(busketArray);

function CountBusketPrice(busketArray)
{
    console.log(`Ваш заказ: \n`);

    var totalPrice = 0;

    for(var item of busketArray)
    {
        var sum = item.goodsPrice * item.goodsQuantity;

        totalPrice += sum;

        console.log(`\n-${item.goodsName}, количество : ${item.goodsQuantity}X`);
    }

    console.log(`\nОбщая стоимость : ${totalPrice} рублей.`);
}


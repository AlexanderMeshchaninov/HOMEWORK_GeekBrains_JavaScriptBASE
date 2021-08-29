const USER_NAME = {
    name: "",
};

const isNameCheckingProccess = {
    check: true,
};

const GOODS_OBJ = {
    imageName: [
    "beverages_bonaqua_1_small.jpg",
    "beverages_cocacola_1_small.jpg",
    "coffee_americano_1_small.jpg",
    "coffee_capuchino_1_small.jpg",
    "choco_muffin_1_small.jpg",
    "muss_cake_1_small.jpg",
    "burgers_cheeseburger_1_small.jpg",
    "burgers_stakeburger_1_small.jpg",
    ],
    productName: [
        "Минеральная вода Бон Аква",
        "Кока-кола классик",
        "Кофе американо",
        "Кофе капучино",
        "Шоколадный маффин",
        "Шоколадное пирожное",
        "Чисбургер",
        "Стейк бургер",
    ],
    productPrice: [
        49,
        69,
        99,
        149,
        79,
        69,
        259,
        299,
    ]
};

const BUSKET_ARRAY = {
    order: [],
};

const NEXT = {
    counter: 0,
};

const PREV = {
    counter: 0,
};

const createSmallImageBlock = () => {
    const smallPictureElement = document.getElementById("small_pic");

    //small image element
    const newSmallImgElement = document.createElement("img");
    newSmallImgElement.className = "small_img";
    smallPictureElement.appendChild(newSmallImgElement);
    
    //product name element
    const newProductNameElement = document.createElement("p");
    smallPictureElement.appendChild(newProductNameElement);
    newProductNameElement.style.textAlign = "center";
    newProductNameElement.className = "product_name_element";

    //price element
    const newPriceElement = document.createElement("p");
    smallPictureElement.appendChild(newPriceElement);
    newPriceElement.style.textAlign = "center";
    newPriceElement.className = "price_element";
};

function buttonStyle(element) {
    element.style.textAlign = "center";
    element.style.fontSize = "10px";
    element.style.marginLeft = "20px";
    element.style.marginRight = "20px";
};

const createButtonsBlock = () => {
        const priceElement = document.querySelector(".buttons_position");

        //left button
        const newLeftButtonElement = document.createElement("button");
        newLeftButtonElement.id = "previous";
        priceElement.appendChild(newLeftButtonElement);
        newLeftButtonElement.innerHTML = "Left";
        buttonStyle(newLeftButtonElement);

        //buy button
        const newBuyButtonElement = document.createElement("button");
        newBuyButtonElement.id = "buy";
        priceElement.appendChild(newBuyButtonElement);
        newBuyButtonElement.innerHTML = "BUY";
        buttonStyle(newBuyButtonElement);

        //right button
        const newRightButtonElement = document.createElement("button");
        newRightButtonElement.id = "next";
        priceElement.appendChild(newRightButtonElement);
        newRightButtonElement.innerHTML = "Right";
        buttonStyle(newRightButtonElement);
};

function busketStyle(element) {
    element.style.textAlign = "right";
    element.style.fontSize = "15px";
};

const showBigImage = (event) => {
    const bigPictureElement = document.getElementById("big_pic");
    bigPictureElement.style.textAlign = "left";

    let smallImageSrc = event.target.src.replace("/small/", "/big/");
    const bigImageSrc = smallImageSrc.replace("_small.jpg", "_big.jpg");

    const newBigImg = document.createElement("img");

    //Задание 1 - проверка на картинку
    bigImageChecker(bigImageSrc);

    newBigImg.src = bigImageSrc;

    bigPictureElement.innerHTML = "";
    bigPictureElement.appendChild(newBigImg);

    setTimeout(() => {
        bigPictureElement.innerHTML = "";
    }, 1500);
};

const imageHandler = () => {
    const imgElement = document.querySelector(".small_img");
    imgElement.addEventListener("click", (event) => {
        if (event.target === imgElement) {
            showBigImage(event);
        }
        return;
    });
};

const bigImageChecker = (bigImageSrc) => {
    const image = new Image();

    image.src = bigImageSrc;

    image.onload = function () {
        console.log(`По адресу: img/images/small/${bigImageSrc} картинка существует`);
    };
    image.onerror = function () {
        alert(`По адресу: img/images/small/${bigImageSrc} картинка не существует`);
    };
};

const navigateImages = (event) => {
    const smallImageElement = document.getElementsByClassName("small_img");
    const productNameElement = document.getElementsByClassName("product_name_element");
    const priceElement = document.getElementsByClassName("price_element");
    const leftButtonElement = document.getElementById("previous");
    const rightButtonElement = document.getElementById("next");

    //"счетчики", так себе решение... Самый хороший вариант конечно двусвязный список, но это не очень просто :-)
    if (event.target === leftButtonElement) {
        //счетчик переключений назад по массиву
        let prev = (PREV.counter--);
        if (prev <= -1) return;

        smallImageElement[0].src = "img/images/small/" + `${GOODS_OBJ.imageName[prev]}`;

        productNameElement[0].innerHTML = GOODS_OBJ.productName[prev];

        priceElement[0].innerHTML = GOODS_OBJ.productPrice[prev] + " руб";
    }
    if (event.target === rightButtonElement) {
        //счетчик переключений вперед по массиву
        let next = (NEXT.counter++ % GOODS_OBJ.imageName.length);
        PREV.counter = next;

        smallImageElement[0].src = "img/images/small/" + `${GOODS_OBJ.imageName[next]}`;

        productNameElement[0].innerHTML = GOODS_OBJ.productName[next];

        priceElement[0].innerHTML = GOODS_OBJ.productPrice[next] + " руб";
    }
    return;
};

const createBusketBlock = () => {
    const busketElement = document.getElementById("busket");

    //[Имя: ] Ваш заказ:
    const newUpperLineElement = document.createElement("p");
    newUpperLineElement.className = "product_head_line";
    busketStyle(newUpperLineElement);

    //Общая сумма:
    const newPriceCountElement = document.createElement("p");
    newPriceCountElement.className = "product_price_count";
    busketStyle(newPriceCountElement);

    busketElement.appendChild(newUpperLineElement);
    busketElement.appendChild(newPriceCountElement);
};

const createOrder = () => {
    const productNameElement = document.getElementsByClassName("product_name_element");
    const priceElement = document.getElementsByClassName("price_element");

    let currentProductName = productNameElement[0].textContent;
    let currentPrice = priceElement[0].textContent.split(" ");
    
    if (currentProductName === "" || currentPrice === "") return;

    let newOrder = new Orders(`${USER_NAME.name}`);
    newOrder.makeOrder(`${currentProductName}`, `${parseInt(currentPrice[0])}`, 1);
    newOrder.countBusketPrice();
};

const buttonsHandler = () => {
    const leftButtonElement = document.getElementById("previous");
    const rightButtonElement = document.getElementById("next");
    const buyButtonElement = document.getElementById("buy");

    addEventListener("click", (event) => {
        if (event.target === leftButtonElement || event.target === rightButtonElement) {
            navigateImages(event);
        }
        if (event.target === buyButtonElement) {
            createBusketBlock();
            createOrder();
        }
        return;
    });
};

function ProductItem(name, price, quantity) {
    this.goodsName = name,
    this.goodsPrice = +price,
    this.goodsQuantity = +quantity
}

function Orders(clienName) {
    this.goodsName = "",
    this.goodsPrice = 0,
    this.goodsQuantity = 0,
    this.clientName = clienName;
    
    this.makeOrder = function(name, price, quantity) {
        this.goodsName = name;
        this.goodsPrice = +price;
        this.goodsQuantity = +quantity;

        let newOrder = new ProductItem(this.goodsName, this.goodsPrice, this.goodsQuantity);

        BUSKET_ARRAY.order.push(newOrder);
    }

    this.countBusketPrice = function () {
        const busketElement = document.getElementById("busket");
        const upperLineElement = document.getElementsByClassName("product_head_line");
        const bottomLineElement = document.getElementsByClassName("product_price_count");

        upperLineElement[0].innerHTML = `\n[${this.clientName}]\nВаш заказ: \n`;
    
        let totalPrice = 0;
    
        const newMiddleLineElement = document.createElement("p");

        busketStyle(newMiddleLineElement);
        
        for(let item of BUSKET_ARRAY.order) {
            let sum = item.goodsPrice * item.goodsQuantity;
    
            totalPrice += sum;
            
            newMiddleLineElement.innerHTML = `\n-${item.goodsName}, количество : ${item.goodsQuantity}X`;
            busketElement.appendChild(newMiddleLineElement);
        }
    
        bottomLineElement[0].innerHTML = `\nОбщая стоимость : ${totalPrice} руб.`;
    }
}

const initialization = () => {
    const inputElement = document.getElementsByClassName("user_input");
    const buttonToRemove = document.getElementsByClassName("button_save");
    if(inputElement[0].value !== "") {
        USER_NAME.name = inputElement[0].value;
        isNameCheckingProccess.check = false;
        buttonToRemove[0].remove();

        createSmallImageBlock();
        createButtonsBlock();

        imageHandler();
        buttonsHandler();
    }
    if(isNameCheckingProccess.check) {
        isNameCheckingProccess.check = false;
        return;
    }
};

window.addEventListener("click", (event) => {
    const buttonSave = document.getElementsByClassName("button_save");
    if(event.target === buttonSave[0]) {
        initialization();
    }
    console.log(event.target);
    return;
});

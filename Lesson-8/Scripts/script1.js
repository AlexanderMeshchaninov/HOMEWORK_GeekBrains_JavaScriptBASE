//Задание 2
if (!("a" in window)) {
    var a = 1;
}
alert(a);
//Полагаю, что underfined потому, что:
//1.переменная a (которую мы проверяем в условии) до этого не определена; 
//2.условие не сработает и выкинет underfined сразу в alert;
//Если заранее определить window.a = "a", то ответ был бы а.

var b = function a(x) {
    x && a(--x);
};
alert("2: " + a);
//Так же, underfined потому, что:
//1.не определен входной параметр (x) для функции b(x);
//2.функция не инициализорована b(x);
//3.(a) в ответе alert не ссылается ни на что.

function a(x) {
    return x * 2;
}
var a;
alert(a);
//С появлением этого кода (поскольку ранее я рассматривал примеры отдельно), тут (а) из неопределенной переменной становится функцией 
//и все что выше (поскольку контекст не разделен между ними), будет показывать фунцию в теле которой (return x * 2;).

function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);
//Тут, по идеи, должно было быть 10, т.к. индекс arguments[2] = 10; попадает на (а) и выводит результат, но прогнав дебагер b взяла не функцию с тремя
//параметрами, а ту что выше (из-за перемешанного контекста) и в итоге ничего не вывелось... Так точно писать в продакш нельзя :-)

function a() {
    alert(this);
}
a.call(null);
//Тут вывод всех результатов будет alert(this), т.к. метод call будет "перенаправлять" то, что у нас в последнем объекте a().
//В последнем примере результат вывода this, как глобального объекта window.

var a = 1, b = 1, c, d;

c = ++a; alert("В префиксной форме значение возвращается сразу поэтому (мы уже получим 1), а потом инкрементируется (+ 1). Результат: " + c);           // 2

d = b++; alert("В постфиксной форме значение сначала возвращается (1), а после второго прохода (если это цикл например) уже инкрементируется на +1. Результат: " + d);           // 1

c = (2+ ++a); alert("Поскольку это один участок кода, то к этому моменту a будет = 3 + 2 = 5. Результат: " + c);      // 5

d = (2+ b++); alert("b++ = 2(постфикс) + 2 = 4. Результат: " + d);      // 4

alert("a = " + a);                    // 3

alert("b = " + b);                    // 3
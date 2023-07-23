const numberDict = {
  0: 'ноль', 1: 'один', 2: 'два', 3: 'три',
  4: 'четыре', 5: 'пять', 6: 'шесть', 7: 'семь',
  8: 'восемь', 9: 'девять', 10: 'десять',
  11: 'одиннадцать', 12: 'двенадцать', 13: 'тринадцать',
  14: 'четырнадцать', 15: 'пятнадцать', 16: 'шестнадцать',
  17: 'семнадцать', 18: 'восемнадцать', 19: 'девятнадцать',
};

const tensDict = {
  2: 'двадцать', 3: 'тридцать', 4: 'сорок', 5: 'пятьдесят',
  6: 'шестьдесят', 7: 'семьдесят', 8: 'восемьдесят', 
  9: 'девяносто',
};

const hundredsDict = {
  1: 'сто', 2: 'двести', 3: 'триста', 4: 'четыреста',
  5: 'пятьсот', 6: 'шестьсот', 7: 'семьсот', 8: 'восемьсот', 9: 'девятьсот',
};

function numberToText(number) {
  let sign = '';
  let numberText = '';

  if (number < 0) {
    sign = 'минус ';
    number = Math.abs(number);
  }

  if (number in numberDict) {
    numberText = numberDict[number];
  } else {
    let hundreds = Math.floor(number / 100);
    let tensUnits = number % 100;
    let tens = Math.floor(tensUnits / 10);
    let units = tensUnits % 10;

    if (hundreds > 0) {
      if (tensUnits in numberDict) {
        numberText = `${hundredsDict[hundreds]} ${numberDict[tensUnits]}`;
      } else {
        numberText = `${hundredsDict[hundreds]} ${tensDict[tens]} ${numberDict[units]}`;
      }
    } else {
      numberText = `${tensDict[tens]} ${numberDict[units]}`;
    }
  }

  return `${sign}${numberText}`;
}

let minValue = parseInt(prompt('Минимальное знание числа для игры','0')) || 0;
    minValue = minValue < -999 ? -999 : minValue; 
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100')) || 100;
    maxValue = maxValue > 999 ? 999 : maxValue; 
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
let questionRandom = Math.round(Math.random() * 2);
let questionPhrase = '';

//С помощью оператора switch выбираем один из 3х вопросов.
switch (questionRandom) {
   case 0:
      questionPhrase = `Вы загадали число ${numberToText(answerNumber)}?`;
      break;
   case 1:
      questionPhrase = `Это ${numberToText(answerNumber)}?`;
      break;
   case 2:
      questionPhrase = `Скорей всего вы загадали ${numberToText(answerNumber)}?`;
      break;
}



document.getElementById('btnRetry').addEventListener('click', function () {
  minValue = parseInt(prompt('Минимальное знание числа для игры', '0')) || 0;
  minValue = minValue < -999 ? -999 : minValue;
  maxValue = parseInt(prompt('Максимальное знание числа для игры', '100')) || 100;
  maxValue = maxValue > 999 ? 999 : maxValue;
  alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
  orderNumber = 1;
  answerNumber = Math.floor((minValue + maxValue) / 2);

  orderNumberField.innerText = orderNumber;

  //Генерируем случайное число от 0 до 2.
let questionRandom = Math.round(Math.random() * 2);
let questionPhrase = '';

//С помощью оператора switch выбираем один из 3х вопросов.
switch (questionRandom) {
   case 0:
      questionPhrase = `Вы загадали число ${numberToText(answerNumber)}?`;
      break;
   case 1:
      questionPhrase = `Это ${numberToText(answerNumber)}?`;
      break;
   case 2:
      questionPhrase = `Скорей всего вы загадали ${numberToText(answerNumber)}?`;
      break;
}
//Вывод вопроса в поле ответа.
answerField.innerText = questionPhrase;
  gameRun = true;
})
document.getElementById('btnOver').addEventListener('click', function () {
  if (gameRun){
    if (minValue <= maxValue){
      minValue = answerNumber  + 1;
      answerNumber = Math.floor((minValue + maxValue) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;
      //Генерируем случайное число от 0 до 2.
let questionRandom = Math.round(Math.random() * 2);
let questionPhrase = '';

//С помощью оператора switch выбираем один из 3х вопросов.
switch (questionRandom) {
   case 0:
      questionPhrase = `Может быть, это число ${numberToText(answerNumber)}?`;
      break;
   case 1:
      questionPhrase = `Верно ли, что вы выбрали число ${numberToText(answerNumber)}`;
      break;
   case 2:
      questionPhrase = `Вы загадали число ${numberToText(answerNumber)}, не так ли?`;
      break;
}

//Вывод вопроса в поле ответа.
answerField.innerText = questionPhrase;
    } else {
      const phraseRandom = Math.round(Math.random() * 2);
      let answerPhrase = '';

      switch (phraseRandom) {
          case 0:
              answerPhrase = `Что-то пошло не так ...`;
              break;
          case 1:
              answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
              break;
          case 2:
              answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
              break;
      }
      answerField.innerText = answerPhrase;           
      gameRun = false;
    }
  }
})

document.getElementById('btnLess').addEventListener('click', function () {
  if (gameRun){
    if (minValue < maxValue){
      maxValue = answerNumber;
      answerNumber = Math.floor((minValue + maxValue) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;

      //Генерируем случайное число от 0 до 2.
      let questionRandom = Math.round(Math.random() * 2);
      let questionPhrase = '';

      //С помощью оператора switch выбираем один из 3х вопросов.
      switch (questionRandom) {
        case 0:
      questionPhrase = `Может быть, это число ${numberToText(answerNumber)}?`;
      break;
        case 1:
      questionPhrase = `Верно ли, что вы выбрали число ${numberToText(answerNumber)}?`;
      break;
        case 2:
      questionPhrase = `Вы загадали число ${numberToText(answerNumber)}, не так ли?`;
      break;
}

//Вывод вопроса в поле ответа.
answerField.innerText = questionPhrase;
    } else {
      const phraseRandom = Math.round(Math.random() * 2);
      let answerPhrase = '';

      switch (phraseRandom) {
          case 0:
              answerPhrase = `Что-то пошло не так ...`;
              break;
          case 1:
              answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
              break;
          case 2:
              answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
              break;
      }
      answerField.innerText = answerPhrase;
      gameRun = false;
    }
  }
})

document.getElementById('btnEqual').addEventListener('click', function () {
  if (gameRun){
      //Генерируем случайное число от 0 до 2.
      let resultRandom = Math.round(Math.random() * 2);
      let resultPhrase = '';
      //С помощью оператора switch выбираем один из 3х вариантов поздравления.
      switch (resultRandom) {
          case 0:
              resultPhrase = 'Я всегда угадываю\n\u{1F60E}';
              break;
          case 1:
              resultPhrase = 'Я снова угадал!\n\u{1F917}';
              break;
          case 2:
              resultPhrase = 'Смог угадать снова!\n\u{1F973}';
              break;
      }
    
      //Вывод фразы в поле ответа.
      answerField.innerText = resultPhrase;
    
      gameRun = false;
  }
})


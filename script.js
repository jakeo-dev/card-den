let index = -1;
let currentSide1Array = [];

let side1Array;
if (typeof JSON.parse(localStorage.getItem('side1Array')) != 'undefined' && JSON.parse(localStorage.getItem('side1Array')) != null) {
    side1Array = JSON.parse(localStorage.getItem('side1Array'));
} else {
    side1Array = [];

}
let side2Array;
if (typeof JSON.parse(localStorage.getItem('side2Array')) != 'undefined' && JSON.parse(localStorage.getItem('side2Array')) != null) {
    side2Array = JSON.parse(localStorage.getItem('side2Array'));
} else {
    side2Array = [];
}

document.getElementById('fullCardsList').innerHTML = localStorage.getItem('fullCardsList');

const textareaHandler = function (e) {
    localStorage.setItem(e.target.parentElement.id + 'Text', e.target.value);
    id = Number(document.getElementById(e.target.parentElement.id + 'Text').id.replace('sideOne', '').replace('sideTwo', '').replace('Text', '')) - 1;
    sideStr = document.getElementById(e.target.parentElement.id + 'Text').id.replace('Text', '').replace(String(id + 1), '');
    if (sideStr == 'sideOne') {
        side1Array.splice(id, 1, e.target.value);
    } else if (sideStr == 'sideTwo') {
        side2Array.splice(id, 1, e.target.value);
    }

    saveList();
}

getCards();

let numCards = document.getElementsByClassName('cardDiv').length / 2;

function addCard() {
    numCards = document.getElementsByClassName('cardDiv').length / 2;
    numCards++;

    div = document.createElement('div');
    div.className = 'fullCardDiv';
    div.id = 'fullCardDiv' + numCards;

    let side1 = document.createElement('div');
    side1.id = 'sideOne' + numCards;
    side1.className = 'cardDiv';
    side1.text = 'New card ' + numCards;
    textarea = document.createElement('textarea');
    textarea.id = side1.id + 'Text';
    textarea.className = 'cardText text-right';
    textarea.value = side1.text;
    textarea.placeholder = 'New card ' + numCards;
    textarea.rows = '2';
    side1.appendChild(textarea);

    localStorage.setItem(side1.id + 'Text', side1.text);
    div.appendChild(side1);
    side1Array.push(side1.text);

    optDiv = document.createElement('div');
    optDiv.className = 'optDiv';

    btn = document.createElement('button');
    icon = document.createElement('i');
    icon.className = 'text-lg fa-solid fa-trash';
    btn.className = 'opt trash';
    btn.ariaLabel = 'Remove card';
    btn.title = 'Remove card';
    btn.appendChild(icon);
    optDiv.appendChild(btn);

    div.appendChild(optDiv);

    let side2 = document.createElement('div');
    side2.id = 'sideTwo' + numCards;
    side2.className = 'cardDiv';
    side2.text = 'New card ' + numCards;
    textarea = document.createElement('textarea');
    textarea.id = side2.id + 'Text';
    textarea.className = 'cardText';
    textarea.value = side2.text;
    textarea.placeholder = 'New card ' + numCards;
    textarea.rows = '2';
    side2.appendChild(textarea);

    localStorage.setItem(side2.id + 'Text', side2.text);
    div.appendChild(side2);
    side2Array.push(side2.text);

    document.getElementById('fullCardsList').appendChild(div);

    let trash = document.getElementsByClassName('trash');
    for (i = 0; i < trash.length; i++) {
        trash[i].onclick = function () {
            clickTrash(this.parentElement.parentElement);
        }
    }

    numCards = document.getElementsByClassName('cardDiv').length / 2;

    document.getElementById(side1.id + 'Text').addEventListener('input', textareaHandler);
    document.getElementById(side2.id + 'Text').addEventListener('input', textareaHandler);

    saveList();
}

function openCard(studyType) {
    document.getElementById('cardModal').classList.remove('fadeIn');
    document.getElementById('cardModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');

    index = -1;

    if (studyType == 0) { // in normal order
        currentSide1Array = side1Array;
    } else if (studyType == 1) { // random order
        currentSide1Array = shuffle(side1Array);
    }
    nextCard();
}

function prevCard() {
    if (index > 0) {
        index--;
        document.getElementById('cardText').innerText = currentSide1Array[index];

        document.getElementById('positionText').innerText = (index + 1) + ' of ' + currentSide1Array.length;
    }
}

function nextCard() {
    if (index < currentSide1Array.length - 1) {
        index++;
        document.getElementById('cardText').innerText = currentSide1Array[index];

        document.getElementById('positionText').innerText = (index + 1) + ' of ' + currentSide1Array.length;
    }
}

function flipCard() {
    if (document.getElementById('cardText').innerText == side1Array[side1Array.indexOf(document.getElementById('cardText').innerText)]) {
        document.getElementById('cardText').innerText = side2Array[side1Array.indexOf(document.getElementById('cardText').innerText)];
    } else {
        document.getElementById('cardText').innerText = currentSide1Array[index];
    }
}

function checkString(str) {
    if (str == '') return 'No text';
    else return str;
}

function shuffle(list) {
    let tempArray = list.slice();
    let finalArray = [];

    for (let i = 0; i < list.length; i++) {
        itemNow = tempArray[Math.floor(Math.random() * tempArray.length)];
        finalArray.push(itemNow);
        tempArray.splice(tempArray.indexOf(itemNow), 1)
    }

    return finalArray;
}

let trash = document.getElementsByClassName('trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        clickTrash(this.parentElement.parentElement);
    }
}

function clickTrash(el) {
    if (confirm('Are you sure you want to delete this card?')) {
        side1Array.splice(side1Array.indexOf(el.getElementsByClassName('cardText')[0].value), 1);
        side2Array.splice(side2Array.indexOf(el.getElementsByClassName('cardText')[1].value), 1);
        el.remove();

        let currentItems = document.getElementsByClassName('cardDiv');
        for (let j = 0; j < currentItems.length; j += 2) {
            side1 = currentItems[j];
            side2 = currentItems[j + 1];

            side1.id = 'sideOne' + ((j / 2) + 1);
            side2.id = 'sideTwo' + ((j / 2) + 1);
            side1.getElementsByClassName('cardText')[0].id = side1.id + 'Text';
            side2.getElementsByClassName('cardText')[0].id = side2.id + 'Text';

            side1.text = document.getElementById(side1.id + 'Text').value;
            side2.text = document.getElementById(side2.id + 'Text').value;
            localStorage.setItem(side1.id + 'Text', side1.text);
            localStorage.setItem(side2.id + 'Text', side2.text);
        }

        numCards = document.getElementsByClassName('cardDiv').length / 2;

        saveList();
    }
}

function getCards() {
    let currentItems = document.getElementsByClassName('cardDiv');
    for (let j = 0; j < currentItems.length; j += 2) {
        side1 = currentItems[j];
        side2 = currentItems[j + 1];

        side1.text = localStorage.getItem(side1.id + 'Text');
        side2.text = localStorage.getItem(side2.id + 'Text');
        document.getElementById(side1.id + 'Text').value = side1.text;
        document.getElementById(side2.id + 'Text').value = side2.text;
        document.getElementById(side1.id + 'Text').addEventListener('input', textareaHandler);
        document.getElementById(side2.id + 'Text').addEventListener('input', textareaHandler);
    }
}

function saveList() {
    localStorage.setItem('fullCardsList', document.getElementById('fullCardsList').innerHTML);
    localStorage.setItem('side1Array', JSON.stringify(side1Array));
    localStorage.setItem('side2Array', JSON.stringify(side2Array));
}

function hide() {
    event.preventDefault();

    document.getElementById('cardModal').classList.add('fadeIn');
    document.getElementById('cardModal').classList.remove('fadeOut');

    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');

    index = -1;
    currentSide1Array = [];
}
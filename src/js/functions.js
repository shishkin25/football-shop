function getDayInfo(str) {
    const [day, month, year] = str.split('.');
    const date = new Date(year, month - 1, day);
    // определение дня недели
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const weekDay = daysOfWeek[date.getDay()];
    // определение номера недели в данном месяце
    let weekNumber = 1;
    const firstDayOfMonth = new Date(year, month - 1, 1);
    let indexOfWeekDays = firstDayOfMonth.getDay();
    let i = 1;
    let currentWeekDay = daysOfWeek[indexOfWeekDays];
    const dayNumber = date.getDate();
    while (i != dayNumber) {
        i++;
        indexOfWeekDays++;
        indexOfWeekDays = indexOfWeekDays == 7 ? 0 : indexOfWeekDays;
        currentWeekDay = daysOfWeek[indexOfWeekDays];
        if (currentWeekDay == 'Понедельник') {
            weekNumber++;
        }
    }
    // определение месяца
    const namesOfMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const monthName = namesOfMonths[date.getMonth()];
    return `${weekDay}, ${weekNumber} неделя ${monthName} ${date.getFullYear()} года`;
}

function changeTheme() {
    document.querySelector('body').classList.toggle('dark-theme');
    document.querySelector('.menu').classList.toggle('black-bg');
    document.querySelectorAll('.menu__item a').forEach((element) => {
        element.classList.toggle('white-color');
        element.parentElement.classList.toggle('white-bg');
    });
    document.querySelector('.menu__burger').classList.toggle('white-bg');
    document.querySelector('.menu__burger span').classList.toggle('white-bg');
    document.querySelector('.menu').classList.toggle('gray-bg');

    document.querySelector('.category').classList.toggle('gray-bg');
    document.querySelectorAll('.good').forEach((card) => {
        card.classList.toggle('box-shadow');
    });

    document.querySelectorAll('.category-list__item a').forEach((element) => {
        element.classList.toggle('white-color');
        element.parentElement.classList.toggle('white-bg');
    });

    document.querySelector('.modal__content').classList.toggle('gray-bg')
    document.querySelectorAll('.btn').forEach((element) => {
        element.classList.toggle('white-color');
        element.classList.toggle('black-bg');
        element.parentNode.classList.toggle('card-bg');
    });
    document.querySelector('.modal__btn-close').classList.toggle('white-color');

    document.querySelectorAll('.page-up img').forEach((pageup) => {
        pageup.classList.toggle('hide');
    });
}

function lockScroll(body, scrollPosition) {
    scrollPosition.value = window.scrollY;
    body.style.top = -scrollPosition.value + 'px';
    body.style.position = 'fixed';
}

function unlockScroll(body, scrollPosition) {
    body.style.top = '';
    body.style.position = '';

    html = document.querySelector('html');
    html.style.scrollBehavior = 'auto';

    window.scrollTo(0, scrollPosition.value);
    html.style.scrollBehavior = 'smooth';
}

function openBurger(menuBurger, body, scrollPosition) {
    menuBurger.classList.toggle('active');
    document.querySelector('.menu__nav').classList.toggle('active');
    lockScroll(body, scrollPosition);
}

function closeBurger(menuBurger, body, scrollPosition) {
    menuBurger.classList.toggle('active');
    document.querySelector('.menu__nav').classList.toggle('active');
    unlockScroll(body, scrollPosition);
}

function closeModal(modal, body, modalForm, modalContainer, message, modalIsOpen, formWasSend, modalGood) {
    if (formWasSend.value) {
        message.remove();
        modalContainer.classList.toggle('hide');
        formWasSend.value = false;
        clearTimeout(timerId);
    }
    modalIsOpen.value = false;
    modalForm.reset();
    
    modal.classList.toggle('hide');
    unlockScroll(body, scrollPosition);

    //удаление информации о товаре после закрытия карточки
    modalGood.remove();
    modalGood.innerHTML = '';
}

function formSubmit(e, modal, modalForm, body, message, modalContainer, formWasSend, modalIsOpen, modalGood) {
    e.preventDefault();
    modalContainer.classList.toggle('hide');
    document.querySelector('.modal__content').appendChild(message);
    formWasSend.value = true;

    timerId = setTimeout(() => {
        if (modalIsOpen.value) {
            closeModal(modal, body, modalForm, modalContainer, message, modalIsOpen, formWasSend, modalGood);
        }
    }, 2000);
}
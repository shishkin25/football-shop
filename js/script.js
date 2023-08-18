//определение даты публикации в нужном формате
document.querySelectorAll('.date__info').forEach((element) => {
    element.textContent = getDayInfo(element.textContent);
});

// переключение темы
document.querySelector('.theme-toggle__switcher input').addEventListener('click', () => {
    setTimeout(() => {
        changeTheme();
    }, 200);
});


const modal = document.querySelector('.modal');
const body = document.querySelector('body');
const modalForm = document.querySelector('.modal__form');
const modalContainer = document.querySelector('.modal__container');
let timerId;
const formWasSend = {
    value: false
};
const modalIsOpen = {
    value: false
};
let burgerIsActive = false;
const scrollPosition = {
    value: 0
}

const modalGood = document.createElement('div');
modalGood.classList.add('modal__good');
//кнопка купить (в карточке товара)
document.querySelectorAll('.good__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        setTimeout(() => {
            //добавление названия конкретного товара в модальное окно (чтобы при нажатии купить было ясно, какой товар оформляется)
            document.querySelector('.modal__good-name').textContent = `${btn.parentElement.querySelector('.good__info').textContent}`;

            modal.classList.toggle('hide');
            lockScroll(body, scrollPosition);
            modalIsOpen.value = true;
        }, 100);
    });
});

modal.addEventListener('click', (e) => {
    //область вне основного модального окна (также происходит закрытие, как и при нажатии на крестик)
    if (e.target === modal) {
        closeModal(modal, body, modalForm, modalContainer, message, modalIsOpen, formWasSend, modalGood);
    }
});

//крестик модального окна (аналог кнопки закрыть)
document.querySelector('.modal__btn-close').addEventListener('click', () => {
    closeModal(modal, body, modalForm, modalContainer, message, modalIsOpen, formWasSend, modalGood);
});

const message = document.createElement('div');
message.classList.add('modal__message');
message.textContent = 'Ваш заказ успешно оформлен!';
modalForm.addEventListener('submit', (e) => {
    formSubmit(e, modal, modalForm, body, message, modalContainer, formWasSend, modalIsOpen, modalGood);
});

//кнопка возврата наверх страницы 
window.addEventListener('scroll', (e) => {
    const pageup = document.querySelector('.page-up')
    if (window.scrollY > 500) {
        pageup.classList.remove('hide');
    } else {
        pageup.classList.add('hide');
    }
});

const menuBurger = document.querySelector('.menu__burger');
menuBurger.addEventListener('click', () => {
    if (!burgerIsActive) {
        openBurger(menuBurger, body, scrollPosition);
        burgerIsActive = true;
    } else {
        closeBurger(menuBurger, body, scrollPosition);
        burgerIsActive = false;
    }
});

let eventHandler = (event) => {
    if (event.target.tagName == "A") {
        closeBurger(menuBurger, body, scrollPosition);
        burgerIsActive = false;
    }
};
const menuList = document.querySelector('.menu__list');
let lastScreenResolutionWasMobile = false;// отвечает за то, что последнее разрешение было мобильным или планшетным

if (window.innerWidth < 768) {
    menuList.addEventListener('click', eventHandler);
    lastScreenResolutionWasMobile = true;
} else {
    menuList.removeEventListener('click', eventHandler);
}

//обработка события resize для того, чтобы при тестировании сайта ничего не сломалось
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        if (!lastScreenResolutionWasMobile) {
            menuList.addEventListener('click', eventHandler);
            lastScreenResolutionWasMobile = true;
        }
    } else {
        menuList.removeEventListener('click', eventHandler);
        lastScreenResolutionWasMobile = false;
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (burgerIsActive) {
            closeBurger(menuBurger, body, scrollPosition);
            burgerIsActive = false;
        }
    }
});
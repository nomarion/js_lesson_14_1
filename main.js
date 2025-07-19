'use strict';

const sliderDataSet = [
    {
        label: "Label 1",
        title: "Title Slide #1",
        text: "Lorem Ipsum is simply dummy text of the printing and " +
            "typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has " +
            "survived not only five centuries",
        customer: "John Jik",
        position: "CEO",
        photo: "./img/1.jpg"
    },
    {
        label: "Label 2",
        title: "Title Slide #2",
        text: "Lorem Ipsum is simply dummy text of the printing and " +
            "typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has " +
            "survived not only five centuries",
        customer: "Kio Mio",
        position: "SEO",
        photo: "./img/2.jpg"
    },
    {
        label: "Label 3",
        title: "Title Slide #3",
        text: "Lorem Ipsum is simply dummy text of the printing and " +
            "typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has " +
            "survived not only five centuries",
        customer: "Mia Martina",
        position: "HR",
        photo: "./img/3.jpg"
    }
];

function initSlider(sliderDataSet) {
    if (sliderDataSet.length > 0) {
        let slideNumber = 0;
        // тело
        const slideBodyEl = creatorElement('div', 'slider-body');
        const slideItemEl = creatorElement('div', 'slider-item', slideBodyEl);
        // стрелка левая
        const arrowLeftEl = creatorElement('div', 'arrow-body');
        arrowLeftEl.classList.add('left');
        arrowLeftEl.innerHTML = '<'
        arrowLeftEl.style.display = 'none';
        // стрелка правая
        const arrowRightEl = creatorElement('div', 'arrow-body');
        arrowRightEl.classList.add('right');
        arrowRightEl.innerHTML = '>'
        slideItemEl.append(arrowLeftEl, arrowRightEl);
        // добавляем точки и следим за кликами
        const slideBodyFooterEl = creatorElement('div', 'slider-footer');
        slideBodyFooterEl.addEventListener('click', (el) => {
            const slideIdDivData = Number.parseInt(el.target.dataset.index);
            if(!isNaN(slideIdDivData)) {
                slideNumber = slideIdDivData;
                arrowHide(slideNumber);
                selectPoint(slideNumber);
                initSlide(sliderDataSet[slideNumber])
            }
        })
        slideBodyEl.append(slideBodyFooterEl);

        for(let i = 0; i < sliderDataSet.length; i++) {
            const slideBodyFooterItem = creatorElement('div', 'slider-footer-item');
            slideBodyFooterItem.dataset.index = String(i);
            if(i === 0) {
                slideBodyFooterItem.classList.add('point-active');
            }
            slideBodyFooterEl.append(slideBodyFooterItem);
        }

        // фото
        const sliderPhotoEl = creatorElement('div', 'slider-photo');
        const sliderThumbEl = document.createElement('img');
        sliderThumbEl.src = sliderDataSet[slideNumber].photo;
        sliderThumbEl.width = 400;
        sliderPhotoEl.append(sliderThumbEl);
        slideItemEl.append(sliderPhotoEl);

        // Текстовка
        const sliderTextBody = creatorElement('div', 'slider-text-block', slideItemEl);

        const labelEl = creatorElement('div', 'slider-label');
        labelEl.textContent = sliderDataSet[slideNumber].label;
        sliderTextBody.append(labelEl);

        const headerEl = creatorElement('div', 'slider-header', sliderTextBody);
        headerEl.textContent = sliderDataSet[slideNumber].title;

        const textEl = creatorElement('div', 'slider-text', sliderTextBody);
        textEl.textContent = sliderDataSet[slideNumber].text;

        const customerEl = creatorElement('div', 'slider-customer', sliderTextBody);
        customerEl.textContent = sliderDataSet[slideNumber].customer;

        const customerPositionEl = creatorElement('div', 'slider-customer-position', sliderTextBody);
        customerPositionEl.textContent = sliderDataSet[slideNumber].position;

        document.body.append(slideBodyEl);

        // клики по стрелкам
        arrowLeftEl.addEventListener('click', () => {
            slideNumber--;
            arrowHide(slideNumber)
            selectPoint(slideNumber);
            initSlide(sliderDataSet[slideNumber]);

        })

        arrowRightEl.addEventListener('click', () => {
            slideNumber++;
            arrowHide(slideNumber)
            selectPoint(slideNumber);
            initSlide(sliderDataSet[slideNumber])
        })
    }
}

// скрываем стрелки при необходимости
function arrowHide(slideNumber) {
    if(!isNaN(slideNumber)) {
        if(slideNumber !== 0 && slideNumber !== sliderDataSet.length - 1) {
            document.querySelector('.arrow-body.left').style.display = '';
            document.querySelector('.arrow-body.right').style.display = '';
        }
        if (slideNumber === 0) {
            document.querySelector('.arrow-body.left').style.display = 'none';
            document.querySelector('.arrow-body.right').style.display = '';
        }
        if (slideNumber === sliderDataSet.length - 1) {
            document.querySelector('.arrow-body.left').style.display = '';
            document.querySelector('.arrow-body.right').style.display = 'none';
        }
    }
}

function selectPoint(slideNumber) {
    document.querySelectorAll('.slider-footer-item').forEach((el) => {
        el.classList.remove('point-active');
    })
    const point = document.querySelector(`.slider-footer-item[data-index="${slideNumber}"]`);
    point.classList.add('slider-footer-item', 'point-active');
}

function initSlide(slide) {
    const sliderThumbEl = document.querySelector('.slider-photo img');
    sliderThumbEl.src = slide.photo;
    const labelText = document.querySelector('.slider-label')
    labelText.textContent = slide.label;
    const titleText = document.querySelector('.slider-header')
    titleText.textContent = slide.title;
    const text = document.querySelector('.slider-text')
    text.textContent = slide.text;
    const customerText = document.querySelector('.slider-customer')
    customerText.textContent = slide.customer;
    const positionText = document.querySelector('.slider-customer-position')
    positionText.textContent = slide.position;
}

function creatorElement(tag, className = null, target = null) {
    const element = document.createElement(tag);
    if(className !== null) {
        element.classList.add(className);
    }
    if(target !== null) {
        target.append(element);
    }
    return element;
}

initSlider(sliderDataSet);

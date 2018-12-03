document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">');

let slider = document.querySelector('.slider');
let sliderWidth = slider.getAttribute('data-width');
let sliderHeight = slider.getAttribute('data-height');

let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("beforeend", leftArrow);

let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("beforeend", rightArrow);

let sliderItem = document.querySelector('.slider-items');
let sliderTape = document.querySelector('.slider-tape');

let images = {
    currentIdx: 0,
    images: [],
    init(arr) {
        this.images = arr;
        this.setImages();
        this.setSizes();
        this.setSizesSliderTape();
    },

    // Метод устанавливает атрибут src картинке
    setImages() {
        // sliderImg.setAttribute('src', this.images[this.currentIdx].src);

        for (let i = 0; i < this.images.length; i++) {
            sliderItem.insertAdjacentHTML("beforeend",
                `<img src="${this.images[i].src}" style="left:${String((this.getSizesSliderTape() / this.images.length) * i)}px">`);
            // let pic = document.querySelector('.slider-item img');
        }
    },

    /**
     * Метод устанавливает размеры слайдера на основе значений
     * data-атрибутов.
     */
    setSizes() {
        if (sliderWidth !== null && sliderWidth !== "") {
            slider.style.width = String(sliderWidth) + "px";
        }
        if (sliderHeight !== null && sliderHeight !== "") {
            slider.style.height = String(sliderHeight) + "px";
        }

        if ((sliderWidth !== null && sliderWidth !== "") && (sliderHeight !== null && sliderHeight !== "")) {
            let pic = document.querySelectorAll('.slider-items img');
            for (let i = 0; i < this.images.length; i++) {
                pic[i].style.width = String(sliderWidth) + "px";
                pic[i].style.height = String(sliderHeight) + "px";
            }
        }
    },

    /**
     * Метод ставит на слайдер изображение, слещующее слева,
     * которое находится в массиве объектов images.
     */
    setNextLeftImage() {
        // let pic = document.querySelectorAll('.slider-items img');
        // pic[this.currentIdx].classList.add('slider-toLeft');
        // if (this.currentIdx === 0) {
        //     this.currentIdx = this.images.length - 1;
        //     setTimeout(pic[this.currentIdx].classList.remove('slider-toLeft'), 1000);
        // } else {
        //     //
        //     this.currentIdx--;
        //     setTimeout(pic[this.currentIdx].classList.remove('slider-toLeft'), 1000);
        // }
        let tapePosition = sliderTape.style.left.substring(0, sliderTape.style.left - 1);
        let timer = 0;
        sliderTape.style.left = setInterval(function () {
            sliderTape.style.left = String(tapePosition  - timer) + "px";
            if (timer <= 900) {
                timer =+ 10;
            }
        }, 20);

    },

    /**
     * Метод ставит на слайдер изображение, слещующее справа,
     * которое находится в массиве объектов images.
     */
    setNextRightImage() {
        // let pic = document.querySelectorAll('.slider-items img');
        // pic[this.currentIdx].classList.add('slider-toRight');
        // if (this.currentIdx === (this.images.length - 1)) {
        //     this.currentIdx = 0;
        //     setTimeout(pic[this.currentIdx].classList.remove('slider-toRight'), 1000);
        // } else {
        //     this.currentIdx++;
        //     setTimeout(pic[this.currentIdx - 1].classList.remove('slider-toRight'), 1000);
        // }
    },

    setSizesSliderTape() {
        sliderTape.style.width = String(this.getSizesSliderTape()) + "px";
    },

    getSizesSliderTape() {
        if (sliderWidth === "") {
             return window.innerWidth * this.images.length;
        } else {
             return sliderWidth * this.images.length;
        }
    }
};

leftArrow.addEventListener('click', function () {
    images.setNextLeftImage();
});

rightArrow.addEventListener('click', function () {
    images.setNextRightImage();
});
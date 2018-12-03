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
    currentIdx: 1,
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

    setNextLeftImage() {
        let tapePosition = sliderTape.style.left.substring(0, sliderTape.style.left.length - 2);
        if (this.currentIdx < 3) {
            sliderTape.style.left = (Number(tapePosition) - 900) + "px";
            this.currentIdx++;
        }

    },

    setNextRightImage() {
        let tapePosition = sliderTape.style.left.substring(0, sliderTape.style.left.length - 2);
        if (this.currentIdx > 1) {
            sliderTape.style.left = (Number(tapePosition) + 900) + "px";
            this.currentIdx--;
        }
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
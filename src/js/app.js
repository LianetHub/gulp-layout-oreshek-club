"use strict";


import { Datepicker } from 'vanillajs-datepicker';
import ru from 'vanillajs-datepicker/locales/ru';
import * as devFunctions from "./modules/functions.js";


Object.assign(Datepicker.locales, ru);


//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}


document.addEventListener("DOMContentLoaded", () => {

    devFunctions.isWebp();
    devFunctions.OS();
    devFunctions.mask();
    devFunctions.beforeSlider();

    // select

    const selects = document.querySelectorAll("select");

    selects?.forEach(select => {
        select.addEventListener("click", function () {
            const parent = this.parentElement;
            parent.classList.toggle("focus");
        });

        select.addEventListener("blur", function () {
            this.parentElement.classList.remove("focus");
        });
    });


    // datepickers

    const datepickers = document.querySelectorAll('input[name="date"]');
    datepickers?.forEach(datepicker => {

        const datepickerInstanse = new Datepicker(datepicker, {
            language: "ru",
        });

    })




    /* event handlers */
    document.addEventListener("click", (e) => {

        const target = e.target;

        if (target.closest('.header__menu-toggler')) {
            document.querySelector('.header')?.classList.add('open-menu')
        }

        if (target.closest('.menu__close')) {
            document.querySelector('.header')?.classList.remove('open-menu')
        }

        if (target.matches('.menu__btn')) {
            target.classList.toggle('active')
            target.nextElementSibling?.classList.toggle('active')
        }

        if (target.matches('.search__btn')) {
            document.querySelector('.search').classList.add('active');
            setTimeout(() => {
                document.querySelector('.search__form-input')?.focus()
            }, 300)
        }

        if (!target.closest('.search') && document.querySelector('.search').classList.contains('active')) {
            document.querySelector('.search').classList.remove('active');
        }


        if (target.matches('.services__tabs-btn')) {
            const tabsContainer = target.closest('.services__tabs');
            const tabs = tabsContainer.querySelectorAll('.services__tabs-btn');
            const contents = document.querySelectorAll('.services__tabs-item');

            const tabIndex = [...tabs].indexOf(target);

            tabs.forEach(tab => tab.classList.remove('active'));
            target.classList.add('active');

            contents.forEach((content, index) => {
                content.classList.toggle('active', index === tabIndex);
            });
        }

    });





    document.querySelector('.search')?.addEventListener('reset', (e) => {
        document.querySelector('.search__form-reset').classList.remove('active');
    });

    document.querySelector('.search__form-input')?.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            document.querySelector('.search__form-reset').classList.add('active');
        } else {
            document.querySelector('.search__form-reset').classList.remove('active');
        }
    });



    // sliders

    if (document.querySelector('.benefits__slider')) {
        getMobileSlider('.benefits__slider', {
            slidesPerView: 1,
            spaceBetween: 27,
            watchSlidesProgress: true,
            pagination: {
                el: '.benefits__pagination',
                clickable: true,
            },
        })
    }

    if (document.querySelector('.gallery__slider')) {
        new Swiper('.gallery__slider .swiper', {
            slidesPerView: 1,
            spaceBetween: 27,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".gallery__next",
                prevEl: ".gallery__prev",
            }
        })
    }

    if (document.querySelector('.specialists__carousel')) {

        new Swiper('.specialists__carousel', {

            spaceBetween: 27,
            watchSlidesProgress: true,
            pagination: {
                el: '.specialists__pagination',
                clickable: true,
            },
            breakpoints: {
                767.98: {
                    slidesPerView: 2,
                },
                991.98: {
                    slidesPerView: 3,
                }
            }
        })
    }

    if (document.querySelector('.specialists__slider')) {

        getMobileSlider('.specialists__slider', {
            slidesPerView: 1,
            spaceBetween: 27,
            watchSlidesProgress: true,
            pagination: {
                el: '.specialists__pagination',
                clickable: true,
            },
        })
    }


    if (document.querySelector('.reviews__slider')) {
        new Swiper('.reviews__slider', {
            slidesPerView: 2,
            spaceBetween: 16,
            watchOverflow: true,
            pagination: {
                el: '.reviews__pagination',
                clickable: true,
            },
            breakpoints: {
                576.78: {
                    slidesPerView: "auto",
                    spaceBetween: 16,
                },
                767.98: {
                    slidesPerView: "auto",
                    spaceBetween: 46,
                }
            }
        })
    }

    if (document.querySelector('.works__slider')) {
        new Swiper('.works__slider', {
            slidesPerView: 1,
            spaceBetween: 21,
            watchOverflow: true,
            pagination: {
                el: '.works__pagination',
                clickable: true,
            },
            breakpoints: {
                767.98: {
                    slidesPerView: 2,
                },
                991.98: {
                    slidesPerView: 3,
                }
            }

        })
    }


    function getMobileSlider(sliderName, options) {

        let init = false;
        let swiper = null;

        function getSwiper() {
            if (window.innerWidth <= 767.98) {
                if (!init) {
                    init = true;
                    swiper = new Swiper(sliderName, options);
                }
            } else if (init) {
                swiper.destroy();
                swiper = null;
                init = false;
            }
        }
        getSwiper();
        window.addEventListener("resize", getSwiper);
    }



    // observer header height
    function updateHeaderHeight() {
        var header = document.querySelector('.header__wrapper');
        var htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

        if (header && htmlFontSize) {
            var headerHeight = header.offsetHeight / htmlFontSize;
            document.body.style.setProperty('--header-height', `${headerHeight}rem`);
        }
    }

    updateHeaderHeight();

    window.addEventListener('resize', updateHeaderHeight);



    document.querySelectorAll('[data-license]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const indexAttr = link.getAttribute('data-license');
            let index = parseInt(indexAttr, 10);

            if (isNaN(index) || index < 1) index = 1;


            const slides = [
                {
                    src: '/img/license.jpg',
                    type: 'image',
                    thumb: '/img/license.jpg',
                },
                {
                    src: '/img/license-back.jpg',
                    type: 'image',
                    thumb: '/img/license-back.jpg',
                }
            ];

            if (index > slides.length) index = 1;

            Fancybox.show(slides, {
                startIndex: index - 1
            });
        });
    });




});


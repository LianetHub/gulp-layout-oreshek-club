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

        // if (target.closest('.header__menu-toggler')) {
        //     document.querySelector('.header')?.classList.add('open-menu')
        // }

        // if (target.closest('.menu__close')) {
        //     document.querySelector('.header')?.classList.remove('open-menu')
        // }

        // if (target.matches('.menu__btn')) {
        //     target.classList.toggle('active')
        //     target.nextElementSibling?.classList.toggle('active')
        // }



        // if (target.matches('.services__tabs-btn')) {
        //     const tabsContainer = target.closest('.services__tabs');
        //     const tabs = tabsContainer.querySelectorAll('.services__tabs-btn');
        //     const contents = document.querySelectorAll('.services__tabs-item');

        //     const tabIndex = [...tabs].indexOf(target);

        //     tabs.forEach(tab => tab.classList.remove('active'));
        //     target.classList.add('active');

        //     contents.forEach((content, index) => {
        //         content.classList.toggle('active', index === tabIndex);
        //     });
        // }

    });



    Fancybox.show([{
        src: "#callback"
    }])




    // sliders


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



    const headerElement = document.querySelector('.header');
    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('scroll');
        } else {
            headerElement.classList.add('scroll');
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);







});


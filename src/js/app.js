"use strict";


import * as devFunctions from "./modules/functions.js";




document.addEventListener("DOMContentLoaded", () => {

    //  init Fancybox
    if (typeof Fancybox !== "undefined" && Fancybox !== null) {
        Fancybox.bind("[data-fancybox]", {
            dragToClose: false,
            closeButton: false,
            on: {
                ready: (fancybox) => {
                    const trigger = fancybox.options.triggerEl;

                    if (trigger && trigger.classList.contains('booking__time')) {


                        const datetime = trigger.dataset.datetime;
                        const price = trigger.dataset.price;
                        const title = trigger.dataset.title;

                        const popup = document.getElementById('booking');

                        if (popup) {
                            const dateInput = popup.querySelector('.quest-date');
                            const priceEl = popup.querySelector('.quest-price');
                            const titleInput = popup.querySelector('.quest-name');

                            const [datePart, timePart] = datetime.split('T');
                            const [year, month, day] = datePart.split('-');

                            const monthsRu = [
                                'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                                'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
                            ];

                            const formattedDate = `${parseInt(day)} ${monthsRu[parseInt(month) - 1]} ${year}, ${timePart}`;


                            if (dateInput) dateInput.value = formattedDate;
                            if (priceEl) priceEl.textContent = `${price} руб.`;
                            if (titleInput) titleInput.value = title;
                        }
                    }
                }
            }
        });
    }




    devFunctions.isWebp();
    devFunctions.OS();
    devFunctions.mask();

    document.querySelectorAll("select")?.forEach(select => {
        select.addEventListener("click", function () {
            const parent = this.parentElement;
            parent.classList.toggle("focus");
        });

        select.addEventListener("blur", function () {
            this.parentElement.classList.remove("focus");
        });
    });


    /* event handlers */
    document.addEventListener("click", (e) => {

        const target = e.target;

        if (target.closest('.header__menu-toggler')) {
            document.querySelector('.header')?.classList.add('open-menu');
            document.body.classList.add('lock');
        }

        if (target.closest('.menu__close') || target.matches('.menu')) {
            document.querySelector('.header')?.classList.remove('open-menu');
            document.body.classList.remove('lock');
        }

        if (target.matches('.widget__toggler')) {
            document.querySelector('.widget')?.classList.toggle('active')
        }




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




    // sliders


    if (document.querySelector('.description__gallery')) {
        getMobileSlider('.description__gallery', {
            spaceBetween: 15,
            slidesPerView: 1.1
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


    // widget animation

    const widget = document.querySelector('.widget');
    if (widget) {
        function toggleWidgetVisibility() {
            if (window.scrollY > window.innerHeight) {
                widget.classList.add('visible');
            } else {
                widget.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', toggleWidgetVisibility);

        toggleWidgetVisibility()
    }






});


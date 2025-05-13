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

        if (target.matches('.booking__filters-btn')) {
            document.querySelectorAll('.booking__filters-btn')?.forEach(bookingFilterBtn => {
                bookingFilterBtn.classList.remove('active');
            })
            target.classList.add('active');
            document.querySelectorAll('[data-title]')?.forEach(titleBlock => {
                titleBlock.dataset.title = target.textContent;
            })

            const spollerBtn = document.querySelector('.booking__spoller');
            if (spollerBtn) {
                spollerBtn.textContent = target.textContent;
                if (spollerBtn.classList.contains('active')) {
                    document.querySelector('.booking__filters-btns')?.slideUp()
                }
                spollerBtn?.classList.remove('active');
            }
        }

        if (target.matches('.booking__spoller')) {
            target.classList.toggle('active');
            target.nextElementSibling.slideToggle()
        }


        if (target.matches('.anti-cafe__tab-btn')) {
            const tabs = document.querySelectorAll('.anti-cafe__tab-btn');
            const contents = document.querySelectorAll('.anti-cafe__tab-content');

            const tabIndex = [...tabs].indexOf(target);

            tabs.forEach(tab => tab.classList.remove('active'));
            target.classList.add('active');

            contents.forEach((content, index) => {
                content.classList.toggle('active', index === tabIndex);
            });
        }



    });




    // sliders


    if (document.querySelector('.description__gallery')) {
        getMobileSlider('.description__gallery', {
            spaceBetween: 15,
            slidesPerView: 1.1
        })
    }

    if (document.querySelectorAll('.videos__slider')) {
        document.querySelectorAll('.videos__slider')?.forEach(slider => {
            new Swiper(slider, {
                slidesPerView: "auto",
                spaceBetween: 15,
                breakpoints: {
                    767.98: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1199.98: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    }
                }
            })
        })
    }

    if (document.querySelectorAll('.gallery__slider')) {
        document.querySelectorAll('.gallery__slider')?.forEach(slider => {
            new Swiper(slider, {
                slidesPerView: "auto",
                spaceBetween: 15,
                breakpoints: {
                    767.98: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1199.98: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    }
                }
            })
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

HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {
    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    const elStyles = window.getComputedStyle(el);

    const elHeight = parseFloat(elStyles.getPropertyValue('height'));
    const elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
    const elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    const elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
    const elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

    const stepHeight = elHeight / duration;
    const stepPaddingTop = elPaddingTop / duration;
    const stepPaddingBottom = elPaddingBottom / duration;
    const stepMarginTop = elMarginTop / duration;
    const stepMarginBottom = elMarginBottom / duration;

    let start;

    function step(timestamp) {
        if (start === undefined) start = timestamp;

        const elapsed = timestamp - start;

        if (isDown) {
            el.style.height = `${stepHeight * elapsed}px`;
            el.style.paddingTop = `${stepPaddingTop * elapsed}px`;
            el.style.paddingBottom = `${stepPaddingBottom * elapsed}px`;
            el.style.marginTop = `${stepMarginTop * elapsed}px`;
            el.style.marginBottom = `${stepMarginBottom * elapsed}px`;
        } else {
            el.style.height = `${elHeight - stepHeight * elapsed}px`;
            el.style.paddingTop = `${elPaddingTop - stepPaddingTop * elapsed}px`;
            el.style.paddingBottom = `${elPaddingBottom - stepPaddingBottom * elapsed}px`;
            el.style.marginTop = `${elMarginTop - stepMarginTop * elapsed}px`;
            el.style.marginBottom = `${elMarginBottom - stepMarginBottom * elapsed}px`;
        }

        if (elapsed >= duration) {
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.marginTop = "";
            el.style.marginBottom = "";
            el.style.overflow = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === "function") callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}
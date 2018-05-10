$.fn.cardStack = function (optionsObj) {



    $(this).addClass("card-slider-wrapper");

    var wrapperWidth = $(this).width();
    var numberOfItems = $(this).children("li").length;

    //MAX WIDTH OF A SINGLE ITEM WILL BE THE TOTAL WIDTH MINUS THE SPACE NEEDED FOR THE REMAINING CADS TO HAVE A MINIMUM BREATHING SPACE
    var minBreathingSpace = 15;
    var maxPossibleWidth = wrapperWidth - (minBreathingSpace * (numberOfItems - 1));

    //DEFINE VARIABLES
    if (optionsObj.speed) {
        var animationTime = optionsObj.speed;
    } else {
        var animationTime = 700;
    };

    if (optionsObj.delay) {
        var slideDelay = optionsObj.delay;
    } else {
        var slideDelay = 3000;
    };

    if (optionsObj.direction) {
        var slideDirection = optionsObj.direction;
    } else {
        var slideDirection = "left";
    };

    if (optionsObj.autoplay) {
        var autoplay = optionsObj.autoplay;
    } else {
        var autoplay = true;
    };


    var sliderWrapper = $(this);
    //var c = 5;
    var e = null;

    var widestItem = 0;
    var tallestItem = 0;
    sliderWrapper.children("li").each(function (f) {
        var itemWidth = $(this).width();
        var itemHeight = $(this).height();
        if (itemWidth > widestItem) {
            widestItem = itemWidth;
        };
        if (itemHeight > tallestItem) {
            tallestItem = itemHeight;
        };
    });

    if (widestItem > maxPossibleWidth) {
        widestItem = maxPossibleWidth;
    };

    $(this).css('width', '100%;');
    $(this).css('height', (tallestItem + 100) + "px");

    var divideCardsWidth = wrapperWidth - widestItem;
    var cardToDivide = numberOfItems - 1;
    var perCardShowWidth = divideCardsWidth / cardToDivide;
    var widthToSlide = widestItem - perCardShowWidth;

    console.log(widestItem);

    sliderWrapper.children("li").each(function (f) {
        var cssObj = {};
        cssObj["width"] = widestItem;
        cssObj[slideDirection] = f * perCardShowWidth;
        cssObj["zIndex"] = 20 - f;

        $(this).css(cssObj);
    });

    function slideToCard(cardIndex) {
        
        
        /* Add a Active class to the current card */
        
        $('.card-slider-wrapper li').removeClass('active');
        sliderWrapper.children("li")[cardIndex].classList.add('active');
        
        if (cardIndex != 0) {
            var cardSlideVal = parseInt($('.card-slider-wrapper').children("li")[cardIndex - 1].style[slideDirection]);


            //IS THE CARD BEFORE THIS IN ITS right MOST POSITION OR NOT
            if (cardSlideVal > (((cardIndex - 1) * perCardShowWidth) - widthToSlide)) {

                /*right = ((cardIndex-1)*30)-320;
                console.log("New right "+right);
                sliderWrapper.children("li").eq(cardIndex-1).stop().animate({
                    right: right + "px"
                    //right: cardIndex * 30 + "px"
                }, animationTime);*/

                /*sliderWrapper.children("li").eq(cardIndex).nextAll().each(function (g) {
                $(this).stop().animate({
                    right: 500 + cardIndex * 30 + g * 30 + "px"
                    }, animationTime)
                });*/
                var prevSlideVal = [];
                sliderWrapper.children("li").eq(cardIndex).prevAll().each(function (g) {
                    var totalCards = sliderWrapper.children("li").eq(cardIndex).prevAll().length;
                    var affectCard = (totalCards - g - 1);
                    prevSlideVal[affectCard] = parseInt($('.card-slider-wrapper').children("li")[affectCard].style[slideDirection]);
                    if (prevSlideVal[affectCard] > ((affectCard * perCardShowWidth) - widthToSlide)) {
                        prevSlideVal[affectCard] = (affectCard * perCardShowWidth) - widthToSlide;
                        var animationObj = {};
                        animationObj[slideDirection] = prevSlideVal[affectCard] + "px";
                        $(this).stop().animate(animationObj, animationTime);
                    };

                });
            };


        };

        //ALWAY TAKE THIS CARD TO ITS ORIGINAL POSITION AND ALSO ALL IT NEXT ELEMENTS TO THEIR ORIGINAL POSITION

        var takeToOriginalPosition = function (card, cardInd) {
            var animateObj = {};
            animateObj[slideDirection] = (cardInd * perCardShowWidth) + "px";
            card.stop().animate(animateObj, animationTime);
        };

        takeToOriginalPosition(sliderWrapper.children("li").eq(cardIndex), cardIndex);
        sliderWrapper.children("li").eq(cardIndex).nextAll().each(function (g) {
            var card = $(this);
            takeToOriginalPosition(card, cardIndex + g + 1);
        });

        /*sliderWrapper.children("li").eq(cardIndex).nextAll().each(function (g) {
            $(this).stop().animate({
                right: 500 + cardIndex * 30 + g * 30 + "px"
            }, animationTime)
        });
        sliderWrapper.children("li").eq(cardIndex).prevAll().each(function (g) {
            $(this).stop().animate({
                right: (cardIndex - g - 1) * 30 + "px"
            }, animationTime)
        })*/
    };

    //DEFINE SLIDING ON HOVER 
    sliderWrapper.children("li").mouseenter(function () {
        var index = sliderWrapper.children("li").index(this);
        currentSlide = index;
        slideToCard(index);
        clearTimeout(autoSlideTimer);
        autoSlide();
    });

    //METHOD SLIDING THE CARDS AUTOMATICALLY
    var currentSlide = 1;

    function autoSlide() {
        autoSlideTimer = setTimeout(function () {
            
            slideToCard(currentSlide);
            currentSlide++
            if (currentSlide >= sliderWrapper.children("li").length) {
                currentSlide = 0
            };
            
            autoSlide();
        }, slideDelay);
    };

    //INITIATE AUTO SLIDING
    if (autoplay) {
        autoSlide();
    };
};

$.fn.accordion = function () {

    $(this).addClass("card-slider-wrapper");
    
    var wrapperWidth = $(this).width();
    var numberOfItems = $(this).children("li").length;
    
    

    var a = $(this);
    var c = 5;
    var e = null;
    
    var widestItem = 0;
    var tallestItem = 0;
    a.children("li").each(function (f) {
        var itemWidth = $(this).width();
        var itemHeight = $(this).height();
        if(itemWidth > widestItem){
            widestItem = itemWidth;
        };
        if(itemHeight > tallestItem){
            tallestItem = itemHeight;
        };
    });
    
    $(this).css('width', '100%;');
    $(this).css('height', (tallestItem+100)+"px");
    
    var divideCardsWidth = wrapperWidth-widestItem;
    var cardToDivide = numberOfItems-1;
    var perCardShowWidth = divideCardsWidth/cardToDivide;
    var widthToSlide = widestItem-perCardShowWidth;
    console.log(perCardShowWidth);
    
    a.children("li").each(function (f) {
        $(this).css({
            "width": widestItem,
            "left": f * perCardShowWidth,
            "zIndex": 20 - f
        });
    });

    function b(f) {
        //if ()
        if (f != 0) {
            var left = parseInt($('.card-slider-wrapper').children("li")[f - 1].style.left);


            //IS THE CARD BEFORE THIS IN ITS LEFT MOST POSITION OR NOT
            if (left > (((f - 1) * perCardShowWidth) - widthToSlide)) {

                /*left = ((f-1)*30)-320;
                console.log("New Left "+left);
                a.children("li").eq(f-1).stop().animate({
                    left: left + "px"
                    //left: f * 30 + "px"
                }, 700);*/

                /*a.children("li").eq(f).nextAll().each(function (g) {
                $(this).stop().animate({
                    left: 500 + f * 30 + g * 30 + "px"
                    }, 700)
                });*/
                var prevLeft = [];
                a.children("li").eq(f).prevAll().each(function (g) {
                    var totalCards = a.children("li").eq(f).prevAll().length;
                    var affectCard = (totalCards - g - 1);
                    prevLeft[affectCard] = parseInt($('.card-slider-wrapper').children("li")[affectCard].style.left);
                    if (prevLeft[affectCard] > ((affectCard * perCardShowWidth) - widthToSlide)) {
                        prevLeft[affectCard] = (affectCard * perCardShowWidth) - widthToSlide;
                        console.log(prevLeft[affectCard]);
                        $(this).stop().animate({
                            left: prevLeft[affectCard] + "px"
                        }, 700);
                    };

                });
            };


        };

        //ALWAY TAKE THIS CARD TO ITS ORIGINAL POSITION AND ALSO ALL IT NEXT ELEMENTS TO THEIR ORIGINAL POSITION
        var takeToOriginalPosition = function (card, cardInd) {
            card.stop().animate({
                left: (cardInd * perCardShowWidth) + "px"
            }, 700);
        };

        takeToOriginalPosition(a.children("li").eq(f), f);
        a.children("li").eq(f).nextAll().each(function (g) {
            var card = $(this);
            takeToOriginalPosition(card, f + g + 1);
        });

        /*a.children("li").eq(f).nextAll().each(function (g) {
            $(this).stop().animate({
                left: 500 + f * 30 + g * 30 + "px"
            }, 700)
        });
        a.children("li").eq(f).prevAll().each(function (g) {
            $(this).stop().animate({
                left: (f - g - 1) * 30 + "px"
            }, 700)
        })*/
    };

    a.children("li").mouseenter(function () {
        var f = a.children("li").index(this);
        c = f;
        b(f);
        clearTimeout(e);
        d()
    });

    function d() {
        e = setTimeout(function () {
            if (c >= a.children("li").length) {
                c = 0
            } else {
                c++
            }
            b(c);
            d()
        }, 5000);
    }
    d()
};

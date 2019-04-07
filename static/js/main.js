$(document).ready(function () {
    let isMenuOpen = false
    let opinions = [
        {
            name: "Marcin Warzybok",
            commemt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam arcu ipsum, elementum in leo ut, eleifend facilisis sapien. Maecenas ut libero ac ligula interdum sagittis. Maecenas sapien diam, venenatis ac suscipit quis, eleifend a tortor. Cras non suscipit tortor. Praesent sodales orci eu enim venenatis, quis semper est molestie. Sed rhoncus ante sed velit fermentum laoreet. Quisque tempus arcu lorem, sed efficitur leo dictum non.",
            image: "./static/content/dowód_osobisty.jpg"
        },
        {
            name: "Dominik Smęda",
            commemt: "Nam arcu ipsum, elementum in leo ut, eleifend facilisis sapien. Maecenas ut libero ac ligula interdum sagittis. Maecenas sapien diam, venenatis ac suscipit quis, eleifend a tortor. Cras non suscipit tortor. Praesent sodales orci eu enim venenatis, quis semper est molestie. Sed rhoncus ante sed velit fermentum laoreet. Quisque tempus arcu lorem, sed efficitur leo dictum non.",
            image: "./static/content/dddd.jpg"
        },
        {
            name: "Michał Walancik",
            commemt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam arcu ipsum, facilisis sapien. Maecenas ut libero ac ligula interdum sagittis. Maecenas sapien diam, venenatis ac suscipit quis, eleifend a tortor. Cras non suscipit tortor. Praesent sodales orci eu enim venenatis, quis semper est molestie. Sed rhoncus ante sed velit fermentum laoreet. Quisque tempus arcu lorem, sed efficitur leo dictum non.",
            image: "./static/content/adult.jpg"
        }
    ]
    let current_feedback = 0


    for (let i = 0; i < opinions.length; i++) {
        let feedbackListItemElement = $("<div>").addClass("feedback__list__item")
        let feedbackListeImageElement = $("<div>").addClass("feedback__list__image")
        $(feedbackListeImageElement).addClass("rounded__image")
        let h4 = $("<h4>")
        $(h4).addClass("call--color")
        $(feedbackListeImageElement).css({
            "background-image": `url('${opinions[i].image}')`
        })
        $(h4).text(opinions[i].name)
        $(feedbackListItemElement).append(feedbackListeImageElement)
        $(feedbackListItemElement).append(h4)
        $(feedbackListItemElement).attr("id", i)
        $(".feedback__list").append(feedbackListItemElement)
    }

    let feedback__image = $("<div>")
    let h2_feedback = $("<h2>")
    let p_feedback = $("<p>")
    $(feedback__image).addClass("feedback__image").addClass("rounded__image")
    $(feedback__image).css({
        "background-image": `url('${opinions[0].image}')`
    })
    $(".feedback__list__item[id=0]").css({
        "background-color": "rgba(214, 214, 214,0.3)"
    })
    $(h2_feedback).addClass("primary--color").text(opinions[0].name)
    $(p_feedback).text(opinions[0].commemt)
    $(".feedback__current").append(feedback__image)
    $(".feedback__current").append(h2_feedback)
    $(".feedback__current").append(p_feedback)


    $("body").on("click", ".feedback__list__item", function () {
        let id = parseInt($(this).attr("id"))
        console.log(id)
        $(".feedback__list__item").css({
            "background-color": "#363636"
        })
        $(this).css({
            "background-color": "rgba(214, 214, 214,0.3)"
        })
        $(".feedback__current h2").text(opinions[id].name)
        $(".feedback__image").css({
            "background-image": `url('${opinions[id].image}')`
        })
        $(".feedback__current p").text(opinions[id].commemt)
        current_feedback = id
    })

    $(".feedback__list__item").on({
        mouseenter: function () {
            $(this).css({
                "background-color": "rgba(214, 214, 214,0.3)"
            })
        },
        mouseleave: function () {
            let id = parseInt($(this).attr("id"))
            if (current_feedback != id) {
                $(this).css({
                    "background-color": "#363636"
                })
            }
        }
    })

    let $win = $(window),
        $hero = $('.hero'),
        $nav = $('nav'),
        $hero_title = $('.hero h1'),
        $hero_call_button = $('.hero .hero__call_button'),
        wasSticky = false
    centerHero({ $win, $hero, $nav, $hero_call_button, $hero_title })
    $(window).on('resize', function () {
        $win = $(this)
        $hero = $('.hero')
        $nav = $('nav')
        $hero_title = $('.hero h1')
        $hero_call_button = $('.hero .hero__call_button')
        centerHero({ $win, $hero, $nav, $hero_call_button, $hero_title })
    })
    function centerHero({ $win, $hero, $nav, $hero_title, $hero_call_button }) {
        let planHeight = $win.height() - $nav.height()
        let realHeroHeight = $hero_call_button.position().top + $hero_call_button.outerHeight(true) - $hero_title.position().top
        console.log(planHeight, realHeroHeight)
        $hero_title.parent().css({ position: 'relative' })
        $hero_title.css({ marginTop: `${(planHeight - realHeroHeight) / 2 - 40}px` })
    }

    // let $menu_icon = $('.menu__icon')
    // $($menu_icon).on('click', function () {
    //     if ($(window).width() <= 1100) {

    //     }
    // })
    $('.hero__section a').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault()
            let hash = this.hash
            document.querySelector(hash).scrollIntoView({
                behavior: 'smooth'
            })
        }
    })

    $('.menu__icon').on("click", function () {
        isMenuOpen = !isMenuOpen
        $('.menu__section').slideToggle("fast")
    })

    $(window).on("resize", function () {
        if ($(window).width() > 1100 && isMenuOpen) {
            $('.menu__section').slideUp("fast")
            isMenuOpen = !isMenuOpen
        }
    })

    $(window).on("scroll", function () {
        stickyNav();
        if (isMenuOpen) {
            $('.menu__section').slideUp("fast")
            isMenuOpen = !isMenuOpen
        }
    })
    var stickyNavTop = $('nav').offset().top;
    let beforeStickyMargin = parseFloat($($hero_title).css("margin-top"))
    let beforeStickyNav = parseFloat($("nav").outerHeight())

    var stickyNav = function () {
        var scrollTop = $(window).scrollTop(); // our current vertical position from the top
        console.log(scrollTop)
        if (scrollTop == 1) {
            $($hero_title).css({
                "margin-top": beforeStickyMargin + beforeStickyNav + "px"
            })

        }

        if (scrollTop > stickyNavTop) {
            $('nav').addClass('sticky');
            //$('.menu__section').style.position = 'fixed'
            $('.menu__section').addClass('sticky')
            $('.menu__section').css({
                top: $('nav').innerHeight() + 'px',
                left: '0'
            })
            $(".nav__logo").attr("src", "./static/content/logo_black.png")
            let asd = $("nav").find("a")
            console.log(asd)
            $("nav").find("a").css({
                "color": "#363636"
            })
            wasSticky = true
            console.log(parseInt($($hero_title).css("margin-top")) + parseInt($($nav).height()))
        } else {
            $('nav').removeClass('sticky');
            $('.menu__section').removeClass('sticky');
            $('.menu__section').css({
                top: '0',
                left: '-20px'
            })
            console.log($($hero_title).css("margin-top"))
            $(".nav__logo").attr("src", "./static/content/logo_white.png")
            $("nav").find("a").css({
                "color": "#FFA63F"
            })
        }
        if (scrollTop == 0 && wasSticky) {
            $($hero_title).css({
                "margin-top": beforeStickyMargin + "px"
            })
        }

    };
    stickyNav();


    let $current__choose = $('.feedback__current--choose')
    let $feedback__list__item = $('.feedback__list__item')

    $($feedback__list__item).on('click', function (e) {
        if (!$(this).hasClass('feedback__current--choose')) {
            $('.feedback__list__item').removeClass('feedback__current--choose')
            $(this).addClass('feedback__current--choose')
        }
    })


})


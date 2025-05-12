// 창 크기 줄였을 때
let thumbItems = $("section.main .left-box .thumb-items");

function handleResize() {
    if (window.innerWidth < 1700) {
        thumbItems.hide();
    } else {
        thumbItems.show();
    }
}

handleResize();

$(window).on('resize', function () {
    handleResize();
});

// 스크롤 시 로고 변경
$(window).scroll(function () {
    let logo = $(".logo p");
    let scrollTop = $(window).scrollTop();
    let section2Scroll = $("section.teamRing").offset().top;
    let section6Scroll = $("section.unicefTeam").offset().top;
    let section10Scroll = $("section.board").offset().top;

    if (scrollTop > section2Scroll && scrollTop < section6Scroll || scrollTop > section10Scroll) {
        logo.css({
            "background-position": "100% 0%"
        });
    } else {
        logo.css({
            "background-position": "0 0"
        });
    }
});

// 캐로셀 
let carouselPrev = $(".carousel-box img.img_people_prev");
let carousel = $(".carousel-box img.img_people_next");
let thumbNext = $(".carousel-thumb-right img");
let thumbPrevs = $(".carousel-thumb-left li img");
let thumbPrev = $(".carousel-thumb-left li:last-child img");
let carouselBar = $("section.main .bar-thumb-group .bar");
const carousel_gallery = $(".carousel-box");
let carouselBarList = $("section.main .bar-thumb-group .bar li");

const carouselList = [
    "img/people06.jpg",
    "img/people07.jpg",
    "img/people08.jpg",
    "img/people09.jpg",
    "img/people10.jpg",
    "img/people11.jpg",
    "img/people12.jpg",
    "img/people13.jpg",
    "img/people14.jpg",
    "img/people15.jpg",
    "img/people16.jpg",
    "img/people17.jpg",
    "img/people01.jpg",
    "img/people02.jpg",
    "img/people03.jpg",
    "img/people04.jpg",
    "img/people05.jpg"
];

// 썸네일
const thumbs = [
    "img/people_thumb06.jpg",
    "img/people_thumb07.jpg",
    "img/people_thumb08.jpg",
    "img/people_thumb09.jpg",
    "img/people_thumb10.jpg",
    "img/people_thumb11.jpg",
    "img/people_thumb12.jpg",
    "img/people_thumb13.jpg",
    "img/people_thumb14.jpg",
    "img/people_thumb15.jpg",
    "img/people_thumb16.jpg",
    "img/people_thumb17.jpg",
    "img/people_thumb01.jpg",
    "img/people_thumb02.jpg",
    "img/people_thumb03.jpg",
    "img/people_thumb04.jpg",
    "img/people_thumb05.jpg"
];

let currentIndex = 0;

// 현재 캐로셀 인덱스로 바 업데이트
function createBar() {
    carouselBar.empty();
    let barSegments = carouselList.length;
    let segmentwidth = 600 / barSegments;

    for (let i = 0; i < carouselList.length; i++) {
        const li = $("<li></li>");
        li.css("width", segmentwidth + "px");
        carouselBar.append(li);
    }

    carouselBarList = carouselBar.find("li");
    carouselBarList.eq(currentIndex).addClass("active");
}

// jquery 의 경우 transform 을 애니메이션으로 직접 지원하지 않음
// 캐로셀 + 썸네일
// 다음 이미지의 경우 hide 후 fade 로 이동하는 느낌 구현
function updateCarousel(index) {
    carouselPrev.attr("src", carouselList[index - 1]).show();

    carousel.fadeOut(800, function () {
        carousel.attr("src", carouselList[index]).fadeIn(800);

        document.getElementById("img_people_next").animate([{
                transform: 'scale(1.15)'
            },
            {
                transform: 'scale(1)'
            }
        ], 800)

        let nextIndex = (index + 1) % carouselList.length;
        thumbNext.attr("src", thumbs[nextIndex]).hide().fadeIn(800);

        updateThumbnailCarousel(index);
    });

    carouselBarList.removeClass("active");
    carouselBarList.eq(index).addClass("active");
}

function updateThumbnailCarousel(currentIndex) {
    let thumbList = $('.carousel-thumb-left ul');
    let prevIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
    let newThumb = $('<li><img src="' + thumbs[prevIndex] + '" alt="이전 썸네일"></li>');

    thumbList.find('li').first().fadeOut(800, function () {
        $(this).remove();
    })

    newThumb.hide().appendTo(thumbList).fadeIn(800);

}

updateCarousel(currentIndex);

// // 자동 캐로셀 플레이
setInterval(function () {
    currentIndex = (currentIndex + 1) % carouselList.length;
    updateCarousel(currentIndex);
}, 5000);

// 이전, 다음 버튼으로 캐로셀 이동
$(".btn-next-thumb").click(function () {
    currentIndex = (currentIndex + 1) % carouselList.length;
    updateCarousel(currentIndex);
});

$(".btn-prev-thumb").click(function () {
    currentIndex = (currentIndex - 1 + carouselList.length) % carouselList.length;
    updateCarousel(currentIndex);
});

createBar();


// 동영상 뮤트 버튼 > api 비동기 로드 후 플레이어 객체 생성 > 버튼 제어
// 페이지 로드 시점에 script 를 불러오고, 플레이어가 준비된 후에 button mute 호출 가능하도록 수정
function videoScript() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    $("script")[0].parentNode.insertBefore(tag, $("script")[0]);
}

videoScript();

let player;
let playerReady = false;

window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('unicefVideo', {
        evevents: {
            'onReady': function (event) {
                playerReady = true;
                event.target.playVideo();
            }
        }
    });
};

let btnToggle = false;

$("section.video .video-wrapper button").on("click", function () {

    if (player && typeof player.mute === 'function') {
        if (btnToggle) {
            player.mute();
            $(this).css('background-position', '120px');
        } else {
            player.unMute();
            $(this).css('background-position', '-600px');
        }
        btnToggle = !btnToggle;
    }
});

// slick
$('.slide-ling').slick({
    slide: 'div',
    rows: 1,
    slidesToShow: 3,
    infinite: true,
    autoplay: true,
    focusOnSelect: true,
    autoplaySpeed: 3000,
    draggable: true,
    pauseOnFocus: true,
    centerMode: true,
    centerPadding: '100px',
    arrows: true,
    dots: true,
    appendDots: $('.dots-container'),
    customPaging: function (slider, i) {
        return '<i class="fa-duotone fa-solid fa-circle"></i>';
    },
    prevArrow: $('.lingModelImage .slide-prev'),
    nextArrow: $('.lingModelImage .slide-next'),
});


let reviewItems = {
    reivew01: {
        img: "/img/sns__doldol_2.jpg",
        id: `@_dooool_2`,
        quote: `친구들이 반지 예쁘다고 어디 꺼냐고 물어볼 때마다 유니세프 후원 반지라고 대답하면 뿌듯함이 배가 된다💖#유니세프 #유니세프팀반지 #IAMUNICEFTEAM #유니세프팀`
    },
    reivew02: {
        img: "/img/sns_parkmihye11.jpg",
        id: `@palllihye11`,
        quote: `#유니세프팀반지 좋은일(3년정도 되는 듯)하고 받은 기부반지 너무 의미있어서 좋으네요 항상 끼고 다녀야겠네요`
    },
    reivew03: {
        img: "/img/sns_congdolnuna.jpg",
        id: `@colllolnuna`,
        quote: `친구랑 같이 유니세프 합류💪 나는 S 친구는 M했는데 원래 내 반지 마냥 사이즈가 잘 맞는다! 반지 마냥 사이즈가 잘 맞는다! 우리가 함께 세상에 기여할 수 있다는 자부심! #유니세프팀반지`
    },
    reivew04: {
        img: "/img/sns_simple.jpg",
        id: `@sidddle`,
        quote: `알러지 걱정했는데 전혀 없다! 기부반지 낀 채로 씻고 운동하고 자고 요즘 내 분신이다! 나도 지켜주고 어린이들도 지켜줘`
    },
    reivew05: {
        img: "/img/sns_leesangmiss.jpg",
        id: `@leddd*ngmiss`,
        quote: `#유니세프 #유니세프팀 #유니세프팀반지 반지가 넘넘 맘에 든다~ 후원 다시 시작~♡`
    },
    reivew06: {
        img: "/img/sns_jung_s2_hyeon.jpg",
        id: `@ju000s2_hyeon`,
        quote: `유니세프 팀 팔찌 이후로 두번 째 후원반지 오늘 도착했네, 예뿌다 #유니세프 #유니세프팀반지 #유니세프팀 #IAMUNICEFTEAM`
    },
    reivew07: {
        img: "/img/sns_cjmirror.jpg",
        id: `@cj000ror`,
        quote: `매일 아침 출근 전, 기부반지를 끼며 느끼는 뿌듯함 내 손에 딱 맞고 편하다! #데일리반지`
    },
    reivew08: {
        img: "/img/sns__raphy_1021.jpg",
        id: `@colllolnuna`,
        quote: `친구랑 같이 유니세프 합류💪 나는 S 친구는 M했는데 원래 내 반지 마냥 사이즈가 잘 맞는다!`
    },
    reivew09: {
        img: "/img/sns_hello.dlwl.jpg",
        id: `@he000.dlwl`,
        quote: `내가 가진 반지들 중 가장 좋아하는 반지 💍 #유니세프 #유니세프팀반지 #IAMUNICEFTEAM #유니세프팀`
    },
    reivew10: {
        img: "/img/sns_julia_lee_abc.jpg",
        id: `@ju000_lee_abc`,
        quote: `💌올해 잘한 일들 중 BEST 1💌 -> '유니세프 팀' 된 일🩷 2024년도 아자아자✨️ #유니세프 #유니세프팀반지 #IAMUNICEFTEAM #유니세프팀`
    },
    reivew11: {
        img: "/img/sns_naengmyeons2.jpg",
        id: `@na000myeons2`,
        quote: `악세서리를 워낙 안 해서 불편할까봐 걱정했는데 편하다! 맨날 맨날 끼고 다녀야지! 유세프 팀임을 늘 기억하게 해주는 #유니세프팀반지`
    }
}

// 리뷰 
let customerReviews = $("section.review .list-review ul");

Object.values(reviewItems).forEach((item, i) => {
    // #해시태그 단어 제외
    const cleanQuote = item.quote.replace(/#[^\s#]+/g, '').trim();

    const targetReview = $(`
        <li class="review">
            <div class="info-customer">
                <p class="id-customer">${item.id}</p>
                <p>${cleanQuote}</p>
            </div>
            <img src="${item.img}" alt="슬라이드반지리뷰${i + 1}">
        </li>
    `);
    customerReviews.append(targetReview);
});

// 고객 정보 마스킹
function maskId(id) {
    return id.slice(0, 3) + '***' + id.slice(6);
}

$(".info-customer .id-customer").each(function () {
    let originalInfo = $(this).text();
    let maskingInfo = maskId(originalInfo);
    $(this).text(maskingInfo);
});


// 리뷰 모달 : 클릭 된 img / li 안 src > 배열 중 일치하는 리뷰 출력
function handleReviewClick(event) {
    const target = $(event.target);
    const isImg = target.is("img");
    const imgEl = isImg ? target : $(event.currentTarget).find("img");
    const imgSrc = imgEl.attr("src");

    if (!imgSrc) return;

    const matchedItem = Object.values(reviewItems).find(item => item.img === imgSrc);
    if (!matchedItem) return;

    const maskedId = maskId(matchedItem.id);
    const dialogReviewContent = $(`
      <div class="dialog-review-img">
          <img src="${matchedItem.img}" alt="${matchedItem.id}">
      </div>
      <div class="info-customer">
          <p class="id-customer">${maskedId}</p>
          <p>${matchedItem.quote}</p>
      </div>
    `);

    $("#dialog .dialog-review-box").html(dialogReviewContent);

    $("#dialog").dialog({
        modal: true,
        width: '1200',
        height: '793',
        open: function () {
            const closeBtn = $(this).parent().find(".ui-dialog-titlebar-close");
            closeBtn.empty().append('<i class="fa-solid fa-xmark"></i>');

            // 모달 슬라이더 강제 랜더링
            setTimeout(() => {
                $(".dialog-review-slider").slick("setPosition");
            }, 10);
        }
    });


    // // 기존 active 제거 > 선택된 이미지에 active 추가 > 매치된 댓글로 이동
    // $(".dialog-review-slider .slick-slide").removeClass("slick-active focus");

    // const matchingSlide = $(".dialog-review-slider .slick-slide").filter(function () {
    //     return $(this).find("img").attr("src") === imgSrc;
    // });

    // matchingSlide.addClass("active-slide focus");

    // const matchedIndex = matchingSlide.data("slick-index");
    // if (matchedIndex !== undefined) {
    //     $(".dialog-review-slider").slick("slickGoTo", matchedIndex);
    // }

}

// 1. 슬릭 슬라이더
$(".slide-review").on("click", ".slick-slide img", handleReviewClick);

// 2. 리뷰 리스트
$("section.review .list-review li.review").on("click", handleReviewClick);


// 3. 모달 이미지 슬라이더
$(".dialog-review-slider").on("click", ".slick-slide img", handleReviewClick);

// 리뷰 슬라이더 
let slideReview = $("section.review .slide-review");
let dialogReviewSlider = $(".dialog-review-slider");


Object.values(reviewItems).forEach((item, i) => {
    const slide = $(`
      <div>
        <img src="${item.img}" alt="슬라이드반지리뷰${i + 1}">
      </div>
    `);
    slideReview.append(slide);
    dialogReviewSlider.append(slide.clone());
});

$('.slide-review').slick({
    slide: 'div',
    rows: 1,
    slidesToShow: 7.5,
    infinite: true,
    autoplay: false,
    focusOnSelect: false,
    draggable: false,
    pauseOnFocus: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="/img/prev_black.svg" alt="이전"></button>',
    nextArrow: '<button type="button" class="slick-next rotated"><img src="/img/prev_black.svg" alt="다음"></button>',
});

$(dialogReviewSlider).slick({
    slide: 'div',
    rows: 1,
    slidesToShow: 7.5,
    infinite: true,
    autoplay: false,
    focusOnSelect: false,
    draggable: false,
    pauseOnFocus: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
});

const signImages = [
    'random_name01@2x.png',
    'random_name02@2x.png',
    'random_name03@2x.png',
    'random_name04@2x.png',
    'random_name05@2x.png',
    'random_name06@2x.png',
    'random_name07@2x.png',
    'random_name08@2x.png',
    'random_name09@2x.png',
    'random_name10@2x.png',
    'random_name11@2x.png',
    'random_name12@2x.png',
    'random_name13@2x.png',
    'random_name14@2x.png',
    'random_name15@2x.png',
    'random_name16@2x.png',
    'random_name17@2x.png',
];

let slideSign = $("section.unicefTeamSign .slide-sign");

signImages.forEach((filename, i) => {
    let slide = $(`
          <img src="img/${filename}" alt="슬라이드사인${i + 1}">
      `);
    slideSign.append(slide);
});


// sign 이미지 
$('.slide-sign').slick({
    slide: 'img',
    rows: 1,
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    fade: true,
    speed: 400,
    cssEase: 'linear',
});

// unicefTeam 이미지 툴팁
$("area").tooltip({
    content: function () {
        const id = $(this).data("tooltip-id");
        const data = tooltipText[id];
        if (!data) return "";

        return `<div class="tooltip-content">
        <img src="${data.img}" />
        <div class="tooltip-text">
          <div class="title-tooltip-text">
            <strong>${data.title}</strong>
            <p>${data.desc}</p>
          </div>
          <p>${data.quote}</p>
        </div>
      </div>`;
    },
    track: true,
    show: {
        effect: "fadeIn",
        duration: 200
    },
    hide: {
        effect: "fadeOut",
        duration: 200
    }
});

// unicefTeam 텍스트 툴팁
let tooltipText = {
    gallery1: {
        img: "/img/people_thumb10.jpg",
        title: `네 옆에 있을게.<br>지켜줄게`,
        desc: `미쓰백 中 / 한지민`,
        quote: `"어린들을 향한 행동이 한 번으로 끝나면 오히려 아이들에게 더 상처가 될 수 있다고 생각이 들더라고요. 그래서 저는 어린아이들을 향한 관심과 사랑이 한 번으로 끝나지 않도록 유니세프 팀으로서 늘 어린이들과 함께하고 싶어요."`
    },
    gallery2: {
        img: "/img/people_thumb14.jpg",
        title: `저 항상 숨기고 살았어요 제 힘.<br>근데 이 힘...<br>제대로 쓰고싶어졌어요`,
        desc: `힘쎈여자 도봉순 中 / 박보영`,
        quote: `"데뷔 후 받은 사랑을 필요한 곳에 흘려보내고 싶어서 10년 전 어린이 기부를 시작했어요. 그동안 숨겨왔는데, 마음을 나누다보니 기부는 혼자 하는 것보다 많은 분들의 관심과
                        사랑이 모아졌을 때 더 큰 힘을 갖는다는 것을 알게 되었어요. 앞으로도 제가 할 수 있는 방법으로 어린이들에게 힘을 더 보태고자 해요."`
    },
    gallery3: {
        img: "/img/people_thumb11.jpg",
        title: `다른 사람의 생각을 이해하는 능력,<br>그게 가장 중요한 능력이야`,
        desc: `무빙 中 / 한효주`,
        quote: `"이제는 작품을 선택할 때 단지 나를 위해서가 아니라 다른 사람들을 생각하게 되더라고요. 작품 선택에도 책임감이 생겼는데, 삶에서도 전세계 모든 어린이들이 한계가 없는 꿈을
                        꾸고 그 꿈을 이룰 수 있는 세상을 만들어 나가는데 도움이 되고 싶어요."`
    },
    gallery4: {
        img: "/img/people_thumb09.jpg",
        title: `언제나 궁금했어요,<br>당신이 꽃을 피우면 얼마나 빛날지.`,
        desc: `작은아씨들 中 / 추자현`,
        quote: `"예전에는 약점이라고 생각한 저의 '눈'이 지금은 깊이 있는 인물을 표현하는 무기가 됐어요. 어린이들도 그 어린 나이에 저마다의 '약점'이라고 생각하는 것들 때문에
                        힘들어하겠죠. 그 약점이 무기가 될 수 있다는 희망을 주는 어른이 되고 싶어요."`
    },
    gallery5: {
        img: "/img/people_thumb08.jpg",
        title: `어른인 척이 아니라,<br>어른이에요.`,
        desc: `이상한 변호사 우영우 中 / 주종혁`,
        quote: `"기적같이 찾아온 좋은 기회들 덕분에 연기를 계속 할 수 있고 또 많은 사랑을 받고 있어요. 이럴수록 더 겸손하게 행동하고, 더 나온 배우가 되어야겠다고 생각해요. 그게 제가 생각하는 진짜 어른이거든요. 또 어른으로서 힘든 상황에 있는 어린이들에게도 기적같은 기회를 선물해주고 싶어요. 제가 받은 것처럼요."`
    },
    gallery6: {
        img: "/img/people_thumb04.jpg",
        title: `새로운 인생을 주는 기회가 되길 바랍니다.`,
        desc: `재심구 中 / 정우`,
        quote: `"어렸을 때와 지금, 연기와 삶을 대하는 태도가 바뀐 것 같아요. 지금은 그때보다 경험도 쌓이고 시야도 넓어지다 보니 주변을 둘러보게 되더라고요. 그렇게 다른 사람들의 상황에 귀 기울이고 함께 했을 때 더 좋은 연기가 나와 저에게도 큰 도움이 돼요. 유니세프 팀이 된 게 저에게도 성장의 기회이죠"`
    },
    gallery7: {
        img: "/img/people_thumb07.jpg",
        title: `내 인생이 괜찮아 질 때가 올 거야`,
        desc: `그해 우리는 中 / 조복래`,
        quote: `"힘든 순간이 있을 때마다 움츠러들어서 아무것도 안하고 있으면 변하는 게 없더라고요. 어린이들한테도 말해주고 싶어요. 낙심하지 않는다면 괜찮아질 때가 온다고 그리고 포기하지 않으면 나아질 수 있는 세상을 함께 만들어주겠다고요."`
    },
    gallery8: {
        img: "/img/people_thumb05.jpg",
        title: `걱정 마십시오.`,
        desc: `미씽2 中 / 정윤재`,
        quote: `"어렸을 때 토요일마다 가족들과 함께 거실에서 영화를 봤어요. 매주 영화를 보면서 배우를 꿈꿨고, 수많은 오디션에서 낙방도 했지만 29살이라는 비교적 늦은 나이에 데뷔할 수 있었습니다. 소년시절의 저처럼 어린 나이에 소중한 꿈을 간직한 어린이들의 조력자가 되고 싶어요. 꿈을 이룰 수 있을지 걱정하기 보다는, 꿈을 향해 계속해서 도전할 수 있도록 말이에요."`
    },
    gallery9: {
        img: "/img/people_thumb01.jpg",
        title: `불가능, 그것은 사실이 아니라 하나의 의견일 뿐이다`,
        desc: `그것만이 내 세상 中 / 이병헌`,
        quote: `"나 혼자 소외된 어린이를 위해 행동한다고 해서 세상이 바뀔 수 없다고 생각할 수 있습니다. 하지만 영화를 사랑하는 사람들이 모여 시너지를 내면 훌륭한 작품이 탄생하는 것 같이, 어린이를 진심으로 사랑하는 사람들이 모인다면 그 영향력이 전 세계에 끼칠 것이라고 확신합니다. 그래서 BH엔터테인먼트는 유니세프 팀으로서 이 자리에 모였습니다."`
    },
    gallery10: {
        img: "/img/people_thumb02.jpg",
        title: `네 순간순간의 선택이 나를 만든 거니까.<br>말했지? 너는 늘 괜찮은 선택을 했고,<br>잘 살아갈 거라고`,
        desc: `나인 中 / 이진욱`,
        quote: `"무언가를 선택할 때 '책임감 있는 행동' 인지 생각해요. 유니세프 팀이 된 것도 그러한 고민 끝에 내린 선택이에요. 소외된 어린이들을 위한 행동으로 책임감 있는 배우, 나아가 어른이 되고자 해요."`
    },
    gallery11: {
        img: "/img/people_thumb13.jpg",
        title: `다만 봄에 씨를 뿌려 가을에 거두어<br>겨울에 배를 끓지 않는 세상을 원할 뿐이옵니다.`,
        desc: `남한산성 中 / 고수`,
        quote: `"제 이름처럼 살려고 노력해요. 높은 '고', 물 '수'인데 예전부터 물 주변에 사람들이 많이 모여 살았잖아요. 사람들과 어우러져서 살라는 의미가 담겨 있는 거죠. 늘 소외된 사람 없이 모두가 어우러져 사는 세상을 꿈꿔요. 그 세상에서는 소외된 어린이들도 꿈을 꾸며 마음껏 자라날수 있겠죠. 유니세프 팀과 함께 그런 세상을 만들어나가고 싶어요."`
    },
    gallery12: {
        img: "/img/people_thumb03.jpg",
        title: `아이의 숫자는 수십, 수만인데<br아이를 받아줄 센터가<br>동네 노래방보다 적다는 게 말이 됩니까`,
        desc: `미쓰백 中 / 이희준`,
        quote: `"코로나 팬데믹 때 한참 일을 못 했어요. 온전히 아이와 함께 시간 을 보내게 됐죠. 그런데 그 때 체감했어요. 그 시기에 보호자가 옆 에 있어주지도 못하는 아이들이 너무 많더라고요. 너무나도 어린 나이에 생사에 기로에 놓여있는 어린이들을 위해 유니세프 팀이 되어 목소리를 내고 싶어요."`
    },
    gallery13: {
        img: "/img/people_thumb04.jpg",
        title: `생각을 행동해야 생각이 현실이 된다`,
        desc: `양자물리학 中 / 박해수`,
        quote: `"전 세계에 '선한 영향력'을 전하는 배우가 되고 싶어요. '선한 영향력'에 대해 말하는 게 부끄럽기도 하지만, 말하다 보면 더 노력하게 되고, 노력하다 보면 현실이 될 수 있다고 믿어요. 혼자만의 믿음이 아니라 함께하는 믿음이라면 더 빠르게 현실이 될 수 있겠죠."`
    },
    gallery14: {
        img: "/img/people_thumb16.jpg",
        title: `제 삶도 언젠가 빛이 날까요?`,
        desc: `벌새 中 / 박지후`,
        quote: `"엄마한테 '나 이 일이 너무 좋아'라고 기쁨의 눈물을 흘리면서 얘기한 적이 있어요. 엄마, 감독님과 같은 수많은 어른들이 제 연기를 응원해준 덕분에 지금은 배우라는 꿈에 확신을 가지고 성장하고 있어요. 저도 저와 같은 어린이들이 꿈을 이루게 도와줄 수 있는 어른이 되고 싶어요. 꿈을 이루는 빛나는 순간을 모든 어린이가 경험할 수 있도록 말이에요."`
    },
    gallery15: {
        img: "/img/people_thumb06.jpg",
        title: `제가 뭘 원하는지도 모르는데<br>미래가 결정된 삶을 살고 싶지 않아요`,
        desc: `금수저 中 / 정채연`,
        quote: `"항상 내가 정말 원하는 게 무엇인지 생각하고 그걸 향해 달려가려고 노력해요. 그리고 모든 어린이들도 그럴 수 있었으면 해요. 다 각자 꿈이 있고 원하는 게 있고 또 그걸 이뤄낼 권리가 있잖아요. 유니세프 팀으로서 어린이들에게 미래에 대한 기대를 알려주고 경험하게 해주고 싶어요."`
    },
    gallery16: {
        img: "/img/people_thumb12.jpg",
        title: `혼자였던 내 일상에 와줘서 고마워`,
        desc: `너뿐이개 中 / 홍화연`,
        quote: `"교육공학과라는 전공과 완전히 다른 배우라는 길을 선택하면서 불안의 연속이었어요. 하지만 좋은 감독님, 동료 배우님들과 함께하면서 마음의 여유가 조금씩 생기더라고요. 저도 유니세프 팀이 되어 혼자라고 생각하며 절망하고 있는 어린이들 옆에서 함께 하고 싶어요."`
    },
    gallery17: {
        img: "/img/people_thumb15.jpg",
        title: `저 세상에 가서 얘기해요.<br>우린 고통 받았다고 울었다고 괴로웠다고요.`,
        desc: `드라이브 마이 카 中 / 박유림`,
        quote: `"수어를 사용하는 역할을 연기하며 장애를 가지고 살아가 어린이들에게 관심을 가지게 됐어요. 단지 '입'이 아닌 '수 의사표현할 뿐인데 너무 많은 제약이 그 어린이들을 좌절 만들더라고요. 유니세프는 전 세계 장애 어린이의 권리를 또 그 어린이들이 마음껏 참여할 수 있는 사회를 만들고 제가 꿈꾸는 사회이기도 하죠. 그래서 저는 유니세프 팀이에요."`
    }

}

$('.slider-unicefCard').slick({
    rows: 1,
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="/img/prev.svg" alt="이전"></button>',
    nextArrow: '<button type="button" class="slick-next rotated"><img src="/img/next.svg" alt="다음"></button>',
    dots: true,
    customPaging: function (slider, i) {
        return '<button type="button" class="slick-dots"><i class="fa-solid fa-circle"></i></button>';
    },
});

// 게시판
$("#accordion1, #accordion2, #accordion3").accordion({
    collapsible: true,
    event: "click",
    icons: {
        header: "board-btn-close",
        activeHeader: "board-btn-open"
    }
});

let list = $('.contents-board');
let tilte = $(".title-board li");
list.hide();
$('#accordion1').show();

tilte.on('click', function () {
    tilte.removeClass("active");
    list.hide();
    $(this).addClass("active");
    var index = $(this).index();
    var selectedAccordion = $('.contents-board').eq(index);
    selectedAccordion.show();
});
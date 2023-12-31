"use strict";

/*===== クッキー登録 =====*/
function setCookie(name, value, days) {
  var date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/*===== クッキーを取得 =====*/
function getCookie(name) {
  var value = "; " + document.cookie; // 全てのクッキーの文字列を取得し、先頭に"; "を追加
  var parts = value.split("; " + name + "="); // クッキーの文字列を分割し、指定された名前の前にある部分と後ろにある部分を配列に格納
  if (parts.length === 2) {
    return parts.pop().split(";").shift(); // 名前が見つかった場合、その値を取得し返します
  } else {
    return ""; // 名前が見つからなかった場合、空の文字列を返します
  }
}

/*===== オープニングアニメーション =====*/
var animation = document.querySelector(".js-op-animation");
var mask = document.querySelector(".js-op-animation-mask");
var title1 = document.querySelector(".js-op-animation-title1-block");
var title2 = document.querySelector(".js-op-animation-title2-block");
var imgLeft = document.querySelector(".js-op-animation-left");
var imgRight = document.querySelector(".js-op-animation-right");
var animationTl = gsap.timeline({
  defaults: {
    duration: 1
  }
});

/*===== アニメーション再生 =====*/
function playAnimation() {
  // タイムライン
  animationTl.to(title1, {
    scale: 1,
    autoAlpha: 1
  }).to(title1, {
    autoAlpha: 0
  }).to(imgLeft, {
    y: 0,
    autoAlpha: 1
  }, ">=.3").to(imgRight, {
    y: 0,
    autoAlpha: 1
  }, "<").to(title2, {
    autoAlpha: 1
  }).to(animation, {
    autoAlpha: 0,
    duration: 1.5,
    ease: "power4.inOut"
  }, "+=1");
}
// オープニングアニメーションに関わる要素を非表示
function hideAnimation() {
  gsap.set(".js-op-animation", {
    autoAlpha: 0
  });
}

/*===== mvスライダー =====*/
//オープニングアニメーションが 有・なし で、始まるタイミングをズラしたい。
function mvSwiper() {
  new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    speed: 2000
  });
}
// まず最初に読み込まれる所
document.addEventListener("DOMContentLoaded", function () {
  var animationPlayed = getCookie("animationPlayed");
  if (animationPlayed) {
    hideAnimation();
    mvSwiper();
  } else {
    playAnimation();
    setCookie("animationPlayed", "true", 1);
    setTimeout(function () {
      mvSwiper();
      //スライダーのズラした時間
    }, 6000);
  }
});

/*===== スクロール =====*/
//リンク先の位置調整
$(function () {
  var headH = $(".js-header").outerHeight();
  var animeSpeed = 500;
  var urlHash = location.hash; //URLのハッシュタグを取得
  if (urlHash) {
    //ハッシュタグが有る場合
    $("body,html").scrollTop(0);
    setTimeout(function () {
      //無くてもいいが有ると動作が安定する
      var target = $(urlHash);
      var position = target.offset().top - headH - 150; //ヘッダーから100px下の位置
      $("body,html").stop().animate({
        scrollTop: position
      }, animeSpeed);
    }, 0);
  }
});

/*===== page-top =====*/
//スクロールした時に処理を実行
window.addEventListener("scroll", function () {
  //トップへ戻るボタンを取得
  var topBtn = document.querySelector(".js-footer-top-btn");

  //画面上部からトップビジュアル下の位置取得
  var topVisual = document.querySelector(".js-mv").getBoundingClientRect().bottom;

  //トップビジュアル下の位置より下にスクロールされたらactiveクラウを付与
  if (topVisual <= 0) {
    topBtn.classList.add("is-active");
  } else {
    //スクロールが200px未満のときactiveクラスを外す
    topBtn.classList.remove("is-active");
  }
  //ドキュメントの高さ
  var scrollHeight = document.body.clientHeight;

  //スクロール位置
  var scrollPosition = window.pageYOffset;

  //windowの高さ
  var windowHeignt = window.innerHeight;

  //footer取得
  var footer = document.querySelector("footer");

  //footerの高さ
  var footerHeight = footer.offsetHeight;
  if (scrollHeight - scrollPosition - windowHeignt <= footerHeight) {
    topBtn.classList.add("is-stop");
  } else {
    topBtn.classList.remove("is-stop");
  }
});

/*===== ハンバーガーボタン =====*/
var hamburger = document.querySelector(".js-hamburger");
var modal = document.querySelector(".js-modal");
hamburger.addEventListener("click", toggleModal);
function toggleModal() {
  document.body.classList.toggle("is-active");
  hamburger.classList.toggle("is-active");
  modal.classList.toggle("is-active");
}

/*===== page-price =====*/
var navLists = document.querySelectorAll(".js-nav-list-price a");
navLists.forEach(function (navList) {
  navList.addEventListener("click", toggleModal);
});

/*===== 画像アニメーション =====*/
var triggers = document.querySelectorAll(".js-trigger");
triggers.forEach(function (trigger) {
  var images = trigger.querySelectorAll(".js-trigger img");
  //タイムラインでスクロールトリガーを定義
  var imagesTl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "top 90%"
    }
  });
  imagesTl.to(trigger, {
    "--clippath": "inset(0 0 0 0%)",
    duration: 0.7
  }).to(images, {
    clipPath: "inset(0 0 0 0%)"
  });
});

/*===== Campaignスライダー =====*/
var swiper1 = new Swiper(".js-campaign-swiper-container", {
  loop: true,
  // デフォルトはfalse
  autoplay: {
    // 自動再生
    delay: 2000,
    // 1秒後に次のスライド（初期値：3000）
    disableOnInteraction: false // 矢印をクリックしても自動再生を止めない
    // スライドの表示枚数
  },

  speed: 1000,
  slidesPerView: "auto",
  spaceBetween: 24,
  breakpoints: {
    768: {
      spaceBetween: 40
    }
  },
  navigation: {
    nextEl: ".swiper-button-next.js-campaign-swiper-next",
    prevEl: ".swiper-button-prev.js-campaign-swiper-prev"
  }
});

/*===== archive_aboutのモーダル =====*/
// クリックイベントを設定するための要素を取得
var aboutImagesModal = document.querySelector(".js-gallery");
if (aboutImagesModal) {
  var images = document.querySelectorAll(".js-gallery img");
  images.forEach(function (image) {
    image.addEventListener("click", function () {
      aboutImagesModal.innerHTML = this.outerHTML;
      // モーダルを表示する
      aboutImagesModal.style.display = "block";
      aboutImagesModal.classList.add("is-show");
      document.body.classList.add("is-active");
    });
  });
  aboutImagesModal.addEventListener("click", function () {
    // 非表示にする
    aboutImagesModal.style.display = "none";
    aboutImagesModal.classList.remove("is-show");
    document.body.classList.remove("is-active");
  });
}

/*===== Informationタブ =====*/
/*===== ハッシュでの表示きりかえ =====*/
// URLからハッシュ部分を取得
var hash = window.location.hash;
var idExperience = document.getElementById("experience");
var idFun = document.getElementById("fun");
var idLicense = document.getElementById("license");

// ハッシュに基づいてコンテンツ要素を表示
if (idExperience || idFun || idLicense) {
  switch (hash) {
    // 体験ダイビング
    case "#experience":
      idExperience.style.display = "block";
      document.querySelector('[data-tab-id="experience-content"]').classList.add("current");
      break;
    // ファン
    case "#fun":
      idFun.style.display = "block";
      document.querySelector('[data-tab-id="fun-content"]').classList.add("current");
      break;
    default:
      // ライセンス
      idLicense.style.display = "block";
      document.querySelector('[data-tab-id="license-content"]').classList.add("current");
  }
}

// タブ要素を取得
var tabs = document.querySelectorAll(".js-information-tab");
// タブがクリックされたときの処理を設定
tabs.forEach(function (tab, index) {
  tab.addEventListener("click", function () {
    // 現在の選択されているタブから "current" クラスを削除
    var currentTab = document.querySelector(".current");
    if (currentTab) {
      currentTab.classList.remove("current");
    }
    // クリックされたタブに "current" クラスを追加
    tab.classList.add("current");
    // クリックされたタブのインデックスを取得
    var tabIndex = Array.from(tabs).indexOf(tab);
    // すべてのコンテンツを非表示
    var contents = document.querySelectorAll(".js-cards4-item");
    contents.forEach(function (content) {
      content.style.display = "none";
    });
    // クリックされたタブに対応するコンテンツを表示
    contents[tabIndex].style.display = "block";
  });
});

// フッターメニューの各項目を取得
var footerMenuItems = document.querySelectorAll(".js-nav-list-item");
// フッターメニューがクリックされたときの処理を設定
footerMenuItems.forEach(function (menuItem, index) {
  menuItem.addEventListener("click", function () {
    // クリックされたメニュー項目に対応するタブを表示
    var tabId = menuItem.getAttribute("data-tab-id");
    var tabToShow = document.querySelector("#".concat(tabId));
    if (tabToShow) {
      // すべてのタブを非表示
      var _tabs = document.querySelectorAll(".js-cards4-item");
      _tabs.forEach(function (tab) {
        tab.style.display = "none";
      });
      // クリックされたメニュー項目に対応するタブを表示
      tabToShow.style.display = "block";
    }
  });
});

// フッターメニューの各項目を取得
// フッターメニューがクリックされたときの処理を設定
footerMenuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", function () {
    // 現在の選択されているメニュー項目から "current" クラスを削除
    var currentMenuItem = document.querySelector(".js-nav-list-item.current");
    if (currentMenuItem) {
      currentMenuItem.classList.remove("current");
    }
    // クリックされたメニュー項目に "current" クラスを追加
    menuItem.classList.add("current");

    // クリックされたメニュー項目に対応するInformationタブを探す
    var tabId = menuItem.getAttribute("data-tab-id");
    var matchingTab = document.querySelector(".js-information-tab[data-tab-id=\"".concat(tabId, "-content\"]"));
    if (matchingTab) {
      // 現在の選択されているInformationタブから "current" クラスを削除
      var currentInformationTab = document.querySelector(".js-information-tab.current");
      if (currentInformationTab) {
        currentInformationTab.classList.remove("current");
      }
      // クリックされたメニュー項目に対応するInformationタブに "current" クラスを追加
      matchingTab.classList.add("current");
    }
  });
});

/*===== アコーディオン共通設定 =====*/
var slideUp = function slideUp(el) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  el.style.height = el.offsetHeight + "px";
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.transitionTimingFunction = "ease";
  el.style.overflow = "hidden";
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  setTimeout(function () {
    el.style.display = "none";
    el.style.removeProperty("height");
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    el.style.removeProperty("transition-timing-function");
    el.classList.remove("is-open");
  }, duration);
};
// 要素をスライドしながら表示する関数
var slideDown = function slideDown(el) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  el.classList.add("is-open");
  el.style.removeProperty("display");
  var display = window.getComputedStyle(el).display;
  if (display === "none") {
    display = "block";
  }
  el.style.display = display;
  var height = el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.transitionTimingFunction = "ease";
  el.style.height = height + "px";
  el.style.removeProperty("padding-top");
  el.style.removeProperty("padding-bottom");
  el.style.removeProperty("margin-top");
  el.style.removeProperty("margin-bottom");
  setTimeout(function () {
    el.style.removeProperty("height");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    el.style.removeProperty("transition-timing-function");
  }, duration);
};
// 要素をスライドしながら交互に表示/非表示にする関数(jQueryのslideToggleと同じ)
var slideToggle = function slideToggle(el) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  if (window.getComputedStyle(el).display === "none") {
    return slideDown(el, duration);
  } else {
    return slideUp(el, duration);
  }
};

/*===== sidebarアコーディオン =====*/
// アコーディオンを全て取得
var accordions = document.querySelectorAll(".js-accordion");
// 取得したアコーディオンをArrayに変換(IE対策)
var accordionsArr = Array.prototype.slice.call(accordions);
accordionsArr.forEach(function (accordion) {
  // Triggerを全て取得
  var accordionTriggers = accordion.querySelectorAll(".js-accordion-trigger");
  // TriggerをArrayに変換(IE対策)
  var accordionTriggersArr = Array.prototype.slice.call(accordionTriggers);

  // 最初のアコーディオン要素にクラスを追加
  var firstAccordionContent = accordion.querySelector(".js-accordion-contents");
  if (firstAccordionContent) {
    firstAccordionContent.classList.add("is-open");
  }

  // 最初のトリガー要素にクラスを追加
  var firstAccordionTrigger = accordion.querySelector(".js-accordion-trigger");
  if (firstAccordionTrigger) {
    firstAccordionTrigger.classList.add("is-active");
  }
  accordionTriggersArr.forEach(function (trigger) {
    // Triggerにクリックイベントを付与
    trigger.addEventListener("click", function (e) {
      accordionTriggersArr.forEach(function (trigger) {
        // クリックしたアコーディオン以外を全て閉じる
        if (trigger !== e.target.parentElement) {
          trigger.classList.remove("is-active");
          var openedContent = trigger.querySelector(".js-accordion-contents");
          slideUp(openedContent);
        }
      });
      // '.is-active'クラスを付与or削除
      trigger.classList.toggle("is-active");
      // 開閉させる要素を取得
      var content = trigger.querySelector(".js-accordion-contents");
      // 要素を展開or閉じる
      slideToggle(content);
    });
  });
});

/*===== faqアコーディオン =====*/
// アコーディオンを全て取得
var faqAccordions = document.querySelectorAll(".js-faq-accordion");
// 取得したアコーディオンをArrayに変換(IE対策)
var faqAccordionsArr = Array.prototype.slice.call(faqAccordions);
faqAccordionsArr.forEach(function (accordion) {
  // Triggerを全て取得
  var accordionTriggers = accordion.querySelectorAll(".js-faq-accordion-trigger");
  // TriggerをArrayに変換(IE対策)
  var accordionTriggersArr = Array.prototype.slice.call(accordionTriggers);
  accordionTriggersArr.forEach(function (trigger) {
    // Triggerにクリックイベントを付与
    trigger.addEventListener("click", function () {
      // '.is-active'クラスを付与or削除
      trigger.classList.toggle("is-close");
      // 開閉させる要素を取得
      var content = trigger.querySelector(".js-faq-accordion-contents");
      // 要素を展開or閉じる
      slideToggle(content);
    });
  });
});
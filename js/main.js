(function ($) {
   "use strict";
   /*=================================
       JS Index Here
   ==================================*/
   /*
     01. On Load Function
     02. Preloader
     03. Mobile Menu Active
     04. Sticky fix
     05. Scroll To Top
     06. Set Background Image
     07. Global Slider
     08. Counter section
     09. Popup Sidemenu   
     10. Magnific Popup
     11. Section Position
     12. gallery prosucts
     13. Testimonial Slider
     14. gallery prosucts
     15. product-quantity
     16. Woocommerce Toggle
     17. range price
     18. Ajax Contact Form
     19. side cart toggle
     
   */
   /*=================================
       JS Index End
   ==================================*/
 
   /*---------- 01. On Load Function ----------*/
   $(window).on("load", function () {
     $(".preloader").fadeOut();
   });
 
   /*---------- 02. Preloader ----------*/
   if ($(".preloader").length > 0) {
     $(".preloaderCls").each(function () {
       $(this).on("click", function (e) {
         e.preventDefault();
         $(".preloader").css("display", "none");
       });
     });
   }
 
   /*---------- 03. Mobile Menu Active ----------*/
   $.fn.vsmobilemenu = function (options) {
     var opt = $.extend(
       {
         menuToggleBtn: ".vs-menu-toggle",
         bodyToggleClass: "vs-body-visible",
         subMenuClass: "vs-submenu",
         subMenuParent: "vs-item-has-children",
         subMenuParentToggle: "vs-active",
         meanExpandClass: "vs-mean-expand",
         appendElement: '<span class="vs-mean-expand"></span>',
         subMenuToggleClass: "vs-open",
         toggleSpeed: 400,
       },
       options
     );
 
     return this.each(function () {
       var menu = $(this); // Select menu
 
       // Menu Show & Hide
       function menuToggle() {
         menu.toggleClass(opt.bodyToggleClass);
 
         // collapse submenu on menu hide or show
         var subMenu = "." + opt.subMenuClass;
         $(subMenu).each(function () {
           if ($(this).hasClass(opt.subMenuToggleClass)) {
             $(this).removeClass(opt.subMenuToggleClass);
             $(this).css("display", "none");
             $(this).parent().removeClass(opt.subMenuParentToggle);
           }
         });
       }
 
       // Class Set Up for every submenu
       menu.find("li").each(function () {
         var submenu = $(this).find("ul");
         submenu.addClass(opt.subMenuClass);
         submenu.css("display", "none");
         submenu.parent().addClass(opt.subMenuParent);
         submenu.prev("a").append(opt.appendElement);
         submenu.next("a").append(opt.appendElement);
       });
 
       // Toggle Submenu
       function toggleDropDown($element) {
         if ($($element).next("ul").length > 0) {
           $($element).parent().toggleClass(opt.subMenuParentToggle);
           $($element).next("ul").slideToggle(opt.toggleSpeed);
           $($element).next("ul").toggleClass(opt.subMenuToggleClass);
         } else if ($($element).prev("ul").length > 0) {
           $($element).parent().toggleClass(opt.subMenuParentToggle);
           $($element).prev("ul").slideToggle(opt.toggleSpeed);
           $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
         }
       }
 
       // Submenu toggle Button
       var expandToggler = "." + opt.meanExpandClass;
       $(expandToggler).each(function () {
         $(this).on("click", function (e) {
           e.preventDefault();
           toggleDropDown($(this).parent());
         });
       });
 
       // Menu Show & Hide On Toggle Btn click
       $(opt.menuToggleBtn).each(function () {
         $(this).on("click", function () {
           menuToggle();
         });
       });
 
       // Hide Menu On out side click
       menu.on("click", function (e) {
         e.stopPropagation();
         menuToggle();
       });
 
       // Stop Hide full menu on menu click
       menu.find("div").on("click", function (e) {
         e.stopPropagation();
       });
     });
   };
 
   $(".vs-menu-wrapper").vsmobilemenu();
 
   /*---------- 04. Sticky fix ----------*/
   var lastScrollTop = "";
   var scrollToTopBtn = ".scrollToTop";
 
   function stickyMenu($targetMenu, $toggleClass, $parentClass) {
     var st = $(window).scrollTop();
     var height = $targetMenu.css("height");
     $targetMenu.parent().css("min-height", height);
     if ($(window).scrollTop() > 800) {
       $targetMenu.parent().addClass($parentClass);
 
       if (st > lastScrollTop) {
         $targetMenu.removeClass($toggleClass);
       } else {
         $targetMenu.addClass($toggleClass);
       }
     } else {
       $targetMenu.parent().css("min-height", "").removeClass($parentClass);
       $targetMenu.removeClass($toggleClass);
     }
     lastScrollTop = st;
   }
   $(window).on("scroll", function () {
     stickyMenu($(".sticky-active"), "active", "will-sticky");
     if ($(this).scrollTop() > 500) {
       $(scrollToTopBtn).addClass("show");
     } else {
       $(scrollToTopBtn).removeClass("show");
     }
   });
 
   /*---------- 05. Scroll To Top ----------*/
   $(scrollToTopBtn).each(function () {
     $(this).on("click", function (e) {
       e.preventDefault();
       $("html, body").animate(
         {
           scrollTop: 0,
         },
         lastScrollTop / 3
       );
       return false;
     });
   });
 
   /*---------- 06.Set Background Image ----------*/
   if ($("[data-bg-src]").length > 0) {
     $("[data-bg-src]").each(function () {
       var src = $(this).attr("data-bg-src");
       $(this).css("background-image", "url(" + src + ")");
       $(this).removeAttr("data-bg-src").addClass("background-image");
     });
   }
 
   /*----------- 07. Global Slider ----------*/
   $(".vs-carousel").each(function () {
     var asSlide = $(this);
 
     // Collect Data
     function d(data) {
       return asSlide.data(data);
     }
 
     // Custom Arrow Button
     var prevButton =
         '<button type="button" class="slick-prev"><i class="' +
         d("prev-arrow") +
         '"></i></button>',
       nextButton =
         '<button type="button" class="slick-next"><i class="' +
         d("next-arrow") +
         '"></i></button>';
 
     // Function For Custom Arrow Btn
     $("[data-slick-next]").each(function () {
       $(this).on("click", function (e) {
         e.preventDefault();
         $($(this).data("slick-next")).slick("slickNext");
       });
     });
 
     $("[data-slick-prev]").each(function () {
       $(this).on("click", function (e) {
         e.preventDefault();
         $($(this).data("slick-prev")).slick("slickPrev");
       });
     });
 
     // Check for arrow wrapper
     if (d("arrows") == true) {
       if (!asSlide.closest(".arrow-wrap").length) {
         asSlide.closest(".container").parent().addClass("arrow-wrap");
       }
     }
 
     asSlide.slick({
       dots: d("dots") ? true : false,
       fade: d("fade") ? true : false,
       arrows: d("arrows") ? true : false,
       speed: d("speed") ? d("speed") : 1000,
       asNavFor: d("asnavfor") ? d("asnavfor") : false,
       autoplay: d("autoplay") == false ? false : true,
       infinite: d("infinite") == false ? false : true,
       slidesToShow: d("slide-show") ? d("slide-show") : 1,
       adaptiveHeight: d("adaptive-height") ? true : false,
       centerMode: d("center-mode") ? true : false,
       autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
       centerPadding: d("center-padding") ? d("center-padding") : "0",
       focusOnSelect: d("focuson-select") ? true : false,
       pauseOnFocus: d("pauseon-focus") ? true : false,
       pauseOnHover: d("pauseon-hover") ? true : false,
       variableWidth: d("variable-width") ? true : false,
       vertical: d("vertical") ? true : false,
       verticalSwiping: d("vertical") ? true : false,
       prevArrow: d("prev-arrow")
         ? prevButton
         : '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
       nextArrow: d("next-arrow")
         ? nextButton
         : '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
       rtl: $("html").attr("dir") == "rtl" ? true : false,
       responsive: [
         {
           breakpoint: 1600,
           settings: {
             arrows: d("xl-arrows") ? true : false,
             dots: d("xl-dots") ? true : false,
             slidesToShow: d("xl-slide-show")
               ? d("xl-slide-show")
               : d("slide-show"),
             centerMode: d("xl-center-mode") ? true : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 1400,
           settings: {
             arrows: d("ml-arrows") ? true : false,
             dots: d("ml-dots") ? true : false,
             slidesToShow: d("ml-slide-show")
               ? d("ml-slide-show")
               : d("slide-show"),
             centerMode: d("ml-center-mode") ? true : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 1200,
           settings: {
             arrows: d("lg-arrows") ? true : false,
             dots: d("lg-dots") ? true : false,
             slidesToShow: d("lg-slide-show") ? d("lg-slide-show") : 1,
             centerMode: d("lg-center-mode") ? d("lg-center-mode") : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 992,
           settings: {
             arrows: d("md-arrows") ? true : false,
             dots: d("md-dots") ? true : false,
             slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
             centerMode: d("md-center-mode") ? d("md-center-mode") : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 767,
           settings: {
             arrows: d("sm-arrows") ? true : false,
             dots: d("sm-dots") ? true : false,
             slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
             centerMode: d("sm-center-mode") ? d("sm-center-mode") : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 576,
           settings: {
             arrows: d("xs-arrows") ? true : false,
             dots: d("xs-dots") ? true : false,
             slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
             centerMode: d("xs-center-mode") ? d("xs-center-mode") : false,
             centerPadding: 0,
           },
         },
         // You can unslick at a given breakpoint now by adding:
         // settings: "unslick"
         // instead of a settings object
       ],
     });
   });
   /*----------- 07. Global Slider2 ----------*/
   $(".vs-carousel2").each(function () {
     var asSlide = $(this);
 
     // Collect Data
     function d(data) {
       return asSlide.data(data);
     }
 
     // Custom Arrow Button
     var prevButton =
         '<button type="button" class="slick-prev"><i class="' +
         d("prev-arrow") +
         '"></i></button>',
       nextButton =
         '<button type="button" class="slick-next"><i class="' +
         d("next-arrow") +
         '"></i></button>';
 
     // Function For Custom Arrow Btn
     $("[data-slick-next]").each(function () {
       $(this).on("click", function (e) {
         e.preventDefault();
         $($(this).data("slick-next")).slick("slickNext");
       });
     });
 
     $("[data-slick-prev]").each(function () {
       $(this).on("click", function (e) {
         e.preventDefault();
         $($(this).data("slick-prev")).slick("slickPrev");
       });
     });
 
     // Check for arrow wrapper
     if (d("arrows") == true) {
       if (!asSlide.closest(".arrow-wrap").length) {
         asSlide.closest(".container").parent().addClass("arrow-wrap");
       }
     }
 
     asSlide.slick({
       dots: d("dots") ? true : false,
       fade: d("fade") ? true : false,
       arrows: d("arrows") ? true : false,
       speed: d("speed") ? d("speed") : 1000,
       asNavFor: d("asnavfor") ? d("asnavfor") : false,
       autoplay: d("autoplay") == false ? false : true,
       infinite: d("infinite") == false ? false : true,
       slidesToShow: d("slide-show") ? d("slide-show") : 1,
       adaptiveHeight: d("adaptive-height") ? true : false,
       centerMode: d("center-mode") ? true : false,
       autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
       centerPadding: d("center-padding") ? d("center-padding") : "0",
       focusOnSelect: d("focuson-select") ? true : false,
       pauseOnFocus: d("pauseon-focus") ? true : false,
       pauseOnHover: d("pauseon-hover") ? true : false,
       variableWidth: d("variable-width") ? true : false,
       vertical: d("vertical") ? true : false,
       verticalSwiping: d("vertical") ? true : false,
       prevArrow: d("prev-arrow")
         ? prevButton
         : '<button type="button" class="slick-prev"><img src="assets/img/icon/hero-icon-prev.svg" alt="icon"></button>',
       nextArrow: d("next-arrow")
         ? nextButton
         : '<button type="button" class="slick-next"><img src="assets/img/icon/hero-icon-next.svg" alt="icon"></button>',
       rtl: $("html").attr("dir") == "rtl" ? true : false,
       responsive: [
         {
           breakpoint: 1600,
           settings: {
             arrows: d("xl-arrows") ? true : false,
             dots: d("xl-dots") ? true : false,
             slidesToShow: d("xl-slide-show")
               ? d("xl-slide-show")
               : d("slide-show"),
             centerMode: d("xl-center-mode") ? true : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 1400,
           settings: {
             arrows: d("ml-arrows") ? true : false,
             dots: d("ml-dots") ? true : false,
             slidesToShow: d("ml-slide-show")
               ? d("ml-slide-show")
               : d("slide-show"),
             centerMode: d("ml-center-mode") ? true : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 1200,
           settings: {
             arrows: d("lg-arrows") ? true : false,
             dots: d("lg-dots") ? true : false,
             slidesToShow: d("lg-slide-show") ? d("lg-slide-show") : 1,
             centerMode: d("lg-center-mode") ? d("lg-center-mode") : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 992,
           settings: {
             arrows: d("md-arrows") ? true : false,
             dots: d("md-dots") ? true : false,
             slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
             centerMode: d("md-center-mode") ? d("md-center-mode") : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 767,
           settings: {
             arrows: d("sm-arrows") ? true : false,
             dots: d("sm-dots") ? true : false,
             slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
             centerMode: d("sm-center-mode") ? d("sm-center-mode") : false,
             centerPadding: 0,
           },
         },
         {
           breakpoint: 576,
           settings: {
             arrows: d("xs-arrows") ? true : false,
             dots: d("xs-dots") ? true : false,
             slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
             centerMode: d("xs-center-mode") ? d("xs-center-mode") : false,
             centerPadding: 0,
           },
         },
         // You can unslick at a given breakpoint now by adding:
         // settings: "unslick"
         // instead of a settings object
       ],
     });
   });
 
   /*----------- 08. Counter section ----------*/
   var a = 0;
 
   $(window).scroll(function () {
     var mediaCounter = $(".media-counter");
 
     if (mediaCounter.length > 0) {
       var oTop = mediaCounter.offset().top - window.innerHeight;
 
       if (a == 0 && $(window).scrollTop() > oTop) {
         $(".counter-number").each(function () {
           var $this = $(this),
             countTo = $this.attr("data-count");
           $({ countNum: $this.text() }).animate(
             {
               countNum: countTo,
             },
             {
               duration: 4000,
               easing: "swing",
               step: function () {
                 $this.text(Math.floor(this.countNum));
               },
               complete: function () {
                 $this.text(this.countNum);
                 //alert('finished');
               },
             }
           );
         });
         a = 1;
       }
     }
   });
 
   /*---------- 9. Popup Sidemenu ----------*/
   function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
     // Sidebar Popup
     $($sideMunuOpen).on("click", function (e) {
       e.preventDefault();
       $($sideMenu).addClass($toggleCls);
     });
     $($sideMenu).on("click", function (e) {
       e.stopPropagation();
       $($sideMenu).removeClass($toggleCls);
     });
     var sideMenuChild = $sideMenu + " > div";
     $(sideMenuChild).on("click", function (e) {
       e.stopPropagation();
       $($sideMenu).addClass($toggleCls);
     });
     $($sideMenuCls).on("click", function (e) {
       e.preventDefault();
       e.stopPropagation();
       $($sideMenu).removeClass($toggleCls);
     });
   }
   popupSideMenu(
     ".sidemenu-wrapper",
     ".sideMenuToggler",
     ".sideMenuCls",
     "show"
   );
 
   /*----------- 10. Magnific Popup ----------*/
   /* magnificPopup img view */
   $(".popup-image").magnificPopup({
     type: "image",
     gallery: {
       enabled: true,
     },
   });
 
   /*----------- 11. magnificPopup video view ----------*/
   $(".popup-video").magnificPopup({
     type: "iframe",
   });
 
   /*---------- 12. Section Position ----------*/
   // Interger Converter
   function convertInteger(str) {
     return parseInt(str, 10);
   }
 
   $.fn.sectionPosition = function (mainAttr, posAttr) {
     $(this).each(function () {
       var section = $(this);
 
       function setPosition() {
         var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
           posData = section.attr(mainAttr), // where to position
           posFor = section.attr(posAttr), // On Which section is for positioning
           topMark = "top-half", // Pos top
           bottomMark = "bottom-half", // Pos Bottom
           parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
           parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent
 
         if (posData === topMark) {
           $(posFor).css("padding-bottom", parentPB + sectionHeight + "px");
           section.css("margin-top", "-" + sectionHeight + "px");
         } else if (posData === bottomMark) {
           $(posFor).css("padding-top", parentPT + sectionHeight + "px");
           section.css("margin-bottom", "-" + sectionHeight + "px");
         }
       }
       setPosition();
     });
   };
 
   var postionHandler = "[data-sec-pos]";
   if ($(postionHandler).length) {
     $(postionHandler).sectionPosition("data-sec-pos", "data-pos-for");
   }
 
   /*----------- 13. Testimonial Slider ----------*/
   $("#testis_4_1").slick({
     dots: false,
     arrows: false,
     infinite: true,
     autoplay: true,
     autoplaySpeed: 6000,
     fade: false,
     speed: 1000,
     slidesToShow: 1,
     slidesToScroll: 1,
     fade: true,
     asNavFor: "#testis_4_2, #testis_4_3, #testis_4_4",
     responsive: [
       {
         breakpoint: 1500,
         settings: {
           arrows: false,
         },
       },
     ],
   });
 
   $("#testis_4_2").slick({
     dots: false,
     infinite: true,
     arrows: false,
     autoplay: true,
     autoplaySpeed: 6000,
     fade: false,
     speed: 1000,
     slidesToShow: 4,
     vertical: true,
     slidesToScroll: 1,
     centerMode: true,
     centerPadding: "0",
     focusOnSelect: true,
     asNavFor: "#testis_4_1, #testis_4_3",
     responsive: [
       {
         breakpoint: 1199,
         settings: {
           slidesToShow: 4,
         },
       },
       {
         breakpoint: 992,
         settings: {
           vertical: false,
           slidesToShow: 4,
         },
       },
     ],
   });
 
   $("#testis_4_3").slick({
     dots: false,
     infinite: true,
     arrows: false,
     autoplay: true,
     autoplaySpeed: 6000,
     speed: 1000,
     slidesToShow: 1,
     slidesToScroll: 1,
     fade: true,
     asNavFor: "#testis_4_2, #testis_4_1",
   });

   $("#testis_4_4").slick({
    autoplay: false,
    arrows: false,
    dots: false,
    slidesToShow: 2,
    centerPadding: "10px",
    draggable: false,
    infinite: true,
    pauseOnHover: false,
    swipe: false,
    touchMove: false,
    vertical: true,
    verticalScrolling: true,
    speed: 1000,
    autoplaySpeed: 2000,
    useTransform: true,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    adaptiveHeight: true,
    asNavFor: "#testis_4_2, #testis_4_1",
   });
 
   /*----------- 14. gallery prosucts ----------*/
 
   $(".thumbs-item img").click(function () {
     // Remove active class from all thumbs-items
     $(".thumbs-item").removeClass("active");
 
     // Add active class to the parent thumbs-item
     $(this).closest(".thumbs-item").addClass("active");
 
     // Change the src attribute of .img element
     $(".img").attr("src", $(this).attr("src").replace("100x100", "400x400"));
   });
 
   /*----------- 15. product-quantity ----------*/
   document.addEventListener("DOMContentLoaded", function () {
     const quantityInputs = document.querySelectorAll(".product-quantity input");
     quantityInputs.forEach(function (input) {
       const minusButton = input.parentElement.querySelector(".quantity-minus");
       const plusButton = input.parentElement.querySelector(".quantity-plus");
       minusButton.addEventListener("click", function () {
         if (input.value > 1) {
           input.value = parseInt(input.value, 10) - 1;
         }
       });
       plusButton.addEventListener("click", function () {
         input.value = parseInt(input.value, 10) + 1;
       });
     });
   });
 
   /*----------- 16. Woocommerce Toggle ----------*/
   // Ship To Different Address
   $("#ship-to-different-address-checkbox").on("change", function () {
     if ($(this).is(":checked")) {
       $("#ship-to-different-address").next(".shipping_address").slideDown();
     } else {
       $("#ship-to-different-address").next(".shipping_address").slideUp();
     }
   });
 
   // Login Toggle
   $(".woocommerce-form-login-toggle a").on("click", function (e) {
     e.preventDefault();
     $(".woocommerce-form-login").slideToggle();
   });
 
   // Coupon Toggle
   $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
     e.preventDefault();
     $(".woocommerce-form-coupon").slideToggle();
   });
 
   // Woocommerce Shipping Method
   $(".shipping-calculator-button").on("click", function (e) {
     e.preventDefault();
     $(this).next(".shipping-calculator-form").slideToggle();
   });
 
   // Woocommerce Payment Toggle
   $('.wc_payment_methods input[type="radio"]:checked')
     .siblings(".payment_box")
     .show();
   $('.wc_payment_methods input[type="radio"]').each(function () {
     $(this).on("change", function () {
       $(".payment_box").slideUp();
       $(this).siblings(".payment_box").slideDown();
     });
   });
 
   /*----------- 20. Rating Input Class Added ----------*/
   if ($(".star-rating2").length > 0) {
     $(".star-rating2").each(function () {
       $(this)
         .find("span")
         .on("click", function () {
           $(".star-rating2 span").addClass("active");
           $(this).nextAll("span").removeClass("active");
         });
     });
   }
 
   /*----------- 17. range price ----------*/
   document.addEventListener("DOMContentLoaded", () => {
     const rangeSlider = document.querySelector(".range-slider");
     const rangeSelected = document.querySelector(".range-selected");
     const minInput = document.querySelector(".min");
     const maxInput = document.querySelector(".max");
     const minAmount = document.getElementById("minAmount");
     const maxAmount = document.getElementById("maxAmount");
     const filterButton = document.querySelector(".filter-btn");
 
     // Check if all required elements are found
     if (
       !rangeSlider ||
       !rangeSelected ||
       !minInput ||
       !maxInput ||
       !minAmount ||
       !maxAmount ||
       !filterButton
     ) {
       // console.error("One or more required elements not found. Check your HTML.");
       return;
     }
 
     // Update range slider position and displayed values
     function updateRange() {
       const minPrice = parseInt(minInput.value);
       const maxPrice = parseInt(maxInput.value);
       const maxRange = parseInt(maxInput.max);
       const minPos = (minPrice / maxRange) * 100;
       const maxPos = (maxPrice / maxRange) * 100;
 
       rangeSelected.style.left = `${minPos}%`;
       rangeSelected.style.width = `${maxPos - minPos}%`;
 
       minAmount.textContent = `$${minPrice}`;
       maxAmount.textContent = `$${maxPrice}`;
     }
 
     // Event listener for range inputs
     [minInput, maxInput].forEach((input) => {
       input.addEventListener("input", updateRange);
     });
 
     // Event listener for filter button
     filterButton.addEventListener("click", () => {
       const minPrice = parseInt(minInput.value);
       const maxPrice = parseInt(maxInput.value);
       // Add your filtering logic using minPrice and maxPrice here
       console.log(`Filtering from $${minPrice} to $${maxPrice}`);
     });
 
     // Initialize the range on page load
     updateRange();
   });
 
   // home-3 video control
   $(document).ready(function () {
     var video = document.getElementById("custom-video");
     if (video) {
       video.playbackRate = 0.5;
     }
   });
 
   /*----------- 18. Ajax Contact Form ----------*/
   var form = ".ajax-contact";
   var invalidCls = "is-invalid";
   var $email = '[name="email"]';
   var $validation =
     '[name="firstname"],[name="lastname"],[name="email"],[name="number"],[name="message"]'; // Must be use (,) without any space
   var formMessages = $(".form-messages");
 
   function sendContact() {
     var formData = $(form).serialize();
     var valid;
     valid = validateContact();
     if (valid) {
       jQuery
         .ajax({
           url: $(form).attr("action"),
           data: formData,
           type: "POST",
         })
         .done(function (response) {
           // Make sure that the formMessages div has the 'success' class.
           formMessages.removeClass("error");
           formMessages.addClass("success");
           // Set the message text.
           formMessages.text(response);
           // Clear the form.
           $(form + ' input:not([type="submit"]),' + form + " textarea").val("");
         })
         .fail(function (data) {
           // Make sure that the formMessages div has the 'error' class.
           formMessages.removeClass("success");
           formMessages.addClass("error");
           // Set the message text.
           if (data.responseText !== "") {
             formMessages.html(data.responseText);
           } else {
             formMessages.html(
               "Oops! An error occured and your message could not be sent."
             );
           }
         });
     }
   }
 
   function validateContact() {
     var valid = true;
     var formInput;
 
     function unvalid($validation) {
       $validation = $validation.split(",");
       for (var i = 0; i < $validation.length; i++) {
         formInput = form + " " + $validation[i];
         if (!$(formInput).val()) {
           $(formInput).addClass(invalidCls);
           valid = false;
         } else {
           $(formInput).removeClass(invalidCls);
           valid = true;
         }
       }
     }
     unvalid($validation);
 
     if (
       !$($email).val() ||
       !$($email)
         .val()
         .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
     ) {
       $($email).addClass(invalidCls);
       valid = false;
     } else {
       $($email).removeClass(invalidCls);
       valid = true;
     }
     return valid;
   }
 
   $(form).on("submit", function (element) {
     element.preventDefault();
     sendContact();
   });
 
   /*----------- 19. side cart toggle----------*/
 
 // Event handler for the close button
 $(".sideMenuCls2").on("click", function() {
   $(".sideCart-wrapper").removeClass("show");
 });
 
 // Event handler for toggling the side cart when clicking outside the side cart wrapper
 $(".sideCart-wrapper").on("click", function(event) {
   if (!$(event.target).closest(".sidemenu-content").length) {
       toggleSideCart();
   }
 });
 
 // Event handler for the toggler button
 $(".sideCartToggler").on("click", function() {
   toggleSideCart();
 });
 
 // Function to toggle the side cart
 function toggleSideCart() {
   $(".sideCart-wrapper").toggleClass("show");
 }
 
 
   
 })(jQuery);
 
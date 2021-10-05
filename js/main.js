;(function () {

	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});

				}, 50);

			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};


	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());

// (function($) {
//   "use strict"; // Start of use strict
//
//   // Smooth scrolling using jQuery easing
//   $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//       if (target.length) {
//         $('html, body').animate({
//           scrollTop: (target.offset().top)
//         }, 1000, "easeInOutExpo");
//         return false;
//       }
//     }
//   });
//
//   // Closes responsive menu when a scroll trigger link is clicked
//   $('.js-scroll-trigger').click(function() {
//     $('.navbar-collapse').collapse('hide');
//   });
//
//   // Activate scrollspy to add active class to navbar items on scroll
//   $('body').scrollspy({
//     target: '#sideNav'
//   });
//
// })(jQuery); // End of use strict
//
// (function () {
//     'use strict';
//     var SectionScroller = {
//         anchorTops: [],
//
//         el: {
//             anchors: document.querySelectorAll('.anchor'),
//             anchorLinks: document.querySelectorAll('.anchor-link')
//         },
//
//         forEach: function(array, callback, scope) {
//             for (var i = 0, ii = array.length; i < ii; i++) {
//                 callback.call(scope, i, array[i]);
//             }
//         },
//
//         throttle: function (fn, threshhold, scope) {
//           threshhold = threshhold || (threshhold = 250);
//           var last;
//           var deferTimer;
//           return function () {
//             var context = scope || this;
//             var now = +new Date();
//             var args = arguments;
//             if (last && now < last + threshhold) {
//               // hold on to it
//               clearTimeout(deferTimer);
//               deferTimer = setTimeout(function () {
//                 last = now;
//                 fn.apply(context, args);
//               }, threshhold);
//             } else {
//               last = now;
//               fn.apply(context, args);
//             }
//           };
//         },
//
//         mathSign: function (x) {
//             x = +x; // convert to a number
//             if (x === 0 || isNaN(x)) {
//                 return x;
//             }
//             return x > 0 ? 1 : -1;
//         },
//
//         anchorGetter: function () {
//             var SS = SectionScroller;
//             for (var i = 0, max = SS.el.anchors.length; i < max; i++) {
//                 SS.anchorTops[i] = SS.el.anchors[i].offsetTop;
//             }
//             for (var j = 0, jj = SS.anchorTops.length; j < jj; j++) {
//                 if (SS.anchorTops[j] - 1 < window.scrollY) {
//                     for (var x = 0, xx = SS.el.anchors.length; x < xx; x++) {
//                         SS.el.anchorLinks[x].classList.remove('selected');
//                     }
//                     SS.el.anchorLinks[j].classList.add('selected');
//                 }
//             }
//         },
//
//         smooth: function (e) {
//             var id = e.currentTarget.getAttribute('href');
//             var node = document.querySelector(id);
//             var nodeTop = node.offsetTop;
//             var winTop = window.scrollY;
//             var sign = SectionScroller.mathSign(nodeTop);
//             var scrollAmnt;
//             var down;
//             if (nodeTop > winTop) {
//                 down = true;
//                 scrollAmnt = nodeTop - winTop;
//             } else {
//                 down = false;
//                 scrollAmnt = Math.abs(winTop - nodeTop);
//             }
//
//             var scroller = function () {
//                 if (down) {
//                     window.scrollTo(0, window.scrollY + 1);
//                 } else {
//                     window.scrollTo(0, window.scrollY - 1);
//                 }
//                 scrollAmnt--;
//                 if (scrollAmnt > 0)  {
//                     window.requestAnimationFrame(scroller);
//                 }
//             };
//             window.requestAnimationFrame(scroller);
//             e.preventDefault();
//         },
//
//         smoothScroll: function(e) {
//             var id = e.currentTarget.getAttribute('href');
//             var node = document.querySelector(id);
//             var scrollContainer = node;
//             do { //find scroll container
//                 scrollContainer = scrollContainer.parentNode;
//                 if (!scrollContainer) return;
//                 scrollContainer.scrollTop += 1;
//             } while (scrollContainer.scrollTop === 0);
//
//             var targetY = 0;
//             do { //find the top of target relatively to the container
//                 if (node == scrollContainer) break;
//                 targetY += node.offsetTop;
//             } while (node === node.offsetParent);
//
//             var scroll = function(c, a, b, i) {
//                 i++; if (i > 30) return;
//                 c.scrollTop = a + (b - a) / 30 * i;
//                 setTimeout(function(){ scroll(c, a, b, i); }, 20);
//             };
//             // start scrolling
//             scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
//             e.preventDefault();
//         },
//
//         events: function () {
//             var SS = SectionScroller;
//             window.addEventListener('scroll', SS.throttle(SS.anchorGetter, 150));
//             SS.forEach(SS.el.anchorLinks, function (index, link) {
//                 link.addEventListener('click', SS.smooth);
//             });
//         },
//
//         init: function () {
//             SectionScroller.anchorGetter();
//             SectionScroller.events();
//         }
//     };
//
//     SectionScroller.init();
// })();

/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);

/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $(".anchor");
	var navigation_links = $("#nav-wrap a");

	sections.each(function(){
		new Waypoint({
			element: this,
			handler: function(direction) {
				var active_section;
				active_section = this.element;
				id = active_section.id
				if (direction === "up"){
					var previous = this.previous()
					active_section = previous.element;
					id = active_section.id
				}
				if (id === '') {
					id = 'fh5co-header'
				}
				var active_link = $('#nav-wrap a[href="#' + id + '"]');

				navigation_links.parent().removeClass("current");
				active_link.parent().addClass("current");

		},
		offset: '35%',
		group: 'anchor'
		})
	});

	// sections.waypoint({
	//
  //     handler: function(direction) {
	// 			var active_section;
	//
	// 			active_section = this.element;
	// 			if (direction === "up"){
	// 				var previousWaypoint = this.previous()
	// 				active_section = previousWaypoint.element;
	// 			}
	// 			console.log(active_section.id);
	// 			var active_link = $('#nav-wrap a[href="#' + active_section.id + '"]');
	//
	// 			navigation_links.parent().removeClass("current");
	// 			active_link.parent().addClass("current");
	// 		},
	// 	offset: '35%'
	// });




/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });


/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }

	      }

      });
      return false;
   });


});
//
// var top1 = $('#fh5co-header').offset().top;
// var top2 = $('#fh5co-about').offset().top;
//
// $(document).scroll(function() {
//   var scrollPos = $(document).scrollTop();
//   if (scrollPos >= top1 && scrollPos < top2) {
//     $('.change').css('background', 'rgba(0,0,0,0.5)');
//   } else if (scrollPos >= top2) {
//     $('.change').css('background-color', '#0f0');
//   }
// });

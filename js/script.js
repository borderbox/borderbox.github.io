/* $(document).ready(function(){
		$('.carousel__inner').slick({
				speed: 1200,
				prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
				nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
				responsive: [
					{
						breakpoint: 992,
						settings: {
							dots: true,
							arrows:false,
						}
					}
				]
			});
}); */

// slider
const slider = tns({
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false,
	nav: false,
	resposive: {
		991: {
			fixedWidth: 600,
		}
	},
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});



// tabs
$(document).ready(function() {
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__li_active)', function() {
		$(this)
		  .addClass('catalog__li_active').siblings().removeClass('catalog__li_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//modal windows
	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.button_catalog-item').each(function (i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	// jQuery validate	
	function valideForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: 'required',
				email: {
					required: true,
					email: true,
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Пожалуйста, введите {0} символа")
				},
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите свой email",
				  email: "Неправильно введен адрес почты"
				}
			  }
		});
	}

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');


	//phone masked input
	$('input[name=phone]').mask("+7 (999) 999-99-99");

	//mailer
	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn();

			$('form').trigger('reset');
		});
		return false;
	});

	// smooth scroll up
	$(window).scroll(function() {
		if($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href=#up]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});
	// подключение библиотеки WOW.js для работы animate.css
	new WOW().init();
});
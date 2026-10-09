(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

  // Topbar search (desktop form and the mobile search dropdown) — runs on Enter or the
  // search button and is recorded as a Pendo Track Event. There's no search backend yet,
  // so submitting stays on the page instead of reloading it.
  function runTopbarSearch($form) {
    var query = $.trim($form.find("input").val() || "");
    if (!query || !window.pendo || typeof window.pendo.track !== "function") return;
    window.pendo.track("topbar_search_submitted", {
      query: query.substring(0, 100),
      query_length: query.length,
      search_location: $form.closest(".dropdown-menu").length ? "topbar_mobile_dropdown" : "topbar",
      page_title: document.title,
      page_path: window.location.pathname
    });
  }

  $(".navbar-search").on("submit", function(e) {
    e.preventDefault();
    runTopbarSearch($(this));
  });

  $(".navbar-search .input-group-append .btn").on("click", function() {
    runTopbarSearch($(this).closest(".navbar-search"));
  });

})(jQuery); // End of use strict

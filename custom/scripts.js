$(document).ready(function () {
    AOS.init({
        mirror: true,
    });
    $('.fancybox').fancybox();
    $('[data-toggle="tooltip"]').tooltip();
    $("[data-toggle=popover]").popover({
        trigger: 'focus'
    })
});
$(window).on("scroll", function () {
    if ($(window).scrollTop() >= 200) {
        $("#nav-index").addClass("compressed");
    } else {
        $("#nav-index").removeClass("compressed");
    }
});
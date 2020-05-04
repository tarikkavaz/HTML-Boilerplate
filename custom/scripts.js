$(document).ready(function () {
    AOS.init({
        mirror: true,
    });
    $('.fancybox').fancybox();
    $('[data-toggle="tooltip"]').tooltip();
    $("[data-toggle=popover]").popover({
        trigger: 'focus'
    })
    $("div[data-includeHTML]").each(function () {
        $(this).load($(this).attr("data-includeHTML"));
    });
});
$(window).on("scroll", function () {
    if ($(window).scrollTop() >= 200) {
        $("#nav-index").addClass("compressed");
    } else {
        $("#nav-index").removeClass("compressed");
    }
});
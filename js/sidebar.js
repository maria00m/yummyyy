let nav_width = 213.078;

let sidebar = document.getElementById('my-sidebar')
$('.close').on('click', function () {
    console.log($('#hidden-ele').outerWidth())
    if ($('#hidden-ele').outerWidth() === 0) {
        $('#hidden-ele').animate({ 'width': '213.078px' }, 500)
        $('#hidden-ele').css({ 'margin-left': '0px' }, 500)
        $('aside').animate({ 'width': '20%' }, 500)
        $('.opn-btn').css({"display":"none"})
        $('.cls-btn').css({"display":"block"})
    } else {
        $('#hidden-ele').animate({ 'width': '0px' }, 500)
        $('#hidden-ele').css({ 'margin-left': '-100%' }, 500)
        $('aside').animate({ 'width': '5%' }, 500)
        $('.opn-btn').css({"display":"block"})
        $('.cls-btn').css({"display":"none"})
    }
})

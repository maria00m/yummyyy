
function openSideNav() {
    $(".side-nav").animate({
        left: 0
    }, 500)
  
  
    $(".open").removeClass("fa-align-justify");
    $(".open").addClass("fa-x");
  
  
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
  }
  
  function closeSideNav() {
    let boxWidth = $(".side-nav .nav-tab").outerWidth()
    $(".side-nav").animate({
        left: -boxWidth
    }, 500)
  
    $(".open").addClass("fa-align-justify");
    $(".open").removeClass("fa-x");
  
  
    $(".links li").animate({
        top: 300
    }, 500)
  }
  
  closeSideNav()
  $(".side-nav i.open").on("click",() => {
    if ($(".side-nav").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
  })







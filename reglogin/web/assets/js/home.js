window.onscroll = function() {
 let t = document.documentElement.scrollTop || document.body.scrollTop;
 console.log(t);
 if( t >= 200 ) {
   $("#cat").find('img').hide();
   // $("#cat").removeClass('am-animation-slide-left').addClass()
 } else {
   $("#cat").find('img').show();
   // $("#cat").addClass('am-animation-slide-left')

 }
}

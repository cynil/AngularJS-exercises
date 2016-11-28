//require Touch.js
function touch(el){
  el = typeof el === 'string' ? document.querySelector(el) : el
  return new Finger(el)
}
(function($){
  $.fn.slide = function(options){
    return this.each(function(){
      var $slide = $(this),
          $wrap = $slide.find('.slide-wrap'),
          $items = $slide.find('.slide_i'),
          w = $slide.width(),
          h = $slide.height(),
          len = $items.length,
          index = 0,
          moving = false
            
      ;(function setUp(){
        $slide.css({
          position: 'relative',
          overflow: 'hidden'
        })
        $wrap.css({
          position: 'absolute', 
          width: 3 * w + 'px', 
          height: h + 'px', 
          left: -w + 'px'
        })
        $items.css({
          position: 'absolute',
          width: w + 'px',
          height: h+'px', 
          overflow: 'hidden', 
          left: 0, top: h + 'px'
        })
        $items.eq(0).css({left:w + 'px', top: 0})
      })()
      
      //require Touch.js
      touch(this).on('swipe', function(e){
        if(moving) return
        moving = true
        if(e.direction === 0){
          var next = (index - 1 + len) % len
          $items.eq(next).css({left: '0px', top: '0px'})
          $wrap.animate({left: 0}, '500', endCb)
        }else if(e.direction === 2){
          var next = (index + 1 + len) % len
          $items.eq(next).css({left: 2 * w + 'px', top: '0px'})
          $wrap.animate({left: -2 * w + 'px'}, '500', endCb)
        }
        function endCb(){
          $wrap.css({left: -w + 'px'})
          $items.eq(next).css({left: w + 'px'})
          $items.eq(index).css({left: 0, top: h + 'px'})
          index = next
          $('.dot').text(index)
          moving = false
        }
      })
    })
  }
})(jQuery)
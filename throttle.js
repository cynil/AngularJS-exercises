/**
 * fn will be triggered after [delay]ms
 */
function debounce(fn, delay){
    var timer
    return function(){
        var self = this,
            args = arguments
        clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(self, args)
        }, delay || 400)
    }
}

/**
 * fn will be triggered every [interval]ms
 */
function throttle(fn, interval){
	var stamp = Date.now()
    return function(){
        if(Date.now() - stamp > (interval || 100)){
            fn.apply(this, arguments)
            stamp = Date.now()
        }
    }
}

/**
 * e.g.
 */

//scroll callback will be called only when a scrollEvent happens at least 100ms later from the callback's last execution
$(window).on('scroll', throttle(function(event){
    console.log(event)
}))

//keyup callback will be called only when a keyupEvent happens 400ms later from previous keyup
$('input').on('keyup', debounce(function(event){
    console.log(event)
}))
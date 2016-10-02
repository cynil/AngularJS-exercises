//数字字符串转换成汉字，最多支持九千九百九十九亿九千九百九十九万九千九百九十九
//eg: 300 -> 三百，3004 -> 三千零四
/*
 *使用方法：
 * -js: 
 * angular.module('myModule', ['myFilters'])
 *
 * -html:
 * <div>{{'12344546' | num2Chn}}</div>
 * 
 * 
 * 
 * */
angular.module('myFilters', [])
    .filter('num2Chn', function(){
        
        var chn = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
        var ten = ['千', '百', '十', '']
        var wan = ['亿', '万', '']
        
        //先转换四位数以内的，因为更高位数都要分割成四位数
        function four(val){

            if(typeof val != 'string') {
                throw new TypeError('four needs a string')
            }
            
            var str = '', 
                len = val.length
            
            for(var i = 0; i < len; i++){
                var tmp = val.charAt(i) == '0' ? '零' : chn[val.charAt(i)] + ten[4 - len + i]
                str += tmp
            }
            
            str = str.replace(/零+/g, '零').replace(/零+$/, '')
            
            return str
        }
        
        return function(value){
            //todo
            var groups = [],
                str = value

            while(str.length > 0){
                groups.unshift(str.substr(-4))
                str = str.substr(0, str.length - 4)
            }

            return groups.map(function(v, i, arr){
                return four(v) + wan[3 - groups.length + i]
            }).join('')
        }
    })
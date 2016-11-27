function hanoi(num, src, mid, dst){
    if(num > 0){
        hanoi(num - 1, src, dst, mid)
        console.log('move disc' + num + ' from ' + src + ' to ' + dst)
        hanoi(num - 1, mid, src, dst)
    }
}

var num = process.argv[2]
hanoi(num || 3, '0', '1', '2')
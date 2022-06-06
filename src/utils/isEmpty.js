export default function isEmpty(params) {
    var checkResult = false;
    params.map((item, index) => {
        if(item == null || item == undefined || item == '' || item.length == 0)
            checkResult = true;
            return;
    })
    return checkResult;
}

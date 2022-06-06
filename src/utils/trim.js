export default function trim (param) {
    var result  = param.map((element) => {
        return element.trim();
    })
    return result;
}
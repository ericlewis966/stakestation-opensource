import isEthereumAddress from 'is-ethereum-address';

export default function checkEthereumAddress(params) {
    var checkResult = true;
    params.map((item, index) => {
        if(!isEthereumAddress(item))
            checkResult = false;
            return;
    })
    return checkResult;
}

import { Chain2Explorer } from 'src/network2label/networkLabel';

export default function getFullContractLink(chainId, address){
    return `${Chain2Explorer[chainId]}/address/${address}`;
}
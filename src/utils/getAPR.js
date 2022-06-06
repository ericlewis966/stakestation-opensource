export default function getAPR (rewardPerBlock, totalStakedTokens, blocksPerDay) {
    if(rewardPerBlock === 0 || totalStakedTokens === 0 || blocksPerDay === 0) {
        return 0;
    }
    console.log(rewardPerBlock, totalStakedTokens, blocksPerDay);
    console.log((20 / 0) * (400 * 365));
    return (rewardPerBlock / totalStakedTokens) * (blocksPerDay * 365);
}
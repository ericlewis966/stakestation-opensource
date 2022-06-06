import hash from 'object-hash';
import { enablePersistence } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteField } from 'firebase/firestore';
import { Config } from 'src/constants';
//util function
import { removeNonObjectItemsFromArray } from 'src/utils/checkArray';

import { GET_PROJECT } from 'src/actions/type';

const app = initializeApp(Config.firebaseConfig);
const database = getFirestore(app);


export const addNewProject = async (projectName, tokenSymbol, tokenAddress, telegram, twitter, website, projectBanner, tokenLogo, description, projectBannerUrl, tokenLogoUrl, chain) => {
    try {
        const docRef = await addDoc(collection(database, "projects"), {
            projectName: projectName,
            tokenSymbol: tokenSymbol,
            tokenAddress: tokenAddress,
            telegram: telegram,
            twitter: twitter,
            website: website,
            projectBanner: projectBanner,
            tokenLogo: tokenLogo,
            description: description,
            projectBannerUrl: projectBannerUrl,
            tokenLogoUrl: tokenLogoUrl,
            chain: chain,
            cryptostakings: [],
            lpfarms: []
        })
        console.log(docRef.id);
        return docRef.id;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getProjects = async () => {
    const querySnapshot = await getDocs(collection(database, 'projects'));
    var projects = [];
    querySnapshot.forEach(doc => {
        projects.push({
            id: doc.id,
            projectName: doc.data().projectName,
            cryptostakings: doc.data()?.cryptostakings?.length ? doc.data()?.cryptostakings?.length : 0,
            lpfarms: doc.data()?.lpfarms?.length ? doc.data()?.lpfarms?.length : 0
        });
    })
    return projects;
}

export const getFullProjects = async () => {
    const querySnapshot = await getDocs(collection(database, 'projects'));
    var projects = [];
    querySnapshot.forEach(doc => {
        projects.push({
            id: doc.id,
            projectName: doc.data().projectName,
            lpfarms: doc.data()?.lpfarms?.length ? doc.data()?.lpfarms?.length : 0,
            tokenLogo: doc.data()?.tokenLogo,
            projectBanner: doc.data()?.projectBanner,
            cryptoStakings: doc.data()?.cryptostakings ? doc.data()?.cryptostakings.length : 0,
            lpFarms: doc.data()?.lpfarms ? doc.data()?.lpfarms.length : 0,
            chain: doc.data()?.chain ? doc.data()?.chain : null,
            tokenSymbol: doc.data()?.tokenSymbol ? doc.data()?.tokenSymbol : null,
            telegram: doc.data()?.telegram ? doc.data()?.telegram : null,
            twitter: doc.data()?.twitter ? doc.data()?.twitter : null,
            website: doc.data()?.telegram ? doc.data()?.telegram : null,
        });
    })
    return projects;
}

export const getProjectById = (id) => async (dispatch) => {
    const project = await getDoc(doc(database, 'projects', id));
    // return project.data();
    dispatch({
        type: GET_PROJECT,
        payload: project.data()
    })
}

export const updateProject = async (id, projectName, tokenSymbol, tokenAddress, telegram, twitter, website, projectBanner, tokenLogo, description, projectBannerUrl, tokenLogoUrl, chain) => {
    try {
        const result = await updateDoc(doc(database, 'projects', id), {
            projectName: projectName,
            tokenSymbol: tokenSymbol,
            tokenAddress: tokenAddress,
            telegram: telegram,
            twitter: twitter,
            website: website,
            projectBanner: projectBanner,
            tokenLogo: tokenLogo,
            description: description,
            projectBannerUrl: projectBannerUrl,
            tokenLogoUrl: tokenLogoUrl,
            chain: chain,
        })
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export const addCryptoStakingToProject = async (id, stakingObj) => {
    let staking = stakingObj;
    staking['id'] = hash(stakingObj);
    const project = await getDoc(doc(database, 'projects', id));
    let cryptostakings = project.data()?.cryptostakings;
    if (cryptostakings === undefined || cryptostakings === null) {
        cryptostakings = [];
    }
    cryptostakings = removeNonObjectItemsFromArray(cryptostakings);
    cryptostakings.push(staking);
    try {
        await updateDoc(doc(database, 'projects', id), {
            cryptostakings: cryptostakings
        })
        await getProjectById(id);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const addLpFarmToProject = async (id, lpfarmObj) => {
    let lpfarm = lpfarmObj;
    lpfarm['id'] = hash(lpfarmObj);
    const project = await getDoc(doc(database, 'projects', id));
    let lpfarms = project.data()?.lpfarms;
    if (lpfarms === undefined || lpfarms === null) {
        lpfarms = [];
    }
    lpfarms = removeNonObjectItemsFromArray(lpfarms);
    lpfarms.push(lpfarm)
    try {
        await updateDoc(doc(database, 'projects', id), {
            lpfarms: lpfarms
        })
        await getProjectById(id);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const updateMasterSettings = async (projectId, masterStakeId, updateParams) => {
    console.log(projectId, masterStakeId, updateParams)
    const project = await getDoc(doc(database, 'projects', projectId));
    let cryptostakings = project.data()?.cryptostakings;
    if (cryptostakings === undefined || cryptostakings === null) {
        cryptostakings = [];
    }
    let targetStaking = cryptostakings.filter(staking => staking.id == masterStakeId)[0];

    const targetStakingIndex = cryptostakings.indexOf(targetStaking);

    cryptostakings[targetStakingIndex]['slippage'] = updateParams.slippage;
    cryptostakings[targetStakingIndex]['dexRouter'] = updateParams.dexRouter;
    cryptostakings[targetStakingIndex]['earnedStakePath'] = updateParams.earnedToStakePath;
    cryptostakings[targetStakingIndex]['reflectionStakePath'] = updateParams.reflectionToStakePath;
    cryptostakings[targetStakingIndex]['walletA'] = updateParams.walletA;

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            cryptostakings: cryptostakings
        })
        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const addSubStaking = async (projectId, masterStakeId, subStakingObj) => {
    let subStaking = subStakingObj;

    const project = await getDoc(doc(database, 'projects', projectId));
    let cryptostakings = project.data()?.cryptostakings;
    if (cryptostakings === undefined || cryptostakings === null) {
        cryptostakings = [];
        return false;
    }
    cryptostakings = removeNonObjectItemsFromArray(cryptostakings);
    let targetStaking = cryptostakings.filter(staking => staking['id'] == masterStakeId)[0];
    if (targetStaking === null || targetStaking === undefined) {
        return false;
    }
    const targetStakingIndex = cryptostakings.indexOf(targetStaking);
    let subStakingsOfTargetStaking = targetStaking['subStakings'] ? targetStaking['subStakings'] : [];
    // subStaking['id'] = subStakingsOfTargetStaking.length;
    subStakingsOfTargetStaking.push(subStaking);
    targetStaking['subStakings'] = subStakingsOfTargetStaking;
    cryptostakings[targetStakingIndex] = targetStaking;

    try {
        await getProjectById(projectId);
        await updateDoc(doc(database, 'projects', projectId), {
            cryptostakings: cryptostakings
        })
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const updateSubStakingForCryptoStaking = async (projectId, masterStakeId, updatedParams) => {
    console.log(projectId, masterStakeId, updatedParams);
    const project = await getDoc(doc(database, 'projects', projectId));
    let cryptostakings = project.data()?.cryptostakings;
    if (cryptostakings === undefined || cryptostakings === null) {
        cryptostakings = [];
        return false;
    }
    cryptostakings = removeNonObjectItemsFromArray(cryptostakings);
    let targetStaking = cryptostakings.filter(staking => staking['id'] == masterStakeId)[0];
    if (targetStaking === null || targetStaking === undefined) {
        return false;
    }
    const targetStakingIndex = cryptostakings.indexOf(targetStaking);
    let subStakingsOfTargetStaking = targetStaking['subStakings'] ? targetStaking['subStakings'] : [];
    let targetSubStaking = subStakingsOfTargetStaking.filter(subStaking => subStaking['id'] == updatedParams['id'])[0];

    const targetSubStakingIndex = subStakingsOfTargetStaking.findIndex(object => {
        return object.id === updatedParams.id
    })

    console.log("Before Process:", cryptostakings[targetStakingIndex].subStakings);

    cryptostakings[targetStakingIndex].subStakings[targetSubStakingIndex]['stakeDuration'] = updatedParams.stakeDuration;
    cryptostakings[targetStakingIndex].subStakings[targetSubStakingIndex]['depositFee'] = updatedParams.depositFee;
    cryptostakings[targetStakingIndex].subStakings[targetSubStakingIndex]['withdrawFee'] = updatedParams.withdrawFee;
    cryptostakings[targetStakingIndex].subStakings[targetSubStakingIndex]['rewardPerBlock'] = updatedParams.rewardPerBlock;

    console.log("After Process:", cryptostakings[targetStakingIndex].subStakings);

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            cryptostakings: deleteField()
        })

        await updateDoc(doc(database, 'projects', projectId), {
            cryptostakings: cryptostakings
        })
        console.log("CryptoStakings: ", cryptostakings);

        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const updateNoLock = async (projectId, id, updateParams) => {
    console.log(projectId, id, updateParams);

    const project = await getDoc(doc(database, 'projects', projectId));
    let cryptostakings = project.data()?.cryptostakings;
    if (cryptostakings === undefined || cryptostakings === null) {
        cryptostakings = [];
        return false;
    }

    cryptostakings = removeNonObjectItemsFromArray(cryptostakings);
    let targetStaking = cryptostakings.filter(staking => staking['id'] == id)[0];
    const targetStakingIndex = cryptostakings.indexOf(targetStaking);

    cryptostakings[targetStakingIndex]['slippage'] = updateParams.slippage;
    cryptostakings[targetStakingIndex]['dexRouter'] = updateParams.dexRouter;
    cryptostakings[targetStakingIndex]['earnedStakePath'] = updateParams.earnedToStakePath;
    cryptostakings[targetStakingIndex]['reflectionStakePath'] = updateParams.reflectionToStakePath;
    cryptostakings[targetStakingIndex]['depositFee'] = updateParams.depositFee;
    cryptostakings[targetStakingIndex]['withdrawFee'] = updateParams.withdrawFee;

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            cryptostakings: cryptostakings
        })
        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

}

export const updateRewardPerBlockForNoLockup = async (projectId, id, updatedRewardRate) => {
    console.log(projectId, id, updatedRewardRate);

    const project = await getDoc(doc(database, 'projects', projectId));
    let cryptostakings = project.data()?.cryptostakings;
    if (cryptostakings === undefined || cryptostakings === null) {
        cryptostakings = [];
        return false;
    }

    cryptostakings = removeNonObjectItemsFromArray(cryptostakings);
    let targetStaking = cryptostakings.filter(staking => staking['id'] == id)[0];
    const targetStakingIndex = cryptostakings.indexOf(targetStaking);

    cryptostakings[targetStakingIndex]['rewardPerBlock'] = updatedRewardRate;

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            cryptostakings: cryptostakings
        })
        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const updateStakeDurationForNoLockup = async (projectId, id, updatedDuration) => {
    console.log(projectId, id, updatedDuration);
    const project = await getDoc(doc(database, 'projects', projectId));
    let cryptostakings = project.data()?.cryptostakings;
    if (cryptostakings === undefined || cryptostakings === null) {
        cryptostakings = [];
        return false;
    }

    cryptostakings = removeNonObjectItemsFromArray(cryptostakings);
    let targetStaking = cryptostakings.filter(staking => staking['id'] == id)[0];
    const targetStakingIndex = cryptostakings.indexOf(targetStaking);

    cryptostakings[targetStakingIndex]['stakeDuration'] = updatedDuration;

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            cryptostakings: cryptostakings
        })
        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const updateWalletAForNoLockup = async (projectId, id, updatedWalletA) => {
    console.log(projectId, id, updatedWalletA)
    const project = await getDoc(doc(database, 'projects', projectId));
    let cryptostakings = project.data()?.cryptostakings;
    if (cryptostakings === undefined || cryptostakings === null) {
        cryptostakings = [];
        return false;
    }

    cryptostakings = removeNonObjectItemsFromArray(cryptostakings);
    let targetStaking = cryptostakings.filter(staking => staking['id'] == id)[0];
    const targetStakingIndex = cryptostakings.indexOf(targetStaking);

    cryptostakings[targetStakingIndex]['walletA'] = updatedWalletA;

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            cryptostakings: cryptostakings
        })
        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const addSubFarmForLPFarm = async (projectId, masterFarmId, subFarmObj) => {
    let subFarm = subFarmObj;

    const project = await getDoc(doc(database, 'projects', projectId));
    let lpfarms = project.data()?.lpfarms;
    if (lpfarms === undefined || lpfarms === null) {
        lpfarms = [];
        return false;
    }
    lpfarms = removeNonObjectItemsFromArray(lpfarms);
    let targetFarm = lpfarms.filter(farm => farm['id'] == masterFarmId)[0];
    if (targetFarm === null || targetFarm === undefined) {
        return false;
    }
    const targetFarmIndex = lpfarms.indexOf(targetFarm);
    let subFarmsOfTargetFarm = targetFarm['subFarms'] ? targetFarm['subFarms'] : [];
    subFarmsOfTargetFarm.push(subFarm);
    targetFarm['subFarms'] = subFarmsOfTargetFarm;
    lpfarms[targetFarmIndex] = targetFarm;

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            lpfarms: lpfarms
        })
        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getLPFarmByContractAddress = async (projectId, contractAddress) => {
    const project = await getDoc(doc(database, 'projects', projectId));
    let lpfarms = project.data()?.lpfarms;
    if (lpfarms === undefined || lpfarms === null) {
        lpfarms = [];
        return false;
    }
    lpfarms = removeNonObjectItemsFromArray(lpfarms);
    const targetFarm = lpfarms.filter(farm => farm['contractAddress'] == contractAddress)[0];
    return targetFarm;
}

export const updateRewardRateForLPFarm = async (projectId, farmId, updatedRewardRate) => {
    const project = await getDoc(doc(database, 'projects', projectId));
    let lpfarms = project.data()?.lpfarms;
    if (lpfarms === undefined || lpfarms === null) {
        lpfarms = [];
        return false;
    }
    lpfarms = removeNonObjectItemsFromArray(lpfarms);
    let targetFarm = lpfarms.filter(farm => farm['id'] == farmId)[0];
    if (targetFarm === null || targetFarm === undefined) {
        return false;
    }
    const targetFarmIndex = lpfarms.indexOf(targetFarm);
    lpfarms[targetFarmIndex]['rewardPerBlock'] = updatedRewardRate;

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            lpfarms: lpfarms
        })
        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const updateStartBlockForLPFarm = async (projectId, farmId, updatedStartBlock) => {
    const project = await getDoc(doc(database, 'projects', projectId));
    let lpfarms = project.data()?.lpfarms;
    if (lpfarms === undefined || lpfarms === null) {
        lpfarms = [];
        return false;
    }
    lpfarms = removeNonObjectItemsFromArray(lpfarms);
    let targetFarm = lpfarms.filter(farm => farm['id'] == farmId)[0];
    if (targetFarm === null || targetFarm === undefined) {
        return false;
    }
    const targetFarmIndex = lpfarms.indexOf(targetFarm);
    lpfarms[targetFarmIndex]['startBlock'] = updatedStartBlock;

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            lpfarms: lpfarms
        })
        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const updateFarmForCryptoStaking = async (projectId, masterFarmId, updatedParams) => {
    console.log(projectId, masterFarmId, updatedParams);
    const project = await getDoc(doc(database, 'projects', projectId));
    let lpfarms = project.data()?.lpfarms;
    if (lpfarms === undefined || lpfarms === null) {
        lpfarms = [];
        return false;
    }
    lpfarms = removeNonObjectItemsFromArray(lpfarms);
    let targetFarm = lpfarms.filter(farm => farm['id'] == masterFarmId)[0];
    if (targetFarm === null || targetFarm === undefined) {
        return false;
    }
    const targetFarmIndex = lpfarms.indexOf(targetFarm);
    let subFarmsOfTargetFarm = targetFarm['subFarms'] ? targetFarm['subFarms'] : [];
    let targetSubFarm = subFarmsOfTargetFarm.filter(subFarm => subFarm['id'] == updatedParams['id'])[0];

    const targetSubFarmIndex = subFarmsOfTargetFarm.indexOf(targetSubFarm);

    lpfarms[targetFarmIndex].subFarms[targetSubFarmIndex]['allocPoint'] = updatedParams.allocPoint;
    lpfarms[targetFarmIndex].subFarms[targetSubFarmIndex]['depositFee'] = updatedParams.depositFee;
    lpfarms[targetFarmIndex].subFarms[targetSubFarmIndex]['withdrawFee'] = updatedParams.withdrawFee;
    lpfarms[targetFarmIndex].subFarms[targetSubFarmIndex]['withUpdate'] = updatedParams.withUpdate;

    try {
        await updateDoc(doc(database, 'projects', projectId), {
            lpfarms: lpfarms
        })
        await getProjectById(projectId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const addTransactionLog = (txName, txContent) => {

}
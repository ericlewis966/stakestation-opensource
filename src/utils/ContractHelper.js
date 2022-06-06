import { ethers } from "ethers";
import ERC20 from "src/contracts/ERC20.json";

export const deploy = async (abi, byteCode, signer, params) => {
    const factory = new ethers.ContractFactory(abi, byteCode, signer);

    const contract = await factory.deploy(...params);

    await contract.deployed();

    return contract.address;
}

export const getContract = async (abi, byteCode, address, signer) => {
    const factory = await new ethers.ContractFactory(abi, byteCode, signer);

    const contract = await factory.attach(address);

    return contract;
}

export const getTokenInfo = async (address, signer) => {
    const contract = await getContract(ERC20.abi, ERC20.bytecode, address, signer);
    const name = await contract.name();
    const symbol = await contract.symbol();
    return {
        name: name,
        symbol: symbol
    }
}
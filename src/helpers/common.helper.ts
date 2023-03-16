import UIPoolDataProviderGoerliAbi from "../ContractAbis/Goerli/UIPoolDataProvider.json";
import UIPoolDataProviderMumbaiAbi from "../ContractAbis/PolygonMumbai/UIPoolDataProvider.json";
import UIPoolDataProviderAvalancheAbi from "../ContractAbis/AvalancheFuji/UIPoolDataProvider.json";
import UIPoolDataProviderArbitrumAbi from "../ContractAbis/Arbitrum/UIPoolDataProvider.json";
import UIPoolDataProviderOptimismAbi from "../ContractAbis/Arbitrum/UIPoolDataProvider.json";
import UIPoolDataProviderFantomAbi from "../ContractAbis/Fantom/UIPoolDataProvider.json";


export const convertNum =  (num:any) => {
    if (num > 1000000000000) {
      return (num / 100000000000000000000).toFixed(1) + "T";
    } else if (num > 1000000000) {
      return (num / 1000000000).toFixed(1) + "B"; // convert to B for number from > 1 Billion
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else {
      return num;
    }
  };


export  let blockchainAbis: any = {
    "0xC911B590248d127aD18546B186cC6B324e99F02c": {
      chainNetwork:"goerli",
      asset_id:"eth",
      abi: UIPoolDataProviderGoerliAbi,
      uiPoolDataProvider: "0xb00A75686293Fea5DA122E8361f6815A0B0AF48E",
      poolAddressProvider: "0xC911B590248d127aD18546B186cC6B324e99F02c",
      rpc: "https://eth-goerli.g.alchemy.com/v2/eMXu8vt19O_clsJvGUB78tUNC3ZQa_L6",
    },
    "0xeb7A892BB04A8f836bDEeBbf60897A7Af1Bf5d7F": {
      chainNetwork:"polygonMumbai",
      asset_id:"matic",
      abi: UIPoolDataProviderMumbaiAbi,
      uiPoolDataProvider: "0x928d9A76705aA6e4a6650BFb7E7912e413Fe7341",
      poolAddressProvider: "0xeb7A892BB04A8f836bDEeBbf60897A7Af1Bf5d7F",
      rpc: "https://polygon-mumbai.g.alchemy.com/v2/f5WznpGp4D5EM_zskPqsgqcw5cuwsKrp",
    },
    "0x220c6A7D868FC38ECB47d5E69b99e9906300286A": {
        chainNetwork:"avalancheFuji",
        asset_id:"avax",
        abi: UIPoolDataProviderAvalancheAbi,
        uiPoolDataProvider: "0x08D07a855306400c8e499664f7f5247046274C77",
        poolAddressProvider: "0x220c6A7D868FC38ECB47d5E69b99e9906300286A",
        rpc: "https://avalanche-fuji.infura.io/v3/0c3cfe9ddceb4cc79ab3578bc7e9b6d6",
      },
      "0x4EEE0BB72C2717310318f27628B3c8a708E4951C": {
        chainNetwork:"arbitrum",
        asset_id:"arb",
        abi: UIPoolDataProviderArbitrumAbi,
        uiPoolDataProvider: "0x583F04c0C4BDE3D7706e939F3Ea890Be9A20A5CF",
        poolAddressProvider: "0x4EEE0BB72C2717310318f27628B3c8a708E4951C",
        rpc: "https://arb-goerli.g.alchemy.com/v2/bhpsuy4-2RGbpYz1d86eSukGwxsrdt59",
      },
      "0x0b8FAe5f9Bf5a1a5867FB5b39fF4C028b1C2ebA9": {
        chainNetwork:"optimism",
        asset_id:"op",
        abi: UIPoolDataProviderOptimismAbi,
        uiPoolDataProvider: "0x9277eFbB991536a98a1aA8b735E9D26d887104C1",
        poolAddressProvider: "0x0b8FAe5f9Bf5a1a5867FB5b39fF4C028b1C2ebA9",
        rpc: "https://opt-goerli.g.alchemy.com/v2/bhRc5fNiy88h8OOW-E7aNlNOrRmbtHYk",
      },
      "0xC809bea009Ca8DAA680f6A1c4Ca020D550210736": {
        chainNetwork:"fantom",
        asset_id:"ftm",
        abi: UIPoolDataProviderFantomAbi,
        uiPoolDataProvider: "0x9a00043F98941DD4e02E1c7e78676df64F5e37a6",
        poolAddressProvider: "0xC809bea009Ca8DAA680f6A1c4Ca020D550210736",
        rpc: "https://ftm.getblock.io/c479070d-fdb7-40c6-8725-7d3cac6c90e1/testnet/",
      },
  };



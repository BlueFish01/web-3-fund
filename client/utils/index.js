import { ethers } from "ethers"

export const WeiToETH = (WeiBigNumber) => {
    const eth = ethers.utils.formatUnits(WeiBigNumber);
    return eth;
}

export const truncate = (str, n) => {
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};

export const msTodhm = (time)=>{
    const SEC = 1e3;
    const MIN = SEC * 60;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    
    const ms = Math.abs(time);
    const d = ms / DAY | 0;
    const h = ms % DAY / HOUR | 0;
    const m = ms % HOUR / MIN | 0;
    return `${d}Day(s) ${h}Hour(s) ${m}Minute(s)`;
};

export const msToday = (time)=>{
    const SEC = 1e3;
    const MIN = SEC * 60;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    
    const ms = Math.abs(time);
    const d = ms / DAY | 0;
    return `${d}Day(s)`;
};
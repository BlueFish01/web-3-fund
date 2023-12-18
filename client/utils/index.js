import { ethers } from "ethers"

export const WeiToETH = (WeiBigNumber) => {
    const eth = ethers.utils.formatUnits(WeiBigNumber);
    return eth;
}

export const truncate = (str, n) => {
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};

export const secToday = (time)=>{
    const SEC = 1;
    const MIN = SEC * 60;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    
    const ms = Math.abs(time);
    const d = ms / DAY | 0;
    return `${d}Day(s)`;
};


export const msTodhm = (time) => {
    const SEC = ethers.BigNumber.from(1);
    const MIN = SEC.mul(60);
    const HOUR = MIN.mul(60);
    const DAY = HOUR.mul(24);

    const ms = ethers.BigNumber.from(time);
    const d = ms.div(DAY);
    const h = ms.mod(DAY).div(HOUR);
    const m = ms.mod(HOUR).div(MIN);
    const s = ms.mod(MIN).div(SEC);

    return `${d} Day(s) ${h} Hour(s) ${m} Minute(s)`;
};

export const dayLeft = (endDate) => {
    const endData = endDate;
    const now = ethers.BigNumber.from(Date.now());
    const remainTime = endData.sub(now.div(1000));
    const dayleft = msTodhm(remainTime);
    return dayleft;
};

export const computeAvgScore = (scoreArray) => {
    let sumScore = 0;
    for(let i=0; i<scoreArray.length; i++){
        sumScore += scoreArray[i].toNumber();
    }
    const avgScore = (sumScore / scoreArray.length).toFixed(2);
    return avgScore;
}
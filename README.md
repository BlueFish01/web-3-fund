# web3-P2P rental platform

decentralized application utilizing smart contracts for borrowing
real-world items. This dApp operates on blockchain technology, enabling peer-to-peer transactions without the need
for intermediaries like banks or traditional lending institutions.

### Tools & Framework
- Thirdweb for smartcontract and SDK [Link](https://portal.thirdweb.com/)
- Next.js Frontend [Link](https://nextjs.org/)
- Mui design component [Link](https://mui.com/) 

## run local Blockchaibn network

from root

`$ cd localblockchain`  
   
`$ npx hardhat node --network hardhat`

add the wallet address to our metamask wallet   

>check this for more detail   
    - How to host Blockchain Locally and Deploy smart contract on thirdweb [Link](https://www.youtube.com/watch?v=_zTHUUOZdec)

## Deploy smart contract

from root

`$ cd rentcontract`   
   
`$ npx thirdweb deploy`

> For ***Error: Unauthorized - You don't have permission to use this service.*** [Check this](https://portal.thirdweb.com/deploy/faqs)

## how to run project (Frontend)

from root

`$ cd client`

install dependencies

`$ npm install`

> setup `.env.local` in `/client`   
- create `.env.local`, copy env format from `.env.example`
    - Client ID & secret key [Link](https://thirdweb.com/create-api-key) make sure to add localhost:3000 to the list of allowed origins to use it locally
    - Contract address [Link](https://thirdweb.com/dashboard/contracts/deploy) 

run project

`$ npm run dev`





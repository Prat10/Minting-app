import {useState} from 'react';
import {ethers,BigNumber} from 'ethers';
import MyNFT from './MyNFT.json'
import {Box,Button,Flex,Text,Input} from "@chakra-ui/react";

const MyNFTAddress="0x861a2f7cCD96184BdCaAD9dcf299db34876BBDc0";

const MainMint=({accounts,setAccounts})=>{
    const [mintAmount,setMintAmount]=useState(1);
    const isConnected=Boolean(accounts[0]);
    
    async function handleMint(){
        if(window.ethereum){
            const provider=new ethers.providers.Web3Provider(window.ethereum);
            const signer=provider.getSigner();
            const contract=new ethers.Contract(
                MyNFTAddress,
                MyNFT.abi,
                signer
            );
            try{
             const response=await contract.mint(BigNumber.from(mintAmount),{
                 value: ethers.utils.parseEther((0.02*mintAmount).toString()),
             })
             console.log('response:',response);
            }catch(err){
                console.log("error",err)
            }
        }
    }
    const handleDecrement =()=>{
        if(mintAmount<=1) return;
        setMintAmount(mintAmount-1);
    };
    const handleIncrement =()=>{
        if(mintAmount>=3) return;
        setMintAmount(mintAmount+1);
    };
    return(
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
        <Box width="520px">
            <div>
         <Text fontSize="48px" textShadow="0 5px #000000">MyNFT</Text>
         <Text
         fontSize="30px"
         letterSpacing="-5.5%"
         fontFamily="VT323"
         textShadow="0 2px 2px #000000" 
         >
         MyNFT is My Personal Minting Website<br/> I build this On Date: 16.04.2022
         <br/>Day: Saturday Creating NFT is Something which excite Everyone
         </Text>
         </div>

        {isConnected ? (
            <div>
                <Flex justify="center" align="center">
                <Button
                              backgroundColor="#D6517D"
                              borderRadius="5px"
                              boxShadow="opx 2px 2px 1px #0F0F0F" 
                              color="white"
                              cursor="pointer"
                              fontFamily="inherit"
                              padding="15px"
                              margin="0 15px"
                              onClick={handleDecrement}>-</Button>
                                <Input
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number" 
                                value={mintAmount}/>
                <Button
                     backgroundColor="#D6517D"
                     borderRadius="5px"
                     boxShadow="opx 2px 2px 1px #0F0F0F" 
                     color="white"
                     cursor="pointer"
                     fontFamily="inherit"
                     padding="15px"
                     margin="0 15px"
                     onClick={handleIncrement}>+</Button>
                    </Flex>
                    <Button 
                    backgroundColor="Purple"
                    borderRadius="5px"
                    boxShadow="opx 2px 2px 1px #0F0F0F" 
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    margin="0 15px"
                    marginTop="10px"
                    onClick={handleMint}>Mint Now</Button>
            </div>
        ):(
            <p>You should be connected to Mint.</p>
        )}
        </Box>
       </Flex>
    );
} 
export default MainMint;

import React, {useState} from "react";

const IPDisplay = () => {
    const [decimalIP, setDecimalIP] = useState([0,0,0,0]);
    
    let [binaryIP, setBinaryIP] = useState([
        [false, false, false, false,false, false, false, false],
        [false, false, false, false,false, false, false, false],
        [false, false, false, false,false, false, false, false],
        [false, false, false, false,false, false, false, false]
    ]);

    //Helper method to convert decimal number 
    //Input: decimal number between 0 and 255
    //Output: Array of boolean values of length 8
    let convertDecimalToBinary = (octet: number): boolean[] => {
        let result: boolean[] = [];
        let temp = octet;
        console.log(temp)

        for(let i = 7; i >= 0; i--){
            let bitValue = Math.pow(2, i);
            
            if(bitValue <= temp){
                result.push(true);
                temp -= bitValue;
            }else{
                result.push(false);
            }            
        }        

        return result;
    }
    //Helper method to convert binary values to decimal values
    //Input: array of boolean values of length 8
    //Output: 
    let convertBinaryToDecimal = (octet: boolean[]): number => {
        let result = 0;

        for(let i = 0; i < 8; i++){
            result += !octet[i]? 0 : Math.pow(2, 7 - i);
        }
        return result;
    }

    //index: number : index of which part of the IP is being changed
    //returns method for which part of the iP is being changed
    let handleChangeDecimal = (index: number) => (e: React.ChangeEvent<HTMLInputElement>): void => {
        let decimalValue = parseInt(e.target.value);
        
        if(decimalValue > 255 || decimalValue < 0){
            return;
        }
        let temp = [...decimalIP];
        temp[index] = decimalValue;
        setDecimalIP(temp);
        let binaryValue = convertDecimalToBinary(decimalValue);
        
        let tempBinaryIp = [...binaryIP];
        tempBinaryIp[index] = binaryValue
        setBinaryIP(tempBinaryIp);
    }

    let handleBitClicked = (octetIndex: number, bitIndex: number) => (e: React.ChangeEvent<HTMLInputElement>): void => {
        let temp = [...binaryIP];
        temp[octetIndex][bitIndex] = !temp[octetIndex][bitIndex];
        setBinaryIP(temp);

        let newDecimalOctet = convertBinaryToDecimal(temp[octetIndex]);
        let tempDecimalIP = [...decimalIP];
        tempDecimalIP[octetIndex] = newDecimalOctet;
        setDecimalIP(tempDecimalIP);
        

    } 

    const displayDecimal = (): JSX.Element => {
        return(
            <div className="decimalDisplay">
                {decimalIP.map((octet, index) => {
                    return <input type="number" value={decimalIP[index]} onChange={handleChangeDecimal(index)}/>
                })}
            </div>
        )
    }

    let displayBinary = (): JSX.Element => {
        return(
            <div className="binaryDisplay">
                {binaryIP.map((octet, indexO) => 
                <span>
                    {octet.map((bit, indexB) => { 
                        return <input type="checkbox" checked={binaryIP[indexO][indexB]} onChange={handleBitClicked(indexO, indexB)}/>
                })}
                ||||||</span>  
            )}
            </div>
        )
    }



    //To be implemented for when backspace is pressed when value is of length 1 to change value to 0
    let handleKeyDown = (e: React.KeyboardEvent) => {
        
    }

    return(
    <div>
        <h2>IP Address</h2>

        {displayDecimal()}
        {displayBinary()}
        
    </div>
    );
}

export default IPDisplay;
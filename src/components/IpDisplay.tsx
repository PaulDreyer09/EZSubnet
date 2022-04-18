import React, {useState} from "react";

const IPDisplay = () => {
    const [ip, setIp] = useState([0,0,0,0]);
    
    let [ipBits, setIpBits] = useState([
        [false, false, false, false,false, false, false, false],
        [false, false, false, false,false, false, false, false],
        [false, false, false, false,false, false, false, false],
        [false, false, false, false,false, false, false, false]
    ]);

    
    let convertDecimalToBinary = () => {
        
    }
    //Helper method to convert binary values to decimal values
    //Input array of boolean values
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
        let value = parseInt(e.target.value);
        
        if(value <= 255 && value >= 0){
            let temp = [...ip];
            temp[index] = value;
            setIp(temp);
        }
    }

    let handleBitClicked = (octetIndex: number, bitIndex: number) => (e: React.ChangeEvent<HTMLInputElement>): void => {
        let temp = [...ipBits];
        temp[octetIndex][bitIndex] = !temp[octetIndex][bitIndex];
        setIpBits(temp);

        let newDecimalOctet = convertBinaryToDecimal(temp[octetIndex]);
        let tempDecimalIP = [...ip];
        tempDecimalIP[octetIndex] = newDecimalOctet;
        setIp(tempDecimalIP);
        

    } 

    let displayBinary = (): JSX.Element => {
        return(
            <div>
                {ipBits.map((octet, indexO) => 
                <span>
                    {octet.map((bit, indexB) => { 
                        return <input type="checkbox" checked={ipBits[indexO][indexB]} onChange={handleBitClicked(indexO, indexB)}/>
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
        <div className="decimalDisplay">
            <input type="text" value={ip[0]} onChange={handleChangeDecimal(0)} />
            <input type="text" value={ip[1]} onChange={handleChangeDecimal(1)}/>
            <input type="text" value={ip[2]} onChange={handleChangeDecimal(2)}/>
            <input type="text" value={ip[3]} onChange={handleChangeDecimal(3)}/>
        </div>
        <div className="binaryDisplay">
            {displayBinary()}
        </div>
    </div>
    );
}

export default IPDisplay;
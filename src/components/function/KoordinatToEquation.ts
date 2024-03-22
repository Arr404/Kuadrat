import {BoxMap} from "@/components/ui/Container";

export function KoordinatToEquation(arr:BoxMap) {
    const distanceX = 32
    const distanceOne = 16

    let firstEqConst = 0;
    let secondEqConst = 0;

    let firstEqX = 0;
    let secondEqX = 0;

    const keys = Object.keys(arr);
    if(keys.length <= 0){
        return "Arr Zero"
    }
    const firstBox = arr[keys[0]];
    let propLeft = firstBox.left;
    let propTop = firstBox.top;
    for (const key in arr) {
        if (arr.hasOwnProperty(key) && (propTop !== arr[key].top || propLeft !== arr[key].left)) {
            const box = arr[key];
            if(Math.abs(propTop - box.top ) === (box.title === "X"?distanceX:distanceOne)){
                box.title !== "X" ?
                    firstEqConst+=1
                    :
                    firstEqX+=1

                propTop = box.top
            }

            if(Math.abs(propLeft - box.left) === (box.title === "X"?distanceX:distanceOne)){
                box.title !== "X" ?
                    secondEqConst+=1
                    :
                    secondEqX+=1
                propLeft = box.left
            }
            console.log(Math.abs(propTop - box.top ),(box.title === "X"?distanceX:distanceOne));
            console.log(Math.abs(propLeft - box.left ),(box.title === "X"?distanceX:distanceOne));
        }
    }
    return {firstEqConst,secondEqConst,firstEqX,secondEqX}
}

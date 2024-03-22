import {BoxMap} from "@/components/ui/Container";

const distanceLong = 64
const distanceShort = 32
function isSideLeft(arr: BoxMap, keyNow: string, keyNext: string,next: number) {

    if (keyNow !== keyNext) {
        const boxNow = arr[keyNow];
        const boxNext = arr[keyNext];
        if (Math.abs(boxNow.left-boxNext.left) === next && Math.abs(boxNow.top-boxNext.top) === 0) {
            return boxNext;
        }
    }
    return false;
}

function isSideTop(arr: BoxMap, keyNow: string, keyNext: string,next: number) {
    if (keyNow !== keyNext) {
        const boxNow = arr[keyNow];
        const boxNext = arr[keyNext];
        if (Math.abs(boxNow.top-boxNext.top) === next && Math.abs(boxNow.left-boxNext.left) === 0) {
            return boxNext;
        }
    }
    return false;
}
export function sortBoxMapByLeft(arr: BoxMap): BoxMap {
    // Convert the BoxMap object to an array of [key, value] pairs
    const entries = Object.entries(arr);

    // Sort the array based on the 'left' property of the value
    const sortedEntries = entries.sort((a, b) => a[1].left - b[1].left);

    // Convert the sorted array back to a BoxMap object
    const sortedBoxMap: BoxMap = {};
    for (const [key, value] of sortedEntries) {
        sortedBoxMap[key] = value;
    }

    return sortedBoxMap;
}

export function sortBoxMapByTop(arr: BoxMap): BoxMap {
    // Convert the BoxMap object to an array of [key, value] pairs
    const entries = Object.entries(arr);

    // Sort the array based on the 'left' property of the value
    const sortedEntries = entries.sort((a, b) => a[1].top - b[1].top);

    // Convert the sorted array back to a BoxMap object
    const sortedBoxMap: BoxMap = {};
    for (const [key, value] of sortedEntries) {
        sortedBoxMap[key] = value;
    }

    return sortedBoxMap;
}

function getEqFromArr(arr: BoxMap, isLeft: boolean){
    let firstEqBox:string[] = []
    let keyPropBox = Object.keys(arr)[0]
    let propBox = arr[keyPropBox];
    firstEqBox.push(propBox.title)

    for (const key in arr) {
        if (arr.hasOwnProperty(key) && key !== keyPropBox) {
            const nextLeft = arr[keyPropBox].title === "1" || arr[keyPropBox].title === "X" ? distanceShort : distanceLong;
            const nextTop = arr[keyPropBox].title === "1" || arr[keyPropBox].title === "X(h)" ? distanceShort : distanceLong;
            const next = isLeft?nextLeft:nextTop;
            const isSideResult = isLeft?isSideLeft(arr, keyPropBox, key,next):isSideTop(arr, keyPropBox, key,next);
            if(isSideResult){
                propBox = arr[key]
                keyPropBox = key
                firstEqBox.push(propBox.title)
            }
        }

    }
    return firstEqBox;
}

function transformBoxToEq(arrBox:string[], isLeft: boolean){
    let EqX = 0
    let EqConst = 0

    for( const box in arrBox){
        switch(arrBox[box]) {
            case "X^2":
                EqX += 1;
                break;
            case "X(h)":
                isLeft? EqX += 1 : EqConst += 1;
                break;
            case "X":
                !isLeft? EqX += 1 : EqConst += 1;
                break;
            case "1":
                EqConst += 1;
                break;
            default:
                break;
        }
    }
    return {EqX,EqConst}
}
export function KoordinatToEquation(arr:BoxMap) {


    let firstEqConst = 0;
    let secondEqConst = 0;

    let firstEqX = 0;
    let secondEqX = 0;

    let allKeyBox = Object.keys(arr);
    if(allKeyBox.length <= 0){
        return "Array Zero data"
    }

    const firstEqBox = getEqFromArr(sortBoxMapByLeft(arr),true)
    const secondEqBox = getEqFromArr(sortBoxMapByTop(arr),false)
    const toEqFirst = transformBoxToEq(firstEqBox,true)
    const toEqSecond = transformBoxToEq(secondEqBox,false)

    const EqXFirst = toEqFirst.EqX !== 0 ? `${toEqFirst.EqX}X` : '';
    const EqXsecond = toEqSecond.EqX !== 0 ? `${toEqSecond.EqX}X` : '';

    const EqConstFirst = toEqFirst.EqConst !== 0 ? `${toEqFirst.EqConst}` : '';
    const EqConstsecond = toEqSecond.EqConst !== 0 ? `${toEqSecond.EqConst}` : '';

    const parts = [EqXFirst, EqConstFirst].filter(Boolean);
    const parts2 = [EqXsecond, EqConstsecond].filter(Boolean);
    const stringEq = `(${parts.join(' + ')}) (${parts2.join('+')})`

    return (stringEq)
}


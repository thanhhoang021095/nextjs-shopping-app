import { clearDataLocal } from "controllers/redux/lib/reducerConfig";

const formatCurrency = (number: number): (string | number) => {
    if (isNaN(number)) return number;
    else return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

const sumPrice = (arr):number => {
    return arr.length && arr.map(item => item.price * item.quantity).reduce((acc, cur) => {
        return acc + cur;
    }, 0)
}

const clearLocalStorage = ():void => {
    clearDataLocal("access_token");
    clearDataLocal("refresh_token");
    clearDataLocal("persist:root");
}

interface ImageDimension {
    width: string;
    height: string;
}
const getDimensionImageFromUrl = (url: string):ImageDimension => {
    if (!url) {
        return {
            width: "0",
            height: "0"
        }
    }

    const regexDimension = /([0-9]+)(?:x)([0-9]+)/;
    const arr = url.match(regexDimension)[0].split("x");
    if (arr.length == 2) {
        return {
            width: arr[0],
            height: arr[1]
        }
    }
}

const replaceDimensionImageFromUrl = (url: string, width: number, height: number):string  => {
    if (!url) {
        return "";
    }

    const regexDimension = /([0-9]+)(?:x)([0-9]+)/;
    if (width == 0 ||  height == 0) {
        return "";
    }
    const res:string = url.replace(regexDimension, `${width}x${height}`);
    return res
}

const parseStringOptionValue = (str: string): string[] => str.split("_");

const copyObject = <T>(obj: T):T => JSON.parse(JSON.stringify(obj));

export {
    formatCurrency,
    sumPrice,
    clearLocalStorage,
    getDimensionImageFromUrl,
    replaceDimensionImageFromUrl,
    copyObject,
    parseStringOptionValue
}
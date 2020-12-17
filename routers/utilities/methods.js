export const getRandomCharts = length => {
    let maxLength = length > 0 ? length : 10;
    const chartList = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9'
    ];
    const maxIndex = chartList.length - 1;
    const resultList = [];
    Array.apply(null, { length: maxLength })
        .forEach((item, index) => {
            const randomIndex = Math.round(Math.random() * maxIndex);
            resultList.push(chartList[randomIndex]);
        });
    return resultList.join('');
};

export const isEmptyField = value => {
    return (value === '') || (value === undefined);
};

const methods = {
    getRandomCharts,
    isEmptyField
};

export const encodeQuotationMarks = (string, transformDouble = false) => {
    const str1 = string.replace(/\'/g, '&#39');
    if (transformDouble) return str1.replace(/\"/g, '&#34');
    return str1;
};

export const decodeQuotationMarks = (string, transformDouble = false) => {
    const str1 = string.replace(/&#39/g, "'");
    if (transformDouble) return str1.replace(/&#34/g, '"');
    return str1;
};

export default methods;
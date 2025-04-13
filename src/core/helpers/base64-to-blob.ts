export const base64ToBlobUrl = (base64: string, type = 'image/jpeg') => {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    const blob = new Blob([arr], {type});
    return URL.createObjectURL(blob);
};

export const base64ToBlobUrlZip = (base64: string, type = 'application/pdf') => {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], {type});
};
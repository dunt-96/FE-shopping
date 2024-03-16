export const isJsonString = (data: any) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }

    return true;
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
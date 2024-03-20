
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

export const renderOptions = (arr) => {
    console.log('arr', arr);
    let renderArray = <any>[];
    if (arr) {
        renderArray = arr?.map((opt) => {
            return {
                value: opt,
                label: opt
            }
        });

        renderArray.push({
            label: "Them moi",
            value: "add_type"
        })
    }

    return renderArray;
}
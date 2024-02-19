export const displayImageUrl = (
    imageUrl: string,
    selectedImage: string | null
) => {
    if (selectedImage) {
        return selectedImage;
    }
    if (imageUrl) {
        return imageUrl;
    }

    return "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";
};

export const displayImageUrlWithSelectedImage = (imageUrl: string) => {
    if (imageUrl) {
        return imageUrl;
    }

    return "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";
};

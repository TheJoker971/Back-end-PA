import { createCanvas, loadImage } from 'canvas';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebase';

const addTextToImage = async (file: Buffer, text: string): Promise<string> => {
    const image = await loadImage(file);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Dessiner l'image
    ctx.drawImage(image, 0, 0);

    // Ajouter le texte
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(text, 50, 50); // Vous pouvez ajuster la position selon vos besoins

    // Convertir le canvas en buffer
    const buffer = canvas.toBuffer('image/png');

    // Télécharger l'image sur Firebase Storage
    const storageRef = ref(storage, `images/${text}.png`);
    const snapshot = await uploadBytes(storageRef, buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
};

export default addTextToImage;

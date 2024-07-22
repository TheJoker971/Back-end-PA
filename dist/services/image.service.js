"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
const firebase_1 = require("../firebase");
const addTextToImage = (file, text) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield (0, canvas_1.loadImage)(file);
    const canvas = (0, canvas_1.createCanvas)(image.width, image.height);
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
    const storageRef = (0, firebase_1.ref)(firebase_1.storage, `images/${text}.png`);
    const snapshot = yield (0, firebase_1.uploadBytes)(storageRef, buffer);
    const downloadURL = yield (0, firebase_1.getDownloadURL)(snapshot.ref);
    return downloadURL;
});
exports.default = addTextToImage;

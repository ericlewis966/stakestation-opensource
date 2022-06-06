export default function toBase64(file) {
    const reader = new FileReader();

    var base64 = null;
    reader.onload = () => {
        base64 = reader.result.replace("data:", "").replace(/^.+,/, "");
    }

    reader.readAsDataURL(file);
}
export function transformPathKebabCase(path: string, prefix?: string) {
  return `${prefix || ""}${path
    ?.toLowerCase()
    .trim()
    .replace(/[ _\\/]/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/[-]+/g, "-")}`;
}

export const transformBase64File = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function generateCaptionForImage(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      systemInstruction:
        "You are a helpful assistant that generates short, cute image captions.",
    },
  });


  const caption = response.text?.trim();

  console.log("AI CAPTION", caption);

  return caption; 
}

module.exports = generateCaptionForImage;

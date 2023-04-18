// отправить обращение

// перепишу any на типы, когда буду переписывать на ртк
// новый запрос, который нужно переписать на ртк
export const addFeedback = async (form: any): Promise<any | undefined> => {
  const res = await fetch(`${process.env.api_root}/feedbacks/addFeedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  return data;
};

// загрузить фото из "обращения"

// новый запрос, который нужно переписать на ртк
export async function uploadHelpImage(file: File) {
  try {
    const filePreview = new FormData();
    filePreview.append("file", file);
    filePreview.append("folder", "feedbacks");

    const res = await fetch(`${process.env.api_root}/files/uploadPhoto`, {
      method: "POST",
      body: filePreview,
    });

    const data = await res.json();

    return { data, localeURL: URL.createObjectURL(file) };
  } catch (error) {
    console.log(error);
  }
}

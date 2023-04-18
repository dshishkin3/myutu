import Image from "next/image";
import React, { ChangeEvent, FC } from "react";

import { filesApi } from "app/store/services/files";

import { FeedbackUploadField } from "app/web/shared/ui";

import support_upload from "app/assets/images/support_upload.svg";

interface IFeedbackUploadProps {
  localeLinkPreview: string;
  localeLinkVideo: string;
  setLocaleLinkVideo: (arg0: string) => void;
  setLocaleLinkPreview: (arg0: string) => void;
  setValues: (arg0: string) => void;
}

export const FeedbackUpload: FC<IFeedbackUploadProps> = ({
  setLocaleLinkVideo,
  setLocaleLinkPreview,
  setValues,
  localeLinkPreview,
  localeLinkVideo,
}) => {
  const [uploadPhotoQuery] = filesApi.useUploadPhotoMutation();
  const [uploadVideoQuery] = filesApi.useUploadVideoMutation();

  // отправка видео
  const fetchVideo = async (file: File) => {
    let payloadData = new FormData();
    payloadData.append("file", file);
    payloadData.append("folder", "videos");
    const payload = await uploadVideoQuery(payloadData).unwrap();

    if (payload) {
      setLocaleLinkVideo(URL.createObjectURL(file));
      setLocaleLinkPreview("");
      setValues(payload.link);
    }
  };

  // отправка фото
  const fetchPreview = async (file: File) => {
    let payloadData = new FormData();
    payloadData.append("file", file);
    payloadData.append("folder", "feedbacks");
    const payload = await uploadPhotoQuery(payloadData).unwrap();
    console.log(payload);

    if (payload) {
      setLocaleLinkPreview(URL.createObjectURL(file));
      setLocaleLinkVideo("");
      setValues(payload.link);
    }
  };

  // загрузка файлов
  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.target.files as FileList)[0];

    if (file.type === "video/mp4") {
      console.log("video");
      fetchVideo(file);
    } else {
      console.log("photo");
      fetchPreview(file);
    }
  };

  return (
    <div>
      <FeedbackUploadField
        value={localeLinkPreview ? localeLinkPreview : localeLinkVideo}
        name={localeLinkPreview ? "Photo" : "Video"}
        id="Preview"
        handleChange={handleChangeFile}
        required={true}
      >
        <>
          <Image src={support_upload} alt="upload" width={24} height={24} />
          <span>Загрузите фото или видео</span>
        </>
      </FeedbackUploadField>
    </div>
  );
};

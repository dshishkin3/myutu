import React, { FC } from "react";
import {
  ImgAddImage,
  ImgAddVideo,
  ImgDeleteImg,
  ImgSuccessLoaded,
  ImgErrorLoaded,
} from "app/web/shared/config/images";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setImages,
  setVideo,
  setPreview,
  removeVideo,
  removePreview,
  removeImage,
} from "app/store/slices/adSlice";
import { RootState } from "app/store/store";
import style from "./style.module.scss";
import { filesApi } from "app/store/services/files";
import { FOLDER_NAME_STORAGE } from "app/shared/config/constants/folder_name_storage";

export const UploadMediaMobile: FC = () => {
  const { images, preview, video } = useSelector(
    (state: RootState) => state.ad
  );
  const dispatch = useDispatch();
  const [uploadFileQuery] = filesApi.useUploadPhotoMutation();
  const [uploadVideoQuery] = filesApi.useUploadVideoMutation();

  const handleDrop = async (type: string, event: any) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 10) return false;
  };

  const handleClickFile = (type: string) => {
    let input = document.createElement("input");
    input.type = "file";
    input.value = "";
    input.accept = type === "video" ? ".mp4,.mov" : ".png,.svg,.jpg,.jpeg";

    input.onchange = (event) => handleUploadFiles(type, event.target?.files);
    input.click();
  };

  const handleUploadFiles = async (type: any, files: File[]) => {
    switch (type) {
      case "images": {
        [...files].forEach(async (file: any, index) => {
          try {
            const fD = new FormData();
            fD.append("file", file);
            fD.append("folder", FOLDER_NAME_STORAGE.IMAGES);
            const payload = await uploadFileQuery(fD).unwrap();
            dispatch(
              setImages({
                file: "",
                status: "success",
                source: URL.createObjectURL(file),
                link: payload.link,
              })
            );
          } catch (err) {
            dispatch(
              setImages({
                file: "",
                status: "failed",
                source: URL.createObjectURL(file),
                link: null,
              })
            );
            throw `Ошибка в загрузке фотографий`;
          }
        });
        break;
      }
      // case "video": {
      //     try {
      //         const fD = new FormData();
      //         fD.append("file", files[0]);
      //         fD.append("folder", FOLDER_NAME_STORAGE.VIDEOS);
      //         const payload = await uploadVideoQuery(fD).unwrap();
      //         dispatch(
      //             setVideo({
      //                 file: null,
      //                 status: "success",
      //                 source: URL.createObjectURL(files[0]),
      //                 link: payload.link,
      //             })
      //         );
      //     } catch (err) {
      //         dispatch(
      //             setVideo({
      //                 file: files[0],
      //                 status: "failed",
      //                 source: URL.createObjectURL(files[0]),
      //                 link: null,
      //             })
      //         );
      //         throw `Ошибка в загрузке фотографий`;
      //     }
      //     break;
      // }
    }
  };

  return (
    <div className={style.upload_media}>
      <div
        className={style.upload_media__drop_box}
        onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
        onDrop={(event) => handleDrop("images", event)}
      >
        <button onClick={() => handleClickFile("images")}>
          Загрузите фото или видео
        </button>
        <span>*обязательное поле</span>
      </div>
      <div className="flex flex-wrap mt-[14px] gap-[15px]">
        {images.map((key, index) => {
          return (
            <div className="relative" key={key.source}>
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  zIndex: 1,
                  cursor: "pointer",
                }}
                onClick={() => dispatch(removeImage(index))}
              >
                <Image src={ImgDeleteImg} width={24} />
              </span>
              <Image
                src={key.source}
                width={76}
                height={76}
                className="rounded-[6px] "
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 6,
                  left: 6,
                }}
              >
                <Image src={ImgSuccessLoaded} width="24" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { useRef, useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";

export default function Editor() {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [imageSource, setImageSource] = useState(
    "https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSource(e.target?.result as string);
        setIsImgEditorShown(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="m-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      {isImgEditorShown && (
        <div className="flex-1">
          <FilerobotImageEditor
            source={imageSource}
            savingPixelRatio={1}
            previewPixelRatio={1}
            onSave={(editedImageObject, designState) =>
              console.log("saved", editedImageObject, designState)
            }
            onClose={closeImgEditor}
            annotationsCommon={{
              fill: "#ff0000",
            }}
            Text={{ text: "Filerobot..." }}
            Rotate={{ angle: 90, componentType: "slider" }}
            Crop={{
              presetsItems: [
                {
                  titleKey: "classicTv",
                  descriptionKey: "4:3",
                  ratio: 4 / 3,
                  // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                },
                {
                  titleKey: "cinemascope",
                  descriptionKey: "21:9",
                  ratio: 21 / 9,
                  // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                },
              ],
              presetsFolders: [
                {
                  titleKey: "socialMedia", // will be translated into Social Media as backend contains this translation key
                  // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                  groups: [
                    {
                      titleKey: "facebook",
                      items: [
                        {
                          titleKey: "profile",
                          width: 180,
                          height: 180,
                          descriptionKey: "fbProfileSize",
                        },
                        {
                          titleKey: "coverPhoto",
                          width: 820,
                          height: 312,
                          descriptionKey: "fbCoverPhotoSize",
                        },
                      ],
                    },
                  ],
                },
              ],
            }}
            tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
            defaultTabId={TABS.ANNOTATE} // or 'Annotate'
            defaultToolId={TOOLS.TEXT} // or 'Text'
          />
        </div>
      )}
    </div>
  );
}

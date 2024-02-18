import { FrameData } from "@/types/types";
import Image from "next/image";

const ImageSection = ({ imageUrl }: any) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <Image src={imageUrl} alt="Frame Image" height={500} width={500} className="object-contain" />
    </div>
  );
};

export default ImageSection;

import { NextResponse } from "next/server";
import { cloudinary } from ".";
import { UploadApiResponse } from "cloudinary";

type UploadResponse =
  | { status: number; response: UploadApiResponse }
  | NextResponse<{ message: string }>;


  
const isSvg = (fileUri: string) => {
  return fileUri.startsWith("data:image/svg+xml");
};

const uploadToCloudinary = async (
  fileUri: string,
  fileName: string
): Promise<UploadResponse> => {
  try {
    const resourceType = isSvg(fileUri) ? "raw" : "auto";

    const response = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      resource_type: resourceType,
      filename_override: fileName,
      folder: "authoke-service-image",
      use_filename: true,
    });

    return {
      status: 201,
      response,
    };
  } catch (err: unknown) {
    const error = err as Error;

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

export default uploadToCloudinary;

import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { generateProjectFileMap } from "@/utils/generate/projectFiles";
import { normalizeConfig } from "@/utils/projectGenerator";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const config = normalizeConfig(body);
    const zip = new JSZip();
    const files = generateProjectFileMap(config);

    Object.entries(files).forEach(([path, content]) => {
      zip.file(path, content);
    });

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${config.framework}-project.zip`,
      },
    });
  } catch (error) {
    console.error("Error generating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

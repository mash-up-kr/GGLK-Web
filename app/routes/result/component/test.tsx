import { useCallback, useEffect, useRef, useState } from "react";

export default function TestComponent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [extractedImage, setExtractedImage] = useState<string | null>(null);
  const [browserInfo, setBrowserInfo] = useState("");

  // 브라우저 정보 감지 로직
  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      setBrowserInfo("Safari");
    } else if (userAgent.includes("Chrome")) {
      setBrowserInfo("Chrome");
    } else {
      setBrowserInfo("Other Browser");
    }
  }, []);

  // 캔버스에 그리는 로직
  const drawResultContent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas 크기 지정 (temp)
    canvas.width = 400;
    canvas.height = 300;

    // 배경색 지정 (temp)
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, 400, 300);

    // 실제 이미지 올라갈 영역 (temp)
    ctx.fillStyle = "#ddd";
    ctx.fillRect(50, 50, 300, 150);
    ctx.strokeStyle = "#999";
    ctx.strokeRect(50, 50, 300, 150);

    // 이미지 placeholder (temp)
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px";
    ctx.textAlign = "center";
    ctx.fillText("이미지 영역", 200, 125);

    // 결과 텍스트 (temp)
    ctx.fillStyle = "#333";
    ctx.font = "bold 20px";
    ctx.textAlign = "left";
    ctx.fillText("이현 이미지 테스트", 50, 230);

    // 점수 (temp)
    ctx.fillStyle = "#e74c3c";
    ctx.font = "18px";
    ctx.fillText("score: 95", 50, 260);
  }, []);

  // 이미지 추출을 위한 함수입니당
  const extractImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataURL = canvas.toDataURL("image/png");
      setExtractedImage(dataURL);
      console.log("Canvas → Image 추출 성공");
    } catch (error) {
      const err = error as Error;
      console.error("Canvas → Image 추출 실패", err);
      alert(`추출 실패: ${err.message}`);
    }
  };

  // 이미지 다운로드 로직
  const downloadImage = () => {
    if (!extractedImage) return;

    const link = document.createElement("a");
    link.download = `canvas-yh-test-${browserInfo.toLowerCase()}.png`;
    link.href = extractedImage;
    link.click();
  };

  // Canvas 드로잉
  useEffect(() => {
    drawResultContent();
  }, [drawResultContent]);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-4">
        <h1 className="mb-2 font-bold text-2xl">Canvas → Image 추출 테스트</h1>
        <p className="text-gray-600">
          브라우저 :{" "}
          <span className="font-semibold text-blue-600">{browserInfo}</span>
        </p>
      </div>
      <div className="mb-6">
        <canvas
          ref={canvasRef}
          className="h-auto max-w-full rounded border-2 border-gray-300"
        />
      </div>
      <div className="mb-6 space-x-4">
        <button
          type="button"
          onClick={extractImage}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          이미지 추출
        </button>
      </div>
      {extractedImage && (
        <div>
          <img
            src={extractedImage}
            alt="extractedImg"
            className="mb-4 h-auto max-w-full rounded border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={downloadImage}
            className="rounded bg-purple-500 px-4 py-2 text-white"
          >
            이미지 다운로드
          </button>
        </div>
      )}
    </div>
  );
}

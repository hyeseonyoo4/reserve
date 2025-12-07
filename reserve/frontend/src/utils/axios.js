import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const fileUpload = async (file) => {
  if (!file) return;

  // FormData를 사용하여 파일 데이터를 전송
  const formData = new FormData();
  formData.append("file", file);

  try {
    // 파일 업로드 요청
    const response = await axiosInstance.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 요청 헤더에 파일 전송 타입 설정
      },
    });

    // 업로드 성공 시 처리
    const result = response.data;
    console.log("업로드 성공:", result);

    // 서버에서 반환된 파일 URL이나 기타 메타데이터를 활용
    // 예: 상태 업데이트, 미리보기 표시 등
    const fileUrl = result.data.fileUrl; // 서버에서 반환된 URL 사용
    console.log("Uploaded file URL:", fileUrl);

    // 콜백으로 전달하거나 상태 업데이트
    // onImagePick?.(id, fileUrl);
    return result;

  } catch (error) {
    console.error("업로드 실패:", error);
    alert("파일 업로드 중 문제가 발생했습니다.");

    return null;
  }
};

export default axiosInstance;
export { baseURL, fileUpload };
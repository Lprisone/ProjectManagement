const API_BASE_URL = "http://localhost:8080"; // 后端服务地址

// POST请求
export async function postRequest(parambody: any, requestUrl: any) {
  try {
    // 将 param 转换为查询字符串
    // const queryString = new URLSearchParams(param).toString();

    // 构造完整的 URL，包含查询字符串
    const url = `${API_BASE_URL}${requestUrl}`;

    const response = await fetch(url, {
      method: "POST", // 设置请求方法为 POST
      headers: {
        "Content-Type": "application/json", // 指定发送 JSON 数据
      },
      body: JSON.stringify(parambody),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

// GET请求
export async function getRequest() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/financialRecord/getFinancialRecord`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const downloadPdf = async (parambody: any, requestUrl: any) => {
  try {
    // 发送 POST 请求，将 JSON 数据传递给后端
    const response = await fetch(`${API_BASE_URL}${requestUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf", // 告诉后端我们希望接收 PDF 格式
      },
      body: JSON.stringify(parambody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取文件名（从 Content-Disposition 头中提取）
    const contentDisposition = response.headers.get("content-disposition");
    const fileName =
      contentDisposition
        ?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)?.[1]
        ?.replace(/['"]/g, "") || "file.pdf";

    // 获取二进制数据
    const blob = await response.blob();

    // 创建下载链接
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // 设置下载文件名
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

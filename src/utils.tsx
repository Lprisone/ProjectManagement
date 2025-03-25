const API_BASE_URL = "http://localhost:8080"; // 后端服务地址

// POST请求
export async function postRequest(
  parambody: any,
  requestUrl: any,
) {
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
      body: JSON.stringify(parambody), // 将数据转换为 JSON 字符串
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

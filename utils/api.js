export async function handleApiRequest(request) {
  let email, zone_id, api_key, enabled, certificate_authority;

  try {
    if (request.method === 'POST') {
      // POST 请求：从请求体中解析 JSON
      const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
      email = body.email;
      zone_id = body.zoneId;
      api_key = body.apikey;
      enabled = body.enabled !== undefined ? body.enabled : true;
      certificate_authority = body.ca || "ssl_com";
    } else if (request.method === 'GET') {
      // GET 请求：从 URL 查询参数中获取
      const queryParams = request.query;
      email = queryParams.email;
      zone_id = queryParams.zoneId;
      api_key = queryParams.apikey;
      enabled = !(queryParams.enabled === 'false');
      certificate_authority = queryParams.ca || "ssl_com";
    }

    // 验证必需的输入
    if (!email || !zone_id || !api_key) {
      return {
        status: 400,
        success: false,
        errors: ['邮箱、区域ID和API密钥都是必需的']
      };
    }

    // 验证并设置 CA 默认值
    const validCAs = ["ssl_com", "lets_encrypt", "google", "sectigo"];
    const caToUse = validCAs.includes(certificate_authority) ? certificate_authority : "ssl_com";

    // 调用 Cloudflare API
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone_id}/ssl/universal/settings`, {
      method: 'PATCH',
      headers: {
        'X-Auth-Email': email,
        'X-Auth-Key': api_key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enabled: enabled,
        certificate_authority: caToUse
      }),
    });

    const result = await response.json();

    // 为 API 调用返回 JSON 响应
    return {
      status: 200,
      ...result
    };

  } catch (error) {
    return {
      status: 500,
      success: false,
      errors: [{ message: `请求失败: ${error.message || '未知错误'}` }]
    };
  }
}
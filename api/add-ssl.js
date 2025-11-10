import { handleApiRequest } from '../utils/api';

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const result = await handleApiRequest(req);
    res.status(result.status || 200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{ message: `请求失败: ${error.message || '未知错误'}` }]
    });
  }
}
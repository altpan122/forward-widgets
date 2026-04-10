// ================== 模块信息 ==================
const WidgetMetadata = {
    id: "missav",
    title: "MissAV",
    author: "𝙨𝙣𝙤𝙡𝙞𝙜𝙝𝙩",
    description: "增强稳定版（抗CF+高成功率）",
    version: "3.0.0",
    requiredVersion: "0.0.1",
    site: "https://missav.ai",
    modules: [
        {
            title: "浏览视频",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", type: "page" },
                {
                    name: "category",
                    type: "enumeration",
                    value: "dm588/cn/release",
                    enumOptions: [
                        { title: "🆕 最新", value: "dm588/cn/release" },
                        { title: "🔥 周热门", value: "dm169/cn/weekly-hot" },
                        { title: "🌟 月热门", value: "dm257/cn/monthly-hot" }
                    ]
                }
            ]
        },
        {
            title: "🔍 搜索",
            functionName: "searchList",
            type: "video",
            params: [
                { name: "keyword", type: "input" },
                { name: "page", type: "page" }
            ]
        }
    ]
};

// ================== 基础配置 ==================
const BASE_URL = "https://missav.ai";

const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": BASE_URL,
    "Origin": BASE_URL
};

// ================== 工具检测 ==================
if (typeof Widget === "undefined") {
    throw new Error("请在 forward 环境运行");
}

// ================== 工具函数 ==================
async function safeGet(url, retry = 2) {
    try {
        return await Widget.http.get(url, { headers: HEADERS });
    } catch (e) {
        if (retry > 0) return await safeGet(url, retry - 1);
        throw e;
    }
}

function isCloudflare(html) {
    return html.includes("Just a moment") || html.includes("cf-browser-verification");
}

// ================== 列表解析 ==================
function parseList(html) {
    if (!html || isCloudflare(html)) {
        return [{ id: "cf", type: "text", title: "被 Cloudflare 拦截，请稍后重试" }];
    }

    const $ = Widget.html.load(html);
    const list = [];

    $("div.group").each((i, el) => {
        const a = $(el).find("a.text-secondary");
        const href = a.attr("href");

        if (!href) return;

        const title = a.text().trim();
        const img = $(el).find("img").attr("data-src") || $(el).find("img").attr("src");

        const vid = href.split("/").pop().replace(/-.+$/, "");

        list.push({
            id: href,
            type: "link",
            title,
            link: href,
            coverUrl: img || `https://fourhoi.com/${vid}/cover-t.jpg`,
            customHeaders: HEADERS
        });
    });

    return list.length ? list : [{ id: "empty", type: "text", title: "无数据" }];
}

// ================== 浏览 ==================
async function loadList(params = {}) {
    const { page = 1, category = "dm588/cn/release" } = params;

    let url = `${BASE_URL}/${category}`;
    if (page > 1) url += `?page=${page}`;

    const res = await safeGet(url);
    return parseList(res.data);
}

// ================== 搜索 ==================
async function searchList(params = {}) {
    const { keyword, page = 1 } = params;

    if (!keyword) {
        return [{ id: "tip", type: "text", title: "请输入关键词" }];
    }

    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}`;
    if (page > 1) url += `?page=${page}`;

    const res = await safeGet(url);
    return parseList(res.data);
}

// ================== 播放解析 ==================
async function loadDetail(link) {
    try {
        const res = await safeGet(link);
        const html = res.data;

        if (isCloudflare(html)) {
            return [{ id: "cf", type: "text", title: "播放页被拦截" }];
        }

        let videoUrl = "";

        // ✅ 策略1：直接抓 m3u8
        const m3u8Match = html.match(/https:\/\/[^"]+\.m3u8[^"]*/);
        if (m3u8Match) videoUrl = m3u8Match[0];

        // ✅ 策略2：UUID 拼接
        if (!videoUrl) {
            const uuid = html.match(/[a-f0-9\-]{36}/);
            if (uuid) {
                videoUrl = `https://surrit.com/${uuid[0]}/playlist.m3u8`;
            }
        }

        // ✅ 策略3：source fallback
        if (!videoUrl) {
            const src = html.match(/source\s*=\s*['"]([^'"]+)/);
            if (src) videoUrl = src[1];
        }

        if (!videoUrl) {
            return [{ id: "err", type: "text", title: "解析失败（无播放地址）" }];
        }

        return [{
            id: link,
            type: "video",
            title: "播放",
            videoUrl,
            playerType: "system",
            customHeaders: HEADERS
        }];

    } catch (e) {
        return [{ id: "err", type: "text", title: "播放失败", subTitle: e.message }];
    }
}

// ================== 导出 ==================
const api = {
    WidgetMetadata,
    loadList,
    searchList,
    loadDetail
};

export default api;

if (typeof module !== "undefined") {
    module.exports = api;
}

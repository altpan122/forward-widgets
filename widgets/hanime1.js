// Hanime1 插件
WidgetMetadata = {
    id: "hanime1",
    title: "Hanime1(最新/分类/排行/搜索)",
    modules: [
        {
            id: "latest",
            title: "最新上架",
            requiresWebView: false,
            functionName: "loadLatestItems",
            cacheDuration: 3600,
            params: [
                {
                    name: "page",
                    title: "页码",
                    type: "page",
                },
            ],
        },
        {
            id: "category",
            title: "分类浏览",
            requiresWebView: false,
            functionName: "loadCategoryItems",
            cacheDuration: 7200,
            params: [
                {
                    name: "genre",
                    title: "分类",
                    type: "enumeration",
                    value: "裸體",
                    enumOptions: [
                        { title: "裸體", value: "裸體" },
                        { title: "巨乳", value: "巨乳" },
                        { title: "學生", value: "學生" },
                        { title: "中文字幕", value: "中文字幕" },
                        { title: "自慰", value: "自慰" },
                        { title: "制服", value: "制服" },
                        { title: "熟女", value: "熟女" },
                        { title: "3P", value: "3P" },
                        { title: "内射", value: "内射" },
                        { title: "NTR", value: "NTR" },
                        { title: "女僕", value: "女僕" },
                        { title: "姊弟", value: "姊弟" },
                        { title: "後宮", value: "後宮" },
                        { title: "爆乳", value: "爆乳" },
                        { title: "觸手", value: "觸手" },
                        { title: "純愛", value: "純愛" },
                        { title: "黑絲", value: "黑絲" },
                        { title: "人妻", value: "人妻" },
                        { title: "無碼", value: "無碼" },
                        { title: "幼獄", value: "幼獄" },
                        { title: "小惡魔", value: "小惡魔" },
                        { title: "兄妹", value: "兄妹" },
                        { title: "蘿莉", value: "蘿莉" },
                        { title: "電車癡漢", value: "電車癡漢" },
                        { title: "強姦", value: "強姦" },
                        { title: "監禁", value: "監禁" },
                        { title: "亂倫", value: "亂倫" },
                        { title: "調教", value: "調教" },
                        { title: "中出", value: "中出" },
                        { title: "Cosplay", value: "Cosplay" },
                        { title: "泳裝", value: "泳裝" },
                        { title: "運動員", value: "運動員" },
                        { title: "幻想", value: "幻想" },
                        { title: "偽娘", value: "偽娘" },
                        { title: "百合", value: "百合" },
                        { title: "BDSM", value: "BDSM" },
                        { title: "男同", value: "男同" },
                        { title: "女王様", value: "女王様" },
                    ],
                },
                {
                    name: "sort_by",
                    title: "排序",
                    type: "enumeration",
                    value: "最新",
                    enumOptions: [
                        { title: "最新", value: "最新" },
                        { title: "最多觀看", value: "最多觀看" },
                        { title: "最多喜歡", value: "最多喜歡" },
                    ],
                },
                {
                    name: "page",
                    title: "页码",
                    type: "page",
                },
            ],
        },
        {
            id: "rank",
            title: "排行榜",
            requiresWebView: false,
            functionName: "loadRankItems",
            cacheDuration: 7200,
            params: [
                {
                    name: "sort_by",
                    title: "榜单",
                    type: "enumeration",
                    value: "views",
                    enumOptions: [
                        { title: "本日最多觀看", value: "views" },
                        { title: "本周最多觀看", value: "weekly_views" },
                        { title: "本月最多觀看", value: "monthly_views" },
                        { title: "本日最多喜歡", value: "likes" },
                        { title: "本周最多喜歡", value: "weekly_likes" },
                        { title: "本月最多喜歡", value: "monthly_likes" },
                    ],
                },
                {
                    name: "page",
                    title: "页码",
                    type: "page",
                },
            ],
        },
        {
            id: "search",
            title: "搜索",
            requiresWebView: false,
            functionName: "loadSearchItems",
            cacheDuration: 3600,
            params: [
                {
                    name: "keyword",
                    title: "关键词",
                    type: "input",
                    description: "输入搜索关键词",
                    placeholders: [
                        { title: "示例", value: "巨乳" },
                    ],
                },
                {
                    name: "page",
                    title: "页码",
                    type: "page",
                },
            ],
        },
    ],
    version: "1.0.0",
    requiredVersion: "0.0.1",
    description: "解析 Hanime1 最新上架、分类浏览、排行榜、搜索功能",
    author: "community",
    site: "https://hanime1.me",
};

// ========== 常量配置 ==========
const BASE_URL = "https://hanime1.me";
const DEFAULT_HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": BASE_URL,
    "Accept": "application/json, text/plain, */*",
};

// ========== 核心解析函数 ==========

/**
 * 通过 API 获取视频列表
 */
async function fetchVideoList(apiUrl) {
    try {
        const response = await Widget.http.get(apiUrl, { headers: DEFAULT_HEADERS });
        console.log("API 请求:", apiUrl);
        console.log("API 响应:", JSON.stringify(response.data).substring(0, 500));
        return response.data || null;
    } catch (e) {
        console.error("请求失败:", e.message);
        return null;
    }
}

/**
 * 将 API 返回的单个视频对象转为 Forward Widget item
 */
function mapVideoToItem(video) {
    if (!video) return null;

    // hanime1 API 字段可能有多种形态，兼容处理
    const id = video.slug || video.id || String(video.name || "");
    const title = video.name || video.title || "未知标题";
    const cover = video.cover_url || video.poster_url || video.image || "";
    const tags = (video.hentai_tags || []).map(t => t.text).join(" / ");
    const views = video.views ? `${formatNumber(video.views)} 次观看` : "";
    const likes = video.likes ? `👍 ${formatNumber(video.likes)}` : "";
    const desc = [tags, views, likes].filter(Boolean).join(" · ");

    return {
        id: id,
        type: "url",
        title: title,
        posterPath: cover,
        backdropPath: cover,
        description: desc,
        link: `${BASE_URL}/watch/${id}`,
        // 不直接给 videoUrl，播放时由 loadDetail 解析
    };
}

function formatNumber(n) {
    if (!n) return "0";
    if (n >= 10000) return (n / 10000).toFixed(1) + "万";
    return String(n);
}

/**
 * 通用分页列表解析
 * hanime1 API: https://hanime1.me/api/v8/
 */
async function fetchListPage(endpoint, page) {
    const pageIndex = (page || 1) - 1; // API 从 0 开始
    const data = await fetchVideoList(`${BASE_URL}/api/v8/${endpoint}&page=${pageIndex}&limit=24`);
    if (!data) return [];

    // 兼容不同 API 返回结构
    const hentaiVideos =
        data.hentai_videos ||
        data.hentai_video ||
        data.data ||
        [];

    return hentaiVideos.map(mapVideoToItem).filter(Boolean);
}

// ========== 各模块入口 ==========

/**
 * 最新上架
 */
async function loadLatestItems(params = {}) {
    const page = params.page || 1;
    return await fetchListPage("search?ordering=published_at_unix&where=&tags_1=&tags_2=&brands=&blacklist=&single_video=0&player_load=true", page);
}

/**
 * 分类浏览
 */
async function loadCategoryItems(params = {}) {
    const genre = encodeURIComponent(params.genre || "裸體");
    const page = params.page || 1;

    const orderingMap = {
        "最新": "published_at_unix",
        "最多觀看": "views",
        "最多喜歡": "likes",
    };
    const ordering = orderingMap[params.sort_by] || "published_at_unix";

    return await fetchListPage(
        `search?ordering=-${ordering}&where=&tags_1=${genre}&tags_2=&brands=&blacklist=&single_video=0&player_load=true`,
        page
    );
}

/**
 * 排行榜
 */
async function loadRankItems(params = {}) {
    const sort = params.sort_by || "views";
    const page = params.page || 1;
    return await fetchListPage(
        `search?ordering=-${sort}&where=&tags_1=&tags_2=&brands=&blacklist=&single_video=0&player_load=true`,
        page
    );
}

/**
 * 搜索
 */
async function loadSearchItems(params = {}) {
    const keyword = encodeURIComponent(params.keyword || "");
    const page = params.page || 1;
    if (!keyword) return [];
    return await fetchListPage(
        `search?ordering=-published_at_unix&where=${keyword}&tags_1=&tags_2=&brands=&blacklist=&single_video=0&player_load=true`,
        page
    );
}

// ========== 播放详情解析 ==========

/**
 * loadDetail: 由播放器在点击条目时调用，解析实际视频流 URL
 * link 格式: https://hanime1.me/watch/{slug}
 */
async function loadDetail(link) {
    console.log("loadDetail 链接:", link);

    try {
        const slug = link.split("/watch/")[1]?.split("?")[0];
        if (!slug) throw new Error("无法解析 slug: " + link);

        // 调用 hanime1 视频详情 API
        const apiUrl = `${BASE_URL}/api/v8/video?id=${slug}`;
        const data = await fetchVideoList(apiUrl);

        if (!data || !data.videos_manifest) {
            throw new Error("获取视频详情失败");
        }

        // 从 manifest 中提取视频流
        const servers = data.videos_manifest.servers || [];
        let videoUrl = null;
        let childItems = [];

        // 遍历服务器找到可用的流
        for (const server of servers) {
            const streams = server.streams || [];
            if (streams.length > 0) {
                // 优先选最高分辨率
                const sorted = streams
                    .filter(s => s.url && s.url.length > 0)
                    .sort((a, b) => (parseInt(b.height) || 0) - (parseInt(a.height) || 0));

                if (sorted.length > 0) {
                    videoUrl = sorted[0].url;

                    // 如果有多个画质，作为子 items 供用户选择
                    if (sorted.length > 1) {
                        childItems = sorted.map(s => ({
                            id: s.url,
                            type: "url",
                            title: `${s.height || "未知"}P - ${server.name || ""}`,
                            link: s.url,
                            videoUrl: s.url,
                            playerType: "system",
                        }));
                    }
                    break;
                }
            }
        }

        if (!videoUrl) {
            throw new Error("未找到可用的视频流");
        }

        console.log("解析到视频地址:", videoUrl);

        return {
            id: link,
            type: "detail",
            videoUrl: videoUrl,
            customHeaders: {
                "Referer": BASE_URL,
                "User-Agent": DEFAULT_HEADERS["User-Agent"],
            },
            playerType: "system",
            childItems: childItems,
        };
    } catch (e) {
        console.error("loadDetail 失败:", e.message);
        // 降级：尝试 WebView 方式
        return {
            id: link,
            type: "detail",
            videoUrl: link,
            playerType: "system",
            childItems: [],
        };
    }
}

// Hanime1 插件
WidgetMetadata = {
    id: "hanime1",
    title: "Hanime1(最新/分类/排行/搜索)",
    globalParams: [
        {
            name: "cookie",
            title: "Cookie（必填，用浏览器登录 hanime1.me 后从请求头中复制）",
            type: "input",
            description: "打开 hanime1.me → 按 F12 → Network → 任意请求 → Request Headers → 复制 cookie 字段的值",
            placeholders: [
                {
                    title: "示例格式",
                    value: "_ga=GA1.1.xxx; cf_clearance=xxx; SESSION=xxx",
                },
            ],
        },
    ],
    modules: [
        {
            id: "latest",
            title: "最新上架",
            requiresWebView: false,
            functionName: "loadLatestItems",
            cacheDuration: 3600,
            params: [
                { name: "page", title: "页码", type: "page" },
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
                    value: "published_at_unix",
                    enumOptions: [
                        { title: "最新", value: "published_at_unix" },
                        { title: "最多觀看", value: "views" },
                        { title: "最多喜歡", value: "likes" },
                    ],
                },
                { name: "page", title: "页码", type: "page" },
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
                { name: "page", title: "页码", type: "page" },
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
                    placeholders: [{ title: "示例", value: "巨乳" }],
                },
                { name: "page", title: "页码", type: "page" },
            ],
        },
    ],
    version: "1.0.2",
    requiredVersion: "0.0.1",
    description: "解析 Hanime1 最新上架、分类浏览、排行榜、搜索功能（需要填入 Cookie）",
    author: "community",
    site: "https://hanime1.me",
};

// ========== 请求头构造 ==========
function buildHeaders(cookie) {
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://hanime1.me/",
        "Origin": "https://hanime1.me",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8",
        "X-Requested-With": "XMLHttpRequest",
    };
    if (cookie) {
        headers["Cookie"] = cookie;
    }
    return headers;
}

// ========== 核心 POST 搜索 API ==========
async function fetchSearchAPI(body, cookie) {
    const url = "https://hanime1.me/api/v8/search-uncensored";
    try {
        const response = await Widget.http.post(url, body, {
            headers: {
                ...buildHeaders(cookie),
                "Content-Type": "application/json;charset=UTF-8",
            },
        });
        console.log("POST 状态码:", response.statusCode);
        const data = (typeof response.data === "string")
            ? JSON.parse(response.data)
            : response.data;
        return data;
    } catch (e) {
        console.error("fetchSearchAPI 失败:", e.message);
        // 尝试降级到 GET 接口
        return await fetchSearchGET(body, cookie);
    }
}

// ========== GET 降级接口 ==========
async function fetchSearchGET(body, cookie) {
    try {
        const params = new URLSearchParams({
            search_text: body.search_text || "",
            tags: (body.tags || []).join(","),
            order_by: body.order_by || "published_at_unix",
            ordering: "desc",
            page: String(body.page || 0),
            limit: "24",
        });
        const url = `https://hanime1.me/api/v8/search?${params.toString()}`;
        console.log("GET 降级请求:", url);
        const response = await Widget.http.get(url, {
            headers: buildHeaders(cookie),
        });
        console.log("GET 状态码:", response.statusCode);
        return (typeof response.data === "string")
            ? JSON.parse(response.data)
            : response.data;
    } catch (e) {
        console.error("fetchSearchGET 失败:", e.message);
        return null;
    }
}

// ========== 工具函数 ==========
function formatNumber(n) {
    if (!n) return "0";
    if (n >= 10000) return (n / 10000).toFixed(1) + "万";
    return String(n);
}

function mapVideoToItem(video) {
    if (!video) return null;
    const slug = video.slug || String(video.id || "");
    if (!slug) return null;
    const title = video.name || video.title || "未知标题";
    const cover = video.cover_url || video.poster_url || "";
    const tags = (video.hentai_tags || []).map(t => t.text || t).join(" / ");
    const views = video.views ? `${formatNumber(video.views)}次观看` : "";
    const likes = video.likes ? `👍${formatNumber(video.likes)}` : "";
    const desc = [tags, views, likes].filter(Boolean).join(" · ");
    return {
        id: slug,
        type: "url",
        title: title,
        posterPath: cover,
        backdropPath: cover,
        description: desc,
        link: `https://hanime1.me/watch/${slug}`,
    };
}

// ========== 构造搜索请求体 ==========
function buildBody({ keyword = "", tags = [], orderBy = "published_at_unix", page = 1 }) {
    return {
        search_text: keyword,
        tags: tags,
        tags_mode: "AND",
        brands: [],
        blacklist: [],
        order_by: orderBy,
        ordering: "desc",
        page: page - 1,
    };
}

// ========== 通用列表加载 ==========
async function loadList({ keyword = "", tags = [], orderBy = "published_at_unix", page = 1, cookie = "" }) {
    const body = buildBody({ keyword, tags, orderBy, page });
    console.log("请求体:", JSON.stringify(body));
    const data = await fetchSearchAPI(body, cookie);
    if (!data) return [];
    const videos = data.hentai_videos || data.data || [];
    console.log("获取到视频数量:", videos.length);
    return videos.map(mapVideoToItem).filter(Boolean);
}

// ========== 各模块入口 ==========

async function loadLatestItems(params = {}) {
    return await loadList({
        orderBy: "published_at_unix",
        page: params.page || 1,
        cookie: params.cookie || "",
    });
}

async function loadCategoryItems(params = {}) {
    return await loadList({
        tags: [params.genre || "裸體"],
        orderBy: params.sort_by || "published_at_unix",
        page: params.page || 1,
        cookie: params.cookie || "",
    });
}

async function loadRankItems(params = {}) {
    return await loadList({
        orderBy: params.sort_by || "views",
        page: params.page || 1,
        cookie: params.cookie || "",
    });
}

async function loadSearchItems(params = {}) {
    const keyword = params.keyword || "";
    if (!keyword) return [];
    return await loadList({
        keyword,
        page: params.page || 1,
        cookie: params.cookie || "",
    });
}

// ========== 播放详情解析 ==========
async function loadDetail(link) {
    console.log("loadDetail:", link);
    try {
        const slug = link.split("/watch/")[1]?.split("?")[0];
        if (!slug) throw new Error("无法解析 slug: " + link);

        // 尝试从 globalParams 中获取 cookie（loadDetail 不接收 params，只能从缓存或其他方式获取）
        const apiUrl = `https://hanime1.me/api/v8/video?id=${slug}`;
        const response = await Widget.http.get(apiUrl, {
            headers: buildHeaders(""),
        });
        const data = (typeof response.data === "string")
            ? JSON.parse(response.data)
            : response.data;

        console.log("视频详情片段:", JSON.stringify(data).substring(0, 500));

        if (!data || !data.videos_manifest) throw new Error("获取视频详情失败");

        const servers = data.videos_manifest.servers || [];
        let videoUrl = null;
        let childItems = [];

        for (const server of servers) {
            const streams = (server.streams || [])
                .filter(s => s.url && s.url.length > 4)
                .sort((a, b) => (parseInt(b.height) || 0) - (parseInt(a.height) || 0));

            if (streams.length > 0) {
                videoUrl = streams[0].url;
                childItems = streams.map(s => ({
                    id: s.url,
                    type: "url",
                    title: `${s.height || "?"}P  ${server.name || ""}`.trim(),
                    link: s.url,
                    videoUrl: s.url,
                    playerType: "system",
                }));
                break;
            }
        }

        if (!videoUrl) throw new Error("未找到视频流");

        return {
            id: link,
            type: "detail",
            videoUrl: videoUrl,
            customHeaders: {
                "Referer": "https://hanime1.me/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
            playerType: "system",
            childItems: childItems,
        };
    } catch (e) {
        console.error("loadDetail 失败:", e.message);
        return {
            id: link,
            type: "detail",
            videoUrl: link,
            playerType: "system",
            childItems: [],
        };
    }
}

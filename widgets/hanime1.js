WidgetMetadata = {
    id: "hanime1_me_module",
    title: "Hanime1",
    author: "AI Assistant",
    description: "Hanime1 动漫智能抓取模块 (WebView防屏蔽)",
    version: "1.0.0",
    requiredVersion: "0.0.2",
    site: "https://hanime1.me",
    detailCacheDuration: 60,
    modules: [
        {
            title: "🔍 搜索",
            description: "搜索动漫视频",
            requiresWebView: true,
            functionName: "searchList",
            params: [
                { name: "keyword", title: "关键词", type: "input", value: "" },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "🆕 最新上市",
            description: "最新更新的影片",
            requiresWebView: true,
            functionName: "loadList",
            params: [
                { name: "url", type: "constant", value: "https://hanime1.me/search?query=&sort=最新上市" },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "🔥 近期最佳",
            description: "近期高分佳作",
            requiresWebView: true,
            functionName: "loadList",
            params: [
                { name: "url", type: "constant", value: "https://hanime1.me/search?query=&sort=近期最佳" },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "👀 最多观看",
            description: "历史最高播放",
            requiresWebView: true,
            functionName: "loadList",
            params: [
                { name: "url", type: "constant", value: "https://hanime1.me/search?query=&sort=最多觀看" },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "🏷️ 分类探索",
            description: "按标签分类浏览",
            requiresWebView: true,
            functionName: "loadList",
            params: [
                { 
                    name: "url", 
                    title: "选择分类", 
                    type: "enumeration", 
                    value: "https://hanime1.me/search?query=&genre=3D",
                    enumOptions: [
                        { title: "3D 动画", value: "https://hanime1.me/search?query=&genre=3D" },
                        { title: "無碼 (步兵)", value: "https://hanime1.me/search?query=&genre=無碼" },
                        { title: "同人作品", value: "https://hanime1.me/search?query=&genre=同人" },
                        { title: "巨乳", value: "https://hanime1.me/search?query=&genre=巨乳" },
                        { title: "蘿莉", value: "https://hanime1.me/search?query=&genre=蘿莉" },
                        { title: "純愛", value: "https://hanime1.me/search?query=&genre=純愛" },
                        { title: "NTR", value: "https://hanime1.me/search?query=&genre=NTR" },
                        { title: "人妻", value: "https://hanime1.me/search?query=&genre=人妻" },
                        { title: "調教", value: "https://hanime1.me/search?query=&genre=調教" },
                        { title: "百合", value: "https://hanime1.me/search?query=&genre=百合" }
                    ] 
                },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        }
    ]
};

const BASE_URL = "https://hanime1.me";
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": "https://hanime1.me/"
};

/**
 * 智能嗅探解析器：专为 Hanime1 的 DOM 结构优化
 */
function parseVideoList(html) {
    if (!html || html.includes("Just a moment") || html.includes("Cloudflare")) {
        return [{ id: "err_cf", type: "text", title: "被安全盾拦截", description: "请尝试开启全局代理节点或稍后再试" }];
    }

    const $ = Widget.html.load(html);
    const resultsMap = new Map();

    // 智能提取：Hanime1 的视频链接通常包含 '/watch?v='
    $("a[href*='/watch?v=']").each((i, el) => {
        const $a = $(el);
        let href = $a.attr("href");
        if (!href) return;

        // 补全绝对路径并清理多余的跟踪参数
        let fullHref = href.startsWith('http') ? href : `${BASE_URL}${href}`;
        fullHref = fullHref.split('&')[0]; 

        // 初始化 Map 记录
        if (!resultsMap.has(fullHref)) {
            resultsMap.set(fullHref, {
                id: fullHref,
                type: "url", 
                mediaType: "movie",
                title: "",
                backdropPath: "",
                link: fullHref,
                description: "点击播放",
                playerType: "system"
            });
        }

        const item = resultsMap.get(fullHref);

        // 提取封面图
        const $img = $a.find("img");
        if ($img.length > 0) {
            const src = $img.attr("src") || $img.attr("data-src") || "";
            if (src && !src.includes('avatar') && !src.includes('logo') && !src.startsWith('data:image')) {
                item.backdropPath = src;
            }
        }

        // 提取标题和时长：Hanime1 的标题通常在相邻的 div 或 a 标签的 text 中
        const text = $a.text().trim();
        if (text && text.length > 1) {
            // 匹配时长格式，例如 12:34 或 01:23:45
            if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(text)) {
                item.description = `时长: ${text}`;
            } else if (!item.title || text.length > item.title.length) {
                // 如果是普通文本，且比当前记录的标题长，则作为视频标题
                item.title = text;
            }
        }
    });

    // 过滤掉没有成功提取到标题或封面的无效数据
    const results = Array.from(resultsMap.values()).filter(item => item.title && item.backdropPath);

    if (results.length === 0) {
        return [{ id: "empty", type: "text", title: "未获取到视频", description: "可能是当前分类无数据或需验证" }];
    }

    return results;
}

async function loadList(params = {}) {
    let { url, page = 1 } = params;
    
    // 拼接分页参数
    if (page > 1) {
        url += url.includes('?') ? `&page=${page}` : `?page=${page}`;
    }

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "网络请求失败", description: e.message }];
    }
}

async function searchList(params = {}) {
    const { keyword, page = 1 } = params;
    if (!keyword) {
        return [{ id: "tip", type: "text", title: "提示", description: "请输入要搜索的动漫名或车牌号" }];
    }

    let url = `${BASE_URL}/search?query=${encodeURIComponent(keyword)}&page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "搜索失败", description: e.message }];
    }
}

async function loadDetail(link) {
    try {
        const res = await Widget.http.get(link, { headers: HEADERS });
        const html = res.data;
        
        if (html.includes("Just a moment") || html.includes("Cloudflare")) {
             throw new Error("视频详情被安全盾拦截，请开启全局代理");
        }

        let videoUrl = "";

        // 策略1：直接匹配 video 标签内的 source src (.mp4 或 .m3u8)
        const sourceRegex = /<source[^>]+src="([^">]+(mp4|m3u8)[^">]*)"/i;
        const sourceMatch = html.match(sourceRegex);
        if (sourceMatch && sourceMatch[1]) {
            videoUrl = sourceMatch[1];
        }

        // 策略2：正则暴力全局搜索
        if (!videoUrl) {
            const urlRegex = /(https:\/\/[^"'\s<>]*?\.(mp4|m3u8)[^"'\s<>]*)/i;
            const urlMatch = html.match(urlRegex);
            if (urlMatch && urlMatch[1]) {
                videoUrl = urlMatch[1];
            }
        }

        if (!videoUrl) {
            throw new Error("无法从该页面中解析出播放地址，可能需要登录或由于原网站限制");
        }

        // 获取视频真实标题
        const $ = Widget.html.load(html);
        let title = $('meta[property="og:title"]').attr('content') || $('title').text().trim().replace(' - Hanime1.me', '') || "未知影片";

        return {
            id: link,
            type: "detail",
            mediaType: "movie",
            title: title,
            videoUrl: videoUrl,
            playerType: "ijk", // ijk 兼容性更强
            customHeaders: {
                "Referer": link,
                "User-Agent": HEADERS["User-Agent"],
                "Origin": BASE_URL
            }
        };

    } catch (e) {
        throw new Error(`详情解析错误: ${e.message}`);
    }
}

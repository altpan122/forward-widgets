WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV_ovo",
    author: "𝙈𝙖𝙠𝙠𝙖𝙋𝙖𝙠𝙠𝙖 (Pro)",
    description: "智能嗅探引擎，无视网站前端改版",
    version: "3.0.2", // 更新版本号以强制 App 刷新缓存
    requiredVersion: "0.0.2",
    site: "https://missav.com",
    detailCacheDuration: 60,
    modules: [
        {
            title: "浏览视频",
            description: "浏览 MissAV 各大分类视频",
            functionName: "loadList",
            requiresWebView: true, // 开启 WebView 绕过 Cloudflare 盾
            cacheDuration: 3600,
            params: [
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" },
                { 
                    name: "category", 
                    title: "分类", 
                    type: "enumeration", 
                    description: "选择频道",
                    value: "cn/new", 
                    enumOptions: [
                        { title: "🆕 最新发布", value: "cn/new" },
                        { title: "🔥 本周热门", value: "cn/weekly-hot" },
                        { title: "🌟 月度热门", value: "cn/monthly-hot" },
                        { title: "🔞 无码流出", value: "cn/uncensored-leak" },
                        { title: "🇯🇵 东京热", value: "cn/tokyohot" },
                        { title: "🇨🇳 中文字幕", value: "cn/chinese-subtitle" },
                        { title: "🎬 素人精选", value: "cn/amateur" },
                        { title: "🎭 FC2 俱乐部", value: "cn/fc2" },
                        { title: "一本道", value: "cn/1pondo" },
                        { title: "Caribbean", value: "cn/caribbeancom" }
                    ] 
                },
                {
                    name: "sort",
                    title: "排序",
                    type: "enumeration",
                    description: "排序方式",
                    value: "released_at",
                    enumOptions: [
                        { title: "发布日期", value: "released_at" },
                        { title: "今日浏览", value: "today_views" },
                        { title: "总浏览量", value: "views" },
                        { title: "收藏数", value: "saved" }
                    ]
                }
            ]
        },
        {
            title: "🔍 搜索视频",
            description: "通过番号或演员搜索",
            functionName: "searchList",
            requiresWebView: true, // 搜索也必须开启防反爬
            cacheDuration: 3600,
            params: [
                { name: "keyword", title: "关键词", type: "input", description: "输入搜索关键词", value: "" },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        }
    ]
};

const BASE_URL = "https://missav.com";
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": "https://missav.com/"
};

/**
 * 核心：无视前端变动的智能嗅探解析器
 */
function parseVideoList(html) {
    if (!html || html.includes("Just a moment") || html.includes("Cloudflare") || html.includes("403 Forbidden")) {
        return [{ id: "err_cf", type: "text", title: "被安全盾拦截 (403)", description: "请开启全局代理并切换节点，或稍后再试" }];
    }

    const $ = Widget.html.load(html);
    const results = [];
    const seenUrls = new Set();

    // 智能嗅探：遍历所有包含链接的 A 标签，寻找内部包裹着图片的结构
    $("a").each((i, el) => {
        const $a = $(el);
        let href = $a.attr("href");
        if (!href) return;

        // 过滤掉网站的导航菜单链接
        if (href.includes('/search') || href.includes('/categories') || href.includes('/actresses') || href.includes('/makers')) return;

        // 必须含有图片才大概率是视频卡片
        const $img = $a.find("img");
        if ($img.length === 0) return;

        let imgSrc = $img.attr("data-src") || $img.attr("src") || "";
        // 排除干扰的 icon 和 logo
        if (!imgSrc || imgSrc.includes('logo') || imgSrc.includes('avatar') || imgSrc.startsWith('data:image')) return;

        if (href.startsWith('/')) {
            href = `${BASE_URL}${href}`;
        }

        // 严格去重机制
        if (seenUrls.has(href)) return;
        seenUrls.add(href);

        // 智能提取标题：优先取 alt、title，兜底取父元素的文本
        let title = $img.attr("alt") || $a.attr("title") || "";
        if (!title || title.length < 2) {
            const $parent = $a.parent();
            title = $parent.length > 0 ? $parent.text().trim().replace(/\s+/g, ' ') : "未知视频";
        }

        // 智能提取时长：利用正则在周边文本中寻找 mm:ss 格式
        let duration = "";
        const $parent = $a.parent();
        const surroundingText = $parent.length > 0 ? $parent.text() : "";
        const timeMatch = surroundingText ? surroundingText.match(/\d{2}:\d{2}(:\d{2})?/) : null;
        if (timeMatch) {
            duration = timeMatch[0];
        }

        results.push({
            id: href,
            type: "url", // 严格遵循 Forward 规范
            mediaType: "movie",
            title: title,
            backdropPath: imgSrc, 
            link: href,
            description: duration ? `时长: ${duration}` : "点击播放",
            playerType: "system"
        });
    });

    if (results.length === 0) {
        return [{ id: "empty", type: "text", title: "未获取到视频内容", description: "请检查网站是否可以正常访问" }];
    }

    return results;
}

async function loadList(params = {}) {
    const { page = 1, category = "cn/new", sort = "released_at" } = params;
    
    let url = `${BASE_URL}/${category}?sort=${sort}`;
    if (page > 1) url += `&page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "网络请求失败", description: e.message }];
    }
}

async function searchList(params = {}) {
    const { page = 1, keyword } = params;
    if (!keyword) {
        return [{ id: "tip", type: "text", title: "提示", description: "请输入关键词开始搜索" }];
    }

    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}`;
    if (page > 1) url += `?page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "搜索失败", description: e.message }];
    }
}

async function loadDetail(link) {
    try {
        const res = await Widget.http.get(link, { 
            headers: { ...HEADERS, "Referer": BASE_URL + "/" } 
        });
        const html = res.data;
        
        if (html.includes("Just a moment") || html.includes("Cloudflare")) {
             throw new Error("解析播放地址被安全盾拦截，请开启全局代理或稍后再试");
        }

        let videoUrl = "";

        // 策略1：快速匹配原生 m3u8
        const m3u8Regex = /(https:\/\/[^"'\s<>]*?\.m3u8[^"'\s<>]*)/g;
        const matches = html.match(m3u8Regex);
        if (matches && matches.length > 0) {
            const playlistMatch = matches.find(m => m.includes('playlist.m3u8')) || matches[0];
            videoUrl = playlistMatch.replace(/\\/g, ''); 
        }

        // 策略2：破解 MissAV 常见的 eval 混淆，提取唯一 UUID
        if (!videoUrl) {
             const $ = Widget.html.load(html);
             $('script').each((i, el) => {
                 const code = $(el).html() || "";
                 if (code.includes('eval(function(p,a,c,k,e,d)')) {
                     const uuidMatch = code.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
                     if (uuidMatch) {
                         videoUrl = `https://surrit.com/${uuidMatch[0]}/playlist.m3u8`;
                         return false; 
                     }
                 }
             });
        }

        if (!videoUrl) {
            throw new Error("无法从页面中提取到播放流");
        }

        const $ = Widget.html.load(html);
        let title = $('meta[property="og:title"]').attr('content') || $('h1').text().trim() || "未知影片";

        return {
            id: link,
            type: "detail",
            mediaType: "movie",
            title: title,
            videoUrl: videoUrl,
            playerType: "ijk", // 强制调用 ijk 内核避免黑屏/无声
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

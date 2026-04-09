WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV_ovo",
    author: "𝙨𝙣𝙤𝙡𝙞𝙜𝙝𝙩",
    description: "修复 403 拦截问题，采用 WebView 绕过",
    version: "2.1.3",
    requiredVersion: "0.0.1",
    site: "https://missav.com",
    modules: [
        {
            title: "浏览视频",
            functionName: "loadList",
            requiresWebView: true,
            params: [
                { name: "page", title: "页码", type: "page" },
                { 
                    name: "category", 
                    title: "分类", 
                    type: "enumeration", 
                    value: "cn/new",
                    enumOptions: [
                        { title: "🆕 最新发布", value: "cn/new" },
                        { title: "🔥 本周热门", value: "cn/weekly-hot" },
                        { title: "🌟 月度热门", value: "cn/monthly-hot" },
                        { title: "🔞 无码流出", value: "cn/uncensored-leak" },
                        { title: "🇯🇵 东京热", value: "cn/tokyohot" },
                        { title: "🇨🇳 中文字幕", value: "cn/chinese-subtitle" }
                    ] 
                },
                {
                    name: "sort",
                    title: "排序",
                    type: "enumeration",
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
            functionName: "searchList",
            requiresWebView: true,
            params: [
                { name: "keyword", title: "关键词", type: "input", value: "" },
                { name: "page", title: "页码", type: "page" }
            ]
        }
    ]
};

const BASE_URL = "https://missav.com"; 

const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1"
};

function parseVideoList(html) {
    // 增加对 403 页面的文字探测
    if (!html || html.includes("Just a moment") || html.includes("403 Forbidden") || html.includes("Cloudflare")) {
        return [{ id: "err_cf", type: "text", title: "访问被拒绝 (403)", description: "请尝试开启全局代理节点，或稍后再试" }];
    }

    const $ = Widget.html.load(html);
    const results = [];

    $("div.group").each((i, el) => {
        const $el = $(el);
        const $link = $el.find("a.text-secondary");
        const href = $link.attr("href");
        
        if (href) {
            const title = $link.text().trim();
            const $img = $el.find("img");
            const imgSrc = $img.attr("data-src") || $img.attr("src");
            const duration = $el.find(".absolute.bottom-1.right-1").text().trim();

            const videoId = href.split('/').pop().replace(/-uncensored-leak|-chinese-subtitle/g, '').toUpperCase();
            const coverUrl = `https://fourhoi.com/${videoId.toLowerCase()}/cover-t.jpg`;

            results.push({
                id: href,
                type: "link", 
                mediaType: "movie",
                title: title,
                coverUrl: coverUrl || imgSrc, 
                link: href,
                description: `时长: ${duration} | 番号: ${videoId}`,
                customHeaders: HEADERS
            });
        }
    });

    return results.length > 0 ? results : [{ id: "empty", type: "text", title: "没有找到相关视频内容" }];
}

async function loadList(params = {}) {
    const { page = 1, category = "cn/new", sort = "released_at" } = params;
    
    let url = `${BASE_URL}/${category}?sort=${sort}`;
    if (page > 1) url += `&page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        // 捕获 403 错误并给出人性化提示
        if (e.message.includes("403")) {
            return [{ id: "err", type: "text", title: "触发网站防护 (403)", description: "你的代理 IP 被 MissAV 拦截，请切换梯子节点(建议日本/台湾)并开启全局模式。" }];
        }
        return [{ id: "err", type: "text", title: "加载失败", description: e.message }];
    }
}

async function searchList(params = {}) {
    const { page = 1, keyword } = params;
    if (!keyword) {
        return [{ id: "tip", type: "text", title: "请输入关键词开始搜索" }];
    }

    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}`;
    if (page > 1) url += `?page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        if (e.message.includes("403")) {
            return [{ id: "err", type: "text", title: "触发网站防护 (403)", description: "请切换代理节点并开启全局模式。" }];
        }
        return [{ id: "err", type: "text", title: "搜索失败", description: e.message }];
    }
}

async function loadDetail(link) {
    try {
        // 将传递进来的链接强制替换为当前有效域
        const safeLink = link.replace(/https:\/\/missav\.[a-z]+/, BASE_URL);
        const res = await Widget.http.get(safeLink, { headers: HEADERS });
        const html = res.data;
        
        // 防护拦截检测
        if (html.includes("Just a moment") || html.includes("403 Forbidden")) {
             throw new Error("获取播放地址被 Cloudflare 拦截 (403)");
        }

        const $ = Widget.html.load(html);
        let title = $('meta[property="og:title"]').attr('content') || $('h1').text().trim();
        let videoUrl = "";
        
        $('script').each((i, el) => {
            const scriptContent = $(el).html() || "";
            if (scriptContent.includes('surrit.com') && scriptContent.includes('.m3u8')) {
                const matches = scriptContent.match(/https:\/\/surrit\.com\/[a-f0-9\-]+\/[^"'\s]*\.m3u8/g);
                if (matches && matches.length > 0) {
                    videoUrl = matches[0];
                    return false; 
                }
            }
            if (!videoUrl && scriptContent.includes('eval(function')) {
                const uuidMatches = scriptContent.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g);
                if (uuidMatches && uuidMatches.length > 0) {
                    videoUrl = `https://surrit.com/${uuidMatches[0]}/playlist.m3u8`;
                    return false; 
                }
            }
        });

        if (!videoUrl) {
            const matchSimple = html.match(/source\s*=\s*['"]([^'"]+)['"]/);
            if (matchSimple) videoUrl = matchSimple[1];
        }

        if (videoUrl) {
            return {
                id: link,
                type: "detail",
                mediaType: "movie",
                title: title,
                videoUrl: videoUrl,
                playerType: "system",
                customHeaders: {
                    "Referer": `${BASE_URL}/`,
                    "User-Agent": HEADERS["User-Agent"],
                    "Origin": BASE_URL
                }
            };
        } else {
            throw new Error("未在页面中提取到 m3u8 播放地址");
        }

    } catch (e) {
        throw new Error(`详情页错误: ${e.message}`);
    }
}

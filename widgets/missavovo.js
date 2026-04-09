WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV_ovo",
    author: "𝙨𝙣𝙤𝙡𝙞𝙜𝙝𝙩",
    description: "采用全新智能嗅探算法，无视网站前端改版",
    version: "3.0.0",
    requiredVersion: "0.0.2",
    site: "https://missav.com",
    detailCacheDuration: 60,
    modules: [
        {
            title: "🔍 搜索",
            description: "搜索 MissAV 视频",
            requiresWebView: true, // 开启 WebView 绕过盾
            functionName: "searchList",
            params: [
                { name: "keyword", title: "关键词", type: "input", value: "" },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "🆕 最新发布",
            description: "最新上线的视频",
            requiresWebView: true,
            functionName: "loadList",
            params: [
                { name: "url", type: "constant", value: "https://missav.com/cn/new" },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "🇨🇳 中文字幕",
            description: "中文字幕精选",
            requiresWebView: true,
            functionName: "loadList",
            params: [
                { name: "url", type: "constant", value: "https://missav.com/cn/chinese-subtitle" },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "🔞 无码流出",
            description: "破解无码系列",
            requiresWebView: true,
            functionName: "loadList",
            params: [
                { name: "url", type: "constant", value: "https://missav.com/cn/uncensored-leak" },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "🔥 热门榜单",
            description: "近期热门浏览",
            requiresWebView: true,
            functionName: "loadList",
            params: [
                { 
                    name: "url", 
                    title: "选择榜单", 
                    type: "enumeration", 
                    value: "https://missav.com/cn/weekly-hot",
                    enumOptions: [
                        { title: "本周热门", value: "https://missav.com/cn/weekly-hot" },
                        { title: "本月热门", value: "https://missav.com/cn/monthly-hot" },
                        { title: "历史最高", value: "https://missav.com/cn/today-hot" } // MissAV的today-hot有时会作为总榜
                    ] 
                },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "🎭 分类探索",
            description: "按分类浏览",
            requiresWebView: true,
            functionName: "loadList",
            params: [
                { 
                    name: "url", 
                    title: "选择分类", 
                    type: "enumeration", 
                    value: "https://missav.com/cn/genres/vr",
                    enumOptions: [
                        { title: "VR 虚拟现实", value: "https://missav.com/cn/genres/vr" },
                        { title: "素人", value: "https://missav.com/cn/amateur" },
                        { title: "FC2 俱乐部", value: "https://missav.com/cn/fc2" },
                        { title: "东京热", value: "https://missav.com/cn/tokyohot" },
                        { title: "一本道", value: "https://missav.com/cn/1pondo" },
                        { title: "Caribbean", value: "https://missav.com/cn/caribbeancom" },
                        { title: "Heyzo", value: "https://missav.com/cn/heyzo" }
                    ] 
                },
                { name: "page", title: "页码", type: "page", value: "1" }
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
 * 全新智能嗅探解析器 (无视CSS类名变动)
 */
function parseVideoList(html) {
    if (!html || html.includes("Just a moment") || html.includes("Cloudflare")) {
        return [{ id: "err_cf", type: "text", title: "被安全盾拦截", description: "请尝试切换全局代理节点或稍后再试" }];
    }

    const $ = Widget.html.load(html);
    const results = [];
    const seenUrls = new Set();

    // 遍历所有图片，通过图片反查所属的视频链接（最稳妥的爬虫策略）
    $("img").each((i, el) => {
        const $img = $(el);
        let imgSrc = $img.attr("data-src") || $img.attr("src") || "";
        
        // 过滤掉网站Logo、头像和极其微小的图标
        if (!imgSrc || imgSrc.includes('logo') || imgSrc.includes('avatar') || imgSrc.startsWith('data:image')) return;

        // 寻找包裹该图片的最近的 <a> 标签
        const $a = $img.closest("a");
        if ($a.length === 0) return;

        let href = $a.attr("href");
        // 过滤掉非视频链接
        if (!href || href.includes('/search') || href.includes('/categories') || href.includes('/actresses')) return;
        
        // 补全相对路径
        if (href.startsWith('/')) {
            href = `${BASE_URL}${href}`;
        }

        // 去重机制
        if (seenUrls.has(href)) return;
        seenUrls.add(href);

        // 智能提取标题 (先找图片的alt，没有再找a标签的文字，再找周边文字)
        let title = $img.attr("alt") || $a.attr("title") || "";
        if (!title) {
            title = $a.parent().text().trim().replace(/\s+/g, ' '); // 压缩多余空格
        }
        
        // 智能提取时长 (利用正则在周边文本中寻找 mm:ss 或 hh:mm:ss)
        let duration = "";
        const surroundingText = $a.parent().text();
        const timeMatch = surroundingText.match(/\d{2}:\d{2}(:\d{2})?/);
        if (timeMatch) {
            duration = timeMatch[0];
        }

        results.push({
            id: href, // 使用 url 作为唯一标识
            type: "url", // 👉 核心：这里使用 url 类型，App 才能正确跳转到 loadDetail
            mediaType: "movie",
            title: title,
            backdropPath: imgSrc, 
            link: href,
            description: duration ? `时长: ${duration}` : "点击播放",
            playerType: "system"
        });
    });

    if (results.length === 0) {
        return [{ id: "empty", type: "text", title: "当前页面未找到视频", description: "可能是网站又改版了，或者该分类下暂无内容" }];
    }

    return results;
}

// 供各个模块调用的列表加载器
async function loadList(params = {}) {
    let { url, page = 1 } = params;
    
    if (page > 1) {
        url += url.includes('?') ? `&page=${page}` : `?page=${page}`;
    }

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败", description: e.message }];
    }
}

// 搜索加载器
async function searchList(params = {}) {
    const { keyword, page = 1 } = params;
    if (!keyword) {
        return [{ id: "tip", type: "text", title: "请输入要搜索的车牌号或演员" }];
    }

    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}?page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "搜索失败", description: e.message }];
    }
}

// 详情播放页解析器
async function loadDetail(link) {
    try {
        const res = await Widget.http.get(link, { 
            headers: { ...HEADERS, "Referer": BASE_URL + "/" } 
        });
        const html = res.data;
        
        if (html.includes("Just a moment") || html.includes("Cloudflare")) {
             throw new Error("解析播放地址被安全盾拦截，请开启全局代理");
        }

        let videoUrl = "";

        // 提取策略 1：直接正则暴力匹配常见的 m3u8 (最快速)
        const m3u8Regex = /(https:\/\/[^"'\s<>]*?\.m3u8[^"'\s<>]*)/g;
        const matches = html.match(m3u8Regex);
        if (matches && matches.length > 0) {
            // 尽量寻找包含 playlist 的主链接，过滤掉无关的片段
            const playlistMatch = matches.find(m => m.includes('playlist.m3u8')) || matches[0];
            videoUrl = playlistMatch.replace(/\\/g, ''); 
        }

        // 提取策略 2：针对 MissAV 常见的 eval() 混淆代码进行 UUID 提取
        if (!videoUrl) {
             const $ = Widget.html.load(html);
             $('script').each((i, el) => {
                 const code = $(el).html();
                 if (code && code.includes('eval(function(p,a,c,k,e,d)')) {
                     // 从混淆代码中揪出视频唯一的 UUID
                     const uuidMatch = code.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
                     if (uuidMatch) {
                         // 拼接官方 CDN 地址
                         videoUrl = `https://surrit.com/${uuidMatch[0]}/playlist.m3u8`;
                         return false; 
                     }
                 }
             });
        }

        if (!videoUrl) {
            throw new Error("无法从页面代码中解析出 m3u8 播放地址");
        }

        // 获取视频真实标题
        const $ = Widget.html.load(html);
        let title = $('meta[property="og:title"]').attr('content') || $('h1').text().trim() || "未知影片";

        return {
            id: link,
            type: "detail",
            mediaType: "movie",
            title: title,
            videoUrl: videoUrl,
            playerType: "ijk", // 👉 强制使用 ijk 播放器兼容性更好
            customHeaders: {
                "Referer": link,
                "User-Agent": HEADERS["User-Agent"],
                "Origin": BASE_URL
            }
        };

    } catch (e) {
        throw new Error(`详情页解析错误: ${e.message}`);
    }
}

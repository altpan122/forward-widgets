WidgetMetadata = {
  id: "missav_int",
  title: "MissAV",
  description: "MissAV 影片浏览模块",
  author: "AI",
  site: "https://missav.ws",
  version: "1.0.0",
  requiredVersion: "0.0.2",
  detailCacheDuration: 60,
  modules: [
    // 搜索模块
    {
      title: "搜索",
      description: "搜索影片",
      requiresWebView: false,
      functionName: "search",
      cacheDuration: 3600,
      params: [
        {
          name: "keyword",
          title: "关键词",
          type: "input",
          description: "关键词",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "saved" },
            { title: "最多观看", value: "views" },
            { title: "最多收藏", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 最新模块
    {
      title: "最新",
      description: "最新上架影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://missav.ws/new",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "saved" },
            { title: "最多观看", value: "views" },
            { title: "最多收藏", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 今日热门
    {
      title: "热门",
      description: "今日热门影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://missav.ws/today-hot",
        },
        {
          name: "sort_by",
          title: "时段",
          type: "enumeration",
          description: "热门时段",
          enumOptions: [
            { title: "今日热门", value: "today-hot" },
            { title: "本周热门", value: "weekly-hot" },
            { title: "本月热门", value: "monthly-hot" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 无码模块
    {
      title: "无码",
      description: "无码影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://missav.ws/uncensored",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "saved" },
            { title: "最多观看", value: "views" },
            { title: "最多收藏", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 中文字幕
    {
      title: "中文",
      description: "中文字幕影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://missav.ws/chinese-subtitle",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "saved" },
            { title: "最多观看", value: "views" },
            { title: "最多收藏", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 女优模块
    {
      title: "女优",
      description: "按女优分类浏览",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "选择女优",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["saved", "views", "likes"],
          },
          enumOptions: [
            { title: "三上悠亚", value: "https://missav.ws/actress/yua-mikami" },
            { title: "深田咏美", value: "https://missav.ws/actress/eimi-fukada" },
            { title: "明里紬", value: "https://missav.ws/actress/tsumugi-akari" },
            { title: "桃乃木香奈", value: "https://missav.ws/actress/kana-momonogi" },
            { title: "天使萌", value: "https://missav.ws/actress/moe-amatsuka" },
            { title: "铃原爱蜜莉", value: "https://missav.ws/actress/emily-suzuhara" },
            { title: "JULIA", value: "https://missav.ws/actress/julia" },
            { title: "水野朝阳", value: "https://missav.ws/actress/asahi-mizuno" },
            { title: "吉泽明步", value: "https://missav.ws/actress/akiho-yoshizawa" },
            { title: "本庄铃", value: "https://missav.ws/actress/suzu-honjo" },
            { title: "河北彩伽", value: "https://missav.ws/actress/saika-kawakita" },
            { title: "伊东千奈美", value: "https://missav.ws/actress/chinami-ito" },
            { title: "七泽美亚", value: "https://missav.ws/actress/mia-nanasawa" },
            { title: "希崎杰西卡", value: "https://missav.ws/actress/jessica-kizaki" },
            { title: "桜空もも", value: "https://missav.ws/actress/momo-sakura" },
            { title: "涼森れむ", value: "https://missav.ws/actress/remu-suzumori" },
            { title: "宫部凉花", value: "https://missav.ws/actress/ryoka-miyabe" },
            { title: "佐佐木明希", value: "https://missav.ws/actress/aki-sasaki" },
            { title: "葵铃奈", value: "https://missav.ws/actress/rena-aoi" },
            { title: "小野夕子", value: "https://missav.ws/actress/yuko-ono" },
          ],
          value: "https://missav.ws/actress/yua-mikami",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "saved" },
            { title: "最多观看", value: "views" },
            { title: "最多收藏", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 制作商模块
    {
      title: "制作商",
      description: "按制作商分类浏览",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "选择制作商",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["saved", "views", "likes"],
          },
          enumOptions: [
            { title: "S1", value: "https://missav.ws/label/s1-no-1-style" },
            { title: "SOD", value: "https://missav.ws/label/sod-create" },
            { title: "MOODYZ", value: "https://missav.ws/label/moodyz" },
            { title: "Prestige", value: "https://missav.ws/label/prestige" },
            { title: "IDEAPOCKET", value: "https://missav.ws/label/ideapocket" },
            { title: "FALENO", value: "https://missav.ws/label/faleno" },
            { title: "E-BODY", value: "https://missav.ws/label/e-body" },
            { title: "ATTACKERS", value: "https://missav.ws/label/attackers" },
            { title: "Wanz Factory", value: "https://missav.ws/label/wanz-factory" },
            { title: "Madonna", value: "https://missav.ws/label/madonna" },
            { title: "PREMIUM", value: "https://missav.ws/label/premium" },
            { title: "V&R", value: "https://missav.ws/label/v-and-r" },
            { title: "ROCKET", value: "https://missav.ws/label/rocket" },
            { title: "RUBY", value: "https://missav.ws/label/ruby" },
            { title: "DANDY", value: "https://missav.ws/label/dandy" },
          ],
          value: "https://missav.ws/label/s1-no-1-style",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "saved" },
            { title: "最多观看", value: "views" },
            { title: "最多收藏", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 类型模块
    {
      title: "类型",
      description: "按类型分类浏览",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["saved", "views", "likes"],
          },
          enumOptions: [
            { title: "无码流出", value: "https://missav.ws/uncensored-leak" },
            { title: "素人", value: "https://missav.ws/genre/amateur" },
            { title: "熟女", value: "https://missav.ws/genre/mature-woman" },
            { title: "人妻", value: "https://missav.ws/genre/wife" },
            { title: "巨乳", value: "https://missav.ws/genre/big-tits" },
            { title: "美少女", value: "https://missav.ws/genre/beautiful-girl" },
            { title: "中出", value: "https://missav.ws/genre/creampie" },
            { title: "口交", value: "https://missav.ws/genre/blowjob" },
            { title: "3P", value: "https://missav.ws/genre/threesome" },
            { title: "痴汉", value: "https://missav.ws/genre/molester" },
            { title: "调教", value: "https://missav.ws/genre/training" },
            { title: "接吻", value: "https://missav.ws/genre/kiss" },
            { title: "丝袜", value: "https://missav.ws/genre/pantyhose" },
            { title: "护士", value: "https://missav.ws/genre/nurse" },
            { title: "教师", value: "https://missav.ws/genre/teacher" },
            { title: "女仆", value: "https://missav.ws/genre/maid" },
            { title: "潮吹", value: "https://missav.ws/genre/squirting" },
            { title: "NTR", value: "https://missav.ws/genre/ntr" },
            { title: "女同", value: "https://missav.ws/genre/lesbian" },
            { title: "颜射", value: "https://missav.ws/genre/facial" },
          ],
          value: "https://missav.ws/genre/amateur",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "saved" },
            { title: "最多观看", value: "views" },
            { title: "最多收藏", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
  ],
};

// ─── 搜索 ────────────────────────────────────────────────────────────────────
async function search(params = {}) {
  const keyword = encodeURIComponent(params.keyword || "");
  let url = `https://missav.ws/search/${keyword}`;
  if (params.sort_by) {
    url += `?sort=${params.sort_by}`;
  }
  if (params.from && params.from > 1) {
    const sep = url.includes("?") ? "&" : "?";
    url += `${sep}page=${params.from}`;
  }
  return await loadPage({ ...params, url });
}

// ─── 列表页（热门时段特殊处理） ──────────────────────────────────────────────
async function loadPage(params = {}) {
  const sections = await loadPageSections(params);
  const items = sections.flatMap((section) => section.childItems || []);
  return items;
}

async function loadPageSections(params = {}) {
  try {
    let url = params.url;
    if (!url) throw new Error("地址不能为空");

    // 热门时段：sort_by 存的是页面路径（today-hot/weekly-hot/monthly-hot）
    const hotValues = ["today-hot", "weekly-hot", "monthly-hot"];
    if (hotValues.includes(params.sort_by)) {
      url = `https://missav.ws/${params.sort_by}`;
    } else if (params.sort_by) {
      const sep = url.includes("?") ? "&" : "?";
      url += `${sep}sort=${params.sort_by}`;
    }

    if (params.from && params.from > 1) {
      const sep = url.includes("?") ? "&" : "?";
      url += `${sep}page=${params.from}`;
    }

    const response = await Widget.http.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        Referer: "https://missav.ws/",
      },
    });

    if (!response || !response.data || typeof response.data !== "string") {
      throw new Error("无法获取有效的HTML内容");
    }

    const htmlContent = response.data;

    if (
      htmlContent.includes("Just a moment") ||
      htmlContent.includes("Cloudflare")
    ) {
      throw new Error("被 Cloudflare 拦截，请开启全局代理后重试");
    }

    return parseMissavHtml(htmlContent);
  } catch (error) {
    console.error("loadPageSections 出错:", error.message);
    throw error;
  }
}

// ─── HTML 解析 ───────────────────────────────────────────────────────────────
function parseMissavHtml(htmlContent) {
  const $ = Widget.html.load(htmlContent);

  // MissAV 每个视频卡片的容器选择器
  // 结构示意：<div class="..."> <a href="..."> <img ...> </a> <div class="..."><a>标题</a></div> </div>
  const items = [];

  // MissAV 的视频列表卡片通常在 <div> 内包含 <a> 指向视频页，子元素有 img 和 title
  // 通用选择策略：找到所有含有视频链接的卡片
  $("div").each((_, el) => {
    const $el = $(el);

    // 找到直接子元素或孙元素中的视频链接（路径形如 /SONE-xxx 或 /dm13/zh/SONE-xxx）
    const $link = $el.find("a[href]").first();
    const href = $link.attr("href") || "";

    // 过滤：只保留指向视频详情页的链接（含域名或以 /XX- 开头的番号路径）
    if (
      !href ||
      (!href.includes("missav.ws/") && !href.match(/^\//)) ||
      href.includes("/actress/") ||
      href.includes("/label/") ||
      href.includes("/genre/") ||
      href.includes("/search/") ||
      href.includes("/new") ||
      href.includes("/hot") ||
      href === "/" ||
      href.length < 5
    ) {
      return;
    }

    // 视频链接必须包含番号特征（大写字母+数字）
    const videoPathMatch = href.match(/\/([A-Z]+-\d+|[a-z]+-\d+)\/?$/i);
    if (!videoPathMatch) return;

    const $img = $el.find("img").first();
    if (!$img.length) return;

    const cover =
      $img.attr("data-src") ||
      $img.attr("src") ||
      $img.attr("data-lazy-src") ||
      "";
    if (!cover || cover.includes("data:image")) return;

    // 标题：优先从专门的标题元素取，否则取 img alt
    let title = "";
    const $titleEl = $el.find(".title, [class*='title'], h3, h2").first();
    if ($titleEl.length) {
      title = $titleEl.text().trim();
    }
    if (!title) {
      title = $img.attr("alt") || $img.attr("title") || "";
    }
    if (!title) return;

    const fullUrl = href.startsWith("http") ? href : `https://missav.ws${href}`;

    // 去重
    if (items.some((i) => i.id === fullUrl)) return;

    items.push({
      id: fullUrl,
      type: "url",
      title: title,
      backdropPath: cover,
      previewUrl: "",
      link: fullUrl,
      mediaType: "movie",
      description: "",
      releaseDate: "",
      playerType: "system",
    });
  });

  if (items.length === 0) {
    return [];
  }

  return [{ title: "影片列表", childItems: items }];
}

// ─── 详情页 & 播放地址 ────────────────────────────────────────────────────────
async function loadDetail(link) {
  const response = await Widget.http.get(link, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://missav.ws/",
      "Accept-Language": "zh-CN,zh;q=0.9",
    },
  });

  if (
    response.data &&
    (response.data.includes("Just a moment") ||
      response.data.includes("Cloudflare"))
  ) {
    throw new Error("视频详情被 Cloudflare 拦截，请开启全局代理后重试");
  }

  // MissAV 播放地址通常藏在形如：
  //   source: 'https://surrit.com/xxxxxxxx/playlist.m3u8'
  // 或  data-src="https://..."
  let hlsUrl = "";

  // 方式1：匹配 source 字段（含单/双引号）
  const m1 = response.data.match(/source\s*[=:]\s*['"]([^'"]+\.m3u8[^'"]*)['"]/i);
  if (m1 && m1[1]) hlsUrl = m1[1];

  // 方式2：匹配 file 字段
  if (!hlsUrl) {
    const m2 = response.data.match(/['"]file['"]\s*:\s*['"]([^'"]+\.m3u8[^'"]*)['"]/i);
    if (m2 && m2[1]) hlsUrl = m2[1];
  }

  // 方式3：匹配 src 属性
  if (!hlsUrl) {
    const m3 = response.data.match(/src\s*=\s*['"]([^'"]+\.m3u8[^'"]*)['"]/i);
    if (m3 && m3[1]) hlsUrl = m3[1];
  }

  if (!hlsUrl) {
    throw new Error("无法提取播放地址，可能需要代理或登录");
  }

  return {
    id: link,
    type: "detail",
    videoUrl: hlsUrl,
    playerType: "ijk",
    customHeaders: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Referer: link,
      Origin: "https://missav.ws",
    },
  };
}

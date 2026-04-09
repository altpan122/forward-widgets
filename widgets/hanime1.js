// Original Structure: nibiru / jable_int
// Adapted for hanime1.me by: AI
WidgetMetadata = {
  id: "hanime1_int",
  title: "Hanime1",
  description: "Hanime1.me 动漫浏览模块",
  author: "AI",
  site: "https://hanime1.me",
  version: "1.0.0",
  requiredVersion: "0.0.2",
  detailCacheDuration: 60,
  modules: [
    // 搜索模块
    {
      title: "搜索",
      description: "搜索动漫",
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
            { title: "最新发布", value: "released_at_unix" },
            { title: "最多观看", value: "views" },
            { title: "最多喜欢", value: "likes" },
            { title: "标题", value: "title_sortable" },
          ],
        },
        {
          name: "ordering",
          title: "升降序",
          type: "enumeration",
          description: "排列顺序",
          enumOptions: [
            { title: "降序", value: "desc" },
            { title: "升序", value: "asc" },
          ],
          value: "desc",
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 最新模块
    {
      title: "最新",
      description: "最新上架动漫",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://hanime1.me/search?",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "released_at_unix" },
            { title: "最多观看", value: "views" },
            { title: "最多喜欢", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 标签模块 - 剧情
    {
      title: "剧情",
      description: "按剧情标签浏览",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "选择剧情",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["released_at_unix", "views", "likes"],
          },
          enumOptions: [
            {
              title: "NTR",
              value: "https://hanime1.me/search?tags%5B%5D=NTR",
            },
            {
              title: "乱伦",
              value: "https://hanime1.me/search?tags%5B%5D=Incest",
            },
            {
              title: "催眠",
              value: "https://hanime1.me/search?tags%5B%5D=Mind+Control",
            },
            {
              title: "触手",
              value: "https://hanime1.me/search?tags%5B%5D=Tentacle",
            },
            {
              title: "强奸",
              value: "https://hanime1.me/search?tags%5B%5D=Rape",
            },
            {
              title: "逆强奸",
              value: "https://hanime1.me/search?tags%5B%5D=Reverse+Rape",
            },
            {
              title: "剧情向",
              value: "https://hanime1.me/search?tags%5B%5D=Plot",
            },
            {
              title: "幻想",
              value: "https://hanime1.me/search?tags%5B%5D=Fantasy",
            },
            {
              title: "恐怖",
              value: "https://hanime1.me/search?tags%5B%5D=Horror",
            },
            {
              title: "轻松向",
              value: "https://hanime1.me/search?tags%5B%5D=Vanilla",
            },
            {
              title: "怀孕",
              value: "https://hanime1.me/search?tags%5B%5D=Pregnant",
            },
            {
              title: "丑男",
              value: "https://hanime1.me/search?tags%5B%5D=Ugly+Bastard",
            },
          ],
          value: "https://hanime1.me/search?tags%5B%5D=NTR",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "released_at_unix" },
            { title: "最多观看", value: "views" },
            { title: "最多喜欢", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 标签模块 - 角色
    {
      title: "角色",
      description: "按角色标签浏览",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "选择角色",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["released_at_unix", "views", "likes"],
          },
          enumOptions: [
            {
              title: "女学生",
              value: "https://hanime1.me/search?tags%5B%5D=School+Girl",
            },
            {
              title: "护士",
              value: "https://hanime1.me/search?tags%5B%5D=Nurse",
            },
            {
              title: "老师",
              value: "https://hanime1.me/search?tags%5B%5D=Teacher",
            },
            {
              title: "女仆",
              value: "https://hanime1.me/search?tags%5B%5D=Maid",
            },
            {
              title: "熟女",
              value: "https://hanime1.me/search?tags%5B%5D=Milf",
            },
            {
              title: "猫耳娘",
              value: "https://hanime1.me/search?tags%5B%5D=Nekomimi",
            },
            {
              title: "扶她",
              value: "https://hanime1.me/search?tags%5B%5D=Futanari",
            },
            {
              title: "后宫",
              value: "https://hanime1.me/search?tags%5B%5D=Harem",
            },
            {
              title: "萝莉",
              value: "https://hanime1.me/search?tags%5B%5D=Loli",
            },
            {
              title: "竖马",
              value: "https://hanime1.me/search?tags%5B%5D=Shota",
            },
            {
              title: "人妻",
              value: "https://hanime1.me/search?tags%5B%5D=Wife",
            },
            {
              title: "黑皮",
              value: "https://hanime1.me/search?tags%5B%5D=Dark+Skin",
            },
          ],
          value: "https://hanime1.me/search?tags%5B%5D=School+Girl",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "released_at_unix" },
            { title: "最多观看", value: "views" },
            { title: "最多喜欢", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 标签模块 - 交合
    {
      title: "交合",
      description: "按交合标签浏览",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "选择交合",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["released_at_unix", "views", "likes"],
          },
          enumOptions: [
            {
              title: "口交",
              value: "https://hanime1.me/search?tags%5B%5D=Blow+Job",
            },
            {
              title: "颜射",
              value: "https://hanime1.me/search?tags%5B%5D=Facial",
            },
            {
              title: "中出",
              value: "https://hanime1.me/search?tags%5B%5D=Creampie",
            },
            {
              title: "足交",
              value: "https://hanime1.me/search?tags%5B%5D=Foot+Job",
            },
            {
              title: "乳交",
              value: "https://hanime1.me/search?tags%5B%5D=BoobJob",
            },
            {
              title: "手交",
              value: "https://hanime1.me/search?tags%5B%5D=Hand+Job",
            },
            {
              title: "肛交",
              value: "https://hanime1.me/search?tags%5B%5D=Anal",
            },
            {
              title: "潮吹",
              value: "https://hanime1.me/search?tags%5B%5D=Squirting",
            },
            {
              title: "3P",
              value: "https://hanime1.me/search?tags%5B%5D=Threesome",
            },
            {
              title: "乱交",
              value: "https://hanime1.me/search?tags%5B%5D=Orgy",
            },
            {
              title: "痉挛",
              value: "https://hanime1.me/search?tags%5B%5D=Ahegao",
            },
            {
              title: "母乳",
              value: "https://hanime1.me/search?tags%5B%5D=Lactation",
            },
          ],
          value: "https://hanime1.me/search?tags%5B%5D=Blow+Job",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "released_at_unix" },
            { title: "最多观看", value: "views" },
            { title: "最多喜欢", value: "likes" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 标签模块 - 玩法
    {
      title: "玩法",
      description: "按玩法标签浏览",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "选择玩法",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["released_at_unix", "views", "likes"],
          },
          enumOptions: [
            {
              title: "BDSM",
              value: "https://hanime1.me/search?tags%5B%5D=BDSM",
            },
            {
              title: "捆绑",
              value: "https://hanime1.me/search?tags%5B%5D=Bondage",
            },
            {
              title: "玩具",
              value: "https://hanime1.me/search?tags%5B%5D=Toys",
            },
            {
              title: "公开",
              value: "https://hanime1.me/search?tags%5B%5D=Public+Sex",
            },
            {
              title: "自慰",
              value: "https://hanime1.me/search?tags%5B%5D=Masturbation",
            },
            {
              title: "3D",
              value: "https://hanime1.me/search?tags%5B%5D=3D",
            },
            {
              title: "Cosplay",
              value: "https://hanime1.me/search?tags%5B%5D=Cosplay",
            },
            {
              title: "泳衣",
              value: "https://hanime1.me/search?tags%5B%5D=Swimsuit",
            },
            {
              title: "眼镜",
              value: "https://hanime1.me/search?tags%5B%5D=Glasses",
            },
            {
              title: "X光透视",
              value: "https://hanime1.me/search?tags%5B%5D=X-Ray",
            },
            {
              title: "放尿",
              value: "https://hanime1.me/search?tags%5B%5D=Watersports",
            },
          ],
          value: "https://hanime1.me/search?tags%5B%5D=BDSM",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "released_at_unix" },
            { title: "最多观看", value: "views" },
            { title: "最多喜欢", value: "likes" },
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
            value: ["released_at_unix", "views", "likes"],
          },
          enumOptions: [
            {
              title: "MS Pictures",
              value: "https://hanime1.me/search?brands%5B%5D=MS+Pictures",
            },
            {
              title: "Pink Pineapple",
              value: "https://hanime1.me/search?brands%5B%5D=Pink+Pineapple",
            },
            {
              title: "ARMS",
              value: "https://hanime1.me/search?brands%5B%5D=Arms",
            },
            {
              title: "Lune Pictures",
              value: "https://hanime1.me/search?brands%5B%5D=Lune+Pictures",
            },
            {
              title: "Collaboration Works",
              value: "https://hanime1.me/search?brands%5B%5D=Collaboration+Works",
            },
            {
              title: "Bunnywalker",
              value: "https://hanime1.me/search?brands%5B%5D=Bunnywalker",
            },
            {
              title: "Studio FOW",
              value: "https://hanime1.me/search?brands%5B%5D=Studio+FOW",
            },
            {
              title: "Umemaro-3D",
              value: "https://hanime1.me/search?brands%5B%5D=Umemaro-3D",
            },
            {
              title: "Digital Works",
              value: "https://hanime1.me/search?brands%5B%5D=Digital+Works",
            },
            {
              title: "Soft on Demand",
              value: "https://hanime1.me/search?brands%5B%5D=Soft+on+Demand",
            },
            {
              title: "Green Bunny",
              value: "https://hanime1.me/search?brands%5B%5D=Green+Bunny",
            },
            {
              title: "Blue Eyes",
              value: "https://hanime1.me/search?brands%5B%5D=Blue+Eyes",
            },
            {
              title: "Vanilla",
              value: "https://hanime1.me/search?brands%5B%5D=Vanilla",
            },
            {
              title: "Magic Bus",
              value: "https://hanime1.me/search?brands%5B%5D=Magic+Bus",
            },
            {
              title: "PoRO",
              value: "https://hanime1.me/search?brands%5B%5D=PoROProject",
            },
          ],
          value: "https://hanime1.me/search?brands%5B%5D=MS+Pictures",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新发布", value: "released_at_unix" },
            { title: "最多观看", value: "views" },
            { title: "最多喜欢", value: "likes" },
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
  let url = `https://hanime1.me/search?q=${keyword}`;

  if (params.sort_by) url += `&order_by=${params.sort_by}`;
  // 搜索模块有单独的 ordering 参数
  if (params.ordering) url += `&ordering=${params.ordering}`;
  else url += `&ordering=desc`;

  if (params.from && params.from > 1) {
    url += `&p=${params.from - 1}`; // hanime1 页码从 0 开始
  }

  return await loadPage({ ...params, url });
}

// ─── 列表页 ───────────────────────────────────────────────────────────────────
async function loadPage(params = {}) {
  const sections = await loadPageSections(params);
  const items = sections.flatMap((section) => section.childItems || []);
  return items;
}

async function loadPageSections(params = {}) {
  try {
    let url = params.url;
    if (!url) throw new Error("地址不能为空");

    // 拼接排序参数（非搜索模块调用）
    if (params.sort_by && !url.includes("order_by=")) {
      const sep = url.includes("?") ? "&" : "?";
      url += `${sep}order_by=${params.sort_by}&ordering=desc`;
    }

    // 页码（hanime1 从 0 起，forward 从 1 起）
    if (params.from && params.from > 1 && !url.includes("&p=")) {
      const sep = url.includes("?") ? "&" : "?";
      url += `${sep}p=${params.from - 1}`;
    }

    const response = await Widget.http.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8",
        Referer: "https://hanime1.me/",
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

    return parseHanime1Html(htmlContent);
  } catch (error) {
    console.error("loadPageSections 出错:", error.message);
    throw error;
  }
}

// ─── HTML 解析 ───────────────────────────────────────────────────────────────
function parseHanime1Html(htmlContent) {
  const $ = Widget.html.load(htmlContent);
  const items = [];

  // hanime1.me 视频卡片结构：
  //  <a href="/watch?v=xxxxx" class="...">
  //    <div class="...">
  //      <img src="封面" alt="标题">
  //      <div class="...">标题文字</div>
  //    </div>
  //  </a>
  $("a[href]").each((_, el) => {
    const $el = $(el);
    const href = $el.attr("href") || "";

    // hanime1.me 视频页 URL 形如：/watch?v=12345
    if (!href.includes("/watch") || !href.includes("v=")) return;

    const fullUrl = href.startsWith("http")
      ? href
      : `https://hanime1.me${href}`;

    const $img = $el.find("img").first();
    if (!$img.length) return;

    const cover =
      $img.attr("data-src") ||
      $img.attr("src") ||
      $img.attr("data-lazy") ||
      "";

    if (!cover || cover.includes("data:image")) return;

    // 标题：alt 属性 或 文字子节点
    let title = $img.attr("alt") || $img.attr("title") || "";
    if (!title) {
      // 尝试找标题文字节点
      const $titleEl = $el
        .find(".card-mobile-title, .title, h4, h3, [class*='title']")
        .first();
      title = $titleEl.text().trim();
    }
    if (!title) return;

    // 去重
    if (items.some((i) => i.id === fullUrl)) return;

    // 时长：若有
    const $duration = $el.find(".card-mobile-duration, .duration, [class*='duration']").first();
    const duration = $duration.length ? $duration.text().trim() : "";

    items.push({
      id: fullUrl,
      type: "url",
      title: title,
      backdropPath: cover,
      previewUrl: "",
      link: fullUrl,
      mediaType: "movie",
      description: "",
      releaseDate: duration,
      playerType: "system",
    });
  });

  if (items.length === 0) return [];

  return [{ title: "动漫列表", childItems: items }];
}

// ─── 详情页 & 播放地址 ────────────────────────────────────────────────────────
async function loadDetail(link) {
  const response = await Widget.http.get(link, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://hanime1.me/",
      "Accept-Language": "zh-TW,zh;q=0.9",
    },
  });

  if (
    response.data &&
    (response.data.includes("Just a moment") ||
      response.data.includes("Cloudflare"))
  ) {
    throw new Error("视频详情被 Cloudflare 拦截，请开启全局代理后重试");
  }

  let hlsUrl = "";

  // hanime1.me 播放地址通常在 <source src="..."> 或 video.js 配置中
  // 方式1：直接 <source> 标签
  const m1 = response.data.match(/<source[^>]+src=["']([^"']+\.m3u8[^"']*)['"]/i);
  if (m1 && m1[1]) hlsUrl = m1[1];

  // 方式2：JS 变量 file / src / url
  if (!hlsUrl) {
    const m2 = response.data.match(/['"](https?:\/\/[^'"]+\.m3u8[^'"]*)['"]/i);
    if (m2 && m2[1]) hlsUrl = m2[1];
  }

  // 方式3：video_url 字段
  if (!hlsUrl) {
    const m3 = response.data.match(/video_url\s*[:=]\s*['"]([^'"]+)['"]/i);
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
      Origin: "https://hanime1.me",
    },
  };
}

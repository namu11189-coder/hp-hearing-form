const STORAGE_KEY = "homepage_hearing_form_v1";

const config = window.HOMEPAGE_HEARING_FORM_CONFIG || {};
const REQUIRED_VALIDATION_ENABLED = true;
const query = new URLSearchParams(window.location.search);
const mode = {
  isMeeting: query.get("mode") === "meeting" || query.has("uuid"),
  uuid: query.get("uuid") || "",
  loadedFromServer: false,
  lastSavedAt: ""
};

const triChoices = [
  { label: "必要", value: "needed" },
  { label: "不要", value: "not_needed" },
  { label: "未定", value: "undecided" }
];

const purposeIconPaths = {
  company_intro: "./assets/icons/company_intro.png",
  lead_generation: "./assets/icons/lead_generation.png",
  recruiting: "./assets/icons/recruiting.png",
  trust: "./assets/icons/trust.png",
  campaign_landing: "./assets/icons/campaign_landing.png",
  business_card: "./assets/icons/business_card.png",
  renewal: "./assets/icons/renewal.png",
  unknown: "./assets/icons/unknown.png",
  need_consultation: "./assets/icons/need_consultation.png"
};

const audienceIconPaths = {
  general_customers: "./assets/icons/target/general_customers.png",
  business_customers: "./assets/icons/target/business_customers.png",
  job_seekers: "./assets/icons/target/job_seekers.png",
  existing_customers: "./assets/icons/target/existing_customers.png",
  partners: "./assets/icons/target/partners.png",
  local_people: "./assets/icons/target/local_people.png",
  unknown: "./assets/icons/target/unknown.png",
  need_consultation: "./assets/icons/target/need_consultation.png"
};

const targetFieldIconPaths = {
  ageRange: "./assets/icons/target/age_range.png",
  gender: "./assets/icons/target/gender.png",
  area: "./assets/icons/target/area.png",
  problems: "./assets/icons/target/problems.png"
};

const contentsIconPaths = {
  "トップページ": "./assets/icons/contents/top_page.png",
  "サービス紹介": "./assets/icons/contents/service.png",
  "実績紹介": "./assets/icons/contents/works.png",
  "お問い合わせ": "./assets/icons/contents/contact.png",
  "採用情報": "./assets/icons/contents/recruit.png",
  "お知らせ": "./assets/icons/contents/news.png",
  "ブログ": "./assets/icons/contents/blog.png",
  "FAQ": "./assets/icons/contents/faq.png",
  "会社概要": "./assets/icons/contents/company.png",
  "料金案内": "./assets/icons/contents/price.png"
};

const contentsFieldIconPaths = {
  otherContents: "./assets/icons/contents/blog.png"
};

const serverInfoIconPaths = {
  domain: "./assets/icons/server/domain.png",
  server: "./assets/icons/server/server.png"
};

const featureIconPaths = {
  "お問い合わせフォーム": "./assets/icons/features/contact_form.png",
  "LINE連携": "./assets/icons/features/line.png",
  "Instagram連携": "./assets/icons/features/instagram.png",
  "Googleマップ": "./assets/icons/features/google_map.png",
  "予約機能": "./assets/icons/features/reservation.png",
  "商品紹介": "./assets/icons/features/product.png",
  "会員機能": "./assets/icons/features/member.png",
  "多言語対応": "./assets/icons/features/multilingual.png",
  "ブログ機能": "./assets/icons/features/blog.png",
  "採用応募フォーム": "./assets/icons/features/recruit_form.png"
};

const featureDescriptions = {
  "お問い合わせフォーム": "お問い合わせを受け付けるフォームを設置します。",
  "LINE連携": "LINE公式アカウントとの連携を行います。",
  "Instagram連携": "Instagramの投稿やフィードを表示します。",
  "Googleマップ": "Googleマップを埋め込み表示します。",
  "予約機能": "オンラインで予約・日程管理が可能です。",
  "商品紹介": "商品やサービスの紹介ページを作成します。",
  "会員機能": "会員登録やマイページ機能を提供します。",
  "多言語対応": "複数の言語に対応したサイトを構築します。",
  "ブログ機能": "お知らせやブログを投稿・管理できます。",
  "採用応募フォーム": "採用応募を受け付けるフォームを設置します。"
};

const steps = [
  {
    id: "customer",
    title: "基本情報のご入力",
    description: "制作内容を整理するため、基本情報のご入力をお願いいたします。",
    fields: [
      { key: "companyName", label: "会社名", type: "text", required: true, placeholder: "例：株式会社サンプル", error: "ご連絡のため、会社名の入力をお願いします" },
      { key: "contactName", label: "担当者名", type: "text", required: true, placeholder: "例：山田 太郎", error: "ご担当者名の入力をお願いします" },
      { key: "email", label: "メールアドレス", type: "email", required: true, placeholder: "例：info@example.com", error: "ご連絡先メールアドレスの入力をお願いします" },
      { key: "phone", label: "電話番号", type: "tel", required: true, placeholder: "例：03-1234-5678", error: "ご連絡先電話番号の入力をお願いします" },
      { key: "businessDescription", label: "事業内容", type: "textarea", hint: "ご記入可能な範囲で問題ありません。", placeholder: "例：住宅リフォーム、飲食店、採用支援サービスなど" },
      { key: "currentWebsiteUrl", label: "現在のホームページURL", type: "text", placeholder: "例：https://example.com" },
      { key: "sns", label: "SNS情報", type: "textarea", hint: "Instagram、X、FacebookなどのURLをご入力ください。", placeholder: "例：https://www.instagram.com/example" },
      { key: "notes", label: "補足事項", type: "textarea", placeholder: "例：事前に共有しておきたい内容があればご記入ください。" }
    ]
  },
  {
    id: "purpose",
    title: "ホームページ制作の主な目的",
    description: "該当する項目を選択してください。複数選択も可能です。",
    helpTitle: "ホームページ制作の目的",
    help: [
      "目的とは、ホームページを閲覧した方に期待する行動や役割を指します。",
      "お問い合わせ数の増加、採用強化、会社紹介、信頼感の向上などが該当します。",
      "判断に迷う場合は、現在の課題に近い項目を選択してください。"
    ],
    fields: [
      {
        key: "purpose",
        label: "目的",
        type: "checkboxes",
        options: [
          ["会社・店舗紹介", "company_intro"],
          ["お問い合わせ増加", "lead_generation"],
          ["採用強化", "recruiting"],
          ["信頼感向上", "trust"],
          ["SNS・広告の受け皿", "campaign_landing"],
          ["名刺代わりに使いたい", "business_card"],
          ["既存サイトのリニューアル", "renewal"],
          ["未定", "unknown"],
          ["相談希望", "need_consultation"]
        ]
      }
    ]
  },
  {
    id: "target",
    title: "想定している閲覧者",
    description: "現在のお客様に近い層、今後対象を広げる層のどちらでも構いません。",
    helpTitle: "想定している閲覧者",
    help: [
      "ここでは、ホームページを主に閲覧する相手を整理します。",
      "現在のお客様に近い層でも、今後対象を広げる層でも構いません。",
      "明確に決まっていない場合は「相談希望」を選択してください。"
    ],
    fields: [
      {
        key: "audience",
        label: "想定閲覧者",
        type: "checkboxes",
        options: [
          ["一般のお客様", "general_customers"],
          ["法人のお客様", "business_customers"],
          ["採用応募者", "job_seekers"],
          ["既存のお客様", "existing_customers"],
          ["取引先", "partners"],
          ["地域の方", "local_people"],
          ["未定", "unknown"],
          ["相談希望", "need_consultation"]
        ]
      },
      { key: "ageRange", label: "年齢層", type: "select", options: ["未定", "10代から20代", "20代から30代", "30代から40代", "40代から50代", "50代以上", "幅広い年代"] },
      { key: "gender", label: "性別", type: "select", options: ["未定", "男性が多い", "女性が多い", "男女どちらも", "特に決まっていない"] },
      { key: "area", label: "対応エリア", type: "text", hint: "例：市内、県内、全国、オンライン対応など", placeholder: "例：東京都内、関東全域、全国対応" },
      { key: "problems", label: "お客様の課題", type: "textarea", hint: "差し支えない範囲でご記入ください。", placeholder: "例：価格がわかりにくい、相談先を探している、比較検討しているなど" }
    ]
  },
  {
    id: "contents",
    title: "掲載希望内容",
    description: "必要と思われる項目を選択してください。不明な項目は「未定」を選択してください。",
    helpTitle: "掲載希望内容",
    help: [
      "ホームページに掲載するページや情報を整理する項目です。",
      "各項目を「必要」「不要」「未定」から選択してください。",
      "判断に迷う項目は「未定」を選択してください。打ち合わせ時に確認します。"
    ],
    fields: [
      { key: "contents", label: "掲載希望内容", type: "tri", items: ["トップページ", "サービス紹介", "実績紹介", "お問い合わせ", "採用情報", "お知らせ", "ブログ", "FAQ", "会社概要", "料金案内"] },
      { key: "otherContents", label: "その他、追加したいページ・内容", type: "textarea", hint: "選択肢にないページや内容があればご記入ください。", placeholder: "例：スタッフ紹介、店舗情報、よくある相談内容、施工の流れなど" }
    ]
  },
  {
    id: "design",
    title: "デザインのご希望",
    description: "参考サイトは同業種でなくても構いません。好みの雰囲気や避けたい表現があれば参考になります。",
    helpTitle: "デザインの希望",
    help: [
      "色、雰囲気、参考サイトなどを確認する項目です。",
      "参考サイトは同業種でなくても構いません。",
      "好みの雰囲気、または避けたい雰囲気のどちらかだけでも参考になります。"
    ],
    fields: [
      {
        key: "mood",
        label: "希望する雰囲気",
        type: "checkboxes",
        options: [
          ["シンプル", "simple"],
          ["信頼感がある", "trustworthy"],
          ["親しみやすい", "friendly"],
          ["高級感がある", "luxury"],
          ["明るい", "bright"],
          ["落ち着いた", "calm"],
          ["かわいい", "cute"],
          ["かっこいい", "cool"],
          ["和風", "japanese"],
          ["ナチュラル", "natural"],
          ["イメージ未定", "unknown"],
          ["相談希望", "need_consultation"]
        ]
      },
      { key: "colors", label: "使用希望色", type: "text", hint: "例：青系、白多め、会社ロゴの色など", placeholder: "例：白・黒・深緑を中心に" },
      { key: "referenceUrls", label: "参考サイトURL", type: "textarea", hint: "複数ある場合は改行してご入力ください。", placeholder: "例：https://example.com" },
      { key: "avoid", label: "避けたいデザイン", type: "textarea", placeholder: "例：派手すぎる色、文字が小さいデザインなど" },
      { key: "logo", label: "ロゴの有無", type: "select", options: ["未定", "ロゴあり", "ロゴなし", "作成も相談希望"] },
      { key: "status", label: "デザインの検討状況", type: "select", options: ["未定", "おおよそ決定済み", "相談希望"] }
    ]
  },
  {
    id: "materials",
    title: "写真・文章素材の準備状況",
    description: "未準備でも問題ありません。既存資料があれば内容作成の参考になります。",
    helpTitle: "写真・文章素材",
    help: [
      "写真、ロゴ、パンフレット、チラシ、会社案内などの準備状況を確認します。",
      "初期版では、このフォームからファイルアップロードは行いません。",
      "写真や資料は、後日メールなどで共有いただければ問題ありません。"
    ],
    fields: [
      { key: "status", label: "準備状況", type: "radio", options: [["写真・文章ともに概ね準備済み", "both_ready"], ["写真あり／文章は未準備", "photos_ready"], ["文章あり／写真は未準備", "text_ready"], ["どちらも未準備", "not_ready"], ["撮影・文章作成の相談希望", "need_consultation"], ["不明", "unknown"]] },
      { key: "photoNeed", label: "撮影の必要性", type: "select", options: ["未定", "撮影が必要", "手元の写真を使用", "相談希望"] },
      { key: "documents", label: "パンフレットや既存資料", type: "select", options: ["未定", "資料あり", "資料なし", "確認中", "相談希望"] },
      { key: "notes", label: "補足", type: "textarea", placeholder: "例：写真は後日共有予定、文章作成も相談希望など" }
    ]
  },
  {
    id: "features",
    title: "必要な機能",
    description: "必要性が不明な項目は「未定」を選択してください。打ち合わせ時に確認します。",
    helpTitle: "必要な機能",
    help: [
      "お問い合わせフォーム、Googleマップ、予約機能など、ホームページに付けたい機能を確認します。",
      "必要性が不明な項目は「未定」を選択してください。",
      "機能によって制作範囲が変わるため、打ち合わせ時に確認します。"
    ],
    fields: [
      { key: "features", label: "必要な機能", type: "tri", items: ["お問い合わせフォーム", "LINE連携", "Instagram連携", "Googleマップ", "予約機能", "商品紹介", "会員機能", "多言語対応", "ブログ機能", "採用応募フォーム"] },
      {
        key: "siteRequirements",
        label: "サイトに必要な仕組み",
        type: "checkboxes",
        hint: "静的サイトで足りるか、更新機能や会員機能などが必要かを判断するための項目です。近いものを選択してください。",
        options: [
          ["見るだけのページが中心", "static_pages"],
          ["お問い合わせを受け付けたい", "contact"],
          ["お知らせやブログを自社で更新したい", "cms_updates"],
          ["予約・申込を受け付けたい", "reservation"],
          ["商品や在庫を管理したい", "product_inventory"],
          ["会員ログインが必要", "member_login"],
          ["条件検索・絞り込みが必要", "search_filter"],
          ["まだ分からない / 相談したい", "unknown_consultation"]
        ]
      }
    ]
  },
  {
    id: "operation",
    title: "公開後の更新・運用方針",
    description: "お知らせやブログを自社で更新するか、制作側へ依頼するかをご選択ください。",
    helpTitle: "公開後の更新・運用",
    help: [
      "公開後に、お知らせやブログなどを更新するか確認します。",
      "自社で更新する場合は、管理画面が必要になることがあります。",
      "更新しない予定の場合は、シンプルな構成にできる場合があります。"
    ],
    fields: [
      { key: "plan", label: "運用方法", type: "radio", options: [["自社で更新", "self_update"], ["制作側へ更新依頼", "request_update"], ["お知らせのみ自社更新", "news_only"], ["ブログ・実績も自社更新", "blog_and_works"], ["更新予定なし", "no_update"], ["未定", "unknown"], ["相談希望", "need_consultation"]] },
      { key: "frequency", label: "更新頻度", type: "select", options: ["未定", "月に数回", "月に1回程度", "数か月に1回", "ほとんど更新しない", "相談希望"] },
      { key: "adminNeed", label: "管理画面の必要性", type: "select", options: ["未定", "必要", "不要", "不明", "相談希望"] },
      { key: "notes", label: "補足", type: "textarea", placeholder: "例：更新担当者は未定、月1回程度のお知らせ更新を想定など" }
    ]
  },
  {
    id: "scheduleBudgetServer",
    title: "公開時期・予算・サーバー情報",
    description: "ホームページ公開の計画やご予算、ドメイン・サーバーなどの情報をご記入ください。",
    fields: [
      { key: "desiredLaunch", label: "希望公開時期", type: "text", hint: "例：8月頃、早期公開希望、未定など", placeholder: "例：2026年8月頃" },
      { key: "priority", label: "優先事項", type: "select", options: ["未定", "公開時期", "予算", "デザイン", "機能", "相談希望"] },
      { key: "budgetStatus", label: "予算状況", type: "select", options: ["未定", "打ち合わせで決定済み", "相談済み・確認済み", "概算希望あり", "相談希望"] },
      { key: "budgetNote", label: "予算の補足", type: "textarea", hint: "任意です。金額入力は必須ではありません。", placeholder: "例：打ち合わせで確認済み、概算のみ相談希望など" },
      { key: "domain", label: "ドメイン", type: "select", options: ["不明", "取得済み", "未取得", "取得も相談希望"] },
      { key: "server", label: "サーバー契約", type: "select", options: ["不明", "契約済み", "未契約", "相談希望"] },
      { key: "manager", label: "管理会社", type: "text", hint: "不明な場合は空欄で構いません。", placeholder: "例：〇〇サーバー、前制作会社名など" },
      { key: "emailUsage", label: "メール利用希望", type: "select", options: ["未定", "独自ドメインメールを利用希望", "現在のメールを利用希望", "不明", "相談希望"] },
      { key: "notes", label: "その他要望", type: "textarea", placeholder: "例：公開前に社内確認期間が必要、採用ページを優先したいなど" }
    ]
  },
  {
    id: "confirm",
    title: "入力内容の確認",
    description: "未入力の項目は後日の打ち合わせで確認します。内容をご確認のうえ送信してください。",
    fields: []
  },
  {
    id: "complete",
    title: "送信完了",
    description: "",
    fields: []
  }
];

const state = {
  currentStep: 0,
  data: createDefaultData(),
  hasRestoredChoice: false,
  submitted: false,
  mode: mode.isMeeting ? "meeting" : "input"
};

const root = document.getElementById("step-root");
const stepCount = document.getElementById("step-count");
const progressBar = document.getElementById("progress-bar");
const stepJumpNav = document.getElementById("step-jump-nav");
const reviewNeededPanel = document.getElementById("review-needed-panel");
const saveStatus = document.getElementById("save-status");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const formError = document.getElementById("form-error");

function getStorageKey() {
  return mode.isMeeting && mode.uuid ? `${STORAGE_KEY}_meeting_${mode.uuid}` : STORAGE_KEY;
}

function createDefaultData() {
  return {
    meta: {
      uuid: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()),
      submittedAt: "",
      updatedAt: "",
      source: "homepage_hearing_form"
    },
    customer: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      businessDescription: "",
      currentWebsiteUrl: "",
      sns: "",
      notes: ""
    },
    purpose: [],
    target: {
      audience: [],
      ageRange: "",
      gender: "",
      area: "",
      problems: ""
    },
    contents: {},
    design: {
      mood: [],
      colors: "",
      referenceUrls: [],
      avoid: "",
      logo: "",
      status: ""
    },
    materials: {},
    features: {},
    operation: {},
    scheduleBudgetServer: {
      desiredLaunch: "",
      priority: "",
      budgetStatus: "",
      budgetNote: "",
      domain: "",
      server: "",
      manager: "",
      emailUsage: "",
      notes: ""
    }
  };
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(getStorageKey());
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("保存データを読み込めませんでした", error);
    return null;
  }
}

function hasMeaningfulInput(value) {
  if (Array.isArray(value)) {
    return value.some((item) => hasMeaningfulInput(item));
  }
  if (value && typeof value === "object") {
    return Object.values(value).some((item) => hasMeaningfulInput(item));
  }
  return String(value ?? "").trim() !== "";
}

function hasSavedAnswer(data) {
  if (!data) return false;
  return [
    data.customer,
    data.purpose,
    data.target,
    data.contents,
    data.design,
    data.materials,
    data.features,
    data.operation,
    data.scheduleBudgetServer
  ].some((section) => hasMeaningfulInput(section));
}

function save() {
  state.data.meta.updatedAt = new Date().toISOString();
  localStorage.setItem(
    getStorageKey(),
    JSON.stringify({ currentStep: state.currentStep, data: state.data })
  );
  saveStatus.textContent = mode.isMeeting ? "編集中" : "保存済み";
  window.clearTimeout(saveStatus.timer);
  saveStatus.timer = window.setTimeout(() => {
    if (!state.submitted) saveStatus.textContent = mode.isMeeting ? "打ち合わせ編集中" : "未送信";
  }, 1400);
}

function clearSaved() {
  localStorage.removeItem(getStorageKey());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createMeetingBanner() {
  const header = document.querySelector(".app-header");
  if (!header || !mode.isMeeting) return null;
  const banner = document.createElement("section");
  banner.className = "meeting-banner";
  banner.innerHTML = `
    <div>
      <p class="meeting-kicker">打ち合わせ編集モード</p>
      <p class="meeting-meta" id="meeting-meta">${escapeHtml(getMeetingClientLabel())}</p>
    </div>
    <div class="meeting-actions">
      <button type="button" class="button secondary" id="meeting-reload">回答を再読み込み</button>
      <button type="button" class="button primary" id="meeting-save">打ち合わせ内容を保存</button>
    </div>
  `;
  header.insertAdjacentElement("afterend", banner);
  document.getElementById("meeting-reload").addEventListener("click", () => loadRemoteAnswer({ force: true }));
  document.getElementById("meeting-save").addEventListener("click", saveMeetingAnswer);
  return banner;
}

function updateMeetingMeta(message) {
  const meta = document.getElementById("meeting-meta");
  if (!meta) return;
  meta.textContent = getMeetingClientLabel(message);
}

function getMeetingClientLabel(fallback = "") {
  const companyName = state.data.customer?.companyName?.trim();
  const contactName = state.data.customer?.contactName?.trim();
  if (companyName && contactName) return `${companyName} / ${contactName} 様`;
  if (companyName) return companyName;
  if (contactName) return `${contactName} 様`;
  return fallback || "打ち合わせ編集中";
}

function getStepData(stepId) {
  if (stepId === "purpose") return state.data;
  return state.data[stepId] || {};
}

function setValue(stepId, key, value) {
  if (stepId === "purpose") {
    state.data.purpose = value;
    return;
  }
  state.data[stepId][key] = value;
}

function getValue(stepId, key) {
  if (stepId === "purpose") return state.data.purpose;
  return state.data[stepId]?.[key] ?? "";
}

function toKey(label) {
  return label
    .normalize("NFKC")
    .replace(/\s+/g, "_")
    .replace(/[^\p{Letter}\p{Number}_]/gu, "");
}

function getStepShortTitle(step) {
  const titles = {
    customer: "基本",
    purpose: "目的",
    target: "閲覧者",
    contents: "掲載",
    design: "デザイン",
    materials: "素材",
    features: "機能",
    operation: "運用",
    scheduleBudgetServer: "時期",
    confirm: "確認"
  };
  return titles[step.id] || step.title;
}

function isReviewNeededText(value) {
  return /未定|不明|相談|確認中|未準備|まだ分からない/.test(String(value ?? ""));
}

function optionLabelFromValue(options = [], value) {
  const match = options.find(([, optionValue]) => optionValue === value);
  return match ? match[0] : value;
}

function getReviewNeededItems() {
  return steps.slice(0, -2).flatMap((step, stepIndex) => {
    return step.fields.flatMap((field) => {
      const value = getValue(step.id, field.key);
      if (field.type === "checkboxes") {
        const values = Array.isArray(value) ? value : [];
        return values
          .map((selectedValue) => optionLabelFromValue(field.options, selectedValue))
          .filter(isReviewNeededText)
          .map((label) => ({
            stepIndex,
            stepTitle: step.title,
            fieldLabel: field.label,
            value: label
          }));
      }
      if (field.type === "radio") {
        const label = optionLabelFromValue(field.options, value);
        return isReviewNeededText(label) ? [{ stepIndex, stepTitle: step.title, fieldLabel: field.label, value: label }] : [];
      }
      if (field.type === "tri") {
        return Object.values(value || {})
          .filter((item) => isReviewNeededText(item?.display))
          .map((item) => ({
            stepIndex,
            stepTitle: step.title,
            fieldLabel: field.label,
            value: `${item.label}: ${item.display}`
          }));
      }
      if (Array.isArray(value)) {
        const text = value.join("、");
        return isReviewNeededText(text) ? [{ stepIndex, stepTitle: step.title, fieldLabel: field.label, value: text }] : [];
      }
      return isReviewNeededText(value) ? [{ stepIndex, stepTitle: step.title, fieldLabel: field.label, value }] : [];
    });
  });
}

function renderReviewNeededPanel() {
  if (!reviewNeededPanel) return;
  if (!mode.isMeeting) {
    reviewNeededPanel.classList.add("hidden");
    reviewNeededPanel.innerHTML = "";
    return;
  }

  const items = getReviewNeededItems();
  reviewNeededPanel.classList.remove("hidden");
  if (!items.length) {
    reviewNeededPanel.innerHTML = `
      <div class="review-needed-header">
        <div>
          <p class="review-needed-kicker">確認が必要な項目</p>
          <h2>未定・相談希望はありません</h2>
        </div>
      </div>
    `;
    return;
  }

  reviewNeededPanel.innerHTML = `
    <div class="review-needed-header">
      <div>
        <p class="review-needed-kicker">確認が必要な項目</p>
        <h2>未定・相談希望 ${items.length}件</h2>
      </div>
    </div>
    <div class="review-needed-list">
      ${items.map((item) => `
        <button type="button" class="review-needed-item" data-review-step="${item.stepIndex}">
          <span class="review-needed-step">${escapeHtml(getStepShortTitle(steps[item.stepIndex]))}</span>
          <span class="review-needed-main">
            <span class="review-needed-field">${escapeHtml(item.fieldLabel)}</span>
            <span class="review-needed-value">${escapeHtml(item.value)}</span>
          </span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderStepJumpNav() {
  if (!stepJumpNav) return;
  const jumpSteps = steps.slice(0, -1);
  stepJumpNav.innerHTML = jumpSteps
    .map((step, index) => {
      const isCurrent = index === state.currentStep;
      const isPast = index < state.currentStep;
      return `
        <button
          type="button"
          class="step-jump-button ${isCurrent ? "active" : ""} ${isPast ? "visited" : ""}"
          data-step-index="${index}"
          aria-label="${escapeHtml(`${index + 1}. ${step.title}へ移動`)}"
          aria-current="${isCurrent ? "step" : "false"}"
        >
          <span class="step-jump-number">${index + 1}</span>
          <span class="step-jump-label">${escapeHtml(getStepShortTitle(step))}</span>
        </button>
      `;
    })
    .join("");
}

function render() {
  const step = steps[state.currentStep];
  stepCount.textContent = `${state.currentStep + 1} / ${steps.length}`;
  progressBar.style.width = `${((state.currentStep + 1) / steps.length) * 100}%`;
  renderStepJumpNav();
  renderReviewNeededPanel();
  formError.classList.add("hidden");
  formError.textContent = "";

  prevButton.hidden = state.currentStep === 0 || step.id === "complete";
  nextButton.hidden = step.id === "complete";
  nextButton.textContent = step.id === "confirm"
    ? mode.isMeeting ? "打ち合わせ内容を保存する" : "この内容で送信する"
    : state.currentStep === steps.length - 3 ? "回答内容を確認する" : "次へ進む";

  if (step.id === "confirm") {
    root.innerHTML = renderConfirm(step);
    bindConfirmEvents();
    return;
  }

  if (step.id === "complete") {
    prevButton.hidden = true;
    nextButton.hidden = true;
    root.innerHTML = `
      <div class="complete-box">
        <h2>${escapeHtml(step.title)}</h2>
        ${
          mode.isMeeting
            ? "<p>打ち合わせ内容を保存しました。</p><p>未定項目は、引き続きこの画面で確認できます。</p>"
            : "<p>送信内容を確認のうえ、後日ご連絡いたします。</p><p>未入力の項目は、打ち合わせ時に確認します。</p><p>この端末に保存されていた入力途中のデータは削除しました。</p>"
        }
      </div>
    `;
    return;
  }

  if (step.id === "scheduleBudgetServer") {
    root.innerHTML = renderScheduleBudgetServerStep(step);
    bindFieldEvents(step);
    return;
  }

  root.innerHTML = `
    <section class="step" data-step="${escapeHtml(step.id)}">
      <header class="step-header">
        <div class="step-title-row">
          <h2>${escapeHtml(step.title)}</h2>
          ${step.help ? `<button type="button" class="help-trigger" data-help="${escapeHtml(step.id)}" aria-label="${escapeHtml(step.helpTitle || "詳しく見る")}">?</button>` : ""}
        </div>
        <p class="step-description">${escapeHtml(step.description)}</p>
      </header>
      <div class="fields">
        ${step.fields.map((field) => renderField(step.id, field)).join("")}
      </div>
    </section>
  `;
  bindFieldEvents(step);
}

function renderScheduleBudgetServerStep(step) {
  const fieldMap = Object.fromEntries(step.fields.map((field) => [field.key, field]));
  return `
    <section class="step schedule-step" data-step="${escapeHtml(step.id)}">
      <header class="step-header schedule-step-header">
        <h2>${escapeHtml(step.title)}</h2>
        <p class="step-description">${escapeHtml(step.description)}</p>
      </header>
      <div class="schedule-sections">
        ${renderScheduleSection("公開計画", [
          renderScheduleFieldRow(step.id, fieldMap.desiredLaunch, "目安の時期で構いません。「未定」の場合もご記入ください。"),
          renderScheduleFieldRow(step.id, fieldMap.priority, "重視したい項目を1つお選びください。")
        ])}
        ${renderScheduleSection("予算", [
          renderScheduleFieldRow(step.id, fieldMap.budgetStatus, "ご予算の状況をお選びください。"),
          renderScheduleFieldRow(step.id, fieldMap.budgetNote, "ご予算に関するご希望やご相談内容があればご記入ください。")
        ])}
        ${renderScheduleSection("ドメイン・サーバー", [
          renderServerInfoCards(),
          '<div class="domain-server-pair">',
          renderScheduleFieldRow(step.id, fieldMap.domain, "取得状況をお選びください。"),
          renderScheduleFieldRow(step.id, fieldMap.server, "ご契約状況をお選びください。"),
          '</div>',
          renderScheduleFieldRow(step.id, fieldMap.manager, "サーバーやドメインの管理会社があればご記入ください。"),
          renderScheduleFieldRow(step.id, fieldMap.emailUsage, "メールアドレスの利用希望をお選びください。")
        ])}
        ${renderScheduleSection("連絡・その他", [
          renderScheduleFieldRow(step.id, fieldMap.notes, "その他ご要望や気になる点があればご記入ください。")
        ])}
      </div>
    </section>
  `;
}

function renderScheduleSection(title, rows) {
  const isDomainServerSection = title === "ドメイン・サーバー";
  return `
    <section class="schedule-section ${isDomainServerSection ? "domain-server-section" : ""}">
      <h3>${escapeHtml(title)}</h3>
      <div class="schedule-section-body">
        ${rows.join("")}
      </div>
    </section>
  `;
}

function renderScheduleFieldRow(stepId, field, note) {
  return `
    <div class="schedule-field-row">
      <div class="schedule-field-main">
        ${renderField(stepId, field)}
      </div>
      <p class="schedule-side-note">${escapeHtml(note)}</p>
    </div>
  `;
}

function renderServerInfoCards() {
  return `
    <div class="server-info-grid" aria-label="ドメインとサーバーの説明">
      <article class="server-info-card">
        <img src="${escapeHtml(serverInfoIconPaths.domain)}" alt="" aria-hidden="true" loading="lazy">
        <div>
          <h4>ドメイン = ホームページの住所</h4>
          <p>例）https://〇〇.com の「〇〇.com」部分。すでにお持ちの場合はご記入ください。</p>
        </div>
      </article>
      <article class="server-info-card">
        <img src="${escapeHtml(serverInfoIconPaths.server)}" alt="" aria-hidden="true" loading="lazy">
        <div>
          <h4>サーバー = データを置く場所</h4>
          <p>ホームページのデータや画像などを保管し、ユーザーに表示するための場所です。</p>
        </div>
      </article>
    </div>
  `;
}

function renderField(stepId, field) {
  const isRequired = field.required && REQUIRED_VALIDATION_ENABLED;

  if (field.type === "checkboxes" || field.type === "radio") {
    const selected = getValue(stepId, field.key);
    const values = Array.isArray(selected) ? selected : [selected];
    const isPurposeCards = field.key === "purpose" && field.type === "checkboxes";
    const isAudienceRows = stepId === "target" && field.key === "audience" && field.type === "checkboxes";
    return `
      <fieldset class="field ${isPurposeCards ? "purpose-field" : ""} ${isAudienceRows ? "audience-field" : ""}">
        <legend>
          <span>${escapeHtml(field.label)}</span>
          ${isPurposeCards || isAudienceRows ? '<span class="choice-note">複数選択可</span>' : ""}
        </legend>
        <div class="${isPurposeCards ? "purpose-option-grid" : isAudienceRows ? "audience-option-grid" : "option-grid"}">
          ${field.options
            .map(([label, value]) => {
              const iconPath = isPurposeCards ? purposeIconPaths[value] : audienceIconPaths[value];
              return `
              <label class="${isPurposeCards ? "purpose-card" : isAudienceRows ? "audience-card" : "option-card"}">
                <input type="${field.type === "checkboxes" ? "checkbox" : "radio"}" name="${escapeHtml(field.key)}" value="${escapeHtml(value)}" ${values.includes(value) ? "checked" : ""}>
                ${
                  (isPurposeCards || isAudienceRows) && iconPath
                    ? `<img class="${isPurposeCards ? "purpose-icon" : "audience-icon"}" src="${escapeHtml(iconPath)}" alt="" aria-hidden="true" loading="lazy">`
                    : ""
                }
                <span class="${isPurposeCards ? "purpose-label" : isAudienceRows ? "audience-label" : ""}">${escapeHtml(label)}</span>
                ${isPurposeCards ? '<span class="purpose-check" aria-hidden="true"></span>' : ""}
                ${isAudienceRows ? '<span class="audience-check" aria-hidden="true"></span>' : ""}
              </label>
            `;
            })
            .join("")}
        </div>
      </fieldset>
    `;
  }

  if (field.type === "tri") {
    const values = getValue(stepId, field.key) || {};
    const isContentsTri = stepId === "contents" && field.key === "contents";
    const isFeaturesTri = stepId === "features" && field.key === "features";
    return `
      <div class="field ${isContentsTri ? "contents-tri-field" : ""} ${isFeaturesTri ? "features-tri-field" : ""}">
        <p class="hint">${escapeHtml(field.label)}</p>
        <div class="tri-list ${isContentsTri ? "contents-tri-list" : isFeaturesTri ? "features-tri-list" : ""}">
          ${field.items
            .map((item) => {
              const key = toKey(item);
              const iconPath = isFeaturesTri ? featureIconPaths[item] : contentsIconPaths[item];
              const description = featureDescriptions[item];
              return `
                <div class="tri-row ${isContentsTri ? "contents-tri-row" : isFeaturesTri ? "features-tri-row" : ""}">
                  <div class="tri-label ${isContentsTri ? "contents-tri-label" : isFeaturesTri ? "features-tri-label" : ""}">
                    ${
                      (isContentsTri || isFeaturesTri) && iconPath
                        ? `<span class="${isFeaturesTri ? "feature-icon-tile" : ""}"><img class="${isFeaturesTri ? "feature-icon" : "contents-icon"}" src="${escapeHtml(iconPath)}" alt="" aria-hidden="true" loading="lazy"></span>`
                        : ""
                    }
                    ${
                      isFeaturesTri
                        ? `<span class="feature-copy"><span class="feature-title">${escapeHtml(item)}</span><span class="feature-description">${escapeHtml(description)}</span></span>`
                        : `<span>${escapeHtml(item)}</span>`
                    }
                  </div>
                  <div class="tri-controls ${isContentsTri ? "contents-tri-controls" : isFeaturesTri ? "features-tri-controls" : ""}">
                    ${triChoices
                      .map((choice) => `
                        <label>
                          <input type="radio" name="${escapeHtml(field.key)}.${escapeHtml(key)}" data-tri-key="${escapeHtml(key)}" data-tri-label="${escapeHtml(item)}" value="${escapeHtml(choice.value)}" ${values[key]?.value === choice.value ? "checked" : ""}>
                          ${escapeHtml(choice.label)}
                        </label>
                      `)
                      .join("")}
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  const value = getValue(stepId, field.key);
  const valueText = Array.isArray(value) ? value.join("\n") : value;
  const placeholder = field.placeholder ? `placeholder="${escapeHtml(field.placeholder)}"` : "";
  const fieldIconPath = getFieldIconPath(stepId, field.key);
  const fieldIcon = fieldIconPath ? `<img class="field-icon" src="${escapeHtml(fieldIconPath)}" alt="" aria-hidden="true" loading="lazy">` : "";
  const fieldId = `${stepId}-${field.key}`;
  const errorId = `${fieldId}-error`;
  const common = `
    id="${escapeHtml(fieldId)}"
    name="${escapeHtml(field.key)}"
    data-key="${escapeHtml(field.key)}"
    aria-describedby="${escapeHtml(errorId)}"
    ${placeholder}
    ${isRequired ? "required" : ""}
  `;

  if (field.type === "textarea") {
    return `
      <div class="field" data-field="${escapeHtml(field.key)}">
        ${renderFieldLabel(stepId, field, isRequired)}
        ${field.hint ? `<p class="hint">${escapeHtml(field.hint)}</p>` : ""}
        <div class="control-shell ${fieldIcon ? "has-field-icon textarea-shell" : ""}">
          ${fieldIcon}
          <textarea ${common}>${escapeHtml(valueText)}</textarea>
        </div>
        <span class="error-text" id="${escapeHtml(errorId)}"></span>
      </div>
    `;
  }

  if (field.type === "select") {
    return `
      <div class="field" data-field="${escapeHtml(field.key)}">
        ${renderFieldLabel(stepId, field, isRequired)}
        ${field.hint ? `<p class="hint">${escapeHtml(field.hint)}</p>` : ""}
        <div class="control-shell ${fieldIcon ? "has-field-icon" : ""}">
          ${fieldIcon}
          <select ${common}>
            <option value="">選択してください</option>
            ${field.options.map((option) => `<option value="${escapeHtml(option)}" ${value === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
          </select>
        </div>
        <span class="error-text" id="${escapeHtml(errorId)}"></span>
      </div>
    `;
  }

  return `
    <div class="field" data-field="${escapeHtml(field.key)}">
      ${renderFieldLabel(stepId, field, isRequired)}
      ${field.hint ? `<p class="hint">${escapeHtml(field.hint)}</p>` : ""}
      <div class="control-shell ${fieldIcon ? "has-field-icon" : ""}">
        ${fieldIcon}
        <input ${common} type="${escapeHtml(field.type)}" value="${escapeHtml(valueText)}">
      </div>
      <span class="error-text" id="${escapeHtml(errorId)}"></span>
    </div>
  `;
}

function renderFieldLabel(stepId, field, isRequired) {
  return `
    <label for="${escapeHtml(stepId)}-${escapeHtml(field.key)}">
      <span>${escapeHtml(field.label)}</span>
      ${isRequired ? '<span class="required">必須</span>' : ""}
    </label>
  `;
}

function getFieldIconPath(stepId, fieldKey) {
  if (stepId === "target") return targetFieldIconPaths[fieldKey] || "";
  if (stepId === "contents") return contentsFieldIconPaths[fieldKey] || "";
  return "";
}

function bindFieldEvents(step) {
  root.querySelectorAll("input, textarea, select").forEach((input) => {
    input.addEventListener("input", () => handleInput(step, input));
    input.addEventListener("change", () => handleInput(step, input));
  });

  root.querySelectorAll('input[type="radio"]').forEach((input) => {
    const rememberCheckedState = () => {
      input.dataset.wasChecked = input.checked ? "true" : "false";
    };
    input.addEventListener("pointerdown", rememberCheckedState);
    input.closest("label")?.addEventListener("pointerdown", rememberCheckedState);
    input.addEventListener("click", () => {
      if (input.dataset.wasChecked === "true") clearRadioInput(step, input);
      input.dataset.wasChecked = "";
    });
    input.addEventListener("keydown", (event) => {
      if ((event.key === " " || event.key === "Enter") && input.checked) {
        event.preventDefault();
        clearRadioInput(step, input);
      }
    });
  });

  root.querySelectorAll(".help-trigger").forEach((button) => {
    button.addEventListener("click", () => openHelp(step));
  });
}

function findFieldForInput(step, input) {
  return step.fields.find((candidate) => candidate.key === input.name || input.name.startsWith(`${candidate.key}.`));
}

function clearRadioInput(step, input) {
  const field = findFieldForInput(step, input);
  if (!field) return;

  root.querySelectorAll(`input[name="${CSS.escape(input.name)}"]`).forEach((radio) => {
    radio.checked = false;
  });

  if (field.type === "radio") {
    setValue(step.id, field.key, "");
  } else if (field.type === "tri") {
    const existing = getValue(step.id, field.key) || {};
    delete existing[input.dataset.triKey];
    setValue(step.id, field.key, existing);
  }

  validateCurrentStep(false);
  save();
}

function handleInput(step, input) {
  const field = findFieldForInput(step, input);
  if (!field) return;

  if (field.type === "checkboxes") {
    const values = [...root.querySelectorAll(`input[name="${CSS.escape(field.key)}"]:checked`)].map((item) => item.value);
    setValue(step.id, field.key, values);
  } else if (field.type === "radio") {
    setValue(step.id, field.key, input.value);
  } else if (field.type === "tri") {
    const existing = getValue(step.id, field.key) || {};
    existing[input.dataset.triKey] = {
      label: input.dataset.triLabel,
      value: input.value,
      display: triChoices.find((choice) => choice.value === input.value)?.label || input.value
    };
    setValue(step.id, field.key, existing);
  } else if (field.key === "referenceUrls") {
    setValue(step.id, field.key, input.value.split(/\n+/).map((line) => line.trim()).filter(Boolean));
  } else {
    setValue(step.id, field.key, input.value);
  }

  validateCurrentStep(false);
  save();
}

function validateCurrentStep(showErrors = true) {
  const step = steps[state.currentStep];
  if (step.id !== "customer" && step.id !== "confirm") return true;
  const errors = validateRequired();

  root.querySelectorAll(".field").forEach((fieldEl) => {
    fieldEl.classList.remove("invalid");
    const errorEl = fieldEl.querySelector(".error-text");
    if (errorEl) errorEl.textContent = "";
  });

  if (step.id === "customer" && showErrors) {
    errors.forEach((error) => {
      const fieldEl = root.querySelector(`[data-field="${CSS.escape(error.key)}"]`);
      if (!fieldEl) return;
      fieldEl.classList.add("invalid");
      const errorEl = fieldEl.querySelector(".error-text");
      if (errorEl) errorEl.textContent = error.message;
    });
  }

  return errors.length === 0;
}

function validateRequired() {
  if (!REQUIRED_VALIDATION_ENABLED) return [];
  const customer = state.data.customer;
  const checks = [
    ["companyName", customer.companyName.trim(), "ご連絡のため、会社名の入力をお願いします"],
    ["contactName", customer.contactName.trim(), "ご担当者名の入力をお願いします"],
    ["email", customer.email.trim(), "ご連絡先メールアドレスの入力をお願いします"],
    ["phone", customer.phone.trim(), "ご連絡先電話番号の入力をお願いします"]
  ];
  const errors = checks.filter(([, value]) => !value).map(([key, , message]) => ({ key, message }));
  if (customer.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
    errors.push({ key: "email", message: "メールアドレスの形式をご確認ください" });
  }
  if (customer.phone.trim() && !/^[0-9０-９\-\s()（）+]+$/.test(customer.phone.trim())) {
    errors.push({ key: "phone", message: "電話番号は数字、ハイフン、括弧、スペースで入力してください" });
  }
  return errors;
}

function goToStep(index) {
  state.currentStep = Math.max(0, Math.min(index, steps.length - 1));
  save();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderConfirm(step) {
  const errors = validateRequired();
  return `
    <section class="step">
      <header class="step-header">
        <h2>${escapeHtml(step.title)}</h2>
        <p class="step-description">${escapeHtml(step.description)}</p>
      </header>
      ${errors.length ? `<div class="form-error" role="alert">${errors.map((error) => escapeHtml(error.message)).join("<br>")}</div>` : ""}
      <div class="confirm-list">
        ${steps.slice(0, 9).map((entry, index) => renderConfirmSection(entry, index)).join("")}
      </div>
      <p class="privacy-note">${
        mode.isMeeting
          ? "打ち合わせで変更した内容は、保存ボタンを押すと同じ回答IDに上書き保存されます。"
          : "ご入力いただいた内容は、ホームページ制作のご相談・ご連絡のために使用します。"
      }</p>
    </section>
  `;
}

function countEmptyFields(step) {
  return step.fields.filter((field) => !getDisplayValue(step.id, field)).length;
}

function renderConfirmSection(step, index) {
  const emptyCount = countEmptyFields(step);
  const badge = emptyCount > 0
    ? `<span class="confirm-badge empty">未入力 ${emptyCount}件</span>`
    : `<span class="confirm-badge done">済</span>`;
  return `
    <details class="confirm-section">
      <summary><span>${escapeHtml(step.title)}</span>${badge}</summary>
      <div class="confirm-items">
        ${step.fields.map((field) => renderConfirmItem(step, field)).join("")}
        <button type="button" class="edit-button" data-edit-step="${index}">この項目を修正する</button>
      </div>
    </details>
  `;
}

function renderConfirmItem(step, field) {
  const value = getDisplayValue(step.id, field);
  return `
    <div class="confirm-item">
      <div class="confirm-label">${escapeHtml(field.label)}</div>
      <div>${value ? escapeHtml(value) : '<span class="empty-value">未入力</span>'}</div>
    </div>
  `;
}

function getDisplayValue(stepId, field) {
  const value = getValue(stepId, field.key);
  if (field.type === "checkboxes") {
    return labelsFromOptions(field.options, value).join("、");
  }
  if (field.type === "radio") {
    return labelsFromOptions(field.options, [value]).join("、");
  }
  if (field.type === "tri") {
    return Object.values(value || {})
      .filter((item) => item?.display)
      .map((item) => `${item.label}: ${item.display}`)
      .join(" / ");
  }
  if (Array.isArray(value)) return value.join("\n");
  return value;
}

function labelsFromOptions(options, values = []) {
  const selected = Array.isArray(values) ? values : [values];
  return options.filter(([, value]) => selected.includes(value)).map(([label]) => label);
}

function bindConfirmEvents() {
  root.querySelectorAll("[data-edit-step]").forEach((button) => {
    button.addEventListener("click", () => goToStep(Number(button.dataset.editStep)));
  });
}

let releaseFocusTrap = null;

function trapFocus(container) {
  const FOCUSABLE = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function handleKeydown(e) {
    if (e.key !== "Tab") return;
    const focusable = [...container.querySelectorAll(FOCUSABLE)];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  document.addEventListener("keydown", handleKeydown);
  return () => document.removeEventListener("keydown", handleKeydown);
}

function openHelp(step) {
  document.getElementById("help-title").textContent = step.helpTitle || "詳しく見る";
  document.getElementById("help-body").innerHTML = step.help.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
  document.getElementById("help-modal").classList.remove("hidden");
  document.getElementById("help-close").focus();
  releaseFocusTrap = trapFocus(document.querySelector(".modal-sheet"));
}

function closeHelp() {
  document.getElementById("help-modal").classList.add("hidden");
  if (releaseFocusTrap) { releaseFocusTrap(); releaseFocusTrap = null; }
}

let lastSubmitTime = 0;

async function submitForm() {
  const now = Date.now();
  if (now - lastSubmitTime < 3000) return;
  lastSubmitTime = now;

  const honeypot = document.getElementById("hp-website");
  if (honeypot?.value) {
    state.submitted = true;
    clearSaved();
    state.currentStep = steps.length - 1;
    render();
    return;
  }

  const errors = validateRequired();
  if (errors.length) {
    formError.classList.remove("hidden");
    formError.innerHTML = `${errors.map((error) => escapeHtml(error.message)).join("<br>")}<br><button type="button" class="edit-button" id="fix-required">基本情報を修正する</button>`;
    document.getElementById("fix-required").addEventListener("click", () => goToStep(0));
    return;
  }

  if (!config.GAS_ENDPOINT_URL) {
    showSubmitError("送信先URLが未設定です。config.js に Google Apps Script のURLを設定してください。");
    return;
  }

  nextButton.disabled = true;
  nextButton.textContent = "送信中です";
  state.data.meta.submittedAt = new Date().toISOString();

  try {
    const response = await fetch(config.GAS_ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(buildPayload())
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) {
      throw new Error(result.message || "送信に失敗しました");
    }
    state.submitted = true;
    saveStatus.textContent = "送信済み";
    clearSaved();
    state.currentStep = steps.length - 1;
    render();
  } catch (error) {
    console.error(error);
    showSubmitError("入力内容はこの端末に残っています。時間をおいて、もう一度送信してください。");
  } finally {
    nextButton.disabled = false;
    if (steps[state.currentStep]?.id === "confirm") nextButton.textContent = "この内容で送信する";
  }
}

function showSubmitError(message) {
  formError.classList.remove("hidden");
  formError.innerHTML = `
    <strong>送信できませんでした</strong><br>
    ${escapeHtml(message)}<br>
    <button type="button" class="edit-button" id="retry-submit">もう一度送信する</button>
  `;
  document.getElementById("retry-submit").addEventListener("click", submitForm);
}

function buildPayload() {
  return {
    action: mode.isMeeting ? "update" : "submit",
    submittedAt: state.data.meta.submittedAt,
    uuid: state.data.meta.uuid,
    updatedAt: state.data.meta.updatedAt,
    submitStatus: mode.isMeeting ? "meeting_updated" : "submitted",
    managementStatus: mode.isMeeting ? "in_meeting" : "unreviewed",
    companyName: state.data.customer.companyName,
    contactName: state.data.customer.contactName,
    email: state.data.customer.email,
    phone: state.data.customer.phone,
    purpose: labelsFromOptions(steps[1].fields[0].options, state.data.purpose).join(", "),
    desiredLaunch: state.data.scheduleBudgetServer.desiredLaunch,
    budgetStatus: state.data.scheduleBudgetServer.budgetStatus,
    answerJson: state.data,
    _token: config.SUBMIT_TOKEN || ""
  };
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.ok === false) {
    throw new Error(result.message || "request_failed");
  }
  return result;
}

async function loadRemoteAnswer({ force = false } = {}) {
  if (!mode.isMeeting || !mode.uuid || !config.GAS_ENDPOINT_URL) return false;
  const saved = loadSaved();
  if (!force && saved?.data && hasSavedAnswer(saved.data)) return false;

  updateMeetingMeta("回答を読み込み中です");
  try {
    const url = new URL(config.GAS_ENDPOINT_URL);
    url.searchParams.set("action", "get");
    url.searchParams.set("uuid", mode.uuid);
    url.searchParams.set("_token", config.SUBMIT_TOKEN || "");
    const result = await fetchJson(url.toString());
    if (!result.answerJson) throw new Error("answer_not_found");
    state.data = normalizeAnswerData(result.answerJson);
    state.currentStep = Math.min(Number(saved?.currentStep || 0), steps.length - 2);
    state.submitted = false;
    mode.loadedFromServer = true;
    save();
    updateMeetingMeta("回答を読み込みました");
    render();
    return true;
  } catch (error) {
    console.error(error);
    updateMeetingMeta("回答を読み込めませんでした");
    root.innerHTML = `
      <div class="complete-box">
        <h2>回答を読み込めませんでした</h2>
        <p>回答IDまたはGoogle Apps Scriptの設定をご確認ください。</p>
      </div>
    `;
    return false;
  }
}

function normalizeAnswerData(answerJson) {
  const base = createDefaultData();
  const source = answerJson && typeof answerJson === "object" ? answerJson : {};
  return {
    ...base,
    ...source,
    meta: { ...base.meta, ...(source.meta || {}), uuid: source.meta?.uuid || mode.uuid || base.meta.uuid },
    customer: { ...base.customer, ...(source.customer || {}) },
    target: { ...base.target, ...(source.target || {}) },
    design: { ...base.design, ...(source.design || {}) },
    scheduleBudgetServer: { ...base.scheduleBudgetServer, ...(source.scheduleBudgetServer || {}) },
    purpose: Array.isArray(source.purpose) ? source.purpose : base.purpose,
    contents: source.contents && typeof source.contents === "object" ? source.contents : base.contents,
    materials: source.materials && typeof source.materials === "object" ? source.materials : base.materials,
    features: source.features && typeof source.features === "object" ? source.features : base.features,
    operation: source.operation && typeof source.operation === "object" ? source.operation : base.operation
  };
}

async function saveMeetingAnswer() {
  if (!mode.isMeeting) return submitForm();
  if (!config.GAS_ENDPOINT_URL) {
    showSubmitError("保存先URLが未設定です。config.js に Google Apps Script のURLを設定してください。");
    return;
  }
  if (!state.data.meta.uuid) state.data.meta.uuid = mode.uuid || (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()));

  nextButton.disabled = true;
  const meetingSaveButton = document.getElementById("meeting-save");
  if (meetingSaveButton) meetingSaveButton.disabled = true;
  updateMeetingMeta("保存中です");
  state.data.meta.updatedAt = new Date().toISOString();

  try {
    await fetchJson(config.GAS_ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(buildPayload())
    });
    mode.lastSavedAt = new Date().toLocaleString("ja-JP");
    saveStatus.textContent = "保存済み";
    updateMeetingMeta(`保存済み: ${mode.lastSavedAt}`);
    state.currentStep = steps.length - 1;
    render();
  } catch (error) {
    console.error(error);
    updateMeetingMeta("保存できませんでした");
    showSubmitError("打ち合わせ内容を保存できませんでした。入力内容はこの端末に残っています。");
  } finally {
    nextButton.disabled = false;
    if (meetingSaveButton) meetingSaveButton.disabled = false;
    if (steps[state.currentStep]?.id === "confirm") nextButton.textContent = "打ち合わせ内容を保存する";
  }
}

prevButton.addEventListener("click", () => goToStep(state.currentStep - 1));
stepJumpNav?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-step-index]");
  if (!button) return;
  goToStep(Number(button.dataset.stepIndex));
});
reviewNeededPanel?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-review-step]");
  if (!button) return;
  goToStep(Number(button.dataset.reviewStep));
});
nextButton.addEventListener("click", () => {
  const step = steps[state.currentStep];
  if (step.id === "confirm") {
    if (mode.isMeeting) saveMeetingAnswer();
    else submitForm();
    return;
  }
  if (!validateCurrentStep(true)) return;
  goToStep(state.currentStep + 1);
});

document.getElementById("help-close").addEventListener("click", closeHelp);
document.getElementById("help-backdrop").addEventListener("click", closeHelp);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeHelp();
});

async function init() {
  createMeetingBanner();
  const saved = loadSaved();
  if (saved?.data && hasSavedAnswer(saved.data)) {
    state.data = normalizeAnswerData(saved.data);
    state.currentStep = Math.min(Number(saved.currentStep || 0), steps.length - 2);
    if (mode.isMeeting) updateMeetingMeta("この端末に残っていた編集内容を復元しました");
  } else if (saved?.data) {
    clearSaved();
  }

  if (mode.isMeeting && mode.uuid && !hasSavedAnswer(state.data)) {
    root.innerHTML = `
      <div class="complete-box">
        <h2>回答を読み込んでいます</h2>
        <p>お客様の回答をフォーム画面に戻しています。</p>
      </div>
    `;
    await loadRemoteAnswer({ force: true });
    return;
  }

  render();
}

init();

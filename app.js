const canvas = document.querySelector("#postCanvas");
const ctx = canvas.getContext("2d");
const photoInput = document.querySelector("#photoInput");
const uploadPreview = document.querySelector("#uploadPreview");
const uploadZone = document.querySelector("#uploadZone");
const toast = document.querySelector("#toast");

const fields = {
  speakerName: document.querySelector("#speakerName"),
  speakerTitle: document.querySelector("#speakerTitle"),
  sessionLabel: document.querySelector("#sessionLabel"),
  sessionTopic: document.querySelector("#sessionTopic"),
  eventDate: document.querySelector("#eventDate"),
  eventTime: document.querySelector("#eventTime"),
  eventVenue: document.querySelector("#eventVenue"),
};

const speakers = [
  {
    id: "yang",
    zh: {
      name: "楊菁萍",
      organization: "泰國碳中和科技聯盟協會",
      title: "會長",
      topic: "開場致詞",
    },
    th: {
      name: "楊菁萍",
      organization: "ESG Service Corporation Association",
      title: "นายกสมาคม",
      topic: "กล่าวเปิดงาน",
    },
  },
  {
    id: "james",
    zh: {
      name: "James Moore",
      organization: "泰國再生能源協會",
      title: "理事",
      topic: "接軌全球淨零佈局，泰國能源與碳路徑規劃",
    },
    th: {
      name: "คุณเจมส์ แอนดริว มอร์",
      organization: "สมาคมพลังงานหมุนเวียนไทย (อาร์อี 100)",
      title: "กรรมการ",
      topic:
        "เชื่อมโยงกับการวางแผนสู่ Net Zero ระดับโลก：การวางแผนพลังงานและ Decarbonization Pathway ของประเทศไทย",
    },
  },
  {
    id: "lobo",
    zh: {
      name: "游乃溥",
      organization: "金寶電子",
      title: "永續長暨副總經理",
      topic: "品牌商對話：全球品牌如何重構供應鏈韌性與碳契約要求",
    },
    th: {
      name: "Lobo You",
      organization: "บริษัท แคล-คอมพ์ อีเล็คโทรนิคส์ (ประเทศไทย)",
      title: "ประธานเจ้าหน้าที่บริหารด้านความยั่งยืน และรองผู้จัดการใหญ่ บริษัท",
      topic:
        "เสวนากับแบรนด์：แบรนด์ระดับโลกกำลังปรับโครงสร้างความยืดหยุ่นของห่วงโซ่อุปทาน และข้อกำหนดด้านสัญญาคาร์บอนอย่างไร",
    },
  },
  {
    id: "sherry",
    zh: {
      name: "胡湘渝",
      organization: "RECCESSARY",
      title: "分析師",
      topic: "產業深度解讀：泰國電子業與汽車產業的減碳路徑與策略優勢",
    },
    th: {
      name: "Sherry Hu",
      organization: "RECCESSARY",
      title: "นักวิเคราะห์",
      topic:
        "เจาะลึกอุตสาหกรรม：Decarbonization Pathway และความได้เปรียบเชิงกลยุทธ์ของอุตสาหกรรมอิเล็กทรอนิกส์และยานยนต์ไทย",
    },
  },
];

const content = {
  zh: {
    eventDate: "2026 / 7 / 2（星期四）",
    eventTime: "13:00 – 19:30",
    eventVenue: "Sofitel Bangkok Sukhumvit Hotel",
    eventTitle: "綠色韌性",
    eventSubtitle: "泰國供應鏈的全球減碳競爭與策略佈署",
    attending: "我將出席並分享",
    eventInfo: "活動資訊",
    caption:
      "很榮幸受邀出席「綠色韌性：泰國供應鏈的全球減碳競爭與策略佈署」，與產業夥伴一同交流台泰綠色供應鏈與低碳轉型的合作機會。",
  },
  th: {
    eventDate: "2 / 7 / 2026 (วันพฤหัสบดี)",
    eventTime: "13:00 – 19:30 น.",
    eventVenue: "โรงแรมโซฟิเทล กรุงเทพ สุขุมวิท",
    eventTitle: "ความยืดหยุ่นสีเขียว",
    eventSubtitle: "ห่วงโซ่อุปทานไทยกับการแข่งขันลดคาร์บอนระดับโลกและการวางยุทธศาสตร์",
    attending: "ร่วมงานและแบ่งปันมุมมอง",
    eventInfo: "ข้อมูลงาน",
    caption:
      "รู้สึกเป็นเกียรติที่ได้ร่วมงาน “ความยืดหยุ่นสีเขียว” เพื่อแลกเปลี่ยนมุมมองและโอกาสความร่วมมือด้านห่วงโซ่อุปทานสีเขียวและการเปลี่ยนผ่านสู่คาร์บอนต่ำระหว่างไทย–ไต้หวัน",
  },
};

const state = {
  language: "zh",
  speakerId: "yang",
  photo: new Image(),
  background: new Image(),
};

state.background.src = "./assets/event-background.jpg";
state.photo.src = "./assets/avatar-placeholder.svg";
uploadPreview.src = state.photo.src;

function selectedSpeaker() {
  return speakers.find((speaker) => speaker.id === state.speakerId) || speakers[0];
}

function populateSpeakerOptions() {
  fields.speakerName.replaceChildren();
  speakers.forEach((speaker) => {
    const option = document.createElement("option");
    option.value = speaker.id;
    option.textContent = speaker[state.language].name;
    option.selected = speaker.id === state.speakerId;
    fields.speakerName.append(option);
  });
}

function applySpeaker() {
  const speaker = selectedSpeaker()[state.language];
  fields.speakerTitle.value = `${speaker.organization}｜${speaker.title}`;
  fields.sessionTopic.value = speaker.topic;
  fields.sessionLabel.value = "SPEAKER";
}

function populateFields(language) {
  const languageContent = content[language];
  populateSpeakerOptions();
  applySpeaker();
  fields.eventDate.value = languageContent.eventDate;
  fields.eventTime.value = languageContent.eventTime;
  fields.eventVenue.value = languageContent.eventVenue;
  document.documentElement.lang = language === "zh" ? "zh-Hant" : "th";
  render();
}

function getValues() {
  const speaker = selectedSpeaker()[state.language];
  const titleParts = fields.speakerTitle.value.split("｜");
  return {
    speakerName: speaker.name,
    speakerOrganization: titleParts[0]?.trim() || speaker.organization,
    speakerRole: titleParts.slice(1).join("｜").trim() || speaker.title,
    speakerTitle: fields.speakerTitle.value.trim(),
    sessionLabel: "SPEAKER",
    sessionTopic: fields.sessionTopic.value.trim(),
    eventDate: fields.eventDate.value.trim(),
    eventTime: fields.eventTime.value.trim(),
    eventVenue: fields.eventVenue.value.trim(),
  };
}

function drawCover(image, x, y, width, height, focusX = 0.5, focusY = 0.5) {
  const imageRatio = image.width / image.height;
  const areaRatio = width / height;
  let sourceWidth = image.width;
  let sourceHeight = image.height;

  if (imageRatio > areaRatio) {
    sourceWidth = image.height * areaRatio;
  } else {
    sourceHeight = image.width / areaRatio;
  }

  const sourceX = Math.max(0, Math.min(image.width - sourceWidth, (image.width - sourceWidth) * focusX));
  const sourceY = Math.max(
    0,
    Math.min(image.height - sourceHeight, (image.height - sourceHeight) * focusY),
  );

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height,
  );
}

function font(size, weight = 500, family = "sans-serif") {
  return `${weight} ${size}px ${family}`;
}

function wrapLines(text, maxWidth) {
  if (!text) return [""];
  const isSpaceSeparated = /\s/.test(text);
  const tokens = isSpaceSeparated ? text.split(/(\s+)/).filter(Boolean) : [...text];
  const lines = [];
  let line = "";

  for (const token of tokens) {
    const trial = line + token;
    if (line && ctx.measureText(trial).width > maxWidth) {
      lines.push(line.trim());
      line = token.trimStart();
    } else {
      line = trial;
    }
  }

  if (line.trim()) lines.push(line.trim());
  return lines;
}

function fitText(text, maxWidth, maxLines, startSize, minSize, weight = 700) {
  for (let size = startSize; size >= minSize; size -= 1) {
    ctx.font = font(size, weight);
    const lines = wrapLines(text, maxWidth);
    if (lines.length <= maxLines) return { size, lines };
  }
  ctx.font = font(minSize, weight);
  const lines = wrapLines(text, maxWidth).slice(0, maxLines);
  if (wrapLines(text, maxWidth).length > maxLines) {
    let finalLine = lines[maxLines - 1];
    while (ctx.measureText(`${finalLine}…`).width > maxWidth && finalLine.length > 1) {
      finalLine = finalLine.slice(0, -1);
    }
    lines[maxLines - 1] = `${finalLine.trim()}…`;
  }
  return { size: minSize, lines };
}

function drawLines(lines, x, y, lineHeight, align = "left") {
  ctx.textAlign = align;
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
}

function roundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function drawHexagon(centerX, centerY, radius, color, rotation = 0) {
  ctx.beginPath();
  for (let index = 0; index < 6; index += 1) {
    const angle = rotation + (Math.PI / 3) * index;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawPortrait(image) {
  const centerX = 832;
  const centerY = 230;
  const radius = 164;

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#e5e9e4";
  ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
  if (image.complete && image.naturalWidth) {
    drawCover(image, centerX - radius, centerY - radius, radius * 2, radius * 2, 0.5, 0.32);
  }
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "#d8e0d3";
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.restore();
}

function render() {
  const values = getValues();
  const languageContent = content[state.language];
  const isThai = state.language === "th";
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = "#03120c";
  ctx.fillRect(0, 0, W, H);

  if (state.background.complete && state.background.naturalWidth) {
    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.drawImage(state.background, -780, 0, 1852, 1042);
    ctx.restore();
  }

  const leftOverlay = ctx.createLinearGradient(0, 0, 760, 0);
  leftOverlay.addColorStop(0, "rgba(1, 17, 10, 0.98)");
  leftOverlay.addColorStop(0.72, "rgba(1, 17, 10, 0.88)");
  leftOverlay.addColorStop(1, "rgba(1, 17, 10, 0.18)");
  ctx.fillStyle = leftOverlay;
  ctx.fillRect(0, 0, 820, 1042);

  const topOverlay = ctx.createLinearGradient(0, 0, 0, 650);
  topOverlay.addColorStop(0, "rgba(0, 7, 6, 0.16)");
  topOverlay.addColorStop(1, "rgba(0, 7, 6, 0.38)");
  ctx.fillStyle = topOverlay;
  ctx.fillRect(0, 0, W, 1042);

  drawPortrait(state.photo);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.font = font(30, 650);
  ctx.letterSpacing = "11px";
  ctx.fillText("SPEAKING AT:", 62, 78);
  ctx.letterSpacing = "0px";

  ctx.font = font(25, 780);
  ctx.letterSpacing = "5px";
  ctx.fillText("RΞCCESSARY", 66, 132);
  ctx.letterSpacing = "0px";

  const eventTitleGradient = ctx.createLinearGradient(62, 165, 500, 270);
  eventTitleGradient.addColorStop(0, "#b7c7ad");
  eventTitleGradient.addColorStop(1, "#708c74");
  ctx.fillStyle = eventTitleGradient;
  const eventTitleFit = fitText(languageContent.eventTitle, 555, 2, isThai ? 59 : 68, 42, 820);
  ctx.font = font(eventTitleFit.size, 820);
  drawLines(eventTitleFit.lines, 62, 216, eventTitleFit.size * 1.08);

  const eventTitleBottom = 216 + (eventTitleFit.lines.length - 1) * eventTitleFit.size * 1.08;
  ctx.fillStyle = "#d9d5d2";
  const subtitleFit = fitText(languageContent.eventSubtitle, 545, 3, isThai ? 27 : 29, 21, 580);
  ctx.font = font(subtitleFit.size, 580);
  drawLines(subtitleFit.lines, 64, eventTitleBottom + 48, subtitleFit.size * 1.35);

  ctx.strokeStyle = "rgba(155, 184, 143, 0.38)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(62, 415);
  ctx.lineTo(1018, 415);
  ctx.stroke();

  ctx.fillStyle = "#a9bd9f";
  ctx.font = font(22, 800);
  ctx.letterSpacing = "4px";
  ctx.fillText("SPEAKER", 62, 468);
  ctx.letterSpacing = "0px";

  const topicFit = fitText(values.sessionTopic, 945, 4, isThai ? 53 : 61, 36, 820);
  ctx.fillStyle = "#ffffff";
  ctx.font = font(topicFit.size, 820);
  drawLines(topicFit.lines, 62, 546, topicFit.size * 1.17);

  const topicBottom = 546 + (topicFit.lines.length - 1) * topicFit.size * 1.17;
  const speakerY = Math.max(810, topicBottom + 105);
  ctx.fillStyle = "#e5c679";
  ctx.fillRect(62, speakerY - 70, 74, 7);

  ctx.fillStyle = "#ffffff";
  const nameFit = fitText(values.speakerName, 500, 2, isThai ? 47 : 55, 32, 820);
  ctx.font = font(nameFit.size, 820);
  drawLines(nameFit.lines, 62, speakerY, nameFit.size * 1.1);

  const nameBottom = speakerY + (nameFit.lines.length - 1) * nameFit.size * 1.1;
  ctx.font = font(nameFit.size, 820);
  const nameWidth = Math.min(500, ctx.measureText(nameFit.lines[0]).width);
  const roleX = 62 + nameWidth + 22;
  const roleWidth = Math.max(220, 1018 - roleX);
  ctx.fillStyle = "#d8d4d0";
  const roleFit = fitText(values.speakerRole, roleWidth, 3, isThai ? 25 : 28, 19, 620);
  ctx.font = font(roleFit.size, 620);
  drawLines(roleFit.lines, roleX, speakerY - 3, roleFit.size * 1.25);

  const roleBottom = speakerY - 3 + (roleFit.lines.length - 1) * roleFit.size * 1.25;
  const organizationY = Math.max(nameBottom, roleBottom) + 48;
  ctx.fillStyle = "#bcb8b4";
  const organizationFit = fitText(
    values.speakerOrganization,
    920,
    2,
    isThai ? 25 : 27,
    20,
    560,
  );
  ctx.font = font(organizationFit.size, 560);
  drawLines(
    organizationFit.lines,
    62,
    organizationY,
    organizationFit.size * 1.32,
  );

  const infoY = 1042;
  const infoGradient = ctx.createLinearGradient(0, infoY, W, H);
  infoGradient.addColorStop(0, "#263b31");
  infoGradient.addColorStop(0.62, "#3d5b49");
  infoGradient.addColorStop(1, "#263f38");
  ctx.fillStyle = infoGradient;
  ctx.fillRect(0, infoY, W, H - infoY);
  ctx.fillStyle = "#d6c690";
  ctx.fillRect(0, infoY, 18, H - infoY);

  ctx.fillStyle = "#d9dfd4";
  ctx.font = font(18, 820);
  ctx.letterSpacing = "3px";
  ctx.fillText(languageContent.eventInfo.toUpperCase(), 62, infoY + 54);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = "#ffffff";
  ctx.font = font(34, 760);
  ctx.fillText(values.eventDate, 62, infoY + 115);
  ctx.font = font(25, 620);
  ctx.fillText(values.eventTime, 62, infoY + 163);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(505, infoY + 42);
  ctx.lineTo(505, infoY + 208);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  const venueFit = fitText(values.eventVenue, 465, 3, 34, 25, 760);
  ctx.font = font(venueFit.size, 760);
  drawLines(venueFit.lines, 548, infoY + 92, venueFit.size * 1.28);

  ctx.fillStyle = "rgba(255,255,255,0.58)";
  ctx.font = font(14, 700);
  ctx.fillText("#GreenResilience  #Thailand  #Decarbonization", 62, 1320);
}

function readPhoto(file) {
  if (!file || !file.type.startsWith("image/")) {
    showToast("請選擇 JPG、PNG 或 WebP 圖片。");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    state.photo = new Image();
    state.photo.onload = render;
    state.photo.src = reader.result;
    uploadPreview.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function canvasBlob() {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png", 1));
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function safeFilename() {
  const name = getValues().speakerName || "speaker";
  return `RECCESSARY-LinkedIn-${name}-${state.language.toUpperCase()}.png`;
}

function buildCaption() {
  return "I am excited to attend Green Resilience: Thailand Supply Chain's Global Decarbonization Competition & Strategic Deployment held by @RECCESSARY, at the Sofitel Sukhumvit Bangkok, Thailand, on 2 July 2026. Click to register for your free conference pass now: https://www.reccessary.com/en/reccevent/reccth26";
}

async function shareToLinkedIn() {
  const linkedInUrl = "https://www.linkedin.com/feed/?shareActive=true";
  const supportsNativeShare = typeof navigator.share === "function";
  const linkedInWindow = supportsNativeShare ? null : window.open(linkedInUrl, "_blank");
  const blob = await canvasBlob();
  const file = new File([blob], safeFilename(), { type: "image/png" });
  const shareData = {
    title: "Green Resilience 2026",
    text: buildCaption(),
    files: [file],
  };

  if (navigator.canShare?.({ files: [file] }) && navigator.share) {
    try {
      await navigator.share(shareData);
      showToast("分享面板已開啟；選擇 LinkedIn 後，請確認 @RECCESSARY 提及。");
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  downloadBlob(blob, safeFilename());
  try {
    await navigator.clipboard.writeText(buildCaption());
    showToast(
      "圖片已下載、文案已複製。請在 LinkedIn 貼上文案與圖片，並從清單選取 @RECCESSARY。",
    );
  } catch {
    showToast("圖片已下載，請貼到 LinkedIn 並從清單選取 @RECCESSARY。");
  }
  if (!linkedInWindow) {
    window.location.href = linkedInUrl;
  }
}

Object.values(fields).forEach((field) => field.addEventListener("input", render));

fields.speakerName.addEventListener("change", () => {
  state.speakerId = fields.speakerName.value;
  applySpeaker();
  render();
});

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.language = button.dataset.language;
    document.querySelectorAll(".language-button").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    populateFields(state.language);
  });
});

photoInput.addEventListener("change", () => readPhoto(photoInput.files[0]));

["dragenter", "dragover"].forEach((eventName) => {
  uploadZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    uploadZone.classList.add("dragging");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  uploadZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    uploadZone.classList.remove("dragging");
  });
});

uploadZone.addEventListener("drop", (event) => readPhoto(event.dataTransfer.files[0]));

document.querySelector("#downloadButton").addEventListener("click", async () => {
  const blob = await canvasBlob();
  downloadBlob(blob, safeFilename());
  showToast("LinkedIn 貼文圖已下載。");
});

document.querySelector("#shareButton").addEventListener("click", shareToLinkedIn);

document.querySelector("#resetButton").addEventListener("click", () => {
  state.speakerId = "yang";
  state.photo = new Image();
  state.photo.onload = render;
  state.photo.src = "./assets/avatar-placeholder.svg";
  uploadPreview.src = state.photo.src;
  populateFields(state.language);
  showToast("內容已重設。");
});

state.photo.onload = render;
state.background.onload = render;
document.fonts.ready.then(() => populateFields("zh"));

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "talkLog｜独り言が外国語学習になるAI添削アプリ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const mascotData = await readFile(join(process.cwd(), "public/images/log-kun-speaking.png"), "base64");
  const mascotSrc = `data:image/png;base64,${mascotData}`;

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#fff8e8", color: "#263630", padding: "68px 76px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 370, height: 370, borderRadius: 999, background: "#dfeee6", right: -70, top: -100 }} />
      <div style={{ width: "62%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 48, fontWeight: 800, marginBottom: 42 }}>
          <div style={{ width: 64, height: 64, borderRadius: 17, background: "#347864", color: "white", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 16 }}>t</div>
          talk<span style={{ color: "#347864" }}>Log</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 65, lineHeight: 1.25, fontWeight: 800, letterSpacing: "-3px" }}>
          <span>独り言が、</span><span style={{ color: "#347864" }}>外国語学習になる。</span>
        </div>
        <div style={{ fontSize: 25, color: "#66756f", marginTop: 28 }}>30秒話すだけ。AIが自然な表現に添削します。</div>
        <div style={{ display: "flex", alignSelf: "flex-start", marginTop: 30, padding: "9px 18px", borderRadius: 999, background: "#f39a45", color: "white", fontSize: 19, fontWeight: 700 }}>β版テスター募集中</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={mascotSrc} alt="" width={470} height={313} style={{ position: "absolute", right: 18, bottom: 30, objectFit: "cover", borderRadius: 35 }} />
    </div>,
    size,
  );
}

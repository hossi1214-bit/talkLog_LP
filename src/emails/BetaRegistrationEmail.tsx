type Props = { name: string };

export function BetaRegistrationEmail({ name }: Props) {
  return (
    <div style={{ backgroundColor: "#f7f4eb", fontFamily: "Arial, 'Noto Sans JP', sans-serif", padding: "32px 16px", color: "#263630" }}>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", margin: "0 auto", maxWidth: "560px", padding: "36px" }}>
        <div style={{ color: "#347864", fontSize: "26px", fontWeight: 800, marginBottom: "28px" }}>talkLog</div>
        <h1 style={{ fontSize: "22px", lineHeight: 1.5, margin: "0 0 20px" }}>β版へのご登録ありがとうございます</h1>
        <p style={{ lineHeight: 1.8 }}>{name}さん</p>
        <p style={{ lineHeight: 1.8 }}>talkLog β版へご登録いただき、ありがとうございます。</p>
        <p style={{ lineHeight: 1.8 }}>β版の準備が整い次第、このメールアドレスへご案内します。公開まで今しばらくお待ちください。</p>
        <div style={{ backgroundColor: "#e8f3ed", borderRadius: "12px", color: "#1f5548", margin: "28px 0", padding: "18px", textAlign: "center" }}>今日も30秒だけ、外国語で話してみよう。</div>
        <p style={{ color: "#66756f", fontSize: "13px", lineHeight: 1.7, marginTop: "30px" }}>このメールはtalkLog β版へ登録された方に自動送信しています。お心当たりがない場合は、このメールを破棄してください。</p>
        <p style={{ color: "#66756f", fontSize: "13px", marginBottom: 0 }}>talkLog<br />ConectaMente Labs</p>
      </div>
    </div>
  );
}


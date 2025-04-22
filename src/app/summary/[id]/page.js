// 📄 このファイルはラッパーとして ID を受け取り、クライアントコンポーネントに渡すだけ
import SummaryDetailPageClient from "./SummaryDetailPageClient";

export default function SummaryDetailPageWrapper({ params }) {
  return <SummaryDetailPageClient novelId={params.id} />;
}

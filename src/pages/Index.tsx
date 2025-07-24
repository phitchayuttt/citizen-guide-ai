import Header from "@/components/Header";
import StatsOverview from "@/components/StatsOverview";
import DocumentStatus from "@/components/DocumentStatus";
import AISummarize from "@/components/AISummarize";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">สวัสดี นายสมชาย ใจดี</h2>
          <p className="text-muted-foreground">นี่คือภาพรวมบริการและสถานะเอกสารของคุณ</p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Status */}
          <div>
            <DocumentStatus />
          </div>

          {/* AI Summarize */}
          <div>
            <AISummarize />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

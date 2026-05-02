import { useState, useMemo } from 'react';
import { TERMS, CATEGORIES } from './data/terms';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return TERMS.filter(term => {
      const matchesSearch = 
        term.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.zh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCat = !selectedCat || term.cat === selectedCat;
      
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCat]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>📚 Amigo IT 知識庫</h1>
          <p>院舍 IT 術語自助查詢平台</p>
        </div>
      </header>

      {/* 搜尋與篩選 */}
      <div className="search-section">
        <div className="container">
          <input
            type="text"
            className="search-box"
            placeholder="搜尋術語名稱、描述或標籤..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {/* 分類篩選 */}
          <div className="category-filter">
            <button
              className={`cat-btn ${!selectedCat ? 'active' : ''}`}
              onClick={() => setSelectedCat(null)}
            >
              全部
            </button>
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <button
                key={key}
                className={`cat-btn ${selectedCat === key ? 'active' : ''}`}
                onClick={() => setSelectedCat(key)}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 術語列表 */}
      <main className="container">
        {filteredTerms.length === 0 ? (
          <div className="empty-state">
            <p>🔍 搵唔到相關術語</p>
            <p className="text-secondary">試試用其他關鍵字搜尋</p>
          </div>
        ) : (
          <div className="terms-grid">
            {filteredTerms.map((term) => (
              <div
                key={term.id}
                className="card term-card"
                onClick={() => setExpandedId(expandedId === term.id ? null : term.id)}
              >
                <div className="term-header">
                  <div>
                    <h3 className="term-title">{term.zh}</h3>
                    <p className="term-en">{term.en}</p>
                  </div>
                  <span className={`cat-badge ${term.cat}`}>
                    {term.catIcon} {term.catLabel}
                  </span>
                </div>

                <p className="term-desc">{term.desc}</p>

                {expandedId === term.id && (
                  <div className="term-expanded">
                    <div className="analogy">
                      <strong>💡 院舍比喻：</strong>
                      <p>{term.analogy}</p>
                    </div>
                    
                    <div className="tags">
                      {term.tags.map((tag) => (
                        <span key={tag} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="term-footer">
                  <span className="expand-hint">
                    {expandedId === term.id ? '▼ 收起' : '▶ 展開詳情'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Amigo IT 知識庫 v1.0 | 最後更新：2026-04-28</p>
          <p className="text-secondary">
            共 {TERMS.length} 個術語 | 搜尋結果：{filteredTerms.length} 個
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

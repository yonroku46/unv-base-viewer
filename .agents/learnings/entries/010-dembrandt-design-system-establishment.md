---
id: 010-dembrandt-design-system-establishment
title: Dembrandt基盤プロジェクト独自デザインシステムの確立
date: 2026-10-26
scope: [design-system, dembrandt, tokens, scss, ui]
status: active
---

### 背景・発生した問題（Problem / Context）
初期設計でサードパーティ製の重量UIフレームワークを採用していたが、以下の問題が顕在化した：
1. バンドルサイズが肥大化し、React 19 / Next.js 15 App Routerとの親和性やSSR最適化に制約が生じる。
2. 内部の複雑なCSS-in-JS構造により、プロジェクト独自のデザイン要件やダークモードの微調整が困難。
3. エージェントが外部ライブラリの固有プロパティやクラス上書きに引きずられ、純粋で堅牢なCSS変数トークン設計が崩れやすい。

### 根本原因（Root Cause）
複数サービスを展開するB2B SaaSボイラープレートにおいて、特定の重量UIフレームワークに依存すると、ブランドごとの柔軟なUI/UX表現（カラー、タイポグラフィ、スペーシング）を機敏に変更・管理できない。

### 解決策および今後のルール（Rule & Solution）
1. **外部UIライブラリの完全排除**:
   - サードパーティ製UIキットへの依存を完全排除し、新規導入を厳禁とする。
2. **Dembrandtによるデザインインテリジェンスとトークン管理**:
   - プロジェクト立ち上げ時やリブランディング時に、Dembrandt CLI（`dembrandt <url> --design-md` / `--dtcg`）を実行。
   - コンソールおよびMarkdown出力結果をルートの `DESIGN.md` に集約し、プロジェクトのデザイン単一真実源（SSOT）とする。
3. **`_variables.scss` へのトークン展開**:
   - `DESIGN.md` のトークン定義（カラー、スケール、スペーシング、角丸、シャドウ）を `src/styles/base/_variables.scss` にCSS変数として記述。
4. **`src/components/ui/` による独自UI実装**:
   - Button, Dialog, Input, Tabs等のUI部品は、外部ライブラリを挟まず、純粋なReact + TypeScript + 同伴SCSS（`<Component>.scss`）で自己完結型として実装する。

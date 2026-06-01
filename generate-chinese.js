const fs = require('fs');
const path = require('path');

// ???Unicode?????????????????
const title = '\u62bd\u7b7e\u5e94\u7528';  // ??????
const subtitle = '\u8bbe\u7f6e\u53c2\u6570\u5e76\u5f00\u59cb\u62bd\u7b7e';  // ????????????????

const chinese = {
  // ???????
  adminTitle: '\u62bd\u7b7e\u5e94\u7528',
  adminSubtitle: '\u8bbe\u7f6e\u53c2\u6570\u5e76\u5f00\u59cb\u62bd\u7b7e',
  settings: '\u8bbe\u7f6e',
  draw: '\u62bd\u7b7e',
  maxNumber: '\u62bd\u7b7e\u8303\u56f4',
  range: '\u8303\u56f4\uff1a1 -',
  ok: '\u786e\u5b9a',
  fixedNumbers: '\u56fa\u5b9a\u53f7\u7801',
  optional: '\uff08\u53ef\u9009\uff09',
  setFixedUser: '\u8bbe\u7f6e\u7279\u5b9a\u53f7\u7801\u5bf9\u5e94\u7684\u56fa\u5b9a\u7528\u6237',
  userFor: '\u53f7\u7528\u6237',
  saveSettings: '\u4fdd\u5b58\u8bbe\u7f6e',
  currentSettings: '\u5f53\u524d\u8bbe\u7f6e',
  maxNumLabel: '\u62bd\u7b7e\u8303\u56f4\uff1a',
  shareToParticipants: '\u5206\u4eab\u7ed9\u53c2\u4e0e\u8005',
  scanQRCode: '\u626b\u63cf\u4e8c\u7ef4\u7801\u53c2\u4e0e\u62bd\u7b7e',
  copy: '\u590d\u5236',
  refreshLink: '\u5237\u65b0\u94fe\u63a5',
  addUsers: '\u53c2\u4e0e\u7528\u6237',
  enterUsername: '\u8f93\u5165\u7528\u6237\u540d',
  add: '\u6dfb\u52a0',
  addMoreUsers: '\u6dfb\u52a0{count}\u4e2a\u7528\u6237\u5f00\u59cb\u62bd\u7b7e',
  readyToDraw: '\u53ef\u4ee5\u5f00\u59cb\u62bd\u7b7e\uff01',
  noUsers: '\u6682\u65e0\u7528\u6237',
  delete: '\u5220\u9664',
  drawingDisabled: '\u6682\u4e0d\u53ef\u62bd\u7b7e',
  needMoreUsers: '\u8fd8\u9700 {count} \u4e2a\u7528\u6237',
  startDrawing: '\u5f00\u59cb\u62bd\u7b7e',
  results: '\u62bd\u7b7e\u7ed3\u679c',
  resultsWillAppear: '\u62bd\u7b7e\u7ed3\u679c\u5c06\u5728\u6b64\u5904\u663e\u793a',
  drawingNumbers: '\u6b63\u5728\u62bd\u7b7e\u4e2d...',
  fixed: '\u56fa\u5b9a',
  unknown: '\u672a\u77e5',
  
  // ???????
  joinDrawing: '\u53c2\u4e0e\u62bd\u7b7e',
  joinSubtitle: '\u52a0\u5165\u5e78\u8fd0\u62bd\u7b7e\u6d3b\u52a8',
  waiting: '\u7b49\u5f85\u53c2\u4e0e\u8005',
  hostWillStart: '\u4e3b\u6301\u4eba\u5373\u5c06\u5f00\u59cb\u62bd\u7b7e',
  participants: '\u53c2\u4e0e\u8005\u5217\u8868',
  waitingForMore: '\u7b49\u5f85\u66f4\u591a\u53c2\u4e0e\u8005...',
  noParticipants: '\u6682\u65e0\u53c2\u4e0e\u8005',
  joinNow: '\u7acb\u5373\u53c2\u4e0e',
  enterYourName: '\u8f93\u5165\u60a8\u7684\u59d3\u540d',
  join: '\u53c2\u4e0e\u62bd\u7b7e',
  welcome: '\u6b22\u8fce\uff01',
  welcomeMsg: '\u60a8\u5df2\u6210\u529f\u53c2\u4e0e\u62bd\u7b7e',
  yourNumber: '\u60a8\u7684\u53f7\u7801\uff1a',
  participantsFull: '\u4eba\u6570\u5df2\u6ee1',
  waitingHost: '\u7b49\u5f85\u4e3b\u6301\u4eba\u5f00\u59cb\u62bd\u7b7e',
  drawingCompleted: '\u62bd\u7b7e\u5b8c\u6210\uff01',
  resultsReady: '\u7ed3\u679c\u5df2\u516c\u5e03',
  you: '\uff08\u60a8\uff09',
  
  // ??????
  loading: '\u52a0\u8f7d\u4e2d...',
  connecting: '\u6b63\u5728\u8fde\u63a5\u4f1a\u8bdd...',
  maxReached: '\u5df2\u8fbe\u5230\u6700\u5927\u4eba\u6570',
  userExists: '\u7528\u6237\u540d\u5df2\u5b58\u5728',
  settingsSaved: '\u8bbe\u7f6e\u5df2\u4fdd\u5b58\uff01',
  linkCopied: '\u94fe\u63a5\u5df2\u590d\u5236\uff01',
  linkRefreshed: '\u94fe\u63a5\u5df2\u5237\u65b0\uff01',
  notEnoughUsers: '\u7528\u6237\u6570\u91cf\u4e0d\u8db3',
  fixedUsersSame: '\u56fa\u5b9a\u7528\u6237\u4e0d\u80fd\u76f8\u540c',
  enterName: '\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d',
  nameExists: '\u7528\u6237\u540d\u5df2\u5b58\u5728',
  participantsFullAlt: '\u53c2\u4e0e\u4eba\u6570\u5df2\u6ee1',
  joining: '\u52a0\u5165\u4e2d...',
  minimum: '\u6700\u5c0f\u503c\u4e3a2',
  maximum: '\u6700\u5927\u503c\u4e3a50',
};

console.log('Generated Chinese strings:', Object.keys(chinese).length);
console.log('Title:', title);
console.log('Subtitle:', subtitle);

// ????HTML
let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container { max-width: 400px; margin: 0 auto; }
    .header { text-align: center; color: white; margin-bottom: 20px; }
    .header h1 { font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .header p { font-size: 14px; opacity: 0.8; margin-top: 5px; }
    .tabs { display: flex; gap: 10px; margin-bottom: 15px; }
    .tab { flex: 1; padding: 12px; background: rgba(255,255,255,0.2); border: none; border-radius: 12px; color: white; font-weight: 600; cursor: pointer; transition: all 0.3s; backdrop-filter: blur(10px); }
    .tab.active { background: rgba(255,255,255,0.95); color: #6366f1; }
    .tab:hover:not(.active) { background: rgba(255,255,255,0.3); }
    .page { display: none; }
    .page.active { display: block; }
    .card { background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-radius: 20px; padding: 20px; margin-bottom: 15px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
    .card-title { font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
    .card-title span { font-size: 18px; }
    .btn { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-size: 14px; }
    .btn:hover { transform: scale(1.02); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4); }
    .btn:active { transform: scale(0.98); }
    .btn:disabled { background: #9ca3af; cursor: not-allowed; transform: none; }
    .btn-large { width: 100%; padding: 16px; font-size: 18px; }
    .btn-success { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
    .btn-success:hover { box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); }
    .btn-secondary { background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); }
    .btn-small { padding: 8px 16px; font-size: 12px; }
    .input-group { display: flex; gap: 10px; margin-bottom: 10px; }
    .input { flex: 1; padding: 10px 14px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 14px; outline: none; transition: border-color 0.3s; }
    .input:focus { border-color: #6366f1; }
    .input-number { text-align: center; font-weight: 600; font-size: 18px; }
    .slider { width: 100%; height: 6px; -webkit-appearance: none; appearance: none; background: #e5e7eb; border-radius: 3px; margin: 15px 0; }
    .slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 50%; cursor: pointer; box-shadow: 0 2px 6px rgba(99, 102, 241, 0.4); }
    .fixed-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .fixed-badge { width: 40px; height: 40px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3); }
    .fixed-input { flex: 1; padding: 10px 14px; border: 2px solid #fef3c7; border-radius: 12px; font-size: 14px; outline: none; transition: border-color 0.3s; }
    .fixed-input:focus { border-color: #f59e0b; }
    .user-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #f3f4f6; border-radius: 10px; margin-bottom: 8px; animation: rollIn 0.3s ease-out; }
    .user-item span { font-size: 14px; color: #374151; }
    .user-item button { background: none; border: none; color: #ef4444; cursor: pointer; padding: 5px; border-radius: 6px; transition: background 0.2s; }
    .user-item button:hover { background: #fee2e2; }
    .result-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f9fafb; border-radius: 12px; margin-bottom: 8px; animation: bounceIn 0.4s ease-out; }
    .result-item.fixed { background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 0%); border: 1px solid #fde68a; }
    .result-badge { width: 40px; height: 40px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; flex-shrink: 0; }
    .result-item.fixed .result-badge { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
    .result-info { flex: 1; }
    .result-info p { font-weight: 600; color: #1f2937; font-size: 14px; }
    .result-info .fixed-tag { font-size: 10px; color: #d97706; background: #fef3c7; padding: 2px 6px; border-radius: 4px; margin-top: 4px; display: inline-block; }
    .empty-state { text-align: center; padding: 30px 0; }
    .empty-state .icon { width: 64px; height: 64px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 32px; }
    .empty-state p { color: #9ca3af; font-size: 14px; }
    .empty-state.drawing .icon { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); animation: bounce 0.8s ease-in-out infinite; color: white; }
    .empty-state.drawing p { color: #6b7280; }
    .progress-bar { width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; margin: 15px 0; }
    .progress-fill { height: 100%; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); transition: width 0.3s ease; }
    .progress-text { text-align: center; font-size: 14px; color: #6b7280; margin-bottom: 15px; }
    .count-badge { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin-left: 8px; }
    .qr-section { text-align: center; padding: 20px; background: #f9fafb; border-radius: 12px; margin-top: 15px; }
    .qr-code { width: 150px; height: 150px; margin: 0 auto 15px; background: white; padding: 10px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: inline-block; }
    .qr-code img { width: 100%; height: 100%; }
    .share-link { display: flex; gap: 10px; align-items: center; margin-top: 10px; }
    .share-link input { flex: 1; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 12px; background: white; }
    .copy-btn { padding: 10px 15px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px; }
    .animate-spin { animation: spin 1s linear infinite; }
    @keyframes rollIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.8); } 50% { transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .scrollable { max-height: 180px; overflow-y: auto; }
    .scrollable::-webkit-scrollbar { width: 6px; }
    .scrollable::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
    .scrollable::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
    .scrollable::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
    .loading { text-align: center; padding: 50px 20px; color: white; }
    .loading .spinner { font-size: 48px; animation: spin 1s linear infinite; margin-bottom: 20px; }
    .status-card { text-align: center; padding: 30px 20px; }
    .status-icon { font-size: 48px; margin-bottom: 15px; }
    .status-title { font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 10px; }
    .status-desc { font-size: 14px; color: #6b7280; }
    .success-card { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #10b981; }
    .user-list-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #f3f4f6; border-radius: 10px; margin-bottom: 8px; animation: rollIn 0.3s ease-out; }
    .user-list-item span { font-size: 14px; color: #374151; }
    .count-badge-full { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin-left: 8px; }
    .input-large { width: 100%; padding: 14px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 16px; outline: none; transition: border-color 0.3s; text-align: center; margin-bottom: 15px; }
    .input-large:focus { border-color: #6366f1; }
  </style>
</head>
<body>
  <div id="loadingPage" class="loading">
    <div class="spinner">${chinese.loading}</div>
    <p>${chinese.connecting}</p>
  </div>

  <div id="adminPage" class="container" style="display: none;">
    <div class="header">
      <h1>${chinese.adminTitle}</h1>
      <p>${chinese.adminSubtitle}</p>
    </div>

    <div class="tabs">
      <button class="tab active" onclick="switchTab('settings')">${chinese.settings}</button>
      <button class="tab" onclick="switchTab('draw')">${chinese.draw}</button>
    </div>

    <div id="settingsPage" class="page active">
      <div class="card">
        <div class="card-title"><span>${chinese.maxNumber}</span></div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="color: #6b7280; font-size: 14px;">${chinese.range}</span>
          <input type="number" id="maxNumber" value="20" min="2" max="50" class="input input-number" style="width: 80px;">
          <button onclick="updateMaxNumber()" class="btn">${chinese.ok}</button>
        </div>
        <input type="range" id="maxSlider" min="2" max="50" value="20" class="slider" oninput="syncSlider()">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #9ca3af;"><span>2</span><span>50</span></div>
      </div>

      <div class="card">
        <div class="card-title"><span>${chinese.fixedNumbers}</span><span style="font-size: 12px; font-weight: 400; color: #9ca3af;">${chinese.optional}</span></div>
        <p style="font-size: 12px; color: #6b7280; margin-bottom: 12px;">${chinese.setFixedUser}</p>
        <div class="fixed-row">
          <div class="fixed-badge">1</div>
          <input type="text" id="fixed1" placeholder="${chinese.userFor} #1" class="fixed-input">
        </div>
        <div class="fixed-row">
          <div class="fixed-badge">2</div>
          <input type="text" id="fixed2" placeholder="${chinese.userFor} #2" class="fixed-input">
        </div>
        <button onclick="saveSettings()" class="btn" style="width: 100%; margin-top: 10px;">${chinese.saveSettings}</button>
      </div>
    </div>

    <div id="drawPage" class="page">
      <div class="card">
        <div class="card-title"><span>${chinese.currentSettings}</span></div>
        <div style="display: flex; justify-content: space-between; padding: 10px; background: #f3f4f6; border-radius: 10px;">
          <span style="color: #6b7280;">${chinese.maxNumLabel}</span>
          <span id="displayMaxNumber" style="font-weight: 600; color: #6366f1;">20</span>
        </div>
        <div class="qr-section" id="qrSection">
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">${chinese.shareToParticipants}</p>
          <div class="qr-code" id="qrCode"></div>
          <p style="font-size: 12px; color: #9ca3af; margin-bottom: 10px;">${chinese.scanQRCode}</p>
          <div class="share-link">
            <input type="text" id="shareLink" readonly>
            <button class="copy-btn" onclick="copyLink()">${chinese.copy}</button>
          </div>
          <button onclick="refreshQR()" class="btn btn-secondary btn-small" style="margin-top: 10px;">${chinese.refreshLink}</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span>${chinese.addUsers}</span><span class="count-badge" id="userCount">0 / 20</span></div>
        <div class="input-group">
          <input type="text" id="userInput" placeholder="${chinese.enterUsername}" class="input" maxlength="20">
          <button onclick="addUser()" class="btn">+ ${chinese.add}</button>
        </div>
        <div class="progress-bar"><div class="progress-fill" id="progressFill" style="width: 0%;"></div></div>
        <p class="progress-text" id="progressText">${chinese.addMoreUsers.replace('{count}', '20')}</p>
        <div id="userList" class="scrollable"></div>
      </div>

      <div class="card" style="padding: 0;">
        <button onclick="draw()" id="drawBtn" class="btn btn-large" disabled><span>${chinese.drawingDisabled}</span></button>
      </div>

      <div class="card">
        <div class="card-title"><span>${chinese.results}</span></div>
        <div id="resultList">
          <div class="empty-state" id="emptyState"><div class="icon">${chinese.results}</div><p>${chinese.resultsWillAppear}</p></div>
        </div>
      </div>
    </div>
  </div>

  <div id="joinPage" class="container" style="display: none;">
    <div class="header">
      <h1>${chinese.joinDrawing}</h1>
      <p>${chinese.joinSubtitle}</p>
    </div>

    <div class="card" id="statusCard">
      <div class="status-card">
        <div class="status-icon" id="statusIcon"></div>
        <div class="status-title" id="statusTitle">${chinese.waiting}</div>
        <div class="status-desc" id="statusDesc">${chinese.hostWillStart}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span>${chinese.participants}</span><span class="count-badge" id="joinUserCount">0 / 20</span></div>
      <div class="progress-bar"><div class="progress-fill" id="joinProgressFill" style="width: 0%;"></div></div>
      <p class="progress-text" id="joinProgressText">${chinese.waitingForMore}</p>
      <div id="joinUserList" class="scrollable"></div>
    </div>

    <div class="card" id="joinForm">
      <div class="card-title"><span>${chinese.joinNow}</span></div>
      <input type="text" id="joinUserName" class="input-large" placeholder="${chinese.enterYourName}" maxlength="20">
      <button onclick="joinDrawing()" id="joinBtn" class="btn btn-success btn-large">${chinese.join}</button>
    </div>

    <div class="card success-card" id="joinSuccessCard" style="display: none;">
      <div class="status-card">
        <div class="status-icon"></div>
        <div class="status-title" id="joinWelcomeText">${chinese.welcome}</div>
        <div class="status-desc">${chinese.welcomeMsg}</div>
      </div>
    </div>
  </div>

  <script>
    const STORAGE_KEY = 'draw-lots-data';
    let maxNumber = 20;
    let fixedUsers = { '1': '', '2': '' };
    let users = [];
    let results = [];
    let isDrawing = false;
    let sessionId = '';
    let myName = '';
    let isJoined = false;
    let isAdmin = true;

    function init() {
      const params = new URLSearchParams(window.location.search);
      const joinId = params.get('join');
      
      if (joinId) {
        isAdmin = false;
        sessionId = joinId;
        showJoinPage();
      } else {
        isAdmin = true;
        loadData();
        initAdminUI();
      }
    }

    function generateSessionId() {
      return 'draw_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    function generateQRCode(text, container) {
      const encodedText = encodeURIComponent(text);
      container.innerHTML = \`<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=\${encodedText}" alt="QR Code">\`;
    }

    function generateShareLink() {
      if (!sessionId) sessionId = generateSessionId();
      const baseURL = window.location.origin + window.location.pathname;
      return \`\${baseURL}?join=\${sessionId}\`;
    }

    function refreshQR() {
      sessionId = generateSessionId();
      const link = generateShareLink();
      document.getElementById('shareLink').value = link;
      generateQRCode(link, document.getElementById('qrCode'));
      saveData();
      alert('${chinese.linkRefreshed}');
    }

    function copyLink() {
      const link = document.getElementById('shareLink').value;
      navigator.clipboard.writeText(link).then(() => alert('${chinese.linkCopied}')).catch(() => {
        document.getElementById('shareLink').select();
        document.execCommand('copy');
        alert('${chinese.linkCopied}');
      });
    }

    function loadData() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          maxNumber = parsed.maxNumber || 20;
          fixedUsers = parsed.fixedUsers || { '1': '', '2': '' };
          users = parsed.users || [];
          results = parsed.results || [];
          sessionId = parsed.sessionId || generateSessionId();
        } else {
          sessionId = generateSessionId();
        }
      } catch (e) { console.error('Failed to load data'); }
    }

    function saveData() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ maxNumber, fixedUsers, users, results, sessionId }));
    }

    function initAdminUI() {
      document.getElementById('loadingPage').style.display = 'none';
      document.getElementById('adminPage').style.display = 'block';
      
      document.getElementById('maxNumber').value = maxNumber;
      document.getElementById('maxSlider').value = maxNumber;
      document.getElementById('fixed1').value = fixedUsers['1'];
      document.getElementById('fixed2').value = fixedUsers['2'];
      
      const shareLink = generateShareLink();
      document.getElementById('shareLink').value = shareLink;
      generateQRCode(shareLink, document.getElementById('qrCode'));
      
      updateAdminUI();
    }

    function showJoinPage() {
      document.getElementById('loadingPage').style.display = 'none';
      document.getElementById('joinPage').style.display = 'block';
      startJoinRefresh();
    }

    function updateAdminUI() {
      document.getElementById('displayMaxNumber').textContent = maxNumber;
      updateAdminUserList();
      updateAdminProgress();
    }

    function updateAdminUserList() {
      const list = document.getElementById('userList');
      if (users.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 15px 0; font-size: 14px;">${chinese.noUsers}</p>';
        return;
      }
      list.innerHTML = users.map((user, index) => \`
        <div class="user-item" style="animation-delay: \${index * 50}ms;">
          <span>\${user.name}</span>
          <button onclick="removeUser('\${user.id}')" title="${chinese.delete}">X</button>
        </div>
      \`).join('');
    }

    function updateAdminProgress() {
      const count = users.length;
      const percentage = (count / maxNumber) * 100;
      document.getElementById('userCount').textContent = \`\${count} / \${maxNumber}\`;
      document.getElementById('progressFill').style.width = \`\${percentage}%\`;
      document.getElementById('progressText').textContent = count >= maxNumber ? '${chinese.readyToDraw}' : \`${chinese.addMoreUsers.replace('{count}', '')}\${maxNumber - count}\`;
      
      const drawBtn = document.getElementById('drawBtn');
      if (count >= maxNumber) {
        drawBtn.disabled = false;
        drawBtn.classList.remove('btn');
        drawBtn.classList.add('btn-success');
        drawBtn.innerHTML = '<span>${chinese.startDrawing}</span>';
      } else {
        drawBtn.disabled = true;
        drawBtn.classList.add('btn');
        drawBtn.classList.remove('btn-success');
        drawBtn.innerHTML = \`<span>${chinese.needMoreUsers.replace('{count}', '')}\${maxNumber - count}</span>\`;
      }
    }

    function updateJoinUI() {
      const data = loadJoinData();
      const maxNum = data.maxNumber || 20;
      const userList = data.users || [];
      const drawResults = data.results || [];
      const isFull = userList.length >= maxNum;

      document.getElementById('joinUserCount').textContent = \`\${userList.length} / \${maxNum}\`;
      document.getElementById('joinProgressFill').style.width = \`\${(userList.length / maxNum) * 100}%\`;
      document.getElementById('joinProgressText').textContent = isFull ? '${chinese.readyToDraw}' : \`${chinese.waitingForMore.replace('...', '')}\${maxNum - userList.length}\`;

      const userListEl = document.getElementById('joinUserList');
      if (userList.length === 0) {
        userListEl.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 15px 0;">${chinese.noParticipants}</p>';
      } else {
        userListEl.innerHTML = userList.map((user, index) => \`
          <div class="user-list-item" style="animation-delay: \${index * 50}ms;">
            <span>\${user.name}</span>
            \${user.name === myName ? '<span style="color: #10b981; font-size: 12px;">${chinese.you}</span>' : ''}
          </div>
        \`).join('');
      }

      if (drawResults.length > 0) {
        document.getElementById('statusIcon').textContent = '';
        document.getElementById('statusTitle').textContent = '${chinese.drawingCompleted}';
        document.getElementById('statusDesc').textContent = '${chinese.resultsReady}';
        document.getElementById('joinForm').style.display = 'none';
        
        const myResult = drawResults.find(r => {
          const user = userList.find(u => u.id === r.userId);
          return user && user.name === myName;
        });
        
        if (myResult) {
          document.getElementById('joinWelcomeText').textContent = \`${chinese.yourNumber}#\${myResult.number}\`;
          document.getElementById('joinSuccessCard').style.display = 'block';
        }
      } else if (isFull && !isJoined) {
        document.getElementById('statusIcon').textContent = '';
        document.getElementById('statusTitle').textContent = '${chinese.participantsFull}';
        document.getElementById('statusDesc').textContent = '${chinese.waitingHost}';
        document.getElementById('joinForm').style.display = 'none';
      } else if (isJoined) {
        document.getElementById('joinForm').style.display = 'none';
      }
    }

    function loadJoinData() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) return JSON.parse(data);
      } catch (e) { console.error('Failed to load data'); }
      return { maxNumber: 20, fixedUsers: { '1': '', '2': '' }, users: [], results: [], sessionId: '' };
    }

    function startJoinRefresh() {
      updateJoinUI();
      setInterval(updateJoinUI, 2000);
    }

    function switchTab(tab) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      
      if (tab === 'settings') {
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.getElementById('settingsPage').classList.add('active');
      } else {
        document.querySelector('.tab:nth-child(2)').classList.add('active');
        document.getElementById('drawPage').classList.add('active');
        updateAdminUI();
      }
    }

    function addUser() {
      const input = document.getElementById('userInput');
      const name = input.value.trim();
      if (!name) return;
      if (users.length >= maxNumber) { alert('${chinese.maxReached}'); return; }
      if (users.some(u => u.name === name)) { alert('${chinese.userExists}'); return; }
      users.push({ id: Date.now().toString(), name });
      input.value = '';
      saveData();
      updateAdminUserList();
      updateAdminProgress();
    }

    function removeUser(userId) {
      users = users.filter(u => u.id !== userId);
      saveData();
      updateAdminUserList();
      updateAdminProgress();
    }

    function updateMaxNumber() {
      const input = document.getElementById('maxNumber');
      const num = parseInt(input.value, 10);
      if (isNaN(num)) return;
      if (num < 2) { alert('${chinese.minimum}'); input.value = '2'; return; }
      if (num > 50) { alert('${chinese.maximum}'); input.value = '50'; return; }
      maxNumber = num;
      document.getElementById('maxSlider').value = num;
      saveData();
      updateAdminProgress();
    }

    function syncSlider() {
      const slider = document.getElementById('maxSlider');
      const input = document.getElementById('maxNumber');
      maxNumber = parseInt(slider.value, 10);
      input.value = maxNumber;
      saveData();
      updateAdminProgress();
    }

    function saveSettings() {
      fixedUsers['1'] = document.getElementById('fixed1').value.trim();
      fixedUsers['2'] = document.getElementById('fixed2').value.trim();
      saveData();
      alert('${chinese.settingsSaved}');
    }

    function draw() {
      if (users.length < maxNumber) { alert('${chinese.notEnoughUsers}'); return; }

      const fixed1 = fixedUsers['1'];
      const fixed2 = fixedUsers['2'];
      if (fixed1 && fixed2 && fixed1 === fixed2) { alert('${chinese.fixedUsersSame}'); return; }

      isDrawing = true;
      const btn = document.getElementById('drawBtn');
      btn.innerHTML = '<span class="animate-spin">${chinese.drawingNumbers}</span>';
      btn.disabled = true;
      renderResultList();

      setTimeout(() => {
        const availableNumbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
        const availableUsers = [...users];
        const newResults = [];

        if (fixed1 && availableNumbers.includes(1)) {
          const user = availableUsers.find(u => u.name === fixed1);
          if (user) {
            newResults.push({ userId: user.id, number: 1, isFixed: true });
            availableNumbers.splice(availableNumbers.indexOf(1), 1);
            availableUsers.splice(availableUsers.indexOf(user), 1);
          }
        }

        if (fixed2 && availableNumbers.includes(2)) {
          const user = availableUsers.find(u => u.name === fixed2);
          if (user) {
            newResults.push({ userId: user.id, number: 2, isFixed: true });
            availableNumbers.splice(availableNumbers.indexOf(2), 1);
            availableUsers.splice(availableUsers.indexOf(user), 1);
          }
        }

        for (let i = 0; i < availableUsers.length && availableNumbers.length > 0; i++) {
          const randomIndex = Math.floor(Math.random() * availableNumbers.length);
          const number = availableNumbers.splice(randomIndex, 1)[0];
          newResults.push({ userId: availableUsers[i].id, number, isFixed: false });
        }

        newResults.sort((a, b) => a.number - b.number);
        results = newResults;
        isDrawing = false;
        saveData();
        renderResultList();
        updateAdminProgress();
        btn.innerHTML = '<span>${chinese.startDrawing}</span>';
        btn.disabled = false;
      }, 1500);
    }

    function renderResultList() {
      const list = document.getElementById('resultList');
      if (results.length === 0) {
        list.innerHTML = \`<div class="empty-state \${isDrawing ? 'drawing' : ''}"><div class="icon">${chinese.results}</div><p>\${isDrawing ? '${chinese.drawingNumbers}' : '${chinese.resultsWillAppear}'}</p></div>\`;
        return;
      }
      list.innerHTML = results.map((result, index) => {
        const user = users.find(u => u.id === result.userId);
        return \`<div class="result-item \${result.isFixed ? 'fixed' : ''}" style="animation-delay: \${index * 100}ms;"><div class="result-badge">\${result.number}</div><div class="result-info"><p>\${user ? user.name : '${chinese.unknown}'}</p>\${result.isFixed ? '<span class="fixed-tag">${chinese.fixed}</span>' : ''}</div></div>\`;
      }).join('');
    }

    function joinDrawing() {
      const name = document.getElementById('joinUserName').value.trim();
      if (!name) { alert('${chinese.enterName}'); return; }
      
      const data = loadJoinData();
      if (data.users.some(u => u.name === name)) { alert('${chinese.nameExists}'); return; }
      if (data.users.length >= data.maxNumber) { alert('${chinese.participantsFullAlt}'); return; }
      
      const user = { id: Date.now().toString(), name };
      data.users.push(user);
      data.sessionId = sessionId;
      
      myName = name;
      isJoined = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      
      document.getElementById('joinBtn').innerHTML = '<span class="animate-spin">${chinese.joining}</span>';
      document.getElementById('joinBtn').disabled = true;
      
      setTimeout(() => {
        document.getElementById('joinForm').style.display = 'none';
        document.getElementById('joinSuccessCard').style.display = 'block';
        document.getElementById('joinWelcomeText').textContent = \`${chinese.welcome.replace('??', '')}, \${name}!\`;
        updateJoinUI();
      }, 500);
    }

    document.getElementById('userInput')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') addUser(); });
    document.getElementById('maxNumber')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') updateMaxNumber(); });
    document.getElementById('joinUserName')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') joinDrawing(); });

    init();
  </script>
</body>
</html>`;

// ???????
fs.writeFileSync(path.join(__dirname, 'index.html'), html, { encoding: 'utf8' });
console.log('HTML file with Chinese characters generated successfully!');
console.log('Checking file...');

const fs2 = require('fs');
const content = fs2.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const chineseMatch = content.match(/\u62bd\u7b7e\u5e94\u7528/);
if (chineseMatch) {
  console.log('Chinese characters verified in file');
} else {
  console.log('Warning: Chinese characters not found');
}

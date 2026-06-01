const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chou Qian Ying Yong</title>
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
    <div class="spinner">Loading...</div>
    <p>Connecting to session...</p>
  </div>

  <div id="adminPage" class="container" style="display: none;">
    <div class="header">
      <h1>Draw Lots</h1>
      <p>Set settings and start drawing</p>
    </div>

    <div class="tabs">
      <button class="tab active" onclick="switchTab('settings')">Settings</button>
      <button class="tab" onclick="switchTab('draw')">Draw</button>
    </div>

    <div id="settingsPage" class="page active">
      <div class="card">
        <div class="card-title"><span>Max Number</span></div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="color: #6b7280; font-size: 14px;">Range: 1 -</span>
          <input type="number" id="maxNumber" value="20" min="2" max="50" class="input input-number" style="width: 80px;">
          <button onclick="updateMaxNumber()" class="btn">OK</button>
        </div>
        <input type="range" id="maxSlider" min="2" max="50" value="20" class="slider" oninput="syncSlider()">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #9ca3af;"><span>2</span><span>50</span></div>
      </div>

      <div class="card">
        <div class="card-title"><span>Fixed Numbers</span><span style="font-size: 12px; font-weight: 400; color: #9ca3af;">(Optional)</span></div>
        <p style="font-size: 12px; color: #6b7280; margin-bottom: 12px;">Set fixed users for specific numbers</p>
        <div class="fixed-row">
          <div class="fixed-badge">1</div>
          <input type="text" id="fixed1" placeholder="User for #1" class="fixed-input">
        </div>
        <div class="fixed-row">
          <div class="fixed-badge">2</div>
          <input type="text" id="fixed2" placeholder="User for #2" class="fixed-input">
        </div>
        <button onclick="saveSettings()" class="btn" style="width: 100%; margin-top: 10px;">Save Settings</button>
      </div>
    </div>

    <div id="drawPage" class="page">
      <div class="card">
        <div class="card-title"><span>Current Settings</span></div>
        <div style="display: flex; justify-content: space-between; padding: 10px; background: #f3f4f6; border-radius: 10px;">
          <span style="color: #6b7280;">Max Number:</span>
          <span id="displayMaxNumber" style="font-weight: 600; color: #6366f1;">20</span>
        </div>
        <div class="qr-section" id="qrSection">
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">Share to participants</p>
          <div class="qr-code" id="qrCode"></div>
          <p style="font-size: 12px; color: #9ca3af; margin-bottom: 10px;">Scan QR code to join</p>
          <div class="share-link">
            <input type="text" id="shareLink" readonly>
            <button class="copy-btn" onclick="copyLink()">Copy</button>
          </div>
          <button onclick="refreshQR()" class="btn btn-secondary btn-small" style="margin-top: 10px;">Refresh Link</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span>Add Users</span><span class="count-badge" id="userCount">0 / 20</span></div>
        <div class="input-group">
          <input type="text" id="userInput" placeholder="Enter user name" class="input" maxlength="20">
          <button onclick="addUser()" class="btn">+ Add</button>
        </div>
        <div class="progress-bar"><div class="progress-fill" id="progressFill" style="width: 0%;"></div></div>
        <p class="progress-text" id="progressText">Add 20 users to start drawing</p>
        <div id="userList" class="scrollable"></div>
      </div>

      <div class="card" style="padding: 0;">
        <button onclick="draw()" id="drawBtn" class="btn btn-large" disabled><span>Drawing Disabled</span></button>
      </div>

      <div class="card">
        <div class="card-title"><span>Results</span></div>
        <div id="resultList">
          <div class="empty-state" id="emptyState"><div class="icon">Results</div><p>Results will appear here</p></div>
        </div>
      </div>
    </div>
  </div>

  <div id="joinPage" class="container" style="display: none;">
    <div class="header">
      <h1>Join Drawing</h1>
      <p>Participate in the lucky draw</p>
    </div>

    <div class="card" id="statusCard">
      <div class="status-card">
        <div class="status-icon" id="statusIcon"></div>
        <div class="status-title" id="statusTitle">Waiting for participants</div>
        <div class="status-desc" id="statusDesc">The host will start the draw soon</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span>Participants</span><span class="count-badge" id="joinUserCount">0 / 20</span></div>
      <div class="progress-bar"><div class="progress-fill" id="joinProgressFill" style="width: 0%;"></div></div>
      <p class="progress-text" id="joinProgressText">Waiting for more participants...</p>
      <div id="joinUserList" class="scrollable"></div>
    </div>

    <div class="card" id="joinForm">
      <div class="card-title"><span>Join Now</span></div>
      <input type="text" id="joinUserName" class="input-large" placeholder="Enter your name" maxlength="20">
      <button onclick="joinDrawing()" id="joinBtn" class="btn btn-success btn-large">Join Drawing</button>
    </div>

    <div class="card success-card" id="joinSuccessCard" style="display: none;">
      <div class="status-card">
        <div class="status-icon"></div>
        <div class="status-title" id="joinWelcomeText">Welcome!</div>
        <div class="status-desc">You have successfully joined the drawing</div>
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
      alert('Link refreshed!');
    }

    function copyLink() {
      const link = document.getElementById('shareLink').value;
      navigator.clipboard.writeText(link).then(() => alert('Link copied!')).catch(() => {
        document.getElementById('shareLink').select();
        document.execCommand('copy');
        alert('Link copied!');
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
        list.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 15px 0; font-size: 14px;">No users added</p>';
        return;
      }
      list.innerHTML = users.map((user, index) => \`
        <div class="user-item" style="animation-delay: \${index * 50}ms;">
          <span>\${user.name}</span>
          <button onclick="removeUser('\${user.id}')" title="Delete">X</button>
        </div>
      \`).join('');
    }

    function updateAdminProgress() {
      const count = users.length;
      const percentage = (count / maxNumber) * 100;
      document.getElementById('userCount').textContent = \`\${count} / \${maxNumber}\`;
      document.getElementById('progressFill').style.width = \`\${percentage}%\`;
      document.getElementById('progressText').textContent = count >= maxNumber ? 'Ready to draw!' : \`Add \${maxNumber - count} more users\`;
      
      const drawBtn = document.getElementById('drawBtn');
      if (count >= maxNumber) {
        drawBtn.disabled = false;
        drawBtn.classList.remove('btn');
        drawBtn.classList.add('btn-success');
        drawBtn.innerHTML = '<span>Start Drawing</span>';
      } else {
        drawBtn.disabled = true;
        drawBtn.classList.add('btn');
        drawBtn.classList.remove('btn-success');
        drawBtn.innerHTML = \`<span>Need \${maxNumber - count} more users</span>\`;
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
      document.getElementById('joinProgressText').textContent = isFull ? 'Ready to draw!' : \`\${maxNum - userList.length} more participants needed\`;

      const userListEl = document.getElementById('joinUserList');
      if (userList.length === 0) {
        userListEl.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 15px 0;">No participants yet</p>';
      } else {
        userListEl.innerHTML = userList.map((user, index) => \`
          <div class="user-list-item" style="animation-delay: \${index * 50}ms;">
            <span>\${user.name}</span>
            \${user.name === myName ? '<span style="color: #10b981; font-size: 12px;">(You)</span>' : ''}
          </div>
        \`).join('');
      }

      if (drawResults.length > 0) {
        document.getElementById('statusIcon').textContent = '';
        document.getElementById('statusTitle').textContent = 'Drawing Completed!';
        document.getElementById('statusDesc').textContent = 'The results are ready';
        document.getElementById('joinForm').style.display = 'none';
        
        const myResult = drawResults.find(r => {
          const user = userList.find(u => u.id === r.userId);
          return user && user.name === myName;
        });
        
        if (myResult) {
          document.getElementById('joinWelcomeText').textContent = \`Your number: #\${myResult.number}\`;
          document.getElementById('joinSuccessCard').style.display = 'block';
        }
      } else if (isFull && !isJoined) {
        document.getElementById('statusIcon').textContent = '';
        document.getElementById('statusTitle').textContent = 'Participants Full';
        document.getElementById('statusDesc').textContent = 'Waiting for the host to start';
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
      if (users.length >= maxNumber) { alert('Maximum number reached'); return; }
      if (users.some(u => u.name === name)) { alert('User already exists'); return; }
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
      if (num < 2) { alert('Minimum is 2'); input.value = '2'; return; }
      if (num > 50) { alert('Maximum is 50'); input.value = '50'; return; }
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
      alert('Settings saved!');
    }

    function draw() {
      if (users.length < maxNumber) { alert('Not enough users'); return; }

      const fixed1 = fixedUsers['1'];
      const fixed2 = fixedUsers['2'];
      if (fixed1 && fixed2 && fixed1 === fixed2) { alert('Fixed users cannot be the same'); return; }

      isDrawing = true;
      const btn = document.getElementById('drawBtn');
      btn.innerHTML = '<span class="animate-spin">Drawing...</span>';
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
        btn.innerHTML = '<span>Start Drawing</span>';
        btn.disabled = false;
      }, 1500);
    }

    function renderResultList() {
      const list = document.getElementById('resultList');
      if (results.length === 0) {
        list.innerHTML = \`<div class="empty-state \${isDrawing ? 'drawing' : ''}"><div class="icon">Results</div><p>\${isDrawing ? 'Drawing numbers...' : 'Results will appear here'}</p></div>\`;
        return;
      }
      list.innerHTML = results.map((result, index) => {
        const user = users.find(u => u.id === result.userId);
        return \`<div class="result-item \${result.isFixed ? 'fixed' : ''}" style="animation-delay: \${index * 100}ms;"><div class="result-badge">\${result.number}</div><div class="result-info"><p>\${user ? user.name : 'Unknown'}</p>\${result.isFixed ? '<span class="fixed-tag">Fixed</span>' : ''}</div></div>\`;
      }).join('');
    }

    function joinDrawing() {
      const name = document.getElementById('joinUserName').value.trim();
      if (!name) { alert('Please enter your name'); return; }
      
      const data = loadJoinData();
      if (data.users.some(u => u.name === name)) { alert('Name already exists'); return; }
      if (data.users.length >= data.maxNumber) { alert('Participants are full'); return; }
      
      const user = { id: Date.now().toString(), name };
      data.users.push(user);
      data.sessionId = sessionId;
      
      myName = name;
      isJoined = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      
      document.getElementById('joinBtn').innerHTML = '<span class="animate-spin">Joining...</span>';
      document.getElementById('joinBtn').disabled = true;
      
      setTimeout(() => {
        document.getElementById('joinForm').style.display = 'none';
        document.getElementById('joinSuccessCard').style.display = 'block';
        document.getElementById('joinWelcomeText').textContent = \`Welcome, \${name}!\`;
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

fs.writeFileSync(path.join(__dirname, 'index.html'), html, { encoding: 'utf8' });
console.log('HTML file created successfully');

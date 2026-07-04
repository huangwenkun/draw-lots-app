const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url.split('?')[0];
  
  if (filePath === './socket.io.js') {
    const socketIoPath = path.join(__dirname, 'node_modules', 'socket.io', 'client-dist', 'socket.io.min.js');
    fs.readFile(socketIoPath, (error, content) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('socket.io.js not found');
      } else {
        res.writeHead(200, { 
          'Content-Type': 'text/javascript; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
        res.end(content);
      }
    });
    return;
  }
  
  if (filePath === './') filePath = './index.html';
  
  const extname = path.extname(filePath);
  const contentType = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
  }[extname] || 'application/octet-stream';

  fs.readFile(filePath, 'utf8', (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
});

const io = new Server(server, {
  cors: { 
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
});

let sessions = {};

io.on('connection', (socket) => {
  console.log('用户连接:', socket.id, 'Transport:', socket.conn.transport.name);

  socket.on('createSession', (sessionId) => {
    console.log('创建房间:', sessionId);
    if (!sessions[sessionId]) {
      sessions[sessionId] = {
        maxNumber: 20,
        fixedUsers: { '1': '', '2': '' },
        users: [],
        results: []
      };
    }
    socket.join(sessionId);
    socket.emit('sessionData', sessions[sessionId]);
    console.log('发送房间数据:', sessionId);
  });

  socket.on('joinSession', (sessionId) => {
    console.log('加入房间:', sessionId);
    socket.join(sessionId);
    socket.emit('sessionData', sessions[sessionId] || null);
    
    setInterval(() => {
      if (sessions[sessionId]) {
        socket.emit('sessionData', sessions[sessionId]);
      }
    }, 2000);
  });

  socket.on('updateSettings', ({ sessionId, settings }) => {
    if (sessions[sessionId]) {
      sessions[sessionId].maxNumber = settings.maxNumber;
      sessions[sessionId].fixedUsers = settings.fixedUsers;
      io.to(sessionId).emit('sessionData', sessions[sessionId]);
    }
  });

  socket.on('addUser', ({ sessionId, user }) => {
    if (sessions[sessionId]) {
      const exists = sessions[sessionId].users.some(u => u.name === user.name);
      if (!exists) {
        sessions[sessionId].users.push(user);
        io.to(sessionId).emit('sessionData', sessions[sessionId]);
      }
    }
  });

  socket.on('draw', (sessionId) => {
    if (sessions[sessionId]) {
      const { maxNumber, fixedUsers, users } = sessions[sessionId];
      const availableNumbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
      const availableUsers = [...users];
      const results = [];

      const fixed1 = fixedUsers['1'];
      const fixed2 = fixedUsers['2'];

      if (fixed1 && availableNumbers.includes(1)) {
        const user = availableUsers.find(u => u.name === fixed1);
        if (user) {
          results.push({ userId: user.id, number: 1, isFixed: true });
          availableNumbers.splice(availableNumbers.indexOf(1), 1);
          availableUsers.splice(availableUsers.indexOf(user), 1);
        }
      }

      if (fixed2 && availableNumbers.includes(2)) {
        const user = availableUsers.find(u => u.name === fixed2);
        if (user) {
          results.push({ userId: user.id, number: 2, isFixed: true });
          availableNumbers.splice(availableNumbers.indexOf(2), 1);
          availableUsers.splice(availableUsers.indexOf(user), 1);
        }
      }

      for (let i = 0; i < availableUsers.length && availableNumbers.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const number = availableNumbers.splice(randomIndex, 1)[0];
        results.push({ userId: availableUsers[i].id, number, isFixed: false });
      }

      results.sort((a, b) => a.number - b.number);
      sessions[sessionId].results = results;
      io.to(sessionId).emit('sessionData', sessions[sessionId]);
    }
  });

  socket.on('disconnect', () => {
    console.log('用户断开:', socket.id);
  });
});

const PORT = process.env.PORT || 9999;
const isProduction = process.env.NODE_ENV === 'production';

server.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在 http://localhost:${PORT}/`);
  
  if (!isProduction) {
    console.log(`📱 手机参与地址: http://192.168.31.177:${PORT}/`);
    console.log(`⚠️  注意：请确保手机和电脑在同一 WiFi 网络下`);
  } else {
    console.log(`🚀 云服务器部署成功！`);
  }
});
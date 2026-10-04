PID=$(netstat -ano | grep ':4431 ' | grep LISTENING | awk '{print $5}' | head -1)
[ -n "$PID" ] && taskkill //PID $PID //F > /dev/null
sleep 1
node serve.mjs > serve.log 2>&1 &
sleep 5

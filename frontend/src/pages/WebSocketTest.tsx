import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
const WEBSOCKET_URL = 'ws://ws.example.com'

export const WebSocketTestPage = () => {
  return (
    <Box>
      <WebSocketComponents></WebSocketComponents>
    </Box>
  )
}

// WebSocketの内容を表示するコンポーネント
const WebSocketComponents = () => {
  // WebSocketの内容を入れるtext
  const [text, setText] = useState('')
  // WebSocketのインスタンスを保持する
  const webSocketRef = useRef<WebSocket>()
  // WebSocketの接続、イベントリスナーの設定
  useEffect(() => {
    // WebSocketの接続
    const socket = new WebSocket(WEBSOCKET_URL)
    webSocketRef.current = socket
    // 接続した時のイベント
    socket.addEventListener('open', (event) => {
      setText('open')
    })
    // メッセージを受け取った時のイベント
    socket.addEventListener('message', (event) => {
      setText(event.data)
    })
    // クリーンアップ時に通信を切断
    return () => socket.close()
  })
  // textを表示
  return <p>{text}</p>
}

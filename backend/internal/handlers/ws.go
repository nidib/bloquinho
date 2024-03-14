package handlers

import (
	"fmt"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func WsRequestUpgrade(c *fiber.Ctx) error {
	if websocket.IsWebSocketUpgrade(c) {
		c.Locals("allowed", true)
		return c.Next()
	}
	return fiber.ErrUpgradeRequired
}

func WsCoord(conn *websocket.Conn) {
	var messageType int
	var message []byte
	var err error

	room := conn.Params("room", "")
	clientId := conn.Params("clientId", "")
	fmt.Printf("Connected client %s at room %s", clientId, room)
	defer fmt.Printf("Disconnected client %s at room %s", clientId, room)

	for {
		if messageType, message, err = conn.ReadMessage(); err != nil {
			fmt.Println("read error:", err)
			break
		}

		if err = conn.WriteMessage(messageType, message); err != nil {
			fmt.Println("write error:", err)
			break
		}
	}
}

package handlers

import (
	"encoding/json"
	"fmt"
	"sync"

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

type Coord struct {
	X uint16
	Y uint16
}

type Client struct {
	conn  *websocket.Conn
	id    string
	coord Coord
}

type WSReq struct {
	Coord struct {
		X uint16 `json:"x"`
		Y uint16 `json:"y"`
	}
}

type WSResCoord struct {
	X uint16 `json:"x"`
	Y uint16 `json:"y"`
}

type WSRes struct {
	Id    string     `json:"id"`
	Coord WSResCoord `json:"coord"`
}

var (
	rooms     = make(map[string]map[string]*Client)
	roomsLock sync.Mutex
)

func WsCoord(conn *websocket.Conn) {
	var messageType int
	var message []byte
	var err error

	room := conn.Params("room", "")
	clientId := conn.Params("clientId", "")
	addClient(room, clientId, conn)
	fmt.Println("Connected client:", clientId)
	defer removeClient(room, clientId)

	for {
		if messageType, message, err = conn.ReadMessage(); err != nil {
			fmt.Println("read error:", err)
			break
		}
		req := WSReq{}
		json.Unmarshal(message, &req)

		updateClient(room, clientId, Coord{X: req.Coord.X, Y: req.Coord.Y})
		clientsInRoom := getClientsByRoom(room)
		var presentableClients []WSRes
		for _, clientInRoom := range clientsInRoom {
			presentableClients = append(presentableClients, WSRes{
				Id: clientInRoom.id,
				Coord: WSResCoord{
					X: clientInRoom.coord.X,
					Y: clientInRoom.coord.Y,
				},
			})
		}
		output, err := json.Marshal(presentableClients)
		if err != nil {
			fmt.Println("marshal error:", err)
			break
		}

		for _, client := range rooms[room] {
			if err = client.conn.WriteMessage(messageType, output); err != nil {
				fmt.Println("write:", err)
				break
			}
		}
	}
}

func addClient(room string, clientId string, conn *websocket.Conn) string {
	roomsLock.Lock()
	defer roomsLock.Unlock()
	addedClient := &Client{conn: conn, id: clientId}

	if rooms[room] == nil {
		rooms[room] = make(map[string]*Client)
	}
	rooms[room][clientId] = addedClient

	return clientId
}

func getClientsByRoom(room string) []*Client {
	roomsLock.Lock()
	defer roomsLock.Unlock()
	var clients []*Client

	for _, client := range rooms[room] {
		clients = append(clients, client)
	}

	return clients
}

func updateClient(room string, clientId string, coord Coord) {
	roomsLock.Lock()
	defer roomsLock.Unlock()
	rooms[room][clientId].coord = Coord{
		X: coord.X,
		Y: coord.Y,
	}
}

func removeClient(room string, clientId string) {
	roomsLock.Lock()
	defer roomsLock.Unlock()
	delete(rooms[room], clientId)
}

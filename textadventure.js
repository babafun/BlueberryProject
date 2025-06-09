// textadventure.js
export function startTextAdventure() {
  const game = {
    currentRoom: 'clearing',
    inventory: [],
    rooms: {
      clearing: {
        desc: "You're in a quiet forest clearing. Paths lead [north] and [east]. A stick lies on the ground.",
        items: ['stick'],
        exits: { north: 'cave', east: 'river' }
      },
      cave: {
        desc: "A dark cave. There's a locked door to the [north]. You can go [south].",
        items: [],
        exits: { south: 'clearing', north: 'treasure' },
        locked: { north: true }
      },
      river: {
        desc: "A river blocks your path east. There's a bridge here, but it’s missing a plank. You can go [west].",
        items: [],
        exits: { west: 'clearing' }
      },
      treasure: {
        desc: "🎉 You made it to the treasure room! Gold, gems, and a crown await. Congrats!",
        items: ['crown'],
        exits: {}
      }
    },
    look() {
      const room = this.rooms[this.currentRoom];
      console.log(`\n📍 ${room.desc}`);
      if (room.items.length > 0) {
        console.log(`Items here: ${room.items.join(', ')}`);
      }
    },
    move(dir) {
      const room = this.rooms[this.currentRoom];
      const destination = room.exits[dir];
      if (!destination) {
        console.log("❌ You can't go that way.");
        return;
      }
      if (room.locked && room.locked[dir]) {
        if (this.inventory.includes('key')) {
          console.log("🔓 You unlock the door with the key.");
          room.locked[dir] = false;
        } else {
          console.log("🚪 The door is locked.");
          return;
        }
      }
      this.currentRoom = destination;
      this.look();
    },
    take(item) {
      const room = this.rooms[this.currentRoom];
      const index = room.items.indexOf(item);
      if (index > -1) {
        this.inventory.push(item);
        room.items.splice(index, 1);
        console.log(`✅ You picked up: ${item}`);
        if (item === 'stick') {
          console.log("🪵 Hmm... maybe this stick could help with something broken.");
        }
      } else {
        console.log("❌ That item isn't here.");
      }
    },
    use(item) {
      if (!this.inventory.includes(item)) {
        console.log("❌ You don’t have that item.");
        return;
      }
      if (item === 'stick' && this.currentRoom === 'river') {
        console.log("🪄 You fix the bridge using the stick! You can now cross.");
        this.rooms['river'].exits['east'] = 'hut';
        this.rooms['hut'] = {
          desc: "A small hut with a key on the table. You can go [west].",
          items: ['key'],
          exits: { west: 'river' }
        };
      } else {
        console.log("❓ Nothing happens.");
      }
    },
    inventoryCheck() {
      console.log(`🎒 Inventory: ${this.inventory.length ? this.inventory.join(', ') : 'empty'}`);
    }
  };

  console.log("🕹️ Welcome to DevQuest — a hidden console adventure!");
  console.log("Use these commands:");
  console.log("  game.look()");
  console.log("  game.move('north' | 'east' | 'south' | etc)");
  console.log("  game.take('item')");
  console.log("  game.use('item')");
  console.log("  game.inventoryCheck()");
  console.log("\nStart by typing: game.look()");
  return game;
}

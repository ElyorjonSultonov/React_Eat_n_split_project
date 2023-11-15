import { useState } from "react";
import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Messi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRqP3WxEH1Ui_PiGwfHwinBrFy8ZkqY9UbQ&usqp=CAU",
    balance: -7,
  },
  {
    id: 771100,
    name: "Ronaldo",
    image:
      "https://static01.nyt.com/images/2022/12/30/multimedia/30soccer-ronaldo-1-76fd/30soccer-ronaldo-1-76fd-videoSixteenByNineJumbo1600.jpg",
    balance: 20,
  },
  {
    id: 101033,
    name: "Neymar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTya7MUie4RUFv_uCbgxTiHATMrYx_J6Vwajg&usqp=CAU",
    balance: 0,
  },
];

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend((show) => !show);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  const handleSelection = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  };

  return (
    <div className="App">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSpiltBill selectedFriend={selectedFriend} />}
    </div>
  );
}

const FriendList = ({ friends, onSelection, selectedFriend }) => {
  // const friends = initialFriends;
  return (
    <ul className="list">
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
};

const Friend = ({ friend, onSelection, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend.id || false;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="" />
      <h3> {friend.name} </h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name}
          {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} ows you
          {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You owe {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
};

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="">👨‍👩‍👧‍👦Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="">📸 Image URl</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
};

const FormSpiltBill = ({ selectedFriend }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventdefault();
    if (!bill || !paidByFriend) return;
  };

  return (
    <form className="form-split-buttun" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label htmlFor="">💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label htmlFor="">👨‍👩‍👧‍👦 {selectedFriend.name}'s expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value))}
      />

      <label htmlFor="">🧑‍💻Your expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label htmlFor="">Who is paying the bill</label>
      <select
        name=""
        id=""
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};
export default App;

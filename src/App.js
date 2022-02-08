import logo from "./logo.svg";
import "./App.css";
import { Table, Tag, Space } from "antd";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.thenexus.earth/all")
      .then((response) => response.json())
      .then((data) => {
        const dataWithKey = data.map((item, index) => ({
          ...item,
          key: item._id,
        }));

        setData(dataWithKey);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const whitelistUser = (objectId) => {
    fetch(`https://api.thenexus.earth/whitelist/${objectId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const blacklistUser = (objectId) => {
    fetch(`https://api.thenexus.earth/blacklist/${objectId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Wallet Address",
      dataIndex: "walletAddress",
      key: "walletAddress",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          {!record.isWhiteListed ? (
            <a onClick={() => whitelistUser(record.key)}>Whitelist</a>
          ) : (
            <a onClick={() => blacklistUser(record.key)}>Blacklist</a>
          )}
        </Space>
      ),
    },
  ];
  return (
    <div className="App">
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default App;

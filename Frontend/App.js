import React, { useEffect, useState } from "react";

function App() {
  const [sweets, setSweets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  const authHeader = {
    Authorization: "Basic " + btoa("admin_new:admin123")
  };

  // 🔹 FETCH SWEETS
  const fetchSweets = () => {
    fetch("http://localhost:8080/api/sweets", { headers: authHeader })
      .then(res => res.json())
      .then(data => setSweets(data));
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // 🔹 FORM CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 ADD SWEET
  const addSweet = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/sweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader
      },
      body: JSON.stringify(formData)
    });

    setFormData({ name: "", category: "", price: "", quantity: "" });
    fetchSweets();
  };

  // 🔹 DELETE SWEET
  const deleteSweet = async (id) => {
    await fetch(`http://localhost:8080/api/sweets/${id}`, {
      method: "DELETE",
      headers: authHeader
    });
    fetchSweets();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🍬 Sweet Shop Management</h1>

        {/* ADD SWEET CARD */}
        <div style={styles.card}>
          <h3>Add Sweet</h3>
          <form onSubmit={addSweet} style={styles.form}>
            <input name="name" placeholder="Sweet Name" value={formData.name} onChange={handleChange} required />
            <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
            <button style={styles.addBtn}>Add Sweet</button>
          </form>
        </div>

        {/* SWEET LIST */}
        <h3 style={{ marginTop: "30px" }}>Sweet List</h3>

        <div style={styles.grid}>
          {sweets.map((sweet) => (
            <div key={sweet.id} style={styles.sweetCard}>
              <div>
                <h4>{sweet.name}</h4>
                <p style={styles.text}>{sweet.category}</p>
                <p style={styles.text}>₹{sweet.price} | Qty: {sweet.quantity}</p>
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteSweet(sweet.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 🔥 INLINE STYLES (FAST & CLEAN) */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#fdfbfb,#ebedee)",
    padding: "30px"
  },
  container: {
    maxWidth: "900px",
    margin: "auto"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },
  form: {
    display: "grid",
    gap: "12px"
  },
  addBtn: {
    background: "#4CAF50",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "16px",
    marginTop: "15px"
  },
  sweetCard: {
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteBtn: {
    background: "#ff5252",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  text: {
    margin: "4px 0",
    color: "#555"
  }
};

export default App;

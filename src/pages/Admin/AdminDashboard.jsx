import React, { useEffect, useState } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getClientById,
} from "../../services/adminService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    client_name: "",
    industry: "",
    contact_info: "",
    created_by: "",
  });
  const [editClientId, setEditClientId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    setError("");
    try {
      const clientData = await getClients();
      console.log("Fetched clients data:", clientData);
      if (Array.isArray(clientData)) {
        setClients(clientData);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError("Failed to fetch clients");
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      setNewClient(prevClient => ({
        ...prevClient,
        created_by: user.name,
      }));
      if (isEditing) {
        const updatedClient = await updateClient(editClientId, newClient);
        console.log("Updated client:", updatedClient);
        if (updatedClient.message === "Client updated successfully") {
          alert("Client updated successfully");
        } else {
          throw new Error("Error updating client");
        }
      } else {
        const createdClient = await createClient(newClient);
        console.log("Created client:", createdClient);
        if (createdClient.message === "Client created successfully") {
          alert("Client created successfully");
        } else {
          throw new Error("Error creating client");
        }
      }
      setNewClient({
        client_name: "",
        industry: "",
        contact_info: "",
        created_by: user.name,
      });
      setEditClientId(null);
      setIsEditing(false);
      fetchClients();
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClient = async (clientId) => {
    setLoading(true);
    setError("");
    try {
      const client = await getClientById(clientId);
      console.log("Fetched client data:", client);
      setNewClient({
        client_name: client.client_name || "",
        industry: client.industry || "",
        contact_info: client.contact_info || "",
      });
      setEditClientId(clientId);
      setIsEditing(true);
    } catch (err) {
      setError("Error fetching client data");
      console.error("Error fetching client data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    setLoading(true);
    setError("");
    try {
      await deleteClient(clientId);
      fetchClients();
    } catch (err) {
      setError("Error deleting client");
      console.error("Error deleting client:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="client-form">
        <input
          type="text"
          value={newClient.client_name}
          placeholder="Client Name"
          onChange={(e) => setNewClient({ ...newClient, client_name: e.target.value })}
          required
        />
        <input
          type="text"
          value={newClient.industry}
          placeholder="Industry"
          onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
        />
        <input
          type="text"
          value={newClient.contact_info}
          placeholder="Contact Info"
          onChange={(e) => setNewClient({ ...newClient, contact_info: e.target.value })}
        />
        <button type="submit">
          {isEditing ? "Update Client" : "Create Client"}
        </button>
      </form>

      <h3>Clients List</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="client-list">
        {clients.length > 0 ? (
          clients.map((client) => (
            <li key={client.client_id}>
              <span>
                {client.client_name}
              </span>
              <button onClick={() => handleEditClient(client.client_id)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDeleteClient(client.client_id)} className="delete-btn">
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No clients available</li>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;

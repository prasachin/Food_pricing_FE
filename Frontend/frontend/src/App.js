import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const baseurl = "http://localhost:3005/api/pricing/calculatePrice";

function App() {
  const [zone, setZone] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [itemType, setItemType] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseurl, {
        zone,
        organization_id: organizationId,
        total_distance: parseFloat(totalDistance),
        item_type: itemType,
      });

      setTotalPrice(response.data.total_price);
      setZone("");
      setItemType("");
      setOrganizationId("");
      setTotalDistance("");
    } catch (error) {
      console.error("Error calculating price:", error);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-3">Food Delivery App</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="zone" style={{ marginBottom: "30px" }}>
          <Form.Label>Zone:</Form.Label>
          <Form.Control
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)} 
            placeholder="Enter zone"
          />
        </Form.Group>
        <Form.Group controlId="organizationId" style={{ marginBottom: "30px" }}>
          <Form.Label>Organization ID:</Form.Label>
          <Form.Control
            type="text"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            placeholder="Enter organization ID"
          />
        </Form.Group>
        <Form.Group controlId="totalDistance" style={{ marginBottom: "30px" }}>
          <Form.Label>Total Distance (km):</Form.Label>
          <Form.Control
            type="number"
            value={totalDistance}
            onChange={(e) => setTotalDistance(e.target.value)}
            placeholder="Enter total distance"
          />
        </Form.Group>
        <Form.Group controlId="itemType" style={{ marginBottom: "30px" }}>
          <Form.Label>Item Type:</Form.Label>
          <Form.Control
            as="select"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
          >
            <option value="perishable">Perishable</option>
            <option value="non-perishable">Non-Perishable</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Calculate Price
        </Button>
      </Form>
      {totalPrice && <h1 className="mt-3">Total Price: {totalPrice}</h1>}
    </Container>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navigation from "../components/Navigation";

export default function DetailsPage() {
  const [documents, setDocuments] = useState([]);
  const params = useParams();
  const collectionId = params.collectionId;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function fetchDocuments() {
    try {
      const collectionRef = collection(db, collectionId);
      const snapshot = await getDocs(collectionRef);
      const documentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(documentsData);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  }

  useEffect(() => {
    if (loading || !user) return; // Return early if loading or user is not authenticated
    fetchDocuments(); // Fetch documents when user is authenticated and dependencies change
  }, [collectionId, loading, user]); // Include collectionId in the dependency array

  return (
    <>
      <Navigation />
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          {documents.map((document) => (
            <Col md="6" key={document.id}>
              <Card>
                <Card.Body>
                  <Image src={document.image} style={{ width: "100%" }} />
                  <Card.Text>{document.caption}</Card.Text>
                  <Card.Link href={`/update/${document.id}`}>Edit</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

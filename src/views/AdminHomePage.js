import React, { useEffect, useState } from "react";
import { Container, Row, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs, getFirestore, query, limit } from "firebase/firestore";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import '../homepage.css';

export default function PostPageHome() {
  const [collections, setCollections] = useState([]);
  const [firstDocuments, setFirstDocuments] = useState({});

  useEffect(() => {
    const db = getFirestore();

    const fetchCollections = async () => {
      try {
        console.log("Fetching collections...");
        const collectionNames = ['vehicle', 'humans', 'bicycle'];
        const promises = collectionNames.map(async (collectionName) => {
          const collectionRef = collection(db, collectionName);
          const q = query(collectionRef, limit(1));
          const snapshot = await getDocs(q);
          const firstDocument = snapshot.docs.length ? snapshot.docs[0].data() : null;
          const firstImage = firstDocument && firstDocument.image; // Assuming the image URL field is named 'image' in your documents
          console.log("First image URL fetched for collection", collectionName, ":", firstImage);
          return { [collectionName]: firstImage };
        });

        const documents = await Promise.all(promises);
        console.log("All image URLs fetched:", documents);

        const imageUrlsObject = documents.reduce((acc, doc) => ({ ...acc, ...doc }), {});
        console.log("Image URLs object:", imageUrlsObject);
        setFirstDocuments(imageUrlsObject);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const CollectionRow = () => {
    return (
      <div className="horizontal-collection-row">
        {Object.entries(firstDocuments).map(([collectionId, imageUrl], index) => (
          <div key={index} className="collection-item">
            {imageUrl && (
              <Link to={`/detailspage/${collectionId}`}>
                <img src={imageUrl} alt={`Image for ${collectionId}`} />
                <h2>{collectionId}</h2>
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="/">Data Management</Navbar.Brand>
          <Nav>
            <Nav.Link href="/adminsignup">New account</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>Sign Out 🚪 </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h1 className="my-3 move-left-to-right">!! Admin Account !!</h1>
      <Container>
        <Row>
          <CollectionRow />
        </Row>
      </Container>
    </>
  );
}

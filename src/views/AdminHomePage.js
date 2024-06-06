import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { collection, getDocs, getFirestore, query, limit } from "firebase/firestore";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

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
    return Object.entries(firstDocuments).map(([collectionId, imageUrl], index) => (
      <div key={index}>
        <h2>{collectionId}</h2>
        <ul>
          <li>
          {imageUrl && <Link to={`/admincollection/${collectionId}`}><img src={imageUrl} alt={`Image for ${collectionId}`} /></Link>}
          </li>
        </ul>
      </div>
    ));
  };

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <CollectionRow />
        </Row>
      </Container>
    </>
  );
}
